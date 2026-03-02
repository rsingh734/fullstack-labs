import type { Role } from "../types";
import type { OrganizationRepo } from "../repositories/organizationRepo";

export type CreateRoleInput = {
  firstName: string;
  lastName: string;
  role: string;
};

export type CreateRoleResult =
  | { ok: true; roles: Role[] }
  | { ok: false; fieldErrors: Partial<Record<keyof CreateRoleInput, string[]>> };

export function roleService(repo: OrganizationRepo) {
  return {
    createRole(input: CreateRoleInput): CreateRoleResult {
      const fieldErrors: Partial<Record<keyof CreateRoleInput, string[]>> = {};

      if (!input.firstName || input.firstName.trim().length < 3) {
        fieldErrors.firstName = ["First name must be at least 3 characters."];
      }

      if (!input.role || input.role.trim().length === 0) {
        fieldErrors.role = ["Role is required."];
      } else if (repo.roleIsOccupied(input.role)) {
        fieldErrors.role = ["That role already exists and is occupied."];
      }

      if (Object.keys(fieldErrors).length > 0) {
        return { ok: false, fieldErrors };
      }

      const newRole: Role = {
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim() || undefined,
        role: input.role.trim(),
      };

      const roles = repo.createRole(newRole);
      return { ok: true, roles };
    },
  };
}