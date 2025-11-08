import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFocusManager } from '../contexts/FocusContext';

const routeNames: Record<string, string> = {
  '/': 'Page d\'accueil',
  '/actualites': 'Actualités',
  '/garages': 'Garages',
  '/contact': 'Contact',
  '/deposit': 'Déposer une annonce',
  '/favorites': 'Favoris',
  '/messages': 'Messages',
  '/dashboard': 'Tableau de bord',
  '/search': 'Résultats de recherche'
};

export const useRouteAnnouncement = () => {
  const location = useLocation();
  const { announceRouteChange } = useFocusManager();

  useEffect(() => {
    const pathKey = location.pathname.split('/')[1] ? `/${location.pathname.split('/')[1]}` : '/';
    const routeName = routeNames[pathKey] || 'Page';

    announceRouteChange(routeName);
  }, [location.pathname, announceRouteChange]);
};
