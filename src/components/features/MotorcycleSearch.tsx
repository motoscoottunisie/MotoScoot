import React, { useState, useRef, useEffect } from 'react';
import { Search, Bike, Gauge, MapPin, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MotorcycleSearchBar() {
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [expandedField, setExpandedField] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  const brandRef = useRef<HTMLSelectElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);

  const brands: string[] = [
    'Yamaha', 'Honda', 'CFMOTO', 'Kawasaki', 'Suzuki', 
    'Ducati', 'BMW', 'KTM', 'Harley-Davidson', 'Triumph'
  ];

  const modelSuggestions: string[] = [
    'MT-07', 'MT-09', 'CBR1000RR', 'Ninja 400', 
    'GSX-R1000', 'Panigale V4', 'R1250GS'
  ];

  const cities: string[] = [
    'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana',
    'Gafsa', 'Monastir', 'Ben Arous', 'Kasserine', 'Médenine', 'Nabeul',
    'Tataouine', 'Beja', 'Jendouba', 'Mahdia', 'Siliana', 'Manouba',
    'Kébili', 'Tozeur', 'Zaghouan', 'Sidi Bouzid', 'La Marsa', 'Hammamet'
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearch = () => {
    console.log('Search:', { brand, model, city });
    setExpandedField(null);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setBrand('');
    setModel('');
    setCity('');
    setExpandedField(null);
    setShowSuggestions(false);
  };

  const handleFieldFocus = (field: string) => {
    if (isMobile) {
      setExpandedField(field);
    }
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (value: string, setter: (value: string) => void) => {
    setter(value);
    setShowSuggestions(false);
    setExpandedField(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent, 
    currentField: string, 
    nextRef: React.RefObject<HTMLSelectElement | HTMLInputElement> | null
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else {
        handleSearch();
      }
    }
  };

  const hasValues = brand || model || city;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Title */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Trouvez votre moto idéale
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Recherchez parmi des milliers de motos disponibles
          </p>
        </div>

        {/* Search Container */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden">
          <div role="search" aria-label="Recherche de moto" className="p-4 md:p-6">
            
            {/* Mobile: Stacked Layout */}
            {isMobile ? (
              <div className="space-y-3">
                {/* Brand Field */}
                <div className={`transition-all duration-300 ${expandedField === 'brand' ? 'order-first' : ''}`}>
                  <label 
                    htmlFor="brand-select" 
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    Marque
                  </label>
                  <div className="relative">
                    <Bike className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 z-10" aria-hidden="true" />
                    <select
                      id="brand-select"
                      ref={brandRef}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      onFocus={() => handleFieldFocus('brand')}
                      onBlur={() => setExpandedField(null)}
                      onKeyDown={(e) => handleKeyDown(e, 'brand', modelRef)}
                      className="w-full h-14 pl-14 pr-12 text-base border-2 border-gray-300 rounded-xl bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 active:border-blue-500"
                      aria-describedby="brand-description"
                    >
                      <option value="">Toutes les marques</option>
                      {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  </div>
                  <span id="brand-description" className="sr-only">
                    Sélectionnez une marque de moto
                  </span>
                </div>

                {/* Model Field */}
                <div className={`transition-all duration-300 ${expandedField === 'model' ? 'order-first' : ''}`}>
                  <label 
                    htmlFor="model-input" 
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    Modèle
                  </label>
                  <div className="relative">
                    <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 z-10" aria-hidden="true" />
                    <input
                      type="text"
                      id="model-input"
                      ref={modelRef}
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      onFocus={() => handleFieldFocus('model')}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onKeyDown={(e) => handleKeyDown(e, 'model', cityRef)}
                      placeholder="Ex: MT-07, CBR1000RR"
                      className="w-full h-14 pl-14 pr-4 text-base border-2 border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500"
                      aria-label="Entrez le modèle de moto"
                      aria-describedby="model-description"
                      autoComplete="off"
                    />
                    {showSuggestions && expandedField === 'model' && model.length > 0 && (
                      <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                        {modelSuggestions
                          .filter(s => s.toLowerCase().includes(model.toLowerCase()))
                          .map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion, setModel)}
                              className="w-full px-4 py-3 text-left hover:bg-blue-50 active:bg-blue-100 border-b border-gray-100 last:border-b-0"
                            >
                              {suggestion}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  <span id="model-description" className="sr-only">
                    Entrez le nom du modèle
                  </span>
                </div>

                {/* City Field */}
                <div className={`transition-all duration-300 ${expandedField === 'city' ? 'order-first' : ''}`}>
                  <label 
                    htmlFor="city-input" 
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    Ville
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 z-10" aria-hidden="true" />
                    <select
                      id="city-input"
                      ref={cityRef}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onFocus={() => handleFieldFocus('city')}
                      onBlur={() => setExpandedField(null)}
                      onKeyDown={(e) => handleKeyDown(e, 'city', null)}
                      className="w-full h-14 pl-14 pr-12 text-base border-2 border-gray-300 rounded-xl bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 active:border-blue-500"
                      aria-label="Sélectionnez la ville"
                      aria-describedby="city-description"
                    >
                      <option value="">Toutes les villes</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  </div>
                  <span id="city-description" className="sr-only">
                    Sélectionnez une ville de Tunisie
                  </span>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {hasValues && (
                    <Button
                      variant="outline"
                      onClick={handleClear}
                      className="flex-1 h-14 text-base font-semibold"
                      aria-label="Effacer la recherche"
                    >
                      <X className="w-5 h-5 mr-2" aria-hidden="true" />
                      Effacer
                    </Button>
                  )}
                  <Button
                    onClick={handleSearch}
                    className={`h-14 text-base font-bold ${hasValues ? 'flex-1' : 'w-full'}`}
                    aria-label="Lancer la recherche"
                  >
                    <Search className="w-6 h-6 mr-2" aria-hidden="true" />
                    Rechercher
                  </Button>
                </div>
              </div>
            ) : (
              /* Desktop: Horizontal Layout */
              <div className="flex gap-3">
                {/* Brand */}
                <div className="flex-1">
                  <label htmlFor="brand-select-desktop" className="block text-sm font-semibold text-gray-700 mb-2">
                    Marque
                  </label>
                  <div className="relative">
                    <Bike className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" aria-hidden="true" />
                    <select
                      id="brand-select-desktop"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full h-14 pl-12 pr-10 border-2 border-gray-300 rounded-xl bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 hover:border-gray-400"
                    >
                      <option value="">Toutes les marques</option>
                      {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                {/* Model */}
                <div className="flex-1">
                  <label htmlFor="model-input-desktop" className="block text-sm font-semibold text-gray-700 mb-2">
                    Modèle
                  </label>
                  <div className="relative">
                    <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" aria-hidden="true" />
                    <input
                      type="text"
                      id="model-input-desktop"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Ex: MT-07"
                      className="w-full h-14 pl-12 pr-4 border-2 border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 hover:border-gray-400"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* City */}
                <div className="flex-1">
                  <label htmlFor="city-input-desktop" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ville
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" aria-hidden="true" />
                    <select
                      id="city-input-desktop"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-14 pl-12 pr-10 border-2 border-gray-300 rounded-xl bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 hover:border-gray-400"
                    >
                      <option value="">Toutes les villes</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <Button
                    onClick={handleSearch}
                    className="h-14 px-8 text-base font-semibold whitespace-nowrap"
                    aria-label="Lancer la recherche"
                  >
                    <Search className="w-5 h-5 mr-2" aria-hidden="true" />
                    Rechercher
                  </Button>
                </div>
              </div>
            )}

            {/* Screen reader announcements */}
            <div role="status" aria-live="polite" className="sr-only">
              {brand && `Marque: ${brand}`}
              {model && `, Modèle: ${model}`}
              {city && `, Ville: ${city}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}