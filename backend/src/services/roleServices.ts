import type { Role } from "../types";
import type { OrganizationRepository } from "../repositories/organizationRepository";

export type CreateRoleInput = {
  firstName: string;
  lastName?: string;
  role: string;
};

export type CreateRoleResult =
  | { ok: true; roles: Role[] }
  | {
      ok: false;
      fieldErrors: Partial<Record<keyof CreateRoleInput, string[]>>;
    };

export function roleService(repo: OrganizationRepository) {
  return {
    async getRoles(): Promise<Role[]> {
      return repo.getRoles();
    },

    async createRole(input: CreateRoleInput): Promise<CreateRoleResult> {
      const fieldErrors: Partial<Record<keyof CreateRoleInput, string[]>> = {};

      if (!input.firstName || input.firstName.trim().length < 3) {
        fieldErrors.firstName = ["First name must be at least 3 characters."];
      }

      if (!input.role || input.role.trim().length === 0) {
        fieldErrors.role = ["Role is required."];
      } else if (await repo.roleIsOccupied(input.role.trim())) {
        fieldErrors.role = ["That role already exists and is occupied."];
      }

      if (Object.keys(fieldErrors).length > 0) {
        return { ok: false, fieldErrors };
      }

      const newRole: Role = {
        firstName: input.firstName.trim(),
        lastName: input.lastName?.trim() || undefined,
        role: input.role.trim(),
      };

      const roles = await repo.createRole(newRole);

      return { ok: true, roles };
    },
  };
}