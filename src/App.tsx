import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DepartmentSection from './components/DepartmentSection';
import Organization from "./components/Organization";
import { organizationRoles } from "./data/organization";
import AddEmployeeForm from './components/AddEmployeeForm';
import type { Department } from "./types";
import { employeeRepo } from "./repositories/employeeRepo";

function App() {
  const repo = employeeRepo();
const [departments, setDepartments] = useState<Department[]>(repo.getDepartments());

  function handleDepartmentsUpdated(next: Department[]) {
  setDepartments(next);
}

  return (
    <Router>
      <Header />
      <nav style={styles.navbar}>
        <Link to="/employees" style={styles.link}>Employees</Link>
        <Link to="/organization" style={styles.link}>Organization</Link>
      </nav>
      <main style={styles.main}>
        <Routes>
          <Route
            path="/employees"
            element={
              <>
                <div style={styles.container}>
                  {departments.map((department, index) => (
                    <DepartmentSection key={index} department={department} />
                  ))}
                </div>
                <AddEmployeeForm
  departments={departments}
  onDepartmentsUpdated={handleDepartmentsUpdated}
/>
              </>
            }
          />
          <Route
            path="/organization"
            element={<Organization roles={organizationRoles} />}
          />
          <Route
            path="*"
            element={<div>Page not found. Go to <Link to="/employees">Employees</Link></div>}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#34495e",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
  } as React.CSSProperties,
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  } as React.CSSProperties,
  main: {
    minHeight: "calc(100vh - 200px)",
    backgroundColor: "#443e96",
    padding: "2rem 0",
  } as React.CSSProperties,
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 1rem",
  } as React.CSSProperties,
};

export default App;