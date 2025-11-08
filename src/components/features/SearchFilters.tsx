import React, { useState, useEffect } from 'react';
import { SearchFilters } from '../../types';
import RangeSlider from '../ui/RangeSlider';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const BRANDS = ['Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'BMW', 'Ducati', 'Triumph', 'KTM', 'Harley-Davidson'];
const COLORS = ['Noir', 'Blanc', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Gris'];
const TYPES = ['Sportive', 'Trail', 'Custom', 'Roadster', 'Routière'];

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);
  const [models, setModels] = useState<string[]>([]);

  const MODELS_BY_BRAND: Record<string, string[]> = {
    'Honda': ['CL500', 'CB650R', 'Africa Twin', 'CBR600RR'],
    'Yamaha': ['MT-07', 'YZF-R1', 'Tracer 9', 'XSR700'],
    'Kawasaki': ['Ninja 650', 'Z900', 'Versys 650', 'ZX-10R'],
    'Suzuki': ['GSX-R750', 'V-Strom 650', 'GSX-S750', 'Hayabusa'],
    'BMW': ['R1250 GS', 'K1600 GT', 'S1000RR', 'F900R'],
    'Ducati': ['Scrambler Icon', 'Monster', 'Panigale V4', 'Multistrada'],
    'Triumph': ['Bonneville T120', 'Street Triple', 'Tiger 900', 'Speed Twin'],
    'KTM': ['790 Adventure', '390 Duke', '890 Duke R', '1290 Super Duke'],
    'Harley-Davidson': ['Street 750', 'Sportster', 'Road King', 'Fat Boy']
  };

  useEffect(() => {
    if (localFilters.brand && MODELS_BY_BRAND[localFilters.brand]) {
      setModels(MODELS_BY_BRAND[localFilters.brand]);
    } else {
      setModels([]);
      if (localFilters.model) {
        setLocalFilters(prev => ({ ...prev, model: undefined }));
      }
    }
  }, [localFilters.brand]);

  const handleChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = {
      ...localFilters,
      [key]: value === '' ? undefined : value
    };
    setLocalFilters(newFilters);
  };

  const handleColorToggle = (color: string) => {
    const currentColors = localFilters.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    handleChange('colors', newColors.length > 0 ? newColors : undefined);
  };

  const handleTypeToggle = (type: string) => {
    const currentTypes = localFilters.types || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    handleChange('types', newTypes.length > 0 ? newTypes : undefined);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const resetFilters = () => {
    const emptyFilters: SearchFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filtres de recherche</h2>

      <div className="space-y-6">
        {/* Marque */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Marque
          </label>
          <select
            value={localFilters.brand || ''}
            onChange={(e) => handleChange('brand', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
          >
            <option value="">Toutes les marques</option>
            {BRANDS.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Modèle */}
        {localFilters.brand && models.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Modèle
            </label>
            <select
              value={localFilters.model || ''}
              onChange={(e) => handleChange('model', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              <option value="">Tous les modèles</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
        )}

        {/* Année */}
        <RangeSlider
          min={2000}
          max={2024}
          start={[localFilters.yearMin || 2000, localFilters.yearMax || 2024]}
          onChange={(values) => {
            handleChange('yearMin', values[0]);
            handleChange('yearMax', values[1]);
          }}
          label="Année"
        />

        {/* Kilométrage */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Kilométrage max: {(localFilters.mileageMax || 100000).toLocaleString()} km
          </label>
          <input
            type="range"
            min="0"
            max="100000"
            step="5000"
            value={localFilters.mileageMax || 100000}
            onChange={(e) => handleChange('mileageMax', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
        </div>

        {/* Cylindrée */}
        <RangeSlider
          min={125}
          max={1650}
          step={50}
          start={[localFilters.engineSizeMin || 125, localFilters.engineSizeMax || 1650]}
          onChange={(values) => {
            handleChange('engineSizeMin', values[0]);
            handleChange('engineSizeMax', values[1]);
          }}
          formatter={(value) => `${Math.round(value)}cc`}
          label="Cylindrée"
        />

        {/* Prix */}
        <RangeSlider
          min={0}
          max={25000}
          step={500}
          start={[localFilters.priceMin || 0, localFilters.priceMax || 25000]}
          onChange={(values) => {
            handleChange('priceMin', values[0]);
            handleChange('priceMax', values[1]);
          }}
          formatter={(value) => `${Math.round(value).toLocaleString()}DT`}
          label="Prix"
        />

        {/* Couleurs */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Couleurs
          </label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <button
                key={color}
                onClick={() => handleColorToggle(color)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  (localFilters.colors || []).includes(color)
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <button
          onClick={applyFilters}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
        >
          Rechercher
        </button>
        <button
          onClick={resetFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default SearchFiltersComponent;
