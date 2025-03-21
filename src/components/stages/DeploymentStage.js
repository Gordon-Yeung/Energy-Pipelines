// components/stages/DeploymentStage.js
import React, { useState, useEffect } from 'react';
import ResourceSummary from '../ui/ResourceSummary';
import QuerySimulator from '../ui/QuerySimulator';
import FinalInsight from '../ui/FinalInsight';
import AnimatedCounter from '../ui/AnimatedCounter';

const DeploymentStage = ({ 
  dataAmount, 
  powerUsed, 
  waterUsed, 
  co2Emitted, 
  queryCount, 
  onSimulateQuery, 
  onReset 
}) => {
  const [totalInferencePower, setTotalInferencePower] = useState(powerUsed);
  const [totalWaterUsed, setTotalWaterUsed] = useState(waterUsed);
  const [totalCO2Emitted, setTotalCO2Emitted] = useState(co2Emitted);

  const handleSimulateQuery = (query) => {
    // Calculate additional resources used per query
    const additionalPower = 0.02 * (1 + (dataAmount / 100)); // Power per query
    const additionalWater = additionalPower * 2; // Water used for cooling
    const additionalCO2 = additionalPower * 0.5; // CO2 emitted per kWh

    // Update totals
    setTotalInferencePower(prev => prev + additionalPower);
    setTotalWaterUsed(prev => prev + additionalWater);
    setTotalCO2Emitted(prev => prev + additionalCO2);

    // Call the parent handler
    onSimulateQuery(query);
  };

  return (
    <div className="deployment-stage">
      <div className="deployment-header">
        <h2>Model Deployment</h2>
        <p className="deployment-description">
          Your model is now deployed and running. But the environmental impact doesn't stop here. 
          Every query, every inference, continues to consume resources.
        </p>
      </div>

      <div className="deployment-content">
        {/* Resource summary with animated counters */}
        <div className="resource-summary animated">
          <div className="resource-item">
            <div className="resource-icon">⚡</div>
            <div className="resource-content">
              <div className="resource-value">
                <AnimatedCounter value={totalInferencePower} decimals={1} /> kWh
              </div>
              <div className="resource-label">Total Energy</div>
            </div>
          </div>

          <div className="resource-item">
            <div className="resource-icon">💧</div>
            <div className="resource-content">
              <div className="resource-value">
                <AnimatedCounter value={totalWaterUsed} decimals={1} /> L
              </div>
              <div className="resource-label">Water Used</div>
            </div>
          </div>

          <div className="resource-item">
            <div className="resource-icon">🏭</div>
            <div className="resource-content">
              <div className="resource-value">
                <AnimatedCounter value={totalCO2Emitted} decimals={1} /> kg
              </div>
              <div className="resource-label">CO₂ Emitted</div>
            </div>
          </div>
        </div>

        <QuerySimulator 
          dataAmount={dataAmount}
          queryCount={queryCount}
          onSimulateQuery={handleSimulateQuery}
        />

        <FinalInsight 
          totalInferencePower={totalInferencePower}
          totalWaterUsed={totalWaterUsed}
          totalCO2Emitted={totalCO2Emitted}
          queryCount={queryCount}
        />
      </div>
    </div>
  );
};

export default DeploymentStage;