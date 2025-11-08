import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import SearchListingCard from '../components/features/SearchListingCard';
import SearchFiltersComponent from '../components/features/SearchFilters';
import { mockListings } from '../data/mockData';
import { SearchFilters } from '../types';
import { useFavorites } from '../hooks/useFavorites';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { favorites, toggleFavorite } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState<SearchFilters>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.brand) count++;
    if (filters.model) count++;
    if (filters.yearMin || filters.yearMax) count++;
    if (filters.mileageMin || filters.mileageMax) count++;
    if (filters.engineSizeMin || filters.engineSizeMax) count++;
    if (filters.priceMin || filters.priceMax) count++;
    if (filters.types && filters.types.length > 0) count++;
    return count;
  }, [filters]);

  const handleMobileFilterApply = () => {
    setIsMobileFilterOpen(false);
  };

  const filteredListings = useMemo(() => {
    let results = mockListings.map(listing => ({
      ...listing,
      isFavorite: favorites.has(listing.id)
    }));

    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      results = results.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.brand.toLowerCase().includes(searchTerm) ||
        listing.model.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.brand) {
      results = results.filter(listing => listing.brand === filters.brand);
    }
    if (filters.model) {
      results = results.filter(listing => listing.model === filters.model);
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
    if (filters.engineSizeMin !== undefined) {
      results = results.filter(listing => (listing.engineSize || 0) >= filters.engineSizeMin!);
    }
    if (filters.engineSizeMax !== undefined) {
      results = results.filter(listing => (listing.engineSize || 9999) <= filters.engineSizeMax!);
    }
    if (filters.colors && filters.colors.length > 0) {
      results = results.filter(listing =>
        listing.color && filters.colors!.includes(listing.color)
      );
    }
    if (filters.types && filters.types.length > 0) {
      results = results.filter(listing =>
        listing.type && filters.types!.includes(listing.type)
      );
    }

    return results;
  }, [searchQuery, filters, favorites]);

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white min-h-[40vh] flex items-center overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 drop-shadow-lg">
            Rechercher votre moto
          </h1>

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

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
        aria-label="Ouvrir les filtres"
      >
        <SlidersHorizontal size={24} />
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Fermer les filtres"
              >
                <X size={24} />
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-6">
              <SearchFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                hideActionButtons={true}
              />
            </div>

            {/* Apply Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              <button
                onClick={handleMobileFilterApply}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-full transition-colors shadow-lg"
              >
                Afficher {filteredListings.length} résultat{filteredListings.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - 2 Columns Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - 25% - Hidden on Mobile */}
          <aside className="hidden lg:block lg:col-span-3">
            <SearchFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
            />
          </aside>

          {/* Main Content - 75% on Desktop, Full Width on Mobile */}
          <main className="lg:col-span-9">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Annonces disponibles
              </h2>
              <p className="text-gray-600">
                {filteredListings.length} résultat{filteredListings.length !== 1 ? 's' : ''} trouvé{filteredListings.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Listings Grid */}
            {paginatedListings.length > 0 ? (
              <>
                <div className="space-y-4 mb-8">
                  {paginatedListings.map(listing => (
                    <SearchListingCard
                      key={listing.id}
                      listing={listing}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Précédent
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === i + 1
                            ? 'bg-orange-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Aucune annonce trouvée
                </h3>
                <p className="text-gray-600 mb-6">
                  Nous n'avons pas trouvé de motos correspondant à vos critères.
                  Essayez d'élargir votre recherche en ajustant les filtres.
                </p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">
                Vendez votre véhicule
              </h3>
              <p className="text-orange-100 mb-6">
                Déposez votre annonce gratuitement et touchez des milliers d'acheteurs potentiels
              </p>
              <Link
                to="/deposit"
                className="inline-flex items-center bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Déposer une annonce gratuite
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
