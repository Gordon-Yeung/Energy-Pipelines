// components/ui/CoolingSystem.js
import React from 'react';

const CoolingSystem = ({ gpuCount, heatLevel, waterFlow }) => {
  // Calculate visual properties based on heat and water flow
  const pipeWidth = Math.max(2, Math.min(8, heatLevel * 8));
  const flowSpeed = Math.max(5, Math.min(20, waterFlow * 2));
  const steamOpacity = Math.min(0.8, heatLevel * 1.2);
  
  return (
    <div className="cooling-system">
      {/* Water reservoir */}
      <div className="water-reservoir">
        <div className="reservoir-level" style={{ height: `${100 - (waterFlow * 10)}%` }}>
          <div className="water-ripples"></div>
        </div>
        <div className="reservoir-label">Cooling Reservoir</div>
      </div>
      
      {/* Cooling pipes */}
      <div className="cooling-pipes">
        {Array.from({ length: Math.min(gpuCount, 16) }, (_, i) => (
          <div 
            key={i}
            className="cooling-pipe"
            style={{ 
              width: `${pipeWidth}px`,
              animationDuration: `${flowSpeed}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Steam effects */}
      {heatLevel > 0.3 && (
        <div className="steam-effects">
          {Array.from({ length: Math.ceil(gpuCount / 2) }, (_, i) => (
            <div 
              key={i}
              className="steam-cloud"
              style={{ 
                opacity: steamOpacity,
                animationDuration: `${3 + i % 4}s`
              }}
            ></div>
          ))}
        </div>
      )}
      
      {/* Water flow metrics */}
      <div className="water-metrics">
        <div className="water-flow-rate">
          Flow rate: {Math.round(waterFlow * 1000)} L/min
        </div>
        <div className="water-temperature">
          Water temp: {Math.round(20 + (heatLevel * 60))}°C
        </div>
      </div>
    </div>
  );
};

export default CoolingSystem;