import { useState, useCallback } from 'react';

export const useFavorites = (initialFavorites: Set<string> = new Set()) => {
  const [favorites, setFavorites] = useState<Set<string>>(initialFavorites);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.has(id);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};
