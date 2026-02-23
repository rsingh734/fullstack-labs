import type { Department, Employee } from "../types";
import type { EmployeeRepo } from "../repositories/employeeRepo";

export type CreateEmployeeInput = {
  firstName: string;
  departmentName: string;
};

export type CreateEmployeeResult =
  | { ok: true; departments: Department[] }
  | {
      ok: false;
      fieldErrors: Partial<Record<keyof CreateEmployeeInput, string[]>>;
    };

export function employeeService(repo: EmployeeRepo) {
  return {
    createEmployee(input: CreateEmployeeInput): CreateEmployeeResult {
      const fieldErrors: Partial<
        Record<keyof CreateEmployeeInput, string[]>
      > = {};

      // Validate department exists
      if (!input.departmentName || !repo.departmentExists(input.departmentName)) {
        fieldErrors.departmentName = [
          "Please select a valid department.",
        ];
      }

      // Validate first name length
      if (!input.firstName || input.firstName.trim().length < 3) {
        fieldErrors.firstName = [
          "First name must be at least 3 characters.",
        ];
      }

      // If validation fails → return errors
      if (Object.keys(fieldErrors).length > 0) {
        return { ok: false, fieldErrors };
      }

      const employee: Employee = {
        firstName: input.firstName.trim(),
      };

      const departments = repo.createEmployee(
        input.departmentName,
        employee
      );

      return { ok: true, departments };
    },
  };
}