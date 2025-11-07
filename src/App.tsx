import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ListingDetail from './pages/ListingDetail';
import DepositListing from './pages/DepositListing';
import Dashboard from './pages/Dashboard';
import { Actualites } from './pages/Actualites';
import Garages from './pages/Garages';
import GarageDetail from './pages/GarageDetail';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" role="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/deposit" element={<DepositListing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/garages" element={<Garages />} />
            <Route path="/garage/:id" element={<GarageDetail />} />
            <Route path="/favorites" element={<div className="p-8 text-center">Page Favoris - À développer</div>} />
            <Route path="/messages" element={<div className="p-8 text-center">Page Messages - À développer</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;