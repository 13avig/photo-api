import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const styles = {
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '8px',
    color: type === 'error' ? 'white' : 'black',
    backgroundColor: type === 'error' ? '#FF6F61' : '#98FF98',
    textAlign: 'center',
  };

  return <div style={styles}>{message}</div>;
};

export default Notification;