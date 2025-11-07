import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Grid2x2 as Grid, List, SlidersHorizontal, MapPin, Calendar, Gauge, Fuel, Cog, X, Search } from 'lucide-react';
import ListingCard from '../components/features/ListingCard';
import SearchFiltersComponent from '../components/features/SearchFilters';
import { mockListings } from '../data/mockData';
import { SearchFilters } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { getCategoryLabel } from '../constants/categories';

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const { favorites, toggleFavorite } = useFavorites();

  // Initialize filters from URL params
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || undefined,
    priceMin: searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : undefined,
    priceMax: searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : undefined,
    yearMin: searchParams.get('yearMin') ? parseInt(searchParams.get('yearMin')!) : undefined,
    yearMax: searchParams.get('yearMax') ? parseInt(searchParams.get('yearMax')!) : undefined,
    mileageMax: searchParams.get('mileageMax') ? parseInt(searchParams.get('mileageMax')!) : undefined,
    location: searchParams.get('location') || undefined,
    brand: searchParams.get('brand') || undefined,
    condition: searchParams.get('condition') || undefined,
    engineSize: searchParams.get('engineSize') || undefined,
    fuelType: searchParams.get('fuelType') || undefined,
    transmission: searchParams.get('transmission') || undefined,
    color: searchParams.get('color') || undefined,
  });

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const query = searchParams.get('q') || '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set('q', searchQuery);
      setSearchParams(params);
    }
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (query) params.set('q', query);
    if (filters.category) params.set('category', filters.category);
    if (filters.priceMin) params.set('priceMin', filters.priceMin.toString());
    if (filters.priceMax) params.set('priceMax', filters.priceMax.toString());
    if (filters.yearMin) params.set('yearMin', filters.yearMin.toString());
    if (filters.yearMax) params.set('yearMax', filters.yearMax.toString());
    if (filters.mileageMax) params.set('mileageMax', filters.mileageMax.toString());
    if (filters.location) params.set('location', filters.location);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.condition) params.set('condition', filters.condition);
    if (filters.engineSize) params.set('engineSize', filters.engineSize);
    if (filters.fuelType) params.set('fuelType', filters.fuelType);
    if (filters.transmission) params.set('transmission', filters.transmission);
    if (filters.color) params.set('color', filters.color);

    setSearchParams(params, { replace: true });
  }, [filters, query, setSearchParams]);

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let results = mockListings.map(listing => ({
      ...listing,
      isFavorite: favorites.has(listing.id)
    }));

    // Apply search query - enhanced for motors/scooters
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.brand.toLowerCase().includes(searchTerm) ||
        listing.model.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm) ||
        listing.category.toLowerCase().includes(searchTerm) ||
        (listing.engineSize && listing.engineSize.toLowerCase().includes(searchTerm)) ||
        (listing.fuelType && listing.fuelType.toLowerCase().includes(searchTerm)) ||
        (listing.transmission && listing.transmission.toLowerCase().includes(searchTerm))
      );
    }

    // Apply filters
    if (filters.category) {
      results = results.filter(listing => listing.category === filters.category);
    }
    if (filters.priceMin !== undefined) {
      results = results.filter(listing => listing.price >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      results = results.filter(listing => listing.price <= filters.priceMax!);
    }
    if (filters.yearMin !== undefined) {
      results = results.filter(listing => listing.year >= filters.yearMin!);
    }
    if (filters.yearMax !== undefined) {
      results = results.filter(listing => listing.year <= filters.yearMax!);
    }
    if (filters.mileageMax !== undefined) {
      results = results.filter(listing => listing.mileage <= filters.mileageMax!);
    }
    if (filters.location) {
      results = results.filter(listing =>
        listing.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    if (filters.brand) {
      results = results.filter(listing => listing.brand === filters.brand);
    }
    if (filters.condition) {
      results = results.filter(listing => listing.condition === filters.condition);
    }
    if (filters.engineSize) {
      results = results.filter(listing => listing.engineSize === filters.engineSize);
    }
    if (filters.fuelType) {
      results = results.filter(listing => listing.fuelType === filters.fuelType);
    }
    if (filters.transmission) {
      results = results.filter(listing => listing.transmission === filters.transmission);
    }
    if (filters.color) {
      results = results.filter(listing => listing.color === filters.color);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        results.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        results.sort((a, b) => a.year - b.year);
        break;
      case 'mileage-asc':
        results.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage-desc':
        results.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'popular':
        // Sort by view count or favorites (mock implementation)
        results.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
        break;
      default:
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return results;
  }, [query, filters, sortBy, favorites]);

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    if (filters.yearMin !== undefined || filters.yearMax !== undefined) count++;
    if (filters.mileageMax !== undefined) count++;
    if (filters.location) count++;
    if (filters.brand) count++;
    if (filters.condition) count++;
    if (filters.engineSize) count++;
    if (filters.fuelType) count++;
    if (filters.transmission) count++;
    if (filters.color) count++;
    return count;
  }, [filters]);

  // Active filter chips
  const getActiveFilterChips = () => {
    const chips = [];
    
    if (filters.brand) {
      chips.push({ key: 'brand', label: `Marque: ${filters.brand}`, value: 'brand' });
    }
    if (filters.category) {
      chips.push({ key: 'category', label: `Catégorie: ${getCategoryLabel(filters.category)}`, value: 'category' });
    }
    if (filters.condition) {
      chips.push({ key: 'condition', label: `État: ${filters.condition}`, value: 'condition' });
    }
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      const label = filters.priceMin && filters.priceMax 
        ? `Prix: ${filters.priceMin}DT - ${filters.priceMax}DT`
        : filters.priceMin 
        ? `Prix min: ${filters.priceMin}DT`
        : `Prix max: ${filters.priceMax}DT`;
      chips.push({ key: 'price', label, value: 'price' });
    }
    if (filters.yearMin !== undefined || filters.yearMax !== undefined) {
      const label = filters.yearMin && filters.yearMax 
        ? `Année: ${filters.yearMin} - ${filters.yearMax}`
        : filters.yearMin 
        ? `Année min: ${filters.yearMin}`
        : `Année max: ${filters.yearMax}`;
      chips.push({ key: 'year', label, value: 'year' });
    }
    if (filters.mileageMax !== undefined) {
      chips.push({ key: 'mileage', label: `Kilométrage max: ${filters.mileageMax.toLocaleString()}km`, value: 'mileageMax' });
    }
    if (filters.engineSize) {
      chips.push({ key: 'engineSize', label: `Cylindrée: ${filters.engineSize}`, value: 'engineSize' });
    }
    if (filters.fuelType) {
      chips.push({ key: 'fuelType', label: `Carburant: ${filters.fuelType}`, value: 'fuelType' });
    }
    if (filters.transmission) {
      chips.push({ key: 'transmission', label: `Transmission: ${filters.transmission}`, value: 'transmission' });
    }
    if (filters.location) {
      chips.push({ key: 'location', label: `Localisation: ${filters.location}`, value: 'location' });
    }
    if (filters.color) {
      chips.push({ key: 'color', label: `Couleur: ${filters.color}`, value: 'color' });
    }
    
    return chips;
  };

  const removeFilter = (filterKey: string) => {
    const newFilters = { ...filters };
    
    switch (filterKey) {
      case 'price':
        delete newFilters.priceMin;
        delete newFilters.priceMax;
        break;
      case 'year':
        delete newFilters.yearMin;
        delete newFilters.yearMax;
        break;
      default:
        delete newFilters[filterKey as keyof SearchFilters];
    }
    
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    navigate('/search');
  };

  // Get price range stats
  const priceStats = useMemo(() => {
    if (filteredListings.length === 0) return null;
    const prices = filteredListings.map(l => l.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    };
  }, [filteredListings]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white min-h-[50vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: 'url(/hero-background.webp)',
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 drop-shadow-lg">
            Rechercher votre moto
          </h1>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Recherche..."
                className="w-full pl-6 pr-14 py-4 bg-white text-gray-900 placeholder-gray-500 rounded-xl text-lg focus:ring-4 focus:ring-orange-300 focus:outline-none shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                aria-label="Rechercher"
              >
                <Search size={24} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Filters Sidebar */}
      <SearchFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        isOpen={showFilters}
        onToggle={() => setShowFilters(!showFilters)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {query ? `Résultats pour "${query}"` : getCategoryLabel(filters.category) || 'Toutes les annonces'}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="font-medium">
                  {filteredListings.length} annonce{filteredListings.length !== 1 ? 's' : ''} trouvée{filteredListings.length !== 1 ? 's' : ''}
                </span>
                {priceStats && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span>Prix moyen: {priceStats.avg.toLocaleString()} DT</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
              >
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Filtres</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-sm"
              >
                <option value="recent">Plus récentes</option>
                <option value="popular">Plus populaires</option>
                <option value="price-asc">Prix: croissant</option>
                <option value="price-desc">Prix: décroissant</option>
                <option value="year-desc">Année: récente</option>
                <option value="year-asc">Année: ancienne</option>
                <option value="mileage-asc">Kilométrage: faible</option>
                <option value="mileage-desc">Kilométrage: élevé</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Vue grille"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Vue liste"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">Filtres actifs:</span>
                {getActiveFilterChips().map(chip => (
                  <button
                    key={chip.key}
                    onClick={() => removeFilter(chip.value)}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
                  >
                    <span>{chip.label}</span>
                    <X size={14} />
                  </button>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-600 hover:text-orange-600 underline ml-2"
                >
                  Tout effacer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Grid/List */}
        {filteredListings.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredListings.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onToggleFavorite={toggleFavorite}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-300 mb-4">
              <SlidersHorizontal size={64} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Aucune annonce trouvée
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Nous n'avons pas trouvé de motos ou scooters correspondant à vos critères. 
              Essayez d'élargir votre recherche en ajustant les filtres.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Effacer tous les filtres
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Bar (if results exist) */}
        {filteredListings.length > 0 && priceStats && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Statistiques de recherche</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{filteredListings.length}</div>
                <div className="text-sm text-gray-600">Annonces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{priceStats.min.toLocaleString()} DT</div>
                <div className="text-sm text-gray-600">Prix minimum</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{priceStats.avg.toLocaleString()} DT</div>
                <div className="text-sm text-gray-600">Prix moyen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{priceStats.max.toLocaleString()} DT</div>
                <div className="text-sm text-gray-600">Prix maximum</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;