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
import { FocusProvider } from './contexts/FocusContext';
import { SkipLinks } from './components/ui/SkipLink';
import { useRouteAnnouncement } from './hooks/useRouteAnnouncement';

const AppRoutes: React.FC = () => {
  useRouteAnnouncement();

  return (
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
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <FocusProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <SkipLinks />
          <Header />
          <main id="main-content" role="main" className="flex-1" tabIndex={-1}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </FocusProvider>
    </Router>
  );
}

export default App;