import React from 'react';
import type { Employee } from '../types';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const fullName = employee.lastName 
    ? `${employee.firstName} ${employee.lastName}`
    : employee.firstName;
  
  return (
    <div style={styles.card}>
      <span style={styles.name}>{fullName}</span>
    </div>
  );
};

const styles = {
  card: {
    padding: '0.8rem',
    marginBottom: '0.5rem',
    backgroundColor: '#316c6c',
    borderLeft: '3px solid #3498db',
    borderRadius: '4px',
  } as React.CSSProperties,
  name: {
    fontWeight: 500,
  } as React.CSSProperties,
};

export default EmployeeCard;