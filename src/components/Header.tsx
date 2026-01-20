import React from 'react';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        <img src={logo} alt="Pixell River Financial Logo" style={styles.logo} />
        <div style={styles.headerText}>
          <h1 style={styles.title}>Pixell River Employee Directory</h1>
          <p style={styles.greeting}>Find colleagues across departments</p>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1.5rem',
  } as React.CSSProperties,
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  } as React.CSSProperties,
  logo: {
    width: '60px',
    height: '60px',
    marginRight: '1rem',
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '5px',
  } as React.CSSProperties,
  headerText: {
    flex: 1,
  } as React.CSSProperties,
  title: {
    fontSize: '1.8rem',
    marginBottom: '0.3rem',
  } as React.CSSProperties,
  greeting: {
    color: '#ecf0f1',
    fontSize: '1rem',
  } as React.CSSProperties,
};

export default Header;