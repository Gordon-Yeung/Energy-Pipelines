// components/ui/GpuVisualizer.js
import React from 'react';

const GpuVisualizer = ({ gpuCount, heatLevel }) => {
  // Create an array of GPUs based on count
  const gpus = Array.from({ length: gpuCount }, (_, index) => ({
    id: index + 1,
    // Calculate individual GPU heat (some variation for realism)
    heat: Math.min(1, heatLevel * (0.8 + Math.random() * 0.4))
  }));
  
  // Determine how many GPUs to show per row
  const gpusPerRow = gpuCount <= 8 ? 4 : 8;
  
  return (
    <div className="gpu-visualizer">
      <div 
        className="gpu-grid"
        style={{ 
          gridTemplateColumns: `repeat(${gpusPerRow}, 1fr)`,
          gridTemplateRows: `repeat(${Math.ceil(gpuCount / gpusPerRow)}, 1fr)`
        }}
      >
        {gpus.map(gpu => {
          // Calculate background color based on heat level (red hot)
          const bgColor = `rgba(${255}, ${Math.max(0, 100 - (gpu.heat * 100))}, 0, ${0.3 + (gpu.heat * 0.7)})`;
          
          return (
            <div 
              key={gpu.id}
              className="gpu-unit"
              style={{ backgroundColor: bgColor }}
            >
              <div className="gpu-id">GPU {gpu.id}</div>
              <div className="gpu-status">
                {gpu.heat > 0.7 ? "Critical Load" : 
                 gpu.heat > 0.4 ? "Heavy Load" : 
                 gpu.heat > 0.1 ? "Active" : "Idle"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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

// components/ui/ResourceMeter.js
import React from 'react';

const ResourceMeter = ({ label, value, unit, maxValue, color, comparison, detailedComparison }) => {
  const percentage = Math.min(100, (value / maxValue) * 100);
  
  return (
    <div className="resource-meter">
      <div className="resource-meter-header">
        <span>{label}</span>
        <span>{value} {unit}</span>
      </div>
      <div className="resource-meter-bar">
        <div 
          className={`resource-meter-progress ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="resource-meter-comparison">{comparison}</div>
      {detailedComparison && (
        <div className="resource-meter-detailed">{detailedComparison}</div>
      )}
    </div>
  );
};

// components/ui/CarbonComparison.js
import React from 'react';

const CarbonComparison = ({ co2Amount }) => {
  // Calculate various impacts
  const flights = Math.round(co2Amount / 2);
  const drivingMiles = Math.round(co2Amount * 250);
  const treePlanting = Math.round(co2Amount / 0.06); // Trees needed to offset (avg 60kg per tree over 10 years)
  const homeEnergy = Math.round(co2Amount / 3.5); // Average home monthly emissions in CO2 kg
  
  return (
    <div className="carbon-comparison">
      <h3 className="carbon-comparison-title">Carbon Footprint Comparison</h3>
      <div className="carbon-impact-grid">
        <div className="carbon-impact-item">
          <div className="impact-icon">✈️</div>
          <div className="impact-text">
            <strong>{flights}</strong> round-trip flights from NY to London
          </div>
        </div>
        
        <div className="carbon-impact-item">
          <div className="impact-icon">🚗</div>
          <div className="impact-text">
            <strong>{drivingMiles}</strong> miles driven in a gasoline car
          </div>
        </div>
        
        <div className="carbon-impact-item">
          <div className="impact-icon">🏠</div>
          <div className="impact-text">
            <strong>{homeEnergy}</strong> months of average home energy usage
          </div>
        </div>
        
        <div className="carbon-impact-item">
          <div className="impact-icon">🌳</div>
          <div className="impact-text">
            <strong>{treePlanting}</strong> trees planted for 10 years to offset
          </div>
        </div>
      </div>
    </div>
  );
};

export { GpuVisualizer, CoolingSystem, ResourceMeter, CarbonComparison };