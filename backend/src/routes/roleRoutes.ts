import { Router } from "express";
import {
  getRolesController,
  createRoleController,
} from "../controllers/roleController";

const router = Router();

router.get("/roles", getRolesController);
router.post("/roles", createRoleController);

export default router;