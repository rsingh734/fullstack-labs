import type { Role } from "../types";
import { useRoleForm } from "../hooks/useRoleForm";
import TextField from "./TextField";

type Props = {
  onRolesUpdated: (roles: Role[]) => void;
};

export default function AddRoleForm({ onRolesUpdated }: Props) {
  const { firstName, lastName, role, submit } = useRoleForm(onRolesUpdated);

  return (
    <form onSubmit={submit}>
      <h3>Add Role</h3>

      <TextField
        label="First Name"
        value={firstName.value}
        onChange={firstName.onChange as any}
        messages={firstName.messages}
        placeholder="e.g., John"
      />

      <TextField
        label="Last Name"
        value={lastName.value}
        onChange={lastName.onChange as any}
        messages={lastName.messages}
        placeholder="e.g., Smith"
      />

      <TextField
        label="Role"
        value={role.value}
        onChange={role.onChange as any}
        messages={role.messages}
        placeholder="e.g., CIO"
      />

      <button type="submit">Create Role</button>
    </form>
  );
}
