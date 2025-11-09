import React, { useState } from 'react';
import { SearchFilters } from '../../types';
import RangeSlider from '../ui/RangeSlider';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  hideActionButtons?: boolean;
}

const TYPES = ['Moto', 'Scooter', 'Accessoires'];
const BRANDS = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW', 'Ducati', 'KTM', 'Harley-Davidson', 'Sym', 'Zontes', 'Forza'];

// Modèles par marque
const MODELS_BY_BRAND: Record<string, string[]> = {
  Honda: ['CBR', 'CB', 'CRF', 'Africa Twin', 'PCX', 'Forza', 'SH', 'NC', 'VFR', 'Shadow', 'Gold Wing'],
  Yamaha: ['YZF-R', 'MT', 'FZ', 'Tracer', 'Ténéré', 'NMAX', 'XMAX', 'TMAX', 'R1', 'R6', 'V-Star'],
  Suzuki: ['GSX-R', 'GSX-S', 'V-Strom', 'Hayabusa', 'Burgman', 'Address', 'SV', 'Boulevard'],
  Kawasaki: ['Ninja', 'Z', 'Versys', 'Vulcan', 'KLX', 'KX', 'W800'],
  BMW: ['S1000RR', 'R1250', 'F850', 'G310', 'C650', 'K1600', 'R18'],
  Ducati: ['Panigale', 'Monster', 'Multistrada', 'Scrambler', 'Diavel', 'SuperSport', 'Streetfighter'],
  KTM: ['Duke', 'RC', 'Adventure', 'SMC', 'Enduro', 'SX', 'EXC'],
  'Harley-Davidson': ['Sportster', 'Softail', 'Touring', 'Street', 'Pan America', 'LiveWire'],
  Sym: ['Jet', 'Symphony', 'Fiddle', 'Cruisym', 'Joymax', 'Maxsym'],
  Zontes: ['310R', '310T', '310X', '350D', '125G'],
  Forza: ['125', '300', '350', '750']
};

const LOCATIONS = [
  'Ariana',
  'Béja',
  'Ben Arous',
  'Bizerte',
  'Gabès',
  'Gafsa',
  'Jendouba',
  'Kairouan',
  'Kasserine',
  'Kébili',
  'Le Kef',
  'Mahdia',
  'La Manouba',
  'Médenine',
  'Monastir',
  'Nabeul',
  'Sfax',
  'Sidi Bouzid',
  'Siliana',
  'Sousse',
  'Tataouine',
  'Tozeur',
  'Tunis',
  'Zaghouan'
];

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  hideActionButtons = false,
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [modelInput, setModelInput] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const handleChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = {
      ...localFilters,
      [key]: value === '' ? undefined : value
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTypeToggle = (type: string) => {
    const currentTypes = localFilters.types || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    const newFilters = {
      ...localFilters,
      types: newTypes.length > 0 ? newTypes : undefined
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setAvailableModels(brand ? MODELS_BY_BRAND[brand] || [] : []);
    setModelInput(''); // Reset model when brand changes
    handleChange('brand', brand || undefined);
    handleChange('model', undefined); // Clear model filter
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    setModelInput(model);
    handleChange('model', model || undefined);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const location = e.target.value;
    setSelectedLocation(location);
    handleChange('location', location || undefined);
  };

  const resetFilters = () => {
    const emptyFilters: SearchFilters = {};
    setLocalFilters(emptyFilters);
    setSelectedBrand('');
    setModelInput('');
    setSelectedLocation('');
    setAvailableModels([]);
    onFiltersChange(emptyFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base text-gray-600 font-medium">Filtrer</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Filtre Marque */}
        <div className="space-y-3">
          <label className="text-sm text-gray-600 font-medium block">Marque</label>
          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Toutes les marques</option>
            {BRANDS.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Filtre Modèle */}
        <div className="space-y-3">
          <label className="text-sm text-gray-600 font-medium block">Modèle</label>
          <select
            value={modelInput}
            onChange={handleModelChange}
            disabled={!selectedBrand}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {selectedBrand ? 'Tous les modèles' : 'Sélectionnez d\'abord une marque'}
            </option>
            {availableModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* Filtre Localisation */}
        <div className="space-y-3">
          <label className="text-sm text-gray-600 font-medium block">Localisation</label>
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Toutes les régions</option>
            {LOCATIONS.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Range Slider - Année */}
        <RangeSlider
          min={2000}
          max={2026}
          step={1}
          start={[localFilters.yearMin || 2000, localFilters.yearMax || 2026]}
          onChange={(values) => {
            handleChange('yearMin', values[0]);
            handleChange('yearMax', values[1]);
          }}
          label="Année"
        />

        {/* Range Slider - Kilométrage */}
        <RangeSlider
          min={0}
          max={300000}
          step={5000}
          start={[localFilters.mileageMin || 0, localFilters.mileageMax || 300000]}
          onChange={(values) => {
            handleChange('mileageMin', values[0]);
            handleChange('mileageMax', values[1]);
          }}
          formatter={(value) => Math.round(value).toLocaleString()}
          label="Kilométrage"
        />

        {/* Range Slider - Cylindrée */}
        <RangeSlider
          min={50}
          max={1650}
          step={25}
          start={[localFilters.engineSizeMin || 50, localFilters.engineSizeMax || 1650]}
          onChange={(values) => {
            handleChange('engineSizeMin', values[0]);
            handleChange('engineSizeMax', values[1]);
          }}
          formatter={(value) => `${Math.round(value)}cc`}
          label="Cylindrée"
        />

        {/* Range Slider - Prix */}
        <RangeSlider
          min={0}
          max={200000}
          step={5000}
          start={[localFilters.priceMin || 0, localFilters.priceMax || 200000]}
          onChange={(values) => {
            handleChange('priceMin', values[0]);
            handleChange('priceMax', values[1]);
          }}
          formatter={(value) => `${Math.round(value).toLocaleString()}DT`}
          label="Prix"
        />

        {/* Filtre Type */}
        <div className="space-y-3">
          <span className="text-sm text-gray-600 font-medium">Type</span>
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map(type => (
              <button
                key={type}
                onClick={() => handleTypeToggle(type)}
                className={`px-4 py-2.5 text-sm font-medium rounded-full transition-all ${
                  (localFilters.types || []).includes(type)
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      {!hideActionButtons && (
        <div className="pt-4 space-y-3">
          <button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-full transition-colors"
          >
            Afficher les résultats
          </button>
          <button
            onClick={resetFilters}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-full transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFiltersComponent;