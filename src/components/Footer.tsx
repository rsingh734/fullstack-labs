import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={styles.footer}>
      <p>Copyright Pixell River Financial {currentYear}</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#34495e',
    color: 'white',
    textAlign: 'center' as const,
    padding: '1.3rem',
    marginTop: '2rem',
  } as React.CSSProperties,
};

export default Footer;