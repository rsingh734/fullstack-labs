import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DepartmentSection from './components/DepartmentSection';
import { departments } from './data/employees';

function App() {
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