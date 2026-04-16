import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";

const app = express();

// Middleware
app.use(cors({
  origin:  [
    "http://localhost:5173",
    "https://fullstack-labs-4lq4.vercel.app"
  ]
}));

app.use(express.json());

// Routes
app.use("/api", employeeRoutes);
app.use("/api", roleRoutes);

export default app;