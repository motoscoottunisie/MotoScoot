import { useEffect, useRef } from 'react';
import { trapFocus, getFirstFocusableElement, saveFocus, restoreFocus } from '../utils/focus';

interface UseFocusTrapOptions {
  isActive?: boolean;
  initialFocus?: boolean;
  restoreFocusOnUnmount?: boolean;
}

export const useFocusTrap = (options: UseFocusTrapOptions = {}) => {
  const {
    isActive = true,
    initialFocus = true,
    restoreFocusOnUnmount = true
  } = options;

  const containerRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    previousFocusRef.current = saveFocus();

    if (initialFocus) {
      const firstElement = getFirstFocusableElement(containerRef.current);
      if (firstElement) {
        firstElement.focus();
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (containerRef.current) {
        trapFocus(containerRef.current, event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (restoreFocusOnUnmount && previousFocusRef.current) {
        restoreFocus(previousFocusRef.current);
      }
    };
  }, [isActive, initialFocus, restoreFocusOnUnmount]);

  return containerRef;
};
