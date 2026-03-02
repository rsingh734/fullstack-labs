import type { Department, Employee, Role } from "../types";
import { departments as seedDepartments } from "../data/employees";
import { organizationRoles as seedRoles } from "../data/organization";

let departmentsStore: Department[] = JSON.parse(JSON.stringify(seedDepartments));
let rolesStore: Role[] = JSON.parse(JSON.stringify(seedRoles));

function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function organizationRepo() {
  return {
    getDepartments(): Department[] {
      return deepCopy(departmentsStore);
    },

    departmentExists(departmentName: string): boolean {
      return departmentsStore.some((d) => d.name === departmentName);
    },

    createEmployee(departmentName: string, employee: Employee): Department[] {
      departmentsStore = departmentsStore.map((dep) => {
        if (dep.name !== departmentName) return dep;
        return { ...dep, employees: [...dep.employees, employee] };
      });
      return deepCopy(departmentsStore);
    },

    getRoles(): Role[] {
      return deepCopy(rolesStore);
    },

    roleIsOccupied(roleName: string): boolean {
      const normalized = roleName.trim().toLowerCase();
      return rolesStore.some((r) => r.role.trim().toLowerCase() === normalized);
    },

    createRole(role: Role): Role[] {
      rolesStore = [...rolesStore, role];
      return deepCopy(rolesStore);
    },

    deleteRole(roleName: string): Role[] {
      const normalized = roleName.trim().toLowerCase();
      rolesStore = rolesStore.filter(
        (r) => r.role.trim().toLowerCase() !== normalized
      );
      return deepCopy(rolesStore);
    },
  };
}

export type OrganizationRepo = ReturnType<typeof organizationRepo>;