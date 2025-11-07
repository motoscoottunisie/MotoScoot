import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ListingDetail from './pages/ListingDetail';
import DepositListing from './pages/DepositListing';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/deposit" element={<DepositListing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<div className="p-8 text-center">Page Favoris - À développer</div>} />
          <Route path="/messages" element={<div className="p-8 text-center">Page Messages - À développer</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;