import React from "react";
import type { Role } from "../data/organization";

interface OrganizationProps {
  roles: Role[];
}

const Organization: React.FC<OrganizationProps> = ({ roles }) => {
  return (
    <section style={styles.section}>
      <h2>Leadership and Management</h2>
      <div style={styles.list}>
        {roles.map((role, index) => (
          <div key={index} style={styles.row}>
            <span>{role.firstName} {role.lastName}</span>
            <span style={styles.role}>{role.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "black",
    padding: "1.5rem",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "2rem auto",
  } as React.CSSProperties,
  list: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.8rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #f5eeee",
    paddingBottom: "0.5rem",
  },
  role: {
    fontWeight: "bold",
  },
};

export default Organization;
