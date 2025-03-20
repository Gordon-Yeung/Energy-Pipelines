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

export default GpuVisualizer;