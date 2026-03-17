import type { Department, Employee } from "../types";

const API_BASE = "http://localhost:5000/api";

export function employeeRepo() {
  return {
    async getDepartments(): Promise<Department[]> {
      const res = await fetch(`${API_BASE}/departments`);
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