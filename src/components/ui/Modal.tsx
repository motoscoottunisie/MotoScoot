import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { FocusTrap } from './FocusTrap';
import { announceToScreenReader } from '../../utils/focus';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnEscape = true,
  closeOnBackdrop = true,
  showCloseButton = true
}) => {
  useEffect(() => {
    if (!isOpen) return;

    announceToScreenReader(`${title} dialog opened`, 'assertive');

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      announceToScreenReader('Dialog closed', 'polite');
    };
  }, [isOpen, closeOnEscape, onClose, title]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <FocusTrap isActive={isOpen}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} mx-4 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2
              id="modal-title"
              className="text-2xl font-bold text-gray-900"
            >
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                aria-label="Fermer le dialogue"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <X size={24} />
              </button>
            )}
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};
