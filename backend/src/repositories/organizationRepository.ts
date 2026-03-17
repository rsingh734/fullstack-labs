import type { Department, Employee, Role } from "../types";
import { departments as seedDepartments } from "../data/employee";
import { organizationRoles as seedRoles } from "../data/organization";

let departmentsStore: Department[] = JSON.parse(JSON.stringify(seedDepartments));
let rolesStore: Role[] = JSON.parse(JSON.stringify(seedRoles));

function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function organizationRepository() {
  return {
    getDepartments(): Department[] {
      return deepCopy(departmentsStore);
    },

    departmentExists(departmentName: string): boolean {
      return departmentsStore.some((d) => d.name === departmentName);
    },

    createEmployee(departmentName: string, employee: Employee): Department[] {
      departmentsStore = departmentsStore.map((department) => {
        if (department.name !== departmentName) return department;

        return {
          ...department,
          employees: [...department.employees, employee],
        };
      });

      return deepCopy(departmentsStore);
    },

    getRoles(): Role[] {
      return deepCopy(rolesStore);
    },

    roleIsOccupied(roleName: string): boolean {
      const normalizedRole = roleName.trim().toLowerCase();

      return rolesStore.some(
        (role) => role.role.trim().toLowerCase() === normalizedRole
      );
    },

    createRole(role: Role): Role[] {
      rolesStore = [...rolesStore, role];
      return deepCopy(rolesStore);
    },
  };
}

export type OrganizationRepository = ReturnType<typeof organizationRepository>;