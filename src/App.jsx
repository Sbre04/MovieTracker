import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import History from './pages/History';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="history" element={<History />} />
            <Route path="search" element={<SearchResults />} />
          </Route>
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;
