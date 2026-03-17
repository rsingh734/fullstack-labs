import type { Request, Response } from "express";
import { organizationRepository } from "../repositories/organizationRepository";
import { employeeService } from "../services/employeeService";

const repo = organizationRepository();
const service = employeeService(repo);

export function getDepartmentsController(_req: Request, res: Response) {
  const departments = service.getDepartments();
  res.status(200).json(departments);
}

export function createEmployeeController(req: Request, res: Response) {
  const result = service.createEmployee(req.body);

  if (!result.ok) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
}