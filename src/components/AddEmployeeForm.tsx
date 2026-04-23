import { useMemo } from "react";
import type { Department } from "../types";
import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  departments: Department[];
  onDepartmentsUpdated: (departments: Department[]) => void;
}

export default function AddEmployeeForm({
  departments,
}: Props) {
  const service = useMemo(() => employeeService(), []);
  const queryClient = useQueryClient();

  const firstName = useFormInput("");
  const departmentName = useFormInput("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    firstName.clearMessages();
    departmentName.clearMessages();

    const result = await service.createEmployee({
      firstName: firstName.value,
      departmentName: departmentName.value,
    });

    if (!result.ok) {
      if (result.fieldErrors.firstName) {
        firstName.setMessages(result.fieldErrors.firstName);
      }
      if (result.fieldErrors.departmentName) {
        departmentName.setMessages(result.fieldErrors.departmentName);
      }
      return;
    }

    // Invalidate departments query to refetch
    queryClient.invalidateQueries({ queryKey: ['departments'] });

    firstName.setValue("");
    departmentName.setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Employee</h3>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName.value}
          onChange={firstName.onChange}
        />
        {firstName.messages.map((m, i) => (
          <p key={i} style={{ color: "red" }}>
            {m}
          </p>
        ))}
      </div>

      <div>
        <label>Department:</label>
        <select
          value={departmentName.value}
          onChange={departmentName.onChange}
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep.name} value={dep.name}>
              {dep.name}
            </option>
          ))}
        </select>
        {departmentName.messages.map((m, i) => (
          <p key={i} style={{ color: "red" }}>
            {m}
          </p>
        ))}
      </div>

      <button type="submit">Add Employee</button>
    </form>
  );
}
