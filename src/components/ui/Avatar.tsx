import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-20 h-20 text-2xl',
    lg: 'w-32 h-32 text-4xl'
  };

  return (
    <div
      className={`bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      <span className="font-bold text-white">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
