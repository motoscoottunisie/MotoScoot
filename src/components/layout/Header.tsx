import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Heart, Plus, Settings, FileText, LogOut } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
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

  const menuItems = [
    { icon: Settings, label: 'Paramètres du compte', path: '/settings' },
    { icon: FileText, label: 'Mes annonces', path: '/dashboard' },
    { icon: Heart, label: 'Favoris', path: '/favorites' },
  ];

  return (
    <header role="banner" className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav id="navigation" aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors">
              MotoScoot.tn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/search"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-4 py-2"
            >
              Annonces
            </Link>
            <Link
              to="/actualites"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-4 py-2"
            >
              Actualités
            </Link>
            <Link
              to="/garages"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-4 py-2"
            >
              Garages
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-4 py-2"
            >
              Contact
            </Link>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <Link
              to="/deposit"
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors font-medium"
            >
              <Plus size={18} />
              <span>Déposer</span>
            </Link>

            <Link
              to="/favorites"
              className="p-2 text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors rounded-md"
              aria-label="Favoris"
            >
              <Heart size={20} />
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-2 text-orange-600 hover:bg-orange-50 transition-colors rounded-md"
                aria-label="Paramètres utilisateur"
                aria-expanded={isProfileDropdownOpen}
              >
                <User size={20} />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Icon size={18} className="text-gray-500" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    );
                  })}

                  <div className="border-t border-gray-200 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Log out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-1">
              <Link
                to="/search"
                className="text-gray-700 hover:text-orange-600 hover:bg-gray-50 font-medium py-3 px-4 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Annonces
              </Link>
              <Link
                to="/actualites"
                className="text-gray-700 hover:text-orange-600 hover:bg-gray-50 font-medium py-3 px-4 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Actualités
              </Link>
              <Link
                to="/garages"
                className="text-gray-700 hover:text-orange-600 hover:bg-gray-50 font-medium py-3 px-4 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Garages
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-orange-600 hover:bg-gray-50 font-medium py-3 px-4 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="border-t border-gray-200 my-2"></div>

              <Link
                to="/deposit"
                className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 hover:bg-gray-50 font-medium py-3 px-4 transition-colors"
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
                    className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 hover:bg-gray-50 font-medium py-3 px-4 transition-colors"
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="border-t border-gray-200 my-2"></div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 text-red-600 hover:bg-red-50 font-medium py-3 px-4 transition-colors w-full text-left"
              >
                <LogOut size={20} />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;