import { useMemo } from "react";
import type { Role } from "../types";
import { useFormInput } from "./useFormInput";
import { roleService } from "../services/roleService";

export function useRoleForm(onRolesUpdated: (roles: Role[]) => void) {
  const service = useMemo(() => roleService(), []);

  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    firstName.clearMessages();
    lastName.clearMessages();
    role.clearMessages();

    const result = await service.createRole({
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });

    if (!result.ok) {
      if (result.fieldErrors.firstName) {
        firstName.setMessages(result.fieldErrors.firstName);
      }
      if (result.fieldErrors.lastName) {
        lastName.setMessages(result.fieldErrors.lastName);
      }
      if (result.fieldErrors.role) {
        role.setMessages(result.fieldErrors.role);
      }
      return;
    }

    onRolesUpdated(result.roles);

    firstName.setValue("");
    lastName.setValue("");
    role.setValue("");
  }

  return { firstName, lastName, role, submit };
}