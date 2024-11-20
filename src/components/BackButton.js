import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const styles = {
    button: { padding: '0.75rem', background: '#FFCBA4', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem' },
  };

  return (
    <button onClick={() => navigate('/')} style={styles.button}>
      Back to Journals
    </button>
  );
};

export default BackButton;