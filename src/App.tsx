import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DepartmentSection from './components/DepartmentSection';
import { departments as initialDepartments } from './data/employees';
import type { Department } from './types';
import AddEmployeeForm from './components/AddEmployeeForm';

function App() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  function handleAddEmployee(firstName: string, departmentName: string) {

    const updatedDepartments = departments.map((dep) => {

      if (dep.name === departmentName) {
        return {
          ...dep,
          employees: [...dep.employees, { firstName }]
        };
      }

      return dep;
    });

    setDepartments(updatedDepartments);
  }

  return (
    <div className="App">
      <Header />
      <main style={styles.main}>
        <div style={styles.container}>
          {departments.map((department, index) => (
            <DepartmentSection 
              key={index} 
              department={department} 
            />
          ))}
        </div>
      </main>
      {/* Add Employee Form goes here */}
    <AddEmployeeForm
      departments={departments}
      onAddEmployee={handleAddEmployee}
    />
      <Footer />
    </div>
  );
}

const styles = {
  main: {
    minHeight: 'calc(100vh - 200px)',
    backgroundColor: '#443e96',
    padding: '2rem 0',
  } as React.CSSProperties,
  container: {
    maxWidth: '26000 px',
    margin: '1 auto',
    padding: '0 1rem',
  } as React.CSSProperties,
};

export default App;