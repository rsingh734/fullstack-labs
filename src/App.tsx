import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";

import type { Department, Role } from "./types";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DepartmentSection from "./components/DepartmentSection";
import Organization from "./components/Organization";
import AddEmployeeForm from "./components/AddEmployeeForm";
import AddRoleForm from "./components/AddRoleForm";

import { organizationRepo } from "./repositories/organizationRepo";

export default function App() {
  const repo = useMemo(() => organizationRepo(), []);

  const [departments, setDepartments] = useState<Department[]>(repo.getDepartments());
  const [roles, setRoles] = useState<Role[]>(repo.getRoles());

  return (
    <Router>
      <Header />

      <nav className="navbar">
        <Link className="navlink" to="/employees">
          Employees
        </Link>
        <Link className="navlink" to="/organization">
          Organization
        </Link>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />

          <Route
            path="/employees"
            element={
              <div className="page">
                <div className="container">
                  {departments.map((department, index) => (
                    <DepartmentSection key={index} department={department} />
                  ))}
                </div>

                <AddEmployeeForm
                  departments={departments}
                  onDepartmentsUpdated={setDepartments}
                />
              </div>
            }
          />

          <Route
            path="/organization"
            element={
              <div className="page">
                <Organization roles={roles} />

                <AddRoleForm onRolesUpdated={setRoles} />
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}