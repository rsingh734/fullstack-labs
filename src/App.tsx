import { useMemo, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import "./App.css";

import type { Department, Role } from "./types";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DepartmentSection from "./components/DepartmentSection";
import Organization from "./components/Organization";
import AddEmployeeForm from "./components/AddEmployeeForm";
import AddRoleForm from "./components/AddRoleForm";

import { organizationRepo } from "./repositories/organizationRepo";
import { employeeRepo } from "./repositories/employeeRepo";

export default function App() {
  const orgRepo = useMemo(() => organizationRepo(), []);
  const empRepo = useMemo(() => employeeRepo(), []);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    empRepo.getDepartments().then(setDepartments);
  }, [empRepo]);

  useEffect(() => {
    orgRepo.getRoles().then(setRoles);
  }, [orgRepo]);

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

        <div style={{ marginLeft: "auto" }}>
          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
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
                    <DepartmentSection
                      key={index}
                      department={department}
                    />
                  ))}
                </div>

                <SignedIn>
                  <AddEmployeeForm
                    departments={departments}
                    onDepartmentsUpdated={setDepartments}
                  />
                </SignedIn>

                <SignedOut>
                  <p style={{ textAlign: "center", marginTop: "20px" }}>
                    Please sign in to add employees
                  </p>
                </SignedOut>
              </div>
            }
          />

          <Route
            path="/organization"
            element={
              <div className="page">
                <Organization roles={roles} />

                <SignedIn>
                  <AddRoleForm onRolesUpdated={setRoles} />
                </SignedIn>

                <SignedOut>
                  <p style={{ textAlign: "center", marginTop: "20px" }}>
                    Please sign in to add roles
                  </p>
                </SignedOut>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}