import { useState } from "react";
import type { Department } from "../types/index";

interface Props {
  departments: Department[];
  onAddEmployee: (firstName: string, departmentName: string) => void;
}

export default function AddEmployeeForm({ departments, onAddEmployee }: Props) {
  const [firstName, setFirstName] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (firstName.trim().length < 3) {
      setError("First name must be at least 3 characters.");
      return;
    }

    if (!department) {
      setError("Please select a department.");
      return;
    }

    onAddEmployee(firstName, department);

    setFirstName("");
    setDepartment("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Employee</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label>Department:</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>

          {departments.map((dep) => (
            <option key={dep.name} value={dep.name}>
              {dep.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add Employee</button>
    </form>
  );
}
