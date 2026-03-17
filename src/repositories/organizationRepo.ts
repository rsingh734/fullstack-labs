import type { Role } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

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