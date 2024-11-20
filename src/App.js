// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [dbData, setDbData] = useState('');
//   const [unsplashData, setUnsplashData] = useState(null);
//   const [category, setCategory] = useState('');
//   const [error, setError] = useState('');

//   const fetchRandomFromDB = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/random');
//       setDbData(response.data);
//     } catch (error) {
//       console.error('Error fetching from database:', error);
//     }
//   };

//   const fetchImageFromUnsplash = async () => {
//     if (!category || category.trim().split(' ').length > 1) {
//       setError('Please enter a single-word category.');
//       return;
//     }

//     try {
//       const response = await axios.get('https://api.unsplash.com/photos/random', {
//         headers: {
//           Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
//         },
//         params: {
//           query: category,
//           orientation: 'landscape',
//         },
//       });
//       setUnsplashData(response.data.urls.full);
//       setCategory('');
//       setError('');
//     } catch (error) {
//       console.error('Error fetching from Unsplash:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-8 space-y-4">
//       <h1 className="text-2xl font-bold">React & Tailwind with MySQL & Unsplash API</h1>
      
//       <div className="flex flex-col items-center space-y-2">
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Enter image category (one word)"
//           className="px-4 py-2 border rounded"
//         />
//         {error && <p className="text-red-500">{error}</p>}
//       </div>
      
//       <div className="space-x-4 mt-4">
//         <button onClick={fetchRandomFromDB} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
//           Get Random Item from DB
//         </button>
//         <button onClick={fetchImageFromUnsplash} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
//           Get Unsplash Image
//         </button>
//       </div>

//       <div className="mt-6">
//         {dbData && (
//           <div className="bg-gray-100 p-4 rounded shadow">
//              <h2 className="text-lg font-semibold">Random Record from the Database:</h2>
//               <p>id: {dbData.id}</p>
//               <p>name: {dbData.name}</p>
//               <p>position: {dbData.position}</p>
//               <p>salary: {dbData.salary}</p>
//           </div>
//         )}

//         {unsplashData && (
//           <div className="mt-4">
//             <h2 className="text-lg font-semibold">Unsplash Image:</h2>
//             <img src={unsplashData} alt={`Category: ${category}`} className="w-full max-w-xs rounded shadow" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateJournal from './pages/CreateJournal';
import JournalDetail from './components/JournalDetail';
import EditJournal from './pages/EditJournal';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/create" element={<CreateJournal />} />
//         <Route path="/journals/:id" element={<JournalDetail />} />
//         <Route path="/edit/:id" element={<EditJournal/>}/>
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const appStyles = {
    backgroundColor: darkMode ? '#2E2E2E' : '#FFF8E7',
    color: darkMode ? '#FFF' : '#000',
    minHeight: '100vh',
  };

  return (
    <div style={appStyles}>
      <button onClick={toggleDarkMode} style={{ margin: '1rem', padding: '0.5rem' }}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateJournal />} />
        <Route path="/journals/:id" element={<JournalDetail />} />
        <Route path="/edit/:id" element={<EditJournal/>}/>
      </Routes>
    </Router>
    </div>
  );
};

export default App;