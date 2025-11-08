import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, Gauge, MessageCircle, User, Phone } from 'lucide-react';
import { Listing } from '../../types';
import { formatPrice, formatNumber } from '../../utils/format';
import { useImageLoader } from '../../hooks/useImageLoader';
import { ImagePlaceholder, ImageSkeleton } from '../ui/ImagePlaceholder';
import { Badge } from '../ui/Badge';

interface SearchListingCardProps {
  listing: Listing;
  onToggleFavorite?: (id: string) => void;
}

const SearchListingCard: React.FC<SearchListingCardProps> = ({ listing, onToggleFavorite }) => {
  const { isLoaded, hasError, handleLoad, handleError } = useImageLoader();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(listing.id);
    }
  };

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Contact seller:', listing.sellerName);
  };

  return (
    <article
      className="bg-white rounded-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 group flex flex-col sm:flex-row"
      role="article"
      aria-label={`Annonce: ${listing.brand} ${listing.model}`}
    >
      <Link to={`/listing/${listing.id}`} className="flex flex-col sm:flex-row w-full relative">
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-lg sm:text-xl md:text-2xl font-bold text-orange-600 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-lg">
          {formatPrice(listing.price)}
        </div>

        <div className="relative w-full h-48 sm:w-[200px] sm:h-[160px] md:w-[250px] md:h-[180px] flex-shrink-0 overflow-hidden bg-gray-100">
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

          <div className="absolute top-3 left-3">
            <Badge className="backdrop-blur-sm shadow-lg" variant="success">
              {listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
              {listing.brand} {listing.model}
            </h3>

            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2">
              {listing.category !== 'accessoires' && (
                <>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Calendar size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                    <span>{listing.year}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Gauge size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                    <span>{formatNumber(listing.mileage)} km</span>
                  </div>
                  {listing.engineSize && (
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 sm:w-4 sm:h-4">
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

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <MapPin size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                <span className="truncate max-w-[120px] sm:max-w-none">{listing.location}</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 sm:w-4 sm:h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="text-xs sm:text-sm">
                  {new Date(listing.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 gap-2 sm:gap-0">
            <div className="flex-grow min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{listing.sellerName}</p>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                <p className="text-xs text-gray-500 hidden sm:block">
                  {listing.sellerType === 'professional' ? 'Vendeur professionnel' : 'Vendeur particulier'}
                </p>
                <Badge size="sm" variant={listing.sellerType === 'professional' ? 'default' : 'secondary'}>
                  <User size={10} className="mr-1" />
                  {listing.sellerType === 'professional' ? 'Pro' : 'Particulier'}
                </Badge>
              </div>
            </div>

            <div className="flex gap-1.5 sm:gap-2 sm:ml-3">
              <button
                onClick={handleContact}
                className="p-2.5 sm:p-2 rounded-full bg-green-500 text-white hover:bg-green-600 active:bg-green-700 transition-all duration-200 sm:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 touch-manipulation"
                aria-label="Appeler le vendeur"
              >
                <Phone size={18} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
              </button>
              <button
                onClick={handleContact}
                className="p-2.5 sm:p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 sm:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 touch-manipulation"
                aria-label="Contacter le vendeur"
              >
                <MessageCircle size={18} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`p-2.5 sm:p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 touch-manipulation ${
                  listing.isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 sm:hover:scale-110'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 active:bg-red-100 sm:hover:scale-110'
                }`}
                aria-label={listing.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                aria-pressed={listing.isFavorite}
              >
                <Heart size={18} className={`${listing.isFavorite ? 'fill-current' : ''} sm:w-[18px] sm:h-[18px]`} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SearchListingCard;
