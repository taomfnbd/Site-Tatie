import React from 'react';

const DragonflyImage = ({ type = 1, className = "", alt = "Libellule décorative", ...props }) => {
  const dragonflyImages = {
    1: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924359406-1P.png",
    2: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924366935-2B.png",
    3: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924373768-3B.png"
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