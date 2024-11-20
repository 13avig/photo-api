import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

const JournalList = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const fetchedJournals = await Promise.all(
        (await API.get('/journals')).data.map(async (journal) => {
          const entries = (await API.get(`/entries/${journal.id}`)).data;
          return { ...journal, entryCount: entries.length, latestEntry: entries[0] || null };
        })
      );
      setJournals(fetchedJournals);
    };
    fetchJournals();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this journal?')) {
      API.delete(`/journals/${id}`)
        .then(() => setJournals(journals.filter(journal => journal.id !== id)))
        .catch(err => console.error(err));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Journals</h2>
      <div style={styles.grid}>
        {journals.map(journal => (
          <div key={journal.id} style={styles.card}>
            <h3>{journal.title}</h3>
            <p>{journal.description}</p>
            {journal.cover_photo && <img src={journal.cover_photo} alt="Cover" style={styles.image} />}
            <div>
            <p>{journal.entryCount} Entries</p>
            {journal.latestEntry && (
                <div>
                <strong>Latest:</strong>
                <p>{journal.latestEntry.text}</p>
                </div>
            )}
            </div>
            <div style={styles.actions}>
              <Link to={`/journals/${journal.id}`} style={styles.link}>View</Link>
              <Link to={`/edit/${journal.id}`} style={styles.link}>Edit</Link>
              <button onClick={() => handleDelete(journal.id)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', background: '#FFF8E7' },
  heading: { color: '#8E8D8A' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' },
  card: { background: '#FFCBA4', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
  image: { width: '100%', borderRadius: '8px', marginBottom: '0.5rem' },
  actions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
  link: { textDecoration: 'none', color: '#FF6F61' },
  deleteButton: { background: 'red', color: '#FFF', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' },
};

export default JournalList;