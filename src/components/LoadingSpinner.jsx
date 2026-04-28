import React from 'react';
import DragonflyImage from '../common/DragonflyImage';

const LoadingSpinner = ({ message = "Chargement..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-25">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 animate-bounce">
          <DragonflyImage type={1} alt="Chargement..." />
        </div>
        
        <div className="animate-pulse">
          <p className="text-stone-600 font-light">{message}</p>
          
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-[#95a58d] rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
