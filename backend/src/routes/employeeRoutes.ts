import { Router } from "express";
import {
  getDepartmentsController,
  createEmployeeController,
} from "../controllers/employeecontroller";

const router = Router();

router.get("/departments", getDepartmentsController);
router.post("/employees", createEmployeeController);

export default router;