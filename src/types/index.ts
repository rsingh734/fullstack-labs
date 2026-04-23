export interface Employee {
  firstName: string;
  lastName?: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}

export interface DepartmentsResponse {
  departments: Department[];
  total: number;
  page: number;
  limit: number;
}

export interface Role {
  firstName: string;
  lastName?: string;
  role: string;
}