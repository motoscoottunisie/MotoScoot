import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  videos?: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, videos = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const allMedia = [...images, ...videos];
  const totalItems = allMedia.length;

  useEffect(() => {
    // Preload first few images
    images.slice(0, 3).forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
        if (index === 0) setIsLoading(false);
      };
      img.src = src;
    });
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const isVideo = (index: number) => {
    return index >= images.length;
  };

  const getCurrentMedia = () => {
    if (isVideo(currentIndex)) {
      return videos[currentIndex - images.length];
    }
    return images[currentIndex];
  };

  const ImageSkeleton = () => (
    <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Main Gallery */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-[4/3] group">
        {isLoading && <ImageSkeleton />}
        
        {!isLoading && (
          <>
            {isVideo(currentIndex) ? (
              <video
                src={getCurrentMedia()}
                controls
                className="w-full h-full object-cover"
                poster={images[0]}
              />
            ) : (
              <img
                src={getCurrentMedia()}
                alt={`${title} - Image ${currentIndex + 1}`}
                className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                onClick={toggleZoom}
                loading={currentIndex === 0 ? 'eager' : 'lazy'}
              />
            )}

            {/* Navigation Arrows */}
            {totalItems > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Image suivante"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Zoom Icon */}
            {!isVideo(currentIndex) && (
              <button
                onClick={toggleZoom}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label={isZoomed ? 'Dézoomer' : 'Zoomer'}
              >
                {isZoomed ? <X size={16} /> : <ZoomIn size={16} />}
              </button>
            )}

            {/* Counter */}
            {totalItems > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {totalItems}
              </div>
            )}
          </>
        )}
      </div>

      {/* Thumbnails */}
      {totalItems > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentIndex === index
                  ? 'border-orange-500 ring-2 ring-orange-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {isVideo(index) ? (
                <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                  <Play size={16} className="text-gray-600" />
                  <img
                    src={images[0]}
                    alt={`Vidéo ${index - images.length + 1}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                </div>
              ) : (
                <>
                  {!loadedImages.has(index) && (
                    <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                  )}
                  <img
                    src={media}
                    alt={`${title} - Miniature ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={() => setLoadedImages(prev => new Set([...prev, index]))}
                  />
                </>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Swipe Indicators */}
      {totalItems > 1 && (
        <div className="flex justify-center space-x-2 md:hidden">
          {allMedia.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentIndex === index ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;