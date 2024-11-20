import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>PhotoJournal</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/create" style={styles.link}>Create Journal</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    background: '#FFCBA4',
    color: '#8E8D8A',
  },
  logo: { fontSize: '1.5rem', fontWeight: 'bold' },
  links: { display: 'flex', gap: '1rem' },
  link: { textDecoration: 'none', color: '#8E8D8A', fontSize: '1.2rem' },
};

export default Navbar;