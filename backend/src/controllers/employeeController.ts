import type { Request, Response } from "express";
import { organizationRepository } from "../repositories/organizationRepository";
import { employeeService } from "../services/employeeService";

const repo = organizationRepository();
const service = employeeService(repo);

export async function getDepartmentsController(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const result = await service.getDepartments(page, limit);
  res.status(200).json(result);
}

export async function createEmployeeController(req: Request, res: Response) {
  const result = await service.createEmployee(req.body);

  if (!result.ok) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
}