import type { Request, Response } from "express";
import { organizationRepository } from "../repositories/organizationRepository";
import { roleService } from "../services/roleServices";

const repo = organizationRepository();
const service = roleService(repo);

export async function getRolesController(_req: Request, res: Response) {
  const roles = await service.getRoles();
  res.status(200).json(roles);
}

export async function createRoleController(req: Request, res: Response) {
  const result = await service.createRole(req.body);

  if (!result.ok) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
}