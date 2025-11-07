import React from 'react';
import { MapPin, Phone, Mail, Star, Clock, ExternalLink, Wrench } from 'lucide-react';
import { Garage } from '../../types/garage';
import Badge from '../ui/Badge';

interface GarageCardProps {
  garage: Garage;
}

const GarageCard: React.FC<GarageCardProps> = ({ garage }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {garage.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={garage.image_url}
            alt={garage.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{garage.name}</h3>
          {garage.rating > 0 && (
            <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded">
              <Star size={16} className="text-orange-600 fill-orange-600" />
              <span className="text-sm font-semibold text-orange-700">{garage.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {garage.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start space-x-2 text-sm text-gray-700">
            <MapPin size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
            <span>{garage.address}, {garage.gouvernorat}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Phone size={16} className="text-orange-600 flex-shrink-0" />
            <a href={`tel:${garage.phone}`} className="hover:text-orange-600 transition-colors">
              {garage.phone}
            </a>
          </div>

          {garage.email && (
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Mail size={16} className="text-orange-600 flex-shrink-0" />
              <a href={`mailto:${garage.email}`} className="hover:text-orange-600 transition-colors truncate">
                {garage.email}
              </a>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Clock size={16} className="text-orange-600 flex-shrink-0" />
            <span>{garage.opening_hours}</span>
          </div>
        </div>

        {garage.specialties.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-1 mb-2">
              <Wrench size={14} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-700">Spécialités:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {garage.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {specialty}
                </Badge>
              ))}
              {garage.specialties.length > 3 && (
                <Badge variant="secondary" size="sm">
                  +{garage.specialties.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {garage.brands.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-700 block mb-2">Marques:</span>
            <div className="flex flex-wrap gap-1">
              {garage.brands.slice(0, 4).map((brand, index) => (
                <Badge key={index} variant="outline" size="sm">
                  {brand}
                </Badge>
              ))}
              {garage.brands.length > 4 && (
                <Badge variant="outline" size="sm">
                  +{garage.brands.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {garage.website && (
          <a
            href={garage.website.startsWith('http') ? garage.website : `https://${garage.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            <span>Visiter le site web</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
};

export default GarageCard;
