import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Fil d'ariane" className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="text-gray-500 hover:text-orange-600 transition-colors flex items-center"
              aria-label="Retour à l'accueil"
            >
              <Home size={16} />
            </Link>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight size={16} className="text-gray-400" />
              {item.href && index < items.length - 1 ? (
                <Link 
                  to={item.href}
                  className="text-gray-500 hover:text-orange-600 transition-colors truncate max-w-32 sm:max-w-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium truncate max-w-32 sm:max-w-none">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;