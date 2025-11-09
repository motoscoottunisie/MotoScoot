import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Gauge } from 'lucide-react';

interface Listing {
  id: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  engineSize?: number;
  condition: string;
  location: string;
  category: string;
  images: string[];
  sellerName: string;
  sellerType: 'professional' | 'individual';
  shopUrl?: string;
  isFavorite: boolean;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold text-white bg-orange-600 rounded-lg ${className}`}>
    {children}
  </span>
);

interface HomeListingCardProps {
  listing: Listing;
  onToggleFavorite?: (id: string) => void;
}

const HomeListingCard: React.FC<HomeListingCardProps> = ({ listing, onToggleFavorite }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(listing.id);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <article
      className="bg-white rounded-2xl transition-all duration-300 overflow-hidden border border-gray-200 group flex flex-col h-full"
      role="article"
      aria-label={`Annonce: ${listing.brand} ${listing.model}`}
    >
      <div className="cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {!hasError ? (
            <>
              <img
                src={listing.images[0]}
                alt={`${listing.brand} ${listing.model}`}
                className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                loading="lazy"
              />
              {!isLoaded && (
                <div className="absolute inset-0">
                  <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-gray-400 text-center">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          {onToggleFavorite && (
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
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow relative">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors leading-snug cursor-pointer hover:underline">
            {listing.brand} {listing.model}
          </h3>
        </div>

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

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-200 mt-auto">
          <div className="text-2xl font-bold text-orange-600">
            {formatPrice(listing.price)}
          </div>
          <Badge>
            {listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
          </Badge>
        </div>
      </div>
    </article>
  );
};

export default HomeListingCard;