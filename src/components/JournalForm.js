import React, { useState } from 'react';
import API from '../api/api';
import Notification from '../components/Notification';

const JournalForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', cover_photo: '' });
  const [notification, setNotification] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    API.post('/journals', formData)
      .then(() => {
        setNotification({ message: 'Journal created successfully!', type: 'success' });
        setFormData({ title: '', description: '', cover_photo: '' });
      })
      .catch(() => setNotification({ message: 'Failed to create journal.', type: 'error' }));
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        style={styles.textarea}
      />
      <input
        type="text"
        name="cover_photo"
        placeholder="Cover Photo URL"
        value={formData.cover_photo}
        onChange={handleChange}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Create Journal</button>
    </form>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' },
  textarea: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC', minHeight: '100px' },
  button: { padding: '0.75rem', background: '#FF6F61', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default JournalForm;