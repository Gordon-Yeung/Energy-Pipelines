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
  onAddGpus
}) => {
  
  // Handle adding more GPUs to accelerate training
  const handleAddGpus = (amount) => {
    onAddGpus(amount);
  };

  // Get power comparison based on thresholds
  const getPowerComparison = () => {
    if (powerUsed < 0.1) {
      return null; // Don't show comparison for negligible usage
    } else if (powerUsed < 1) {
      return "≈ charging your smartphone 3 times";
    } else if (powerUsed < 5) {
      return "≈ running a refrigerator for a day";
    } else if (powerUsed < 20) {
      return "≈ powering an average home for a month";
    } else if (powerUsed < 50) {
      return "≈ powering 3 homes for a month";
    } else {
      return `≈ powering ${Math.round(powerUsed/15)} homes for a month`;
    }
  };

  // Get water comparison based on thresholds
  const getWaterComparison = () => {
    if (waterUsed < 50) {
      return null; // Don't show comparison for negligible usage
    } else if (waterUsed < 150) {
      return "≈ taking a 5-minute shower";
    } else if (waterUsed < 500) {
      return "≈ filling a bathtub";
    } else if (waterUsed < 1000) {
      return "≈ watering a garden for a week";
    } else if (waterUsed < 5000) {
      return "≈ filling a small swimming pool";
    } else {
      return `≈ filling ${Math.round(waterUsed/5000)} swimming pools`;
    }
  };

  // Get CO2 comparison
  const getCO2Comparison = () => {
    if (co2Emitted < 1) {
      return null; // Don't show comparison for negligible emissions
    } else if (co2Emitted < 5) {
      return `≈ driving a car for ${Math.round(co2Emitted * 4)} km`;
    } else {
      return `≈ ${Math.round(co2Emitted/2)} NY-London flights`;
    }
  };
  
  return (
    <div className="training-stage">
      <h2 className="stage-title">
        {stage === 2 
          ? 'Step 3: GPU Training – "Powering the Brain"' 
          : 'Step 4: Carbon Emissions – "What\'s the Footprint?"'}
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
          <div className="resource-cards">
            <div className="resource-card">
              <div className="resource-card-header">
                <div className="resource-icon electricity">⚡</div>
                <div className="resource-info">
                  <div className="resource-label">Electricity Used</div>
                  <div className="resource-value">
                    {Math.round(powerUsed * 10) / 10}
                    <span className="resource-unit">kWh</span>
                  </div>
                </div>
              </div>
              {getPowerComparison() && (
                <div className="resource-comparison">
                  <span className="resource-comparison-icon">{powerUsed < 5 ? "📱" : "🏠"}</span>
                  {getPowerComparison()}
                </div>
              )}
            </div>
            
            <div className="resource-card">
              <div className="resource-card-header">
                <div className="resource-icon water">💧</div>
                <div className="resource-info">
                  <div className="resource-label">Water Consumed</div>
                  <div className="resource-value">
                    {Math.round(waterUsed)}
                    <span className="resource-unit">liters</span>
                  </div>
                </div>
              </div>
              {getWaterComparison() && (
                <div className="resource-comparison">
                  <span className="resource-comparison-icon">{waterUsed < 500 ? "🚿" : "🏊"}</span>
                  {getWaterComparison()}
                </div>
              )}
            </div>
            
            <div className="resource-card">
              <div className="resource-card-header">
                <div className="resource-icon carbon">🏭</div>
                <div className="resource-info">
                  <div className="resource-label">CO₂ Emissions</div>
                  <div className="resource-value">
                    {Math.round(co2Emitted * 10) / 10}
                    <span className="resource-unit">kg</span>
                  </div>
                </div>
              </div>
              {getCO2Comparison() && (
                <div className="resource-comparison">
                  <span className="resource-comparison-icon">{co2Emitted < 5 ? "🚗" : "✈️"}</span>
                  {getCO2Comparison()}
                </div>
              )}
            </div>
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