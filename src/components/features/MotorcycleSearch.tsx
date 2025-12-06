import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike, Gauge, MapPin, Search, ChevronDown, X } from 'lucide-react';

const brands = [
  'Toutes les marques',
  'Yamaha',
  'Honda',
  'CFMOTO',
  'Kawasaki',
  'Suzuki',
  'Ducati',
  'BMW',
  'KTM',
  'Harley-Davidson',
  'Triumph'
];

const modelSuggestions = [
  'MT-07',
  'MT-09',
  'CBR1000RR',
  'Ninja 400',
  'GSX-R1000',
  'Panigale V4',
  'R1250GS'
];

const cities = [
  'Toutes les villes',
  'Tunis',
  'Sfax',
  'Sousse',
  'Kairouan',
  'Bizerte',
  'Gabès',
  'Ariana',
  'Gafsa',
  'Monastir',
  'Ben Arous',
  'Kasserine',
  'Médenine',
  'Nabeul',
  'Tataouine',
  'Beja',
  'Jendouba',
  'Mahdia',
  'Siliana',
  'Manouba',
  'Kébili',
  'Tozeur',
  'Zaghouan',
  'Sidi Bouzid',
  'La Marsa',
  'Hammamet'
];

const MotorcycleSearch: React.FC = () => {
  const [marque, setMarque] = useState('Toutes les marques');
  const [modele, setModele] = useState('');
  const [ville, setVille] = useState('Toutes les villes');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(modelSuggestions);
  const [isMobile, setIsMobile] = useState(false);

  const modeleInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const marqueRef = useRef<HTMLSelectElement>(null);
  const villeRef = useRef<HTMLSelectElement>(null);

  const navigate = useNavigate();

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
        !modeleInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (modele) {
      const filtered = modelSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(modele.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(modelSuggestions);
    }
  }, [modele]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (marque !== 'Toutes les marques') params.append('marque', marque);
    if (modele.trim()) params.append('modele', modele);
    if (ville !== 'Toutes les villes') params.append('ville', ville);

    navigate(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setMarque('Toutes les marques');
    setModele('');
    setVille('Toutes les villes');
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextRef: React.RefObject<HTMLElement>) => {
    if (e.key === 'Enter' && nextRef.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  const hasValues = marque !== 'Toutes les marques' || modele.trim() !== '' || ville !== 'Toutes les villes';

  return (
    <div className="w-full" role="search" aria-label="Recherche de motos">
      <form onSubmit={handleSearch} className="w-full">
        <div className={`${isMobile ? 'flex flex-col gap-3' : 'flex items-end gap-4'}`}>
          {/* MARQUE Field */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
            <label
              htmlFor="marque-select"
              className="block text-sm font-semibold text-white mb-2"
            >
              Marque
            </label>
            <div className="relative">
              <Bike
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                size={20}
              />
              <select
                ref={marqueRef}
                id="marque-select"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, modeleInputRef)}
                className="w-full h-14 pl-12 pr-12 rounded-xl border-2 border-gray-300 bg-white text-gray-900 appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
                aria-label="Sélectionner une marque de moto"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* MODÈLE Field */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'} relative`}>
            <label
              htmlFor="modele-input"
              className="block text-sm font-semibold text-white mb-2"
            >
              Modèle
            </label>
            <div className="relative">
              <Gauge
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                size={20}
              />
              <input
                ref={modeleInputRef}
                id="modele-input"
                type="text"
                value={modele}
                onChange={(e) => setModele(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => handleKeyDown(e, villeRef)}
                placeholder="Ex: MT-07, CBR1000RR"
                className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                aria-label="Entrer un modèle de moto"
                aria-autocomplete="list"
                aria-controls="model-suggestions"
                aria-expanded={showSuggestions && filteredSuggestions.length > 0}
              />

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  id="model-suggestions"
                  role="listbox"
                  className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      role="option"
                      aria-selected={modele === suggestion}
                      onClick={() => {
                        setModele(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors text-gray-900 border-b border-gray-100 last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* VILLE Field */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
            <label
              htmlFor="ville-select"
              className="block text-sm font-semibold text-white mb-2"
            >
              Ville
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                size={20}
              />
              <select
                ref={villeRef}
                id="ville-select"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-xl border-2 border-gray-300 bg-white text-gray-900 appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
                aria-label="Sélectionner une ville"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* Search Button - Desktop */}
          {!isMobile && (
            <button
              type="submit"
              className="h-14 px-8 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              aria-label="Rechercher des motos"
            >
              <Search size={20} />
              Rechercher
            </button>
          )}
        </div>

        {/* Mobile Buttons */}
        {isMobile && (
          <div className={`flex gap-3 mt-3 ${hasValues ? '' : 'justify-end'}`}>
            {hasValues && (
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 h-14 px-6 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300/30 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                aria-label="Effacer les champs de recherche"
              >
                <X size={20} />
                Effacer
              </button>
            )}
            <button
              type="submit"
              className={`${hasValues ? 'flex-1' : 'w-full'} h-14 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
              aria-label="Rechercher des motos"
            >
              <Search size={20} />
              Rechercher
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MotorcycleSearch;
