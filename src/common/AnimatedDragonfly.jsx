import React from 'react';
import { motion } from 'framer-motion';

const AnimatedDragonfly = ({ type = 1, className = "", style = {}, variant = "default" }) => {
  const duration = Math.random() * 6 + 8; // 8-14 seconds
  const delay = Math.random() * 3; // 0-3 seconds delay

  const dragonflyImages = {
    1: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924359406-1P.png",
    2: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924366935-2B.png",
    3: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924373768-3B.png"
  };

  // Animations plus dynamiques avec plus de mouvement
  const animations = {
    default: {
      y: [0, -25, 10, -15, 5, 0],
      x: [0, 15, -8, 12, -5, 0],
      rotate: [-8, 12, -15, 8, -5, -8],
      scale: [1, 1.1, 0.95, 1.05, 0.98, 1],
    },
    gentle: {
      y: [0, -20, 8, -12, 3, 0],
      x: [0, 12, -6, 9, -3, 0],
      rotate: [-6, 10, -12, 6, -3, -6],
      scale: [1, 1.08, 0.96, 1.04, 0.99, 1],
    },
    float: {
      y: [0, -35, 15, -25, 8, 0],
      x: [0, 20, -12, 18, -8, 0],
      rotate: [-12, 18, -25, 15, -8, -12],
      scale: [1, 1.15, 0.92, 1.08, 0.97, 1],
    },
    dynamic: {
      y: [0, -30, 12, -20, 6, -8, 0],
      x: [0, 18, -10, 15, -7, 3, 0],
      rotate: [-10, 15, -20, 12, -6, 8, -10],
      scale: [1, 1.12, 0.94, 1.06, 0.98, 1.03, 1],
    },
    spiral: {
      y: [0, -25, -15, -30, -10, -20, 0],
      x: [0, 15, -12, 8, -18, 10, 0],
      rotate: [0, 45, -30, 60, -45, 30, 0],
      scale: [1, 1.1, 0.95, 1.08, 0.93, 1.05, 1],
    }
  };

  return (
    <motion.div
      style={style}
      className={className}
      initial={{ y: 0, x: 0, rotate: -8, opacity: 0, scale: 0.8 }}
      animate={{
        ...animations[variant] || animations.default,
        opacity: 1,
        scale: animations[variant]?.scale || [1, 1.1, 0.95, 1.05, 0.98, 1]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        opacity: { duration: 1.2, delay },
        scale: { duration: duration * 0.8, ease: "easeInOut" }
      }}
      whileHover={{
        scale: 1.3,
        rotate: 15,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{
        scale: 1.5,
        rotate: 25,
        transition: { duration: 0.2 }
      }}
    >
      <img 
        src={dragonflyImages[type] || dragonflyImages[1]} 
        alt={`Libellule animée ${type}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </motion.div>
  );
};

export default AnimatedDragonfly;