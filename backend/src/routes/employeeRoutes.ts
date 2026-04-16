import { Router } from "express";
import {
  getDepartmentsController,
  createEmployeeController,
} from "../controllers/employeeController";

const router = Router();

router.get("/departments", getDepartmentsController);
router.post("/employees", createEmployeeController);

export default router;