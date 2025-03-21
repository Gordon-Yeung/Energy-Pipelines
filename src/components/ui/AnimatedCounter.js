// components/ui/AnimatedCounter.js
import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ value, duration = 2000, decimals = 0, startFromZero = false }) => {
  const [count, setCount] = useState(startFromZero ? 0 : value);
  const previousValue = useRef(value);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    let startValue = startFromZero ? 0 : previousValue.current;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      
      if (progress < 1) {
        const currentValue = startValue + (value - startValue) * progress;
        setCount(currentValue);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    previousValue.current = value;
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, startFromZero]);

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