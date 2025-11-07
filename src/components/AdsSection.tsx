import React from 'react';
import { ExternalLink } from 'lucide-react';

const AdsSection: React.FC = () => {
  const ad = {
    id: 1,
    title: 'Nouveau Scooter 125CC',
    subtitle: 'Découvrez notre dernier modèle',
    description: 'Performance, style et économie réunis dans un scooter urbain parfait pour vos déplacements quotidiens',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=600',
    cta: 'Découvrir',
    badge: 'Publicité',
    color: 'blue'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-md w-full">

        <div className="bg-white rounded-xl overflow-hidden transition-all duration-200 cursor-pointer group border-2" style={{ borderColor: '#E6580B' }}>
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full text-white shadow-lg" style={{ backgroundColor: '#E6580B' }}>
                {ad.badge}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5">
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-1">
                <h4 className="font-black text-gray-900 text-lg mb-1">{ad.title}</h4>
                <p className="text-base font-semibold mb-2" style={{ color: '#E6580B' }}>{ad.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{ad.description}</p>
            
            <button className="w-full py-3 px-4 rounded-lg text-base font-semibold transition-all group-hover:shadow-lg flex items-center justify-center space-x-2 border-2" style={{ backgroundColor: '#FBF1EC', color: '#E6580B', borderColor: '#E6580B' }}>
              <span>{ad.cta}</span>
              <ExternalLink size={18} />
            </button>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            Publicité • Cette offre est proposée par notre partenaire
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdsSection;