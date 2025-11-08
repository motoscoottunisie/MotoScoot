import React, { useState } from 'react';
import { SearchFilters } from '../../types';
import RangeSlider from '../ui/RangeSlider';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const TYPES = ['Gaming', 'Electronics', 'Phone', 'TV/Monitor', 'Laptop', 'Watch'];
const STATES = ['All', 'New', 'Refurbished'];

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
    <div className="bg-white border border-gray-200 p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm text-gray-500">Filter</h2>
        <button
          onClick={resetFilters}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <RangeSlider
          min={50}
          max={3000}
          step={50}
          start={[localFilters.priceMin || 50, localFilters.priceMax || 3000]}
          onChange={(values) => {
            handleChange('priceMin', values[0]);
            handleChange('priceMax', values[1]);
          }}
          label="Price Range"
        />

        <RangeSlider
          min={1}
          max={100}
          step={1}
          start={[localFilters.yearMin || 1, localFilters.yearMax || 100]}
          onChange={(values) => {
            handleChange('yearMin', values[0]);
            handleChange('yearMax', values[1]);
          }}
          label="Sales"
        />

        <div className="space-y-2">
          <span className="text-sm text-gray-600">Category</span>
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map(type => (
              <button
                key={type}
                onClick={() => handleTypeToggle(type)}
                className={`px-3 py-2 text-sm border transition-colors ${
                  (localFilters.types || []).includes(type)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm text-gray-600">State</span>
          <div className="space-y-1">
            {STATES.map(state => (
              <label key={state} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="state"
                  value={state}
                  checked={localFilters.condition === state || (!localFilters.condition && state === 'All')}
                  onChange={(e) => handleChange('condition', e.target.value === 'All' ? undefined : e.target.value)}
                  className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700">{state}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={resetFilters}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm transition-colors"
        >
          Show 32 Results
        </button>
      </div>
    </div>
  );
};

export default SearchFiltersComponent;
