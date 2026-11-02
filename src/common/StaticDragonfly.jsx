import React from 'react';

const StaticDragonfly = ({ type = 1, className = "", style = {}, ...props }) => {
  const dragonflyImages = {
    1: "/images/libellule-1.png",
    2: "/images/libellule-2.png",
    3: "/images/libellule-3.png"
  };

  return (
    <div className={`pointer-events-none ${className}`} style={style} {...props}>
      <img
        src={dragonflyImages[type] || dragonflyImages[1]}
        alt=""
        width="192" height="192"
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
};

export default StaticDragonfly;
