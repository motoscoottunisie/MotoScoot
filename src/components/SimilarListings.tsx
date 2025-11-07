import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Listing } from '../types';
import ListingCard from './features/ListingCard';

interface SimilarListingsProps {
  listings: Listing[];
  currentListing: Listing;
  onToggleFavorite?: (id: string) => void;
}

const SimilarListings: React.FC<SimilarListingsProps> = ({ 
  listings, 
  currentListing, 
  onToggleFavorite 
}) => {
  const similarListings = listings
    .filter(listing => 
      listing.id !== currentListing.id && 
      (listing.brand === currentListing.brand || listing.category === currentListing.category)
    )
    .slice(0, 8);

  if (similarListings.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Annonces similaires</h2>
        <div className="flex space-x-2">
          <button
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {similarListings.map(listing => (
          <div key={listing.id} className="min-w-64 sm:min-w-0">
            <ListingCard 
              listing={listing} 
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
          Voir plus d'annonces similaires →
        </button>
      </div>
    </section>
  );
};

export default SimilarListings;