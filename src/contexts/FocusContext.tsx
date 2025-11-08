import React, { createContext, useContext, useCallback, useRef } from 'react';
import { focusElement, announceToScreenReader } from '../utils/focus';

interface FocusContextType {
  setMainContentFocus: () => void;
  announceRouteChange: (routeName: string) => void;
  announceContentUpdate: (message: string, priority?: 'polite' | 'assertive') => void;
  saveFocusBeforeAction: () => void;
  restoreSavedFocus: () => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedFocusRef = useRef<HTMLElement | null>(null);

  const setMainContentFocus = useCallback(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      focusElement(mainContent);
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex');
      }, { once: true });
    }
  }, []);

  const announceRouteChange = useCallback((routeName: string) => {
    announceToScreenReader(`Navigated to ${routeName}`, 'assertive');
    setTimeout(() => {
      setMainContentFocus();
    }, 100);
  }, [setMainContentFocus]);

  const announceContentUpdate = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      announceToScreenReader(message, priority);
    },
    []
  );

  const saveFocusBeforeAction = useCallback(() => {
    savedFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  const restoreSavedFocus = useCallback(() => {
    if (savedFocusRef.current) {
      focusElement(savedFocusRef.current);
      savedFocusRef.current = null;
    }
  }, []);

  const value: FocusContextType = {
    setMainContentFocus,
    announceRouteChange,
    announceContentUpdate,
    saveFocusBeforeAction,
    restoreSavedFocus
  };

  return (
    <FocusContext.Provider value={value}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocusManager = (): FocusContextType => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocusManager must be used within FocusProvider');
  }
  return context;
};
