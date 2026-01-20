import React from 'react';
import type {Department} from '../types';
import EmployeeCard from './EmployeeCard';

interface DepartmentSectionProps {
  department: Department;
}

const DepartmentSection: React.FC<DepartmentSectionProps> = ({ department }) => {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>
        {department.name} 
        <span style={styles.count}> ({department.employees.length})</span>
      </h2>
      <div style={styles.employeeList}>
        {department.employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'white',
    marginBottom: '2rem',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  title: {
    color: '#2c3e50',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #ecf0f1',
  } as React.CSSProperties,
  count: {
    color: '#7f8c8d',
    fontSize: '0.9em',
  } as React.CSSProperties,
  employeeList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  } as React.CSSProperties,
};

export default DepartmentSection;