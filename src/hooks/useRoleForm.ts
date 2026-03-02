import { useMemo } from "react";
import type { Role } from "../types";
import { useFormInput } from "./useFormInput";
import { organizationRepo } from "../repositories/organizationRepo";
import { roleService } from "../services/roleService";

export function useRoleForm(onRolesUpdated: (roles: Role[]) => void) {
  const repo = useMemo(() => organizationRepo(), []);
  const service = useMemo(() => roleService(repo), [repo]);

  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  function submit(e: React.FormEvent) {
    e.preventDefault();

    firstName.clearMessages();
    lastName.clearMessages();
    role.clearMessages();

    const result = service.createRole({
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });

    if (!result.ok) {
      if (result.fieldErrors.firstName) firstName.setMessages(result.fieldErrors.firstName);
      if (result.fieldErrors.lastName) lastName.setMessages(result.fieldErrors.lastName);
      if (result.fieldErrors.role) role.setMessages(result.fieldErrors.role);
      return;
    }

    onRolesUpdated(result.roles);

    firstName.setValue("");
    lastName.setValue("");
    role.setValue("");
  }

  return { firstName, lastName, role, submit };
}