import type { Department } from "../types";
import { employeeRepo } from "../repositories/employeeRepo";

export type CreateEmployeeInput = {
  firstName: string;
  lastName?: string;
  departmentName: string;
};

export type CreateEmployeeResult =
  | { ok: true; departments: Department[] }
  | {
      ok: false;
      fieldErrors: Partial<Record<keyof CreateEmployeeInput, string[]>>;
    };

export function employeeService() {
  const repo = employeeRepo();

  return {
    async createEmployee(
      input: CreateEmployeeInput
    ): Promise<CreateEmployeeResult> {
      const fieldErrors: Partial<Record<keyof CreateEmployeeInput, string[]>> =
        {};

      if (!input.departmentName || input.departmentName.trim().length === 0) {
        fieldErrors.departmentName = ["Please select a valid department."];
      }

      if (!input.firstName || input.firstName.trim().length < 3) {
        fieldErrors.firstName = ["First name must be at least 3 characters."];
      }

      if (Object.keys(fieldErrors).length > 0) {
        return { ok: false, fieldErrors };
      }

      try {
        const departments = await repo.createEmployee(input.departmentName, {
          firstName: input.firstName.trim(),
          lastName: input.lastName?.trim() || undefined,
        });

        return { ok: true, departments };
      } catch (error: any) {
        return {
          ok: false,
          fieldErrors: error.fieldErrors || {
            departmentName: ["Unable to create employee."],
          },
        };
      }
    },
  };
}