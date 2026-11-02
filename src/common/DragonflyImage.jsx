import React from 'react';

const DragonflyImage = ({ type = 1, className = "", alt = "Libellule décorative", ...props }) => {
  const dragonflyImages = {
    1: "/images/libellule-1.png",
    2: "/images/libellule-2.png",
    3: "/images/libellule-3.png"
  };

  return (
    <img 
      src={dragonflyImages[type] || dragonflyImages[1]} 
      alt={alt}
      className={`${className} select-none pointer-events-none w-full h-full object-contain`}
      loading="lazy"
      {...props}
    />
  );
};

export default DragonflyImage;