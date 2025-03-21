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

  // Get power comparison icon based on amount
  const getPowerIcon = () => {
    if (powerUsed < 1) {
      return "📱"; // smartphone
    } else if (powerUsed < 5) {
      return "🧊"; // refrigerator
    } else if (powerUsed < 20) {
      return "🏠"; // single home
    } else {
      return "🏘️"; // multiple homes
    }
  };

  // Get water comparison based on thresholds
  const getWaterComparison = () => {
    if (waterUsed < 1) {
      return null; // Don't show comparison for negligible usage
    } else if (waterUsed < 10) {
      return `≈ drinking water for ${Math.round(waterUsed / 2)} people per day`; // ~2L per person per day
    } else if (waterUsed < 30) {
      return `≈ flushing a toilet ${Math.round(waterUsed / 10)} times`;
    } else if (waterUsed < 100) {
      return `≈ taking a ${Math.round(waterUsed / 30)}-minute shower`;
    } else if (waterUsed < 500) {
      return `≈ filling a bathtub ${Math.round(waterUsed / 150)} times`;
    } else if (waterUsed < 1000) {
      return `≈ washing dishes by hand ${Math.round(waterUsed / 50)} times`;
    } else if (waterUsed < 5000) {
      return `≈ doing laundry ${Math.round(waterUsed / 100)} loads`;
    } else if (waterUsed < 50000) {
      return `≈ providing ${Math.round(waterUsed / 500)} people's daily water needs`;
    } else {
      return `≈ filling an Olympic swimming pool ${Math.round(waterUsed / 2500000)} times`;
    }
  };

  // Get water comparison icon based on amount
  const getWaterIcon = () => {
    if (waterUsed < 10) {
      return "🥤"; // drinking water
    } else if (waterUsed < 30) {
      return "🚽"; // toilet
    } else if (waterUsed < 100) {
      return "🚿"; // shower
    } else if (waterUsed < 500) {
      return "🛁"; // bathtub
    } else if (waterUsed < 1000) {
      return "🍽️"; // dishes
    } else if (waterUsed < 5000) {
      return "👕"; // laundry
    } else if (waterUsed < 50000) {
      return "🏘️"; // people/community
    } else {
      return "🏊"; // swimming pool
    }
  };

  // Get CO2 comparison based on more accurate data
  const getCO2Comparison = () => {
    if (co2Emitted < 0.1) {
      return null; // Don't show comparison for negligible emissions
    } else if (co2Emitted < 1) {
      return `≈ driving a car ${Math.round(co2Emitted * 6)} km`; // ~167g CO2 per km
    } else if (co2Emitted < 5) {
      return `≈ watching Netflix for ${Math.round(co2Emitted * 10)} hours`;
    } else if (co2Emitted < 50) {
      return `≈ using a gas stove for ${Math.round(co2Emitted / 0.2)} hours`;
    } else if (co2Emitted < 500) {
      return `≈ taking ${Math.round(co2Emitted / 100)} round-trips from NYC to Washington DC by car`;
    } else if (co2Emitted < 1000) {
      return `≈ taking ${Math.round(co2Emitted / 900)} NY-London flights`;
    } else {
      return `≈ offsetting CO₂ by planting ${Math.round(co2Emitted / 22)} trees`;
    }
  };

  // Get CO2 comparison icon based on amount
  const getCO2Icon = () => {
    if (co2Emitted < 1) {
      return "🚗"; // short car trip
    } else if (co2Emitted < 5) {
      return "📺"; // Netflix/TV
    } else if (co2Emitted < 50) {
      return "🔥"; // gas stove
    } else if (co2Emitted < 500) {
      return "🚙"; // longer car trips
    } else if (co2Emitted < 1000) {
      return "✈️"; // flights
    } else {
      return "🌳"; // trees/offset
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
                  <span className="resource-comparison-icon">{getPowerIcon()}</span>
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
                  <span className="resource-comparison-icon">{getWaterIcon()}</span>
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
                  <span className="resource-comparison-icon">{getCO2Icon()}</span>
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