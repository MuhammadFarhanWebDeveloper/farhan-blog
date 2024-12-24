import { useState } from "react";

const StreamingImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton Loader / Shimmer Effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 animate-wave-pulse" />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default StreamingImage;
