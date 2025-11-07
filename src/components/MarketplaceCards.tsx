import React, { useState, useEffect, useRef } from 'react';

interface Card {
  id: string;
  title: string;
  subtitle: string;
  listings: string;
  image: string;
  altText: string;
  delay: string;
}

const MarketplaceCards: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const cards: Card[] = [
    {
      id: 'motos',
      title: 'Motos',
      subtitle: 'Sportives, roadsters, touring... Découvrez notre sélection de motos d\'occasion...',
      listings: '12500',
      image: 'https://i.imgur.com/mXxv28g.png',
      altText: 'Orange and grey motorcycle illustration',
      delay: '0s'
    },
    {
      id: 'scooter',
      title: 'Scooter',
      subtitle: 'Pratiques et économiques pour vos déplacements urbains...',
      listings: '12500',
      image: 'https://i.imgur.com/OmgF55x.png',
      altText: 'Orange and grey scooter illustration',
      delay: '0.25s'
    },
    {
      id: 'accessoires',
      title: 'Accessoires',
      subtitle: 'Casques, équipements, pièces détachées et accessoires...',
      listings: '12500',
      image: 'https://i.imgur.com/IWCFQcQ.png',
      altText: 'Orange and grey motorcycle helmet illustration',
      delay: '0.5s'
    }
  ];

  return (
    <>
      <style>{`
        @keyframes zoomFromSpace {
          0% {
            transform: scale(0.2) translateY(40px) rotate(-1.5deg);
            opacity: 0;
            filter: blur(8px);
          }
          100% {
            transform: scale(1) translateY(0) rotate(0deg);
            opacity: 1;
            filter: blur(0);
          }
        }

        .card-animate {
          opacity: 0;
          transform: scale(0.2) translateY(40px) rotate(-1.5deg);
          filter: blur(8px);
        }

        .card-animate.visible {
          animation: zoomFromSpace 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-hover:hover {
          transform: scale(1.05) translateY(-8px);
          border-color: #ea580c;
        }

        .card-hover:active {
          transform: scale(0.98);
        }
      `}</style>

      <div className="bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-4 sm:mb-6">
              Explorez nos catégories
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed px-4">
              <span className="block sm:inline">Trouvez exactement ce que vous cherchez dans notre sélection</span>
              <span className="block sm:inline"> soigneusement organisée</span>
            </p>
          </div>

          {/* Cards Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cards.map((card) => (
              <article
                key={card.id}
                className={`card-animate card-hover ${isVisible ? 'visible' : ''} group bg-white rounded-2xl sm:rounded-3xl border-2 border-orange-500 overflow-hidden mx-auto w-full max-w-md cursor-pointer`}
                style={{
                  animationDelay: card.delay
                }}
              >
                {/* Image Section */}
                <div 
                  className="h-48 sm:h-52 lg:h-56 flex items-center justify-center p-5 sm:p-6 lg:p-8 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-orange-100"
                  style={{
                    background: 'linear-gradient(-90deg, #FEF6F3 0%, #FEFAF9 100%)'
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.altText}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:-translate-y-2"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 pt-3 sm:pt-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
                    {card.title}
                  </h2>
                  
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4 min-h-[40px] sm:min-h-[48px]">
                    {card.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-orange-500 font-bold text-sm sm:text-base">
                      {card.listings} annonces
                    </div>
                    
                    <button
                      className="text-orange-500 hover:text-orange-600 font-semibold text-sm sm:text-base flex items-center gap-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 group-hover:translate-x-1"
                      aria-label={`Voir tous les ${card.title.toLowerCase()}`}
                    >
                      Voir tout
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={3} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketplaceCards;