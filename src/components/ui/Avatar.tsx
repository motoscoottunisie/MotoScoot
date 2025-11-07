import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl'
  };

  const displayName = alt || name || '';

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={`rounded-full flex-shrink-0 object-cover ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      <span className="font-bold text-white">
        {displayName ? displayName.charAt(0).toUpperCase() : '?'}
      </span>
    </div>
  );
};
