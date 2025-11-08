export const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
];

export const getFocusableElements = (container: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];

  const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS.join(','));
  return Array.from(elements).filter(el => {
    return !el.hasAttribute('disabled') &&
           !el.getAttribute('aria-hidden') &&
           el.offsetParent !== null;
  });
};

export const getFirstFocusableElement = (container: HTMLElement | null): HTMLElement | null => {
  const elements = getFocusableElements(container);
  return elements[0] || null;
};

export const getLastFocusableElement = (container: HTMLElement | null): HTMLElement | null => {
  const elements = getFocusableElements(container);
  return elements[elements.length - 1] || null;
};

export const trapFocus = (element: HTMLElement, event: KeyboardEvent): void => {
  if (event.key !== 'Tab') return;

  const focusableElements = getFocusableElements(element);
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
};

export const saveFocus = (): HTMLElement | null => {
  return document.activeElement as HTMLElement;
};

export const restoreFocus = (element: HTMLElement | null): void => {
  if (element && typeof element.focus === 'function') {
    setTimeout(() => {
      element.focus();
    }, 0);
  }
};

export const focusElement = (
  element: HTMLElement | null,
  options?: FocusOptions
): void => {
  if (element && typeof element.focus === 'function') {
    setTimeout(() => {
      element.focus(options);
    }, 0);
  }
};

export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};
