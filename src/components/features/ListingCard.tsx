import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, Gauge } from 'lucide-react';
import { Listing } from '../../types';
import { formatPrice, formatNumber } from '../../utils/format';
import { useImageLoader } from '../../hooks/useImageLoader';
import { ImagePlaceholder, ImageSkeleton } from '../ui/ImagePlaceholder';

interface ListingCardProps {
  listing: Listing;
  onToggleFavorite?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onToggleFavorite }) => {
  const { isLoaded, hasError, handleLoad, handleError } = useImageLoader();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(listing.id);
    }
  };

  return (
    <article
      className="bg-white rounded-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:shadow-lg hover:border-gray-300 group flex"
      role="article"
      aria-label={`Annonce: ${listing.brand} ${listing.model}`}
    >
      <Link to={`/listing/${listing.id}`} className="flex w-full">
        {/* Image Container - Left Side */}
        <div className="relative w-[250px] h-[180px] flex-shrink-0 overflow-hidden bg-gray-100">
          {!hasError ? (
            <>
              <img
                src={listing.images[0]}
                alt={`${listing.brand} ${listing.model}`}
                className={`w-full h-full object-cover ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
              />
              {!isLoaded && (
                <div className="absolute inset-0">
                  <ImageSkeleton />
                </div>
              )}
            </>
          ) : (
            <ImagePlaceholder />
          )}
        </div>

        {/* Content Container - Right Side */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
              {listing.brand} {listing.model}
            </h3>

            {/* Price */}
            <div className="text-2xl font-bold text-red-600 mb-3">
              {formatPrice(listing.price)}
            </div>

            {/* Specifications */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
              {listing.category !== 'accessoires' && (
                <>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{listing.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge size={16} className="text-gray-400" />
                    <span>{formatNumber(listing.mileage)} km</span>
                  </div>
                  {listing.engineSize && (
                    <div className="flex items-center gap-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <rect x="2" y="6" width="20" height="12" rx="2"/>
                        <circle cx="12" cy="12" r="2"/>
                        <path d="M6 12h2M16 12h2"/>
                      </svg>
                      <span>{listing.engineSize} cm³</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Location and Date */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-gray-400" />
                <span>{listing.location}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>
                  {new Date(listing.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Favorite Button - Bottom Right */}
          <div className="flex justify-end mt-2">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                listing.isFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600 hover:scale-110'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110'
              }`}
              aria-label={listing.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              aria-pressed={listing.isFavorite}
            >
              <Heart size={18} className={listing.isFavorite ? 'fill-current' : ''} strokeWidth={2} />
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ListingCard;
