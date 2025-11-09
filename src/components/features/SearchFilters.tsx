import React, { useState } from 'react';
import { TrendingUp, Shield, Users, Search, ChevronRight } from 'lucide-react';

// Mock data
const mockListings = [
  {
    id: 1,
    title: 'Yamaha MT-07 2020',
    price: 6500,
    year: 2020,
    mileage: 12000,
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Honda CBR 600RR',
    price: 8200,
    year: 2019,
    mileage: 8500,
    location: 'Lyon',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Kawasaki Z900 2021',
    price: 9500,
    year: 2021,
    mileage: 5000,
    location: 'Marseille',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Suzuki GSX-R 750',
    price: 7800,
    year: 2018,
    mileage: 15000,
    location: 'Toulouse',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop'
  }
];

const categories = [
  { name: 'Sportives', count: 2450, icon: '🏍️' },
  { name: 'Roadsters', count: 1850, icon: '🏁' },
  { name: 'Cruisers', count: 980, icon: '🛣️' },
  { name: 'Trail', count: 1540, icon: '⛰️' }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Recherche: ${searchQuery}`);
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=1600&h=900&fit=crop)',
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
          <h1 className="mb-4 sm:mb-6 drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '44px', lineHeight: '1.1' }}>
            <span className="font-extrabold" style={{ fontWeight: 800 }}>Trouvez la moto d'occasion</span>
            <br />
            <span className="text-orange-200 font-medium" style={{ fontWeight: 500 }}>qui vous correspond</span>
          </h1>

          {/* Search Bar with Glassmorphism */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                placeholder="Recherche..."
                className="w-full pl-6 pr-14 py-4 text-white placeholder-white/70 rounded-xl text-lg focus:ring-4 focus:ring-white/30 focus:outline-none shadow-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 text-white rounded-lg transition-all hover:scale-105"
                aria-label="Rechercher"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <Search size={22} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explorer les annonces
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors text-center">
              Vendre ma moto
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Catégories populaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} annonces</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Annonces à la une
            </h2>
            <button className="text-orange-600 hover:text-orange-700 font-medium transition-colors flex items-center gap-1">
              Voir toutes les annonces <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockListings.map(listing => (
              <div key={listing.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{listing.title}</h3>
                  <p className="text-2xl font-bold text-orange-600 mb-3">{listing.price.toLocaleString('fr-FR')} €</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{listing.year}</span>
                    <span>{listing.mileage.toLocaleString('fr-FR')} km</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{listing.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
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
s
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à vendre votre moto ?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Déposez votre annonce gratuitement et touchez des milliers d'acheteurs potentiels
          </p>
          <button className="inline-flex items-center bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Déposer une annonce gratuite
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;