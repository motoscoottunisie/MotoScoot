import React from 'react';
import { Shield, MessageCircle, Eye, Clock, Calendar } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { StarRating } from '../ui/StarRating';
import { Badge } from '../ui/Badge';
import { getSellerBadge } from '../../constants/seller';

interface Listing {
  sellerName: string;
  sellerPhone?: string;
  sellerRating?: number;
  sellerReviews?: number;
  sellerSales?: number;
  sellerVerified?: boolean;
  sellerResponseTime?: string;
  sellerMemberSince?: string;
  sellerType?: 'professional' | 'individual';
}

interface SellerCardProps {
  listing: Listing;
  onContact: () => void;
  onViewAllListings?: () => void;
}

const SellerCard: React.FC<SellerCardProps> = ({ 
  listing, 
  onContact,
  onViewAllListings 
}) => {
  const {
    sellerName,
    sellerPhone = '06 12 34 56 78',
    sellerRating = 4.5,
    sellerReviews = 28,
    sellerSales = 42,
    sellerVerified = true,
    sellerResponseTime = 'Moins de 2h',
    sellerMemberSince = 'Mars 2022',
    sellerType = Math.random() > 0.5 ? 'professional' : 'individual'
  } = listing;

  const badge = getSellerBadge(sellerType);

  return (
    <article className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Seller Info */}
      <div className="flex items-start gap-4 mb-6">
        <Avatar name={sellerName} size="md" />

        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="font-semibold text-lg text-gray-900 truncate mb-2">
            {sellerName}
          </h3>

          <div className="mb-3">
            <Badge
              className="border"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={sellerRating} />
            <span className="text-sm font-medium text-gray-700">
              {sellerRating.toFixed(1)}/5
            </span>
            <span className="text-sm text-gray-500">
              ({sellerReviews} avis)
            </span>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Informations</h4>
        <dl className="space-y-3">
          {sellerVerified && (
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} className="text-green-600 flex-shrink-0" aria-hidden="true" />
                <span>Profil vérifié</span>
              </dt>
              <dd className="text-sm font-medium text-green-600">Vérifié</dd>
            </div>
          )}
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-sm text-gray-600">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-gray-400 flex-shrink-0" 
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Ventes réalisées</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">{sellerSales}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
              <span>Temps de réponse</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">{sellerResponseTime}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
              <span>Membre depuis</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">{sellerMemberSince}</dd>
          </div>
        </dl>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onContact}
          className="w-full text-white py-3.5 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-200 border-2"
          style={{
            backgroundColor: '#E6580B',
            borderColor: '#E6580B'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FBF1EC';
            e.currentTarget.style.color = '#E6580B';
            e.currentTarget.style.borderColor = '#E6580B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#E6580B';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = '#E6580B';
          }}
          aria-label="Envoyer un message"
        >
          <MessageCircle size={20} aria-hidden="true" />
          <span>Envoyer un message</span>
        </button>

        <a
          href={`tel:${sellerPhone.replace(/\s/g, '')}`}
          className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700 text-white py-3.5 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-200"
          aria-label="Appeler le vendeur"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>{sellerPhone}</span>
        </a>

        <button
          onClick={onViewAllListings}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 py-3.5 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-gray-200"
          aria-label="Voir toutes les annonces du vendeur"
        >
          <Eye size={20} aria-hidden="true" />
          <span>Voir ses annonces</span>
        </button>
      </div>
    </article>
  );
};

export default SellerCard;