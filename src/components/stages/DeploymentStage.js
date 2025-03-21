// components/stages/DeploymentStage.js
import React, { useState } from 'react';
import ResourceSummary from '../ui/ResourceSummary';
import AnimatedCounter from '../ui/AnimatedCounter';
import QuerySimulator from '../ui/QuerySimulator';
import LiveDeploymentDashboard from '../ui/LiveDeploymentDashboard';

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
  const [showDashboard, setShowDashboard] = useState(false);
  const [hasSubmittedQuery, setHasSubmittedQuery] = useState(false);

  const handleSimulateQuery = (energy) => {
    // Calculate additional resources used per query
    const additionalPower = energy;
    const additionalWater = energy * 2; // Water used for cooling
    const additionalCO2 = energy * 0.5; // CO2 emitted per kWh

    // Update totals
    setTotalInferencePower(prev => prev + additionalPower);
    setTotalWaterUsed(prev => prev + additionalWater);
    setTotalCO2Emitted(prev => prev + additionalCO2);

    // Set hasSubmittedQuery to true
    setHasSubmittedQuery(true);

    // Call the parent handler
    onSimulateQuery();
  };

  const handleUpdateResources = (update) => {
    setTotalInferencePower(prev => prev + update.power);
    setTotalWaterUsed(prev => prev + update.water);
    setTotalCO2Emitted(prev => prev + update.co2);
  };

  return (
    <div className="deployment-stage">
      <div className="deployment-header">
        <h2>Model Deployment – Deployment & Ongoing Costs</h2>
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

        {/* Query Simulator */}
        <QuerySimulator 
          dataAmount={dataAmount}
          queryCount={queryCount}
          onSimulateQuery={handleSimulateQuery}
        />

        {/* Deploy Button - Only show after first query */}
        {hasSubmittedQuery && !showDashboard && (
          <div className="deploy-section">
            <button 
              className="deploy-button"
              onClick={() => setShowDashboard(true)}
            >
              Deploy Model
            </button>
          </div>
        )}

        {/* Live Deployment Dashboard - Embedded */}
        {showDashboard && (
          <div className="dashboard-container">
            <LiveDeploymentDashboard
              onClose={() => setShowDashboard(false)}
              initialUsers={0}
              initialQueries={0}
              onUpdateResources={handleUpdateResources}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentStage;