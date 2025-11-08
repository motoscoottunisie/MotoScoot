import React, { useState } from 'react';
import { SearchFilters } from '../../types';
import RangeSlider from '../ui/RangeSlider';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const TYPES = ['Moto', 'Scooter', 'Accessoires'];

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

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

  const resetFilters = () => {
    const emptyFilters: SearchFilters = {};
    setLocalFilters(emptyFilters);
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
        <RangeSlider
          min={0}
          max={2100}
          step={1}
          start={[localFilters.yearMin || 0, localFilters.yearMax || 2100]}
          onChange={(values) => {
            handleChange('yearMin', values[0]);
            handleChange('yearMax', values[1]);
          }}
          label="Année"
        />

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

        <RangeSlider
          min={125}
          max={1650}
          step={25}
          start={[localFilters.engineSizeMin || 125, localFilters.engineSizeMax || 1650]}
          onChange={(values) => {
            handleChange('engineSizeMin', values[0]);
            handleChange('engineSizeMax', values[1]);
          }}
          formatter={(value) => `${Math.round(value)}cc`}
          label="Cylindrée"
        />

        <RangeSlider
          min={0}
          max={500000}
          step={5000}
          start={[localFilters.priceMin || 0, localFilters.priceMax || 500000]}
          onChange={(values) => {
            handleChange('priceMin', values[0]);
            handleChange('priceMax', values[1]);
          }}
          formatter={(value) => `${Math.round(value).toLocaleString()}DT`}
          label="Prix"
        />

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
    </div>
  );
};

export default SearchFiltersComponent;
