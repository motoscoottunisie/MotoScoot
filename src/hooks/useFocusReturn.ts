import { useEffect, useRef } from 'react';
import { saveFocus, restoreFocus } from '../utils/focus';

export const useFocusReturn = (shouldReturnFocus = true) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = saveFocus();

    return () => {
      if (shouldReturnFocus && previousFocusRef.current) {
        restoreFocus(previousFocusRef.current);
      }
    };
  }, [shouldReturnFocus]);

  return previousFocusRef;
};
