import type { Department, Employee } from "../types";
import type { OrganizationRepository } from "../repositories/organizationRepository";

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

export function employeeService(repo: OrganizationRepository) {
  return {
async getDepartments(page: number = 1, limit: number = 5): Promise<{departments: Department[], total: number, page: number, limit: number}> {
      return repo.getDepartments(page, limit);
    },

    async createEmployee(
      input: CreateEmployeeInput
    ): Promise<CreateEmployeeResult> {
      const fieldErrors: Partial<Record<keyof CreateEmployeeInput, string[]>> =
        {};

      if (
        !input.departmentName ||
        !(await repo.departmentExists(input.departmentName))
      ) {
        fieldErrors.departmentName = ["Please select a valid department."];
      }

      if (!input.firstName || input.firstName.trim().length < 3) {
        fieldErrors.firstName = ["First name must be at least 3 characters."];
      }

      if (Object.keys(fieldErrors).length > 0) {
        return { ok: false, fieldErrors };
      }

      const employee: Employee = {
        firstName: input.firstName.trim(),
        lastName: input.lastName?.trim() || undefined,
      };

      const departments = await repo.createEmployee(
        input.departmentName,
        employee
      );

      return { ok: true, departments };
    },
  };
}