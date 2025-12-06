import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bike, Gauge, MapPin, ChevronDown } from 'lucide-react';

const MotorcycleSearch: React.FC = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [city, setCity] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const brandRef = useRef<HTMLSelectElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const brands = [
    'Yamaha', 'Honda', 'CFMOTO', 'Kawasaki', 'Suzuki',
    'Ducati', 'BMW', 'KTM', 'Harley-Davidson', 'Triumph'
  ];

  const modelSuggestions = [
    'MT-07', 'MT-09', 'CBR1000RR', 'Ninja 400',
    'GSX-R1000', 'Panigale V4', 'R1250GS'
  ];

  const cities = [
    'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana',
    'Gafsa', 'Monastir', 'Ben Arous', 'Kasserine', 'Médenine', 'Nabeul',
    'Tataouine', 'Beja', 'Jendouba', 'Mahdia', 'Siliana', 'Manouba',
    'Kébili', 'Tozeur', 'Zaghouan', 'Sidi Bouzid', 'La Marsa', 'Hammamet'
  ];

  const filteredSuggestions = model
    ? modelSuggestions.filter(s => s.toLowerCase().includes(model.toLowerCase()))
    : modelSuggestions;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !modelRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    if (brand) params.append('marque', brand);
    if (model.trim()) params.append('modele', model);
    if (city) params.append('ville', city);

    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextRef: React.RefObject<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef?.current) {
        nextRef.current.focus();
      } else {
        handleSearch();
      }
    }
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSearch} role="search" aria-label="Recherche de moto" className="w-full">
        <div className="space-y-4">
          <div>
            <label htmlFor="brand-select" className="block text-lg font-bold text-white mb-2">
              Marque
            </label>
            <div className="relative">
              <Bike className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" aria-hidden="true" />
              <select
                id="brand-select"
                ref={brandRef}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, modelRef)}
                className="w-full h-16 pl-14 pr-12 text-base border-2 border-gray-300 rounded-2xl bg-white text-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
                aria-label="Sélectionner une marque de moto"
              >
                <option value="">Toutes les marques</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <div>
            <label htmlFor="model-input" className="block text-lg font-bold text-white mb-2">
              Modèle
            </label>
            <div className="relative">
              <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                id="model-input"
                ref={modelRef}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => handleKeyDown(e, cityRef)}
                placeholder="Ex: MT-07, CBR1000RR"
                className="w-full h-16 pl-14 pr-4 text-base border-2 border-gray-300 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
                aria-label="Entrer un modèle de moto"
                autoComplete="off"
              />
              {showSuggestions && filteredSuggestions.length > 0 && model && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto"
                >
                  {filteredSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setModel(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-900 hover:bg-blue-50 active:bg-blue-100 border-b border-gray-100 last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="city-select" className="block text-lg font-bold text-white mb-2">
              Ville
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" aria-hidden="true" />
              <select
                id="city-select"
                ref={cityRef}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-16 pl-14 pr-12 text-base border-2 border-gray-300 rounded-2xl bg-white text-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
                aria-label="Sélectionner une ville"
              >
                <option value="">Toutes les villes</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl transition-colors flex items-center justify-center gap-3 shadow-lg"
            aria-label="Rechercher des motos"
          >
            <Search className="w-6 h-6" aria-hidden="true" />
            Rechercher
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} role="search" aria-label="Recherche de moto" className="w-full">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label htmlFor="brand-select-desktop" className="block text-base font-semibold text-white mb-2">
            Marque
          </label>
          <div className="relative">
            <Bike className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
            <select
              id="brand-select-desktop"
              ref={brandRef}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, modelRef)}
              className="w-full h-14 pl-12 pr-10 text-base border-2 border-gray-200 rounded-2xl bg-white text-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 hover:border-gray-300 transition-colors"
              aria-label="Sélectionner une marque de moto"
            >
              <option value="">Toutes les marques</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="model-input-desktop" className="block text-base font-semibold text-white mb-2">
            Modèle
          </label>
          <div className="relative">
            <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              id="model-input-desktop"
              ref={modelRef}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => handleKeyDown(e, cityRef)}
              placeholder="Ex: MT-07"
              className="w-full h-14 pl-12 pr-4 text-base border-2 border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 hover:border-gray-300 transition-colors"
              aria-label="Entrer un modèle de moto"
              autoComplete="off"
            />
            {showSuggestions && filteredSuggestions.length > 0 && model && (
              <div
                ref={suggestionsRef}
                className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto"
              >
                {filteredSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setModel(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left text-gray-900 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="city-select-desktop" className="block text-base font-semibold text-white mb-2">
            Ville
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
            <select
              id="city-select-desktop"
              ref={cityRef}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-14 pl-12 pr-10 text-base border-2 border-gray-200 rounded-2xl bg-white text-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 hover:border-gray-300 transition-colors"
              aria-label="Sélectionner une ville"
            >
              <option value="">Toutes les villes</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        <button
          type="submit"
          className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-2xl transition-colors flex items-center gap-2 shadow-lg whitespace-nowrap"
          aria-label="Rechercher des motos"
        >
          <Search className="w-5 h-5" aria-hidden="true" />
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default MotorcycleSearch;