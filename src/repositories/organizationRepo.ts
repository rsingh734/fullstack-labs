import type { Role } from "../types";

const API_BASE = "http://localhost:5000/api";

export function organizationRepo() {
  return {
    async getRoles(): Promise<Role[]> {
      const res = await fetch(`${API_BASE}/roles`);
      return res.json();
    },

    async createRole(role: Role): Promise<Role[]> {
      const res = await fetch(`${API_BASE}/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(role),
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return data.roles;
    },
  };
}