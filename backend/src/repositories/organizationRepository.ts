import { prisma } from "../lib/prisma";
import type { Department, Employee, Role } from "../types";

function mapDepartment(department: {
  id: number;
  name: string;
  employees: { id: number; firstName: string; lastName: string | null }[];
}): Department {
  return {
    name: department.name,
    employees: department.employees.map((employee) => ({
      firstName: employee.firstName,
      lastName: employee.lastName ?? undefined,
    })),
  };
}

function mapRole(role: {
  id: number;
  firstName: string;
  lastName: string | null;
  role: string;
}): Role {
  return {
    firstName: role.firstName,
    lastName: role.lastName ?? undefined,
    role: role.role,
  };
}

export function organizationRepository() {
  return {
    async getDepartments(): Promise<Department[]> {
      const departments = await prisma.department.findMany({
        include: {
          employees: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      return departments.map(mapDepartment);
    },

    async departmentExists(departmentName: string): Promise<boolean> {
      const department = await prisma.department.findUnique({
        where: {
          name: departmentName,
        },
      });

      return !!department;
    },

    async createEmployee(
      departmentName: string,
      employee: Employee
    ): Promise<Department[]> {
      const department = await prisma.department.findUnique({
        where: {
          name: departmentName,
        },
      });

      if (!department) {
        throw new Error("Department not found.");
      }

      await prisma.employee.create({
        data: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          departmentId: department.id,
        },
      });

      const updatedDepartments = await prisma.department.findMany({
        include: {
          employees: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      return updatedDepartments.map(mapDepartment);
    },

    async getRoles(): Promise<Role[]> {
      const roles = await prisma.role.findMany({
        orderBy: {
          role: "asc",
        },
      });

      return roles.map(mapRole);
    },

    async roleIsOccupied(roleName: string): Promise<boolean> {
      const role = await prisma.role.findUnique({
        where: {
          role: roleName,
        },
      });

      return !!role;
    },

    async createRole(role: Role): Promise<Role[]> {
      await prisma.role.create({
        data: {
          firstName: role.firstName,
          lastName: role.lastName,
          role: role.role,
        },
      });

      const updatedRoles = await prisma.role.findMany({
        orderBy: {
          role: "asc",
        },
      });

      return updatedRoles.map(mapRole);
    },
  };
}

export type OrganizationRepository = ReturnType<typeof organizationRepository>;