import React from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface FocusTrapProps {
  children: React.ReactNode;
  isActive?: boolean;
  initialFocus?: boolean;
  restoreFocusOnUnmount?: boolean;
  className?: string;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  isActive = true,
  initialFocus = true,
  restoreFocusOnUnmount = true,
  className = ''
}) => {
  const containerRef = useFocusTrap({
    isActive,
    initialFocus,
    restoreFocusOnUnmount
  });

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
};
