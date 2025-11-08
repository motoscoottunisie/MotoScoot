import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Heart, Mail, Plus, Settings, FileText, ShoppingBag, HelpCircle, LogOut, Phone } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);


  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const menuItems = [
    { icon: Settings, label: 'Account Settings', path: '/settings' },
    { icon: FileText, label: 'My Listings', path: '/dashboard' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: ShoppingBag, label: 'Orders / Purchases', path: '/orders' },
    { icon: Phone, label: 'Contact', path: '/contact' },
    { icon: HelpCircle, label: 'Help Center', path: '/help' },
  ];

  return (
    <header role="banner" className={`fixed top-0 left-0 right-0 z-50 px-4 pt-8 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
    <nav aria-label="Main navigation" className="max-w-5xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
                <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xs">M</span>
                </div>
                <span className="text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300">
                  MotoScoot.tn
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2 ml-auto">
                <Link
                  to="/actualites"
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 px-3"
                >
                  Actualités
                </Link>
                <Link
                  to="/garages"
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 px-3"
                >
                  Garages
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 px-3"
                >
                  Contact
                </Link>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                <Link
                  to="/deposit"
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                >
                  <Plus size={16} />
                  <span>Déposer</span>
                </Link>

                <Link
                  to="/favorites"
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 rounded-xl hover:scale-105"
                  aria-label="Favoris"
                >
                  <Heart size={18} />
                </Link>

                <Link
                  to="/messages"
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 rounded-xl hover:scale-105"
                  aria-label="Messages"
                >
                  <Mail size={18} />
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="p-2 bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 rounded-xl hover:scale-105"
                    aria-label="Paramètres utilisateur"
                  >
                    <User size={18} />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={index}
                            to={item.path}
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition-all duration-200 mx-2 rounded-xl"
                          >
                            <Icon size={18} className="text-orange-600" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        );
                      })}

                      <div className="border-t border-gray-200 my-2 mx-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 w-full mx-2 rounded-xl"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Log out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>


            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/actualites"
                    className="text-gray-700 hover:text-orange-600 font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Actualités
                  </Link>
                  <Link
                    to="/garages"
                    className="text-gray-700 hover:text-orange-600 font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Garages
                  </Link>
                  <Link
                    to="/contact"
                    className="text-gray-700 hover:text-orange-600 font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>

                  <div className="border-t border-gray-200 my-2"></div>

                  <Link
                    to="/deposit"
                    className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 font-medium py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus size={20} />
                    <span>Déposer une annonce</span>
                  </Link>

                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 font-medium py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300 w-full"
                  >
                    <LogOut size={20} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
    </nav>
    </header>
  );
};

export default Header;