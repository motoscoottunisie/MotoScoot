import React from 'react';

export const ImagePlaceholder: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="text-gray-400 text-center p-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-xs font-medium">Image non disponible</p>
      </div>
    </div>
  );
};

export const ImageSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
  );
};
