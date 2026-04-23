import type { Department, Employee, DepartmentsResponse } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function employeeRepo() {
  return {
async getDepartments(page: number = 1, limit: number = 5): Promise<DepartmentsResponse> {
      const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
      const res = await fetch(`${API_BASE}/departments?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },

    async createEmployee(
      departmentName: string,
      employee: Employee
    ): Promise<Department[]> {
      const res = await fetch(`${API_BASE}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departmentName,
          ...employee,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return data.departments;
    },
  };
}