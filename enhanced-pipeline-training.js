// components/stages/TrainingStage.js
import React from 'react';
import ProgressBar from '../ui/ProgressBar';
import GpuVisualizer from '../ui/GpuVisualizer';
import ResourceMeter from '../ui/ResourceMeter';
import CoolingSystem from '../ui/CoolingSystem';
import CarbonComparison from '../ui/CarbonComparison';

const TrainingStage = ({ 
  stage, 
  trainingProgress, 
  powerUsed, 
  waterUsed, 
  co2Emitted, 
  gpuCount,
  onAddGpus,
  getPowerComparison,
  getWaterComparison
}) => {
  
  // Handle adding more GPUs to accelerate training
  const handleAddGpus = (amount) => {
    onAddGpus(amount);
  };
  
  return (
    <div className="training-stage">
      <h2 className="stage-title">
        {stage === 2 
          ? "Step 2: GPU Training – "Powering the Brain"" 
          : "Step 3: Carbon Emissions – "What's the Footprint?""}
      </h2>
      
      <div className="training-container">
        {/* Training progress indicator */}
        <div className="progress-section">
          <h3 className="section-title">Training Progress</h3>
          <ProgressBar 
            progress={trainingProgress} 
            label={`${Math.round(trainingProgress)}%`}
            color="bg-green-500"
          />
        </div>
        
        {/* GPU Visualization with Cooling System */}
        <div className="gpu-section">
          <div className="gpu-header">
            <h3 className="section-title">GPU Cluster</h3>
            <div className="gpu-count">
              <span>Active GPUs: {gpuCount}</span>
              {trainingProgress > 0 && trainingProgress < 90 && (
                <div className="gpu-scaling-buttons">
                  <button 
                    className="add-gpu-button"
                    onClick={() => handleAddGpus(4)}
                  >
                    +4 GPUs
                  </button>
                  <button 
                    className="add-gpu-button"
                    onClick={() => handleAddGpus(8)}
                  >
                    +8 GPUs
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="gpu-cooling-container">
            <GpuVisualizer 
              gpuCount={gpuCount}
              heatLevel={trainingProgress / 100}
            />
            <CoolingSystem 
              gpuCount={gpuCount}
              heatLevel={trainingProgress / 100}
              waterFlow={waterUsed / 10000}
            />
          </div>
        </div>
        
        {/* Resource Usage Meters */}
        <div className="resources-section">
          <h3 className="section-title">Resource Consumption</h3>
          <div className="resource-meters">
            <ResourceMeter 
              label="Electricity"
              value={Math.round(powerUsed)}
              unit="kWh"
              maxValue={500}
              color="bg-yellow-500"
              comparison={`≈ ${Math.round(powerUsed/30)} days of home electricity`}
              detailedComparison={getPowerComparison()}
            />
            
            <ResourceMeter 
              label="Water"
              value={Math.round(waterUsed)}
              unit="liters"
              maxValue={500000}
              color="bg-blue-500"
              comparison={`≈ drinking water for ${Math.round(waterUsed/500)} people per day`}
              detailedComparison={getWaterComparison()}
            />
            
            <ResourceMeter 
              label="CO₂ Emissions"
              value={Math.round(co2Emitted)}
              unit="kg"
              maxValue={100}
              color="bg-gray-500"
              comparison={`≈ ${Math.round(co2Emitted/2)} NY-London flights`}
            />
          </div>
        </div>
        
        {/* Carbon Footprint Comparison (only in stage 3) */}
        {stage === 3 && (
          <CarbonComparison co2Amount={co2Emitted} />
        )}
      </div>
    </div>
  );
};

export default TrainingStage;