import React, { useState } from 'react';
import { Heart, Share2, MapPin, Calendar, Eye, User, Phone, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const ListingDetail = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images de publicité aléatoires
  const adsImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    'https://images.unsplash.com/photo-1591768575494-f074d5b3f0c6?w=800',
    'https://images.unsplash.com/photo-1609209062804-850015b0bfa4?w=800'
  ];
  const randomAdImage = adsImages[Math.floor(Math.random() * adsImages.length)];

  const listing = {
    id: '1',
    title: 'Yamaha MT-09 en excellent état',
    price: 8500,
    brand: 'Yamaha',
    model: 'MT-09',
    year: 2021,
    mileage: 15000,
    condition: 'Excellent',
    category: 'sport',
    location: 'Paris, Île-de-France',
    sellerType: 'Particulier',
    description: 'Superbe Yamaha MT-09 de 2021 en excellent état. Toujours entretenue chez le concessionnaire officiel avec carnet d\'entretien à jour. Pneus neufs, révision complète effectuée il y a 500 km. Moto non fumeur, jamais tombée, garage la nuit. Équipée de nombreuses options : échappement Akrapovic, protection de réservoir, rétroviseurs CRG, et bien plus encore.',
    createdAt: '2024-01-15',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
      randomAdImage,
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800'
    ],
    seller: {
      name: 'Jean Dupont',
      memberSince: '2020',
      rating: 4.8,
      reviewCount: 12
    }
  };

  const similarListings = [
    {
      id: '2',
      title: 'Kawasaki Z900 2020',
      price: 7800,
      brand: 'Kawasaki',
      location: 'Lyon',
      images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400'],
      isFavorite: false
    },
    {
      id: '3',
      title: 'Honda CB650R 2022',
      price: 9200,
      brand: 'Honda',
      location: 'Marseille',
      images: ['https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400'],
      isFavorite: true
    },
    {
      id: '4',
      title: 'Suzuki GSX-S750 2021',
      price: 7500,
      brand: 'Suzuki',
      location: 'Toulouse',
      images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400'],
      isFavorite: false
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative text-white min-h-[40vh] lg:min-h-[45vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: 'url(/hero-background.webp)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#E65100',
            opacity: 0.95,
            mixBlendMode: 'multiply',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
            <span className="hover:text-white cursor-pointer">Recherche</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer">{listing.brand}</span>
            <span>/</span>
            <span className="text-white">{listing.model}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold drop-shadow-lg">
            {listing.title}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-video bg-gray-900">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {currentImageIndex === 2 && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Publicité
                  </div>
                )}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {listing.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-video rounded overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? 'border-orange-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {listing.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(listing.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      342 vues
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className={`text-gray-700 leading-relaxed ${!showFullDescription ? 'line-clamp-2' : ''}`}>
                      {listing.description}
                    </p>
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="mt-3 text-orange-600 hover:text-orange-700 font-medium"
                    >
                      {showFullDescription ? 'Voir moins' : 'Voir plus'}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full border transition-all duration-200 ${
                      isFavorite
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-3xl font-bold text-orange-600">
                  {listing.price.toLocaleString('fr-FR')} €
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {listing.condition}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {listing.sellerType}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques techniques</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Marque</p>
                    <p className="font-medium text-gray-900">{listing.brand}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Modèle</p>
                    <p className="font-medium text-gray-900">{listing.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Année</p>
                    <p className="font-medium text-gray-900">{listing.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Kilométrage</p>
                    <p className="font-medium text-gray-900">{listing.mileage.toLocaleString('fr-FR')} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">État</p>
                    <p className="font-medium text-gray-900">{listing.condition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Localisation</p>
                    <p className="font-medium text-gray-900 text-sm">{listing.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Options et équipements</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">ABS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Contrôle traction</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-sm text-gray-700">Éclairage LED</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-700">Tableau TFT</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                  <span className="text-sm text-gray-700">Bluetooth</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-gray-700">Quickshifter</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-6 space-y-6">
            <article className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                  {listing.seller.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 truncate mb-2">
                    {listing.seller.name}
                  </h3>

                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      <User className="w-3.5 h-3.5" />
                      <span>Particulier</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-sm ${
                            star <= Math.floor(listing.seller.rating)
                              ? 'text-yellow-400'
                              : star - 0.5 <= listing.seller.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {listing.seller.rating.toFixed(1)}/5
                    </span>
                    <span className="text-sm text-gray-500">
                      ({listing.seller.reviewCount} avis)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Informations</h4>
                <dl className="space-y-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield size={16} className="text-green-600 flex-shrink-0" />
                      <span>Profil vérifié</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-600">Vérifié</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-sm text-gray-600">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-400 flex-shrink-0"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span>Ventes réalisées</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">15</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-sm text-gray-600">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-400 flex-shrink-0"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Temps de réponse</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">Moins de 2h</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                      <span>Membre depuis</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{listing.seller.memberSince}</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3">
                <button
                  className="w-full text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-200 border-2"
                  style={{
                    backgroundColor: '#E6580B',
                    borderColor: '#E6580B'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FBF1EC';
                    e.currentTarget.style.color = '#E6580B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#E6580B';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Envoyer un message</span>
                </button>

                <a
                  href="tel:0612345678"
                  className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700 text-white py-3.5 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-200"
                >
                  <Phone size={20} />
                  <span>06 12 34 56 78</span>
                </a>

                <button
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 py-3.5 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  <Eye size={20} />
                  <span>Voir ses annonces</span>
                </button>
              </div>
            </article>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=300&fit=crop" 
                  alt="Assurance moto" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <button className="w-full bg-white/90 text-blue-600 px-3 py-1.5 rounded text-xs font-medium hover:bg-white transition-colors shadow">
                    Devis gratuit
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Annonces similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarListings.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative aspect-video">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                    <Heart className={`w-5 h-5 ${item.isFavorite ? 'fill-red-600 text-red-600' : 'text-gray-600'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-2xl font-bold text-orange-600 mb-2">
                    {item.price.toLocaleString('fr-FR')} €
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-2xl font-bold text-orange-600">
            {listing.price.toLocaleString('fr-FR')} €
          </div>
          <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
            Contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;