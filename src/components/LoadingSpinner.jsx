import React from 'react';
import { motion } from 'framer-motion';
import DragonflyImage from '../common/DragonflyImage';

const LoadingSpinner = ({ message = "Chargement..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-25">
      <div className="text-center">
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 mx-auto mb-4"
        >
          <DragonflyImage type={1} alt="Chargement..." />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-stone-600 font-light">{message}</p>
          
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#95a58d] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;