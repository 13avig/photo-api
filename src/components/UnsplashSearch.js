import React, { useState } from 'react';
import API from '../api/api';

const UnsplashSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    API.get('/unsplash/search', { params: { query } })
      .then(res => {
        setImages(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Unsplash..."
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>
        {loading ? 'Loading...' : 'Search'}
      </button>
      <div style={styles.grid}>
        {images.map(img => (
          <div key={img.id} style={styles.card} onClick={() => onSelect(img.urls.small)}>
            <img src={img.urls.small} alt={img.alt_description} style={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '1rem', background: '#FFF8E7', borderRadius: '8px' },
  input: { padding: '0.5rem', width: '100%', borderRadius: '4px', marginBottom: '1rem' },
  button: { padding: '0.75rem', background: '#FF6F61', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' },
  card: { cursor: 'pointer', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
};

export default UnsplashSearch;