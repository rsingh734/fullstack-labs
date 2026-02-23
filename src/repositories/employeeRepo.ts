import type { Department, Employee } from "../types";
import { departments as seedDepartments } from "../data/employees";

/**
 * In-memory store (temporary data) — matches lab requirement.
 * Repo is the single source of truth for Departments + Employees.
 */
let departmentsStore: Department[] = JSON.parse(JSON.stringify(seedDepartments));

export function employeeRepo() {
  return {
    /** Always retrieve departments from the repository */
    getDepartments(): Department[] {
      return JSON.parse(JSON.stringify(departmentsStore));
    },

    /** Validate the department exists (by department name in your project) */
    departmentExists(departmentName: string): boolean {
      return departmentsStore.some((d) => d.name === departmentName);
    },

    /**
     * Create an employee in a department and return updated departments
     * (employees are stored inside department.employees[])
     */
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