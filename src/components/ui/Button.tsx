import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4';

  const variantClasses = {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-200',
    secondary: 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 focus:ring-gray-200',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-orange-600',
    ghost: 'text-gray-600 hover:text-orange-600'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-8 py-3'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
