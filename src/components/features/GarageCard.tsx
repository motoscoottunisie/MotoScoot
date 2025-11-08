import React from 'react';
import { MapPin, Phone, Mail, Star, Clock, ExternalLink, Wrench } from 'lucide-react';

const Badge = ({ children, variant = 'secondary', size = 'sm' }) => {
  const variantStyles = {
    secondary: 'bg-gray-100 text-gray-700',
    outline: 'border border-gray-300 text-gray-700 bg-white'
  };
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs'
  };
  
  return (
    <span className={`rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
};

const GarageCard = ({ garage }) => {
  const handleCardClick = () => {
    alert(`Navigating to garage: ${garage.name}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
    >
      {garage.image_url && (
        <div className="h-48 overflow-hidden bg-gray-200">
          <img
            src={garage.image_url}
            alt={garage.name}
            loading="lazy"
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



      </div>
    </div>
  );
};

// Sample data for preview
const sampleGarages = [
  {
    id: '1',
    name: 'Auto Excellence Tunisie',
    description: 'Garage professionnel spécialisé dans la réparation et l\'entretien de tous types de véhicules. Service rapide et de qualité avec des techniciens certifiés.',
    address: '15 Avenue Habib Bourguiba',
    gouvernorat: 'Nabeul',
    phone: '+216 72 123 456',
    email: 'contact@autoexcellence.tn',
    opening_hours: 'Lun-Sam: 8h-18h',
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=400&fit=crop',
    specialties: ['Mécanique générale', 'Climatisation', 'Diagnostic électronique', 'Freinage', 'Vidange'],
    brands: ['Peugeot', 'Renault', 'Citroën', 'Volkswagen', 'Mercedes'],
    website: 'www.autoexcellence.tn'
  },
  {
    id: '2',
    name: 'Garage Moderne',
    description: 'Service complet de réparation automobile avec équipement de pointe.',
    address: '28 Rue de la République',
    gouvernorat: 'Tunis',
    phone: '+216 71 987 654',
    email: null,
    opening_hours: 'Lun-Ven: 9h-17h',
    rating: 4.3,
    image_url: null,
    specialties: ['Carrosserie', 'Peinture'],
    brands: ['Toyota', 'Honda'],
    website: null
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Garage Card Component Preview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleGarages.map((garage) => (
            <GarageCard key={garage.id} garage={garage} />
          ))}
        </div>
      </div>
    </div>
  );
}