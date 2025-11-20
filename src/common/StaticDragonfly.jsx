import React from 'react';

const StaticDragonfly = ({ type = 1, className = "", style = {}, ...props }) => {
  const dragonflyImages = {
    1: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924359406-1P.png",
    2: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924366935-2B.png", 
    3: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924373768-3B.png"
  };

  return (
    <div className={`pointer-events-none ${className}`} style={style} {...props}>
      <img 
        src={dragonflyImages[type] || dragonflyImages[1]} 
        alt={`Libellule ${type}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
};

export default StaticDragonfly;