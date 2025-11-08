import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Shield, Users, Search } from 'lucide-react';
import MarketplaceCards from '../components/MarketplaceCards';
import HomeListingCard from '../components/features/HomeListingCard';
import { mockListings } from '../data/mockData';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const featuredListings = mockListings.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const stats = [
    { icon: <Users className="text-orange-600" size={24} />, value: '50,000+', label: 'Utilisateurs actifs' },
    { icon: <TrendingUp className="text-orange-600" size={24} />, value: '15,000+', label: 'Annonces en ligne' },
    { icon: <Shield className="text-orange-600" size={24} />, value: '98%', label: 'Transactions sécurisées' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white h-screen lg:min-h-[73vh] lg:h-auto flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: 'url(/hero-background.webp)',
          }}
        />

        {/* Orange Overlay with Blend Mode */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#E65100',
            opacity: 0.95,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Additional subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-snug sm:leading-tight">
            Trouvez la moto d'occasion
            <br />
            <span className="text-orange-200">qui vous correspond</span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
            <form onSubmit={handleSearch} className="relative">
              <label htmlFor="hero-search" className="sr-only">Recherche</label>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 lg:ps-6 pointer-events-none">
                <Search size={16} className="text-gray-500 lg:w-6 lg:h-6" />
              </div>
              <input
                type="search"
                id="hero-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Recherche..."
                className="block w-full p-4 ps-10 lg:pl-16 lg:pr-40 lg:py-4 text-sm lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl bg-gray-50 lg:bg-white text-gray-900 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 lg:focus:ring-4 lg:focus:ring-orange-300 focus:outline-none shadow-lg"
              />
              <button
                type="submit"
                className="absolute end-2.5 bottom-2.5 lg:right-2 lg:top-1/2 lg:transform lg:-translate-y-1/2 px-4 py-2 lg:p-3 text-sm lg:text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-colors touch-manipulation"
              >
                <span className="lg:hidden">Rechercher</span>
                <Search size={22} className="hidden lg:block" />
              </button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              to="/search"
              className="bg-white text-orange-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center touch-manipulation shadow-md"
            >
              Explorer les annonces
            </Link>
            <Link
              to="/deposit"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors text-center touch-manipulation"
            >
              Vendre ma moto
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <MarketplaceCards />

      {/* Featured Listings */}
      <section aria-labelledby="featured-heading" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 id="featured-heading" className="text-3xl font-bold text-gray-900">
              Annonces à la une
            </h2>
            <Link
              to="/search"
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Voir toutes les annonces →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map(listing => (
              <HomeListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section aria-labelledby="stats-heading" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="stats-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Une communauté de confiance
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez des milliers d'utilisateurs qui nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-labelledby="cta-heading" className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-3xl font-bold mb-4">
            Prêt à vendre votre moto ?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Déposez votre annonce gratuitement et touchez des milliers d'acheteurs potentiels
          </p>
          <Link
            to="/deposit"
            className="inline-flex items-center bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Déposer une annonce gratuite
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;