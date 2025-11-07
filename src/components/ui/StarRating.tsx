import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 16
}) => {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} étoiles sur ${maxStars}`}>
      {Array.from({ length: maxStars }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
