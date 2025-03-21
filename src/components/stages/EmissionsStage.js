import React from 'react';
import AnimatedCounter from '../ui/AnimatedCounter';

const EmissionsStage = ({ 
  dataAmount, 
  powerUsed, 
  waterUsed, 
  co2Emitted,
  onProceedToDeployment 
}) => {
  return (
    <div className="emissions-stage">
      <h2 className="stage-title">Environmental Impact – "The True Cost"</h2>
      
      <div className="completion-banner">
        <div className="completion-icon">🌍</div>
        <div className="completion-text">
          <h3>Environmental Impact Analysis</h3>
          <p>Let's examine the environmental footprint of your {dataAmount}GB LLM.</p>
        </div>
      </div>
      
      {/* Animated Resource Summary */}
      <div className="resource-summary animated">
        <div className="resource-item">
          <div className="resource-icon electricity">⚡</div>
          <div className="resource-details">
            <div className="resource-value">
              <AnimatedCounter value={powerUsed} decimals={1} /> kWh
            </div>
            <div className="resource-label">Electricity Used</div>
          </div>
        </div>

        <div className="resource-item">
          <div className="resource-icon water">💧</div>
          <div className="resource-details">
            <div className="resource-value">
              <AnimatedCounter value={waterUsed} decimals={0} /> L
            </div>
            <div className="resource-label">Water Consumed</div>
          </div>
        </div>

        <div className="resource-item">
          <div className="resource-icon carbon">🏭</div>
          <div className="resource-details">
            <div className="resource-value">
              <AnimatedCounter value={co2Emitted} decimals={1} /> kg
            </div>
            <div className="resource-label">CO₂ Emissions</div>
          </div>
        </div>
      </div>

      {/* Impact Message Box */}
      <div className="impact-message-box">
        <p>
          To train your LLM, you consumed <strong>{Math.round(powerUsed * 10) / 10} kWh</strong> of electricity, 
          used <strong>{Math.round(waterUsed)} liters</strong> of water for cooling, 
          and released <strong>{Math.round(co2Emitted * 10) / 10} kg</strong> of CO₂ into the atmosphere.
        </p>
        <p className="warning-text">
          BUT the impact doesn't stop here...
        </p>
      </div>

      {/* Proceed to Deployment Button */}
      <div className="proceed-deployment-container">
        <button 
          className="proceed-deployment-button"
          onClick={onProceedToDeployment}
        >
          Explore Ongoing Environmental Costs →
        </button>
      </div>
    </div>
  );
};

export default EmissionsStage; 