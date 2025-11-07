import React from 'react';
import { Search } from 'lucide-react';
import { ArticleCategory } from '../../types/article';

interface NewsFiltersProps {
  selectedCategory: ArticleCategory | 'all';
  onCategoryChange: (category: ArticleCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories: { value: ArticleCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'actualites', label: 'Actualités' },
  { value: 'essais', label: 'Essais' },
  { value: 'annonces', label: 'Annonces' },
  { value: 'conseils', label: 'Conseils' },
];

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
