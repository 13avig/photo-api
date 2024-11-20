import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import UnsplashSearch from './UnsplashSearch';
import Notification from './Notification';
import BackButton from './BackButton';

const JournalDetail = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const [newEntry, setNewEntry] = useState({ photo: '', text: '' });
  const [showModal, setShowModal] = useState(false);

  const handleUnsplashSelect = (photoUrl) => {
    setNewEntry(prev => ({ ...prev, photo: photoUrl }));
    setShowModal(false);
  };

  const handleEntryChange = e => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEntrySubmit = e => {
    e.preventDefault();
    API.post(`/entries/${id}`, newEntry)
      .then(res => {
        setNotification({ message: 'Entry created successfully!', type: 'success' });
        setEntries(prev => [...prev, res.data]);
        setNewEntry({ photo: '', text: '' });
      })
      .catch(() => setNotification({ message: 'Failed to create entry.', type: 'error' }));
  };

  useEffect(() => {
    // Fetch journal details
    API.get(`/journals/${id}`)
      .then(res => setJournal(res.data))
      .catch(err => setError(err.response?.data?.message || 'An error occurred'));

    // Fetch entries for the journal
    API.get(`/entries/${id}`)
      .then(res => setEntries(res.data))
      .catch(() => setNotification({ message: 'Failed to fetch journal entries.', type: 'error' }));
  }, [id]);

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!journal) {
    return <div style={styles.loading}>Loading journal...</div>;
  }

  return (
    <div style={styles.container}>
        <BackButton/>
      <h1 style={styles.title}>{journal.title}</h1>
      <p style={styles.description}>{journal.description}</p>
      {journal.cover_photo && <img src={journal.cover_photo} alt="Cover" style={styles.image} />}

      <h2 style={styles.subheading}>Entries</h2>
      <div style={styles.entries}>
        {entries.map(entry => (
          <div key={entry.id} style={styles.entryCard}>
            {entry.photo && <img src={entry.photo} alt="Entry" style={styles.entryImage} />}
            <p>{entry.text}</p>
          </div>
        ))}
      </div>
      <h2 style={styles.subheading}>Add a New Entry</h2>
      <form onSubmit={handleEntrySubmit} style={styles.form}>
        <input
          type="text"
          name="photo"
          placeholder="Photo URL or select from Unsplash"
          value={newEntry.photo}
          onChange={handleEntryChange}
          style={styles.input}
        />
        <button type="button" onClick={() => setShowModal(true)} style={styles.button}>
          Search Unsplash
        </button>
        <textarea
          name="text"
          placeholder="Entry Text"
          value={newEntry.text}
          onChange={handleEntryChange}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Add Entry</button>
      </form>
      {showModal && (
        <div style={styles.modal}>
          <UnsplashSearch onSelect={handleUnsplashSelect} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem', background: '#FFF8E7' },
  title: { fontSize: '2rem', color: '#8E8D8A' },
  description: { fontSize: '1.2rem', color: '#8E8D8A', margin: '1rem 0' },
  image: { width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' },
  subheading: { fontSize: '1.5rem', color: '#8E8D8A', margin: '1rem 0' },
  entries: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' },
  entryCard: { background: '#FFCBA4', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
  entryImage: { width: '100%', borderRadius: '8px', marginBottom: '0.5rem' },
  loading: { padding: '2rem', fontSize: '1.5rem', color: '#8E8D8A' },
  error: { padding: '2rem', fontSize: '1.5rem', color: 'red' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' },
    input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' },
    textarea: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC', minHeight: '100px' },
    button: { padding: '0.75rem', background: '#FF6F61', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    modal: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
};

export default JournalDetail;
