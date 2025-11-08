import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, Gauge } from 'lucide-react';
import { Listing } from '../../types';
import { formatPrice, formatNumber } from '../../utils/format';
import { useImageLoader } from '../../hooks/useImageLoader';
import { ImagePlaceholder, ImageSkeleton } from '../ui/ImagePlaceholder';
import { Badge } from '../ui/Badge';

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
      className="bg-white rounded-2xl transition-all duration-300 overflow-hidden border border-gray-200 group flex flex-col h-full"
      role="article"
      aria-label={`Annonce: ${listing.brand} ${listing.model}`}
    >
      <Link to={`/listing/${listing.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {!hasError ? (
            <>
              <img
                src={listing.images[0]}
                alt={`${listing.brand} ${listing.model}`}
                className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out ${
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
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
              listing.isFavorite 
                ? 'bg-red-500 text-white shadow-lg hover:bg-red-600 hover:scale-110' 
                : 'bg-white/90 text-gray-700 hover:bg-white hover:text-red-500 hover:scale-110 shadow-md'
            }`}
            aria-label={listing.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-pressed={listing.isFavorite}
          >
            <Heart size={18} className={listing.isFavorite ? 'fill-current' : ''} strokeWidth={2} />
          </button>

          <div className="absolute bottom-3 left-3">
            <Badge className="backdrop-blur-sm shadow-lg">
              {listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
            </Badge>
          </div>
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand & Model */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors leading-snug">
            <Link to={`/listing/${listing.id}`} className="hover:underline">
              {listing.brand} {listing.model}
            </Link>
          </h3>
          <div className="text-2xl font-bold text-orange-600">
            {formatPrice(listing.price)}
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-2.5 mb-4 flex-grow">
          {listing.category !== 'accessoires' && (
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Calendar size={16} className="text-gray-400" strokeWidth={2} />
                <span className="font-medium">{listing.year}</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-1.5 text-gray-600">
                <Gauge size={16} className="text-gray-400" strokeWidth={2} />
                <span className="font-medium">{formatNumber(listing.mileage)} km</span>
              </div>
              {listing.engineSize && (
                <>
                  <div className="h-4 w-px bg-gray-300" />
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <rect x="2" y="6" width="20" height="12" rx="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <path d="M6 12h2M16 12h2"/>
                    </svg>
                    <span className="font-medium">{listing.engineSize} cm³</span>
                  </div>
                </>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" strokeWidth={2} />
            <span className="font-medium truncate">{listing.location}</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-200 mt-auto">
          <div className="flex-grow min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{listing.sellerName}</p>
            <p className="text-xs text-gray-500">
              {listing.sellerType === 'professional' ? 'Vendeur professionnel' : 'Vendeur particulier'}
            </p>
          </div>
          
          {listing.sellerType === 'professional' ? (
            listing.shopUrl && (
              <Link
                to={listing.shopUrl}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                style={{ backgroundColor: '#FBF1EC', color: '#E6580B' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Magasin
              </Link>
            )
          ) : (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap"
              style={{ backgroundColor: '#FBF1EC', color: '#E6580B' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Particulier
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ListingCard;