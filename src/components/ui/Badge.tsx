import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-orange-50 text-orange-700 border-orange-700',
    success: 'bg-green-50 text-green-700 border-green-700',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-700',
    error: 'bg-red-50 text-red-700 border-red-700'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
