import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-orange-50 text-orange-700 border-orange-700',
    secondary: 'bg-gray-100 text-gray-700 border-gray-300',
    outline: 'bg-white text-gray-700 border-gray-300',
    success: 'bg-green-50 text-green-700 border-green-700',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-700',
    error: 'bg-red-50 text-red-700 border-red-700'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
export { Badge };
