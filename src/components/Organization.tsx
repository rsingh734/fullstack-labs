import React from "react";
import type { Role } from "../types";
import "./Organization.css";

interface OrganizationProps {
  roles: Role[];
}

const Organization: React.FC<OrganizationProps> = ({ roles }) => {
  return (
    <section className="org-section">
      <h2>Leadership and Management</h2>

      <div className="org-list">
        {roles.map((role, index) => (
          <div key={index} className="org-row">
            <span>
              {role.firstName} {role.lastName}
            </span>
            <span className="org-role">{role.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Organization;