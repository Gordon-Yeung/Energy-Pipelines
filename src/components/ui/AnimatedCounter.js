// components/ui/AnimatedCounter.js
import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      
      if (progress < 1) {
        const currentValue = value * progress;
        setCount(currentValue);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span>
      {decimals > 0 
        ? Math.round(count * Math.pow(10, decimals)) / Math.pow(10, decimals)
        : Math.round(count)
      }
    </span>
  );
};

export default AnimatedCounter; 