import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface Ad {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
  backgroundColor: string;
  textColor: string;
}

const AdsBanner: React.FC = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const ads: Ad[] = [
    {
      id: 1,
      title: "Assurance Moto -40%",
      subtitle: "Comparez et économisez sur votre assurance",
      image: "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg",
      cta: "Comparer maintenant",
      link: "#",
      backgroundColor: "from-blue-500 to-blue-600",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Financement Moto 2.9%",
      subtitle: "Crédit rapide et conditions préférentielles",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      cta: "Simuler mon crédit",
      link: "#",
      backgroundColor: "from-green-500 to-green-600",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Équipements Moto",
      subtitle: "Casques, gants, blousons - Livraison gratuite",
      image: "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg",
      cta: "Voir les offres",
      link: "#",
      backgroundColor: "from-orange-500 to-orange-600",
      textColor: "text-white"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length]);

  if (!isVisible) return null;

  const ad = ads[currentAd];

  return (
    <div className={`relative bg-gradient-to-r ${ad.backgroundColor} rounded-xl overflow-hidden shadow-lg mb-6`}>
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 transition-colors"
        aria-label="Fermer la publicité"
      >
        <X size={16} />
      </button>

      <div className="flex items-center h-32">
        {/* Image */}
        <div className="w-24 h-24 ml-4 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-4">
          <h3 className={`font-bold text-lg ${ad.textColor} mb-1`}>
            {ad.title}
          </h3>
          <p className={`text-sm ${ad.textColor} opacity-90 mb-3`}>
            {ad.subtitle}
          </p>
          <button
            onClick={() => window.open(ad.link, '_blank')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
          >
            <span>{ad.cta}</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAd(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentAd ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Publicité ${index + 1}`}
          />
        ))}
      </div>

      {/* "Publicité" label */}
      <div className="absolute top-2 left-2 bg-black/20 text-white text-xs px-2 py-1 rounded">
        Publicité
      </div>
    </div>
  );
};

export default AdsBanner;