import type { Department, Employee } from "../types";
import { departments as seedDepartments } from "../data/employees";

let departmentsStore: Department[] = JSON.parse(JSON.stringify(seedDepartments));

export function employeeRepo() {
  return {
    getDepartments(): Department[] {
      return JSON.parse(JSON.stringify(departmentsStore));
    },

    departmentExists(departmentName: string): boolean {
      return departmentsStore.some((d) => d.name === departmentName);
    },

    createEmployee(departmentName: string, employee: Employee): Department[] {
      departmentsStore = departmentsStore.map((dep) => {
        if (dep.name !== departmentName) return dep;

        return {
          ...dep,
          employees: [...dep.employees, employee],
        };
      });

      return JSON.parse(JSON.stringify(departmentsStore));
    },
  };
}

export type EmployeeRepo = ReturnType<typeof employeeRepo>;