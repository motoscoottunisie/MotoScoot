import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Motos', path: '/search?category=motos' },
    { label: 'Scooters', path: '/search?category=scooters' },
    { label: 'Vendre un véhicule', path: '/deposit' },
    { label: 'Promotions', path: '/deals' },
  ];

  const supportLinks = [
    { label: 'Centre d\'aide', path: '/help' },
    { label: 'Questions fréquentes', path: '/faq' },
    { label: 'Conseils de sécurité', path: '/safety' },
    { label: 'Nous contacter', path: '/contact' },
    { label: 'Signaler une annonce', path: '/report' },
  ];

  const legalLinks = [
    { label: 'Conditions d\'utilisation', path: '/terms' },
    { label: 'Politique de confidentialité', path: '/privacy' },
    { label: 'Politique des cookies', path: '/cookies' },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: 'Facebook',
      url: 'https://facebook.com',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      url: 'https://instagram.com',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      url: 'https://youtube.com',
    },
  ];

  return (
    <footer id="footer" role="contentinfo" className="bg-[#0F0F0F] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="space-y-6" aria-label="Company information">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white">MotoMarket</span>
            </Link>

            <p className="text-sm leading-relaxed">
              La plateforme n°1 en Tunisie pour acheter et vendre des motos et scooters.
            </p>

            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 bg-white/5 rounded-lg transition-all duration-200 hover:bg-orange-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <Icon size={20} className="text-gray-400 hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="text-white font-semibold text-base mb-5 uppercase tracking-wide">
              Liens rapides
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-orange-500 transition-colors duration-200 inline-block hover:translate-x-1 transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support links">
            <h3 className="text-white font-semibold text-base mb-5 uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-orange-500 transition-colors duration-200 inline-block hover:translate-x-1 transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal and resources">
            <h3 className="text-white font-semibold text-base mb-5 uppercase tracking-wide">
              Légal & Ressources
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-orange-500 transition-colors duration-200 inline-block hover:translate-x-1 transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              © {currentYear} MotoScoot.tn Tous droits réservés.
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              Créé avec{' '}
              <span className="text-red-500 mx-1 animate-pulse" aria-label="amour">❤️</span>{' '}
              par <span className="text-orange-500 font-semibold ml-1">Magma Studio</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
