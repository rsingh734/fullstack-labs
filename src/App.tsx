import { useMemo, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import "./App.css";

import type { Department, DepartmentsResponse } from "./types";

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

  const [page, setPage] = useState(1);
  const { data: departmentsData, isLoading } = useQuery<DepartmentsResponse>({
    queryKey: ["departments", page],
    queryFn: () => empRepo.getDepartments(page),
  });
  const departments: Department[] = departmentsData?.departments || [];
  const totalPages = Math.ceil((departmentsData?.total || 0) / 5) || 1;

  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: () => orgRepo.getRoles(),
  });

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
                  {isLoading ? (
                    <p>Loading departments...</p>
                  ) : (
                    departments.map((department: Department, index: number) => (
                      <DepartmentSection
                        key={index}
                        department={department}
                      />
                    ))
                  )}
                </div>
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      style={{ padding: '8px 16px', opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                    >
                      Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      style={{ padding: '8px 16px', opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                      Next
                    </button>
                  </div>
                )}
                <SignedIn>
                  <AddEmployeeForm
                    departments={departments}
                    onDepartmentsUpdated={() => {}}
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
                  <AddRoleForm onRolesUpdated={() => {}} />
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
