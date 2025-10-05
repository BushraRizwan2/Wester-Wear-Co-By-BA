import React, { useState, useRef, MouseEvent } from 'react';

interface ProductImageGalleryProps {
  imageUrls: string[];
  altText: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ imageUrls, altText }) => {
  if (!imageUrls || imageUrls.length === 0) {
    return (
        <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-text-secondary">No Image</span>
        </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const mainImageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!mainImageContainerRef.current) return;

    const { left, top, width, height } = mainImageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const constrainedX = Math.max(0, Math.min(x, width));
    const constrainedY = Math.max(0, Math.min(y, height));

    setZoomPosition({ x: (constrainedX / width) * 100, y: (constrainedY / height) * 100 });
  };

  return (
    <div className="flex flex-col gap-4">
      <div 
        ref={mainImageContainerRef}
        className="relative w-full aspect-square overflow-hidden rounded-lg cursor-zoom-in"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={selectedImage}
          alt={altText}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: showZoom ? 0.3 : 1 }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300"
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '200%', // Zoom factor
            opacity: showZoom ? 1 : 0,
          }}
        />
      </div>

      <div className="grid grid-cols-5 gap-2">
        {imageUrls.map((url, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(url)}
            className={`w-full aspect-square rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ${selectedImage === url ? 'ring-2 ring-primary' : 'ring-1 ring-transparent hover:ring-gray-300'}`}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={url}
              alt={`${altText} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;