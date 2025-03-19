// components/stages/DeploymentStage.js
import React from 'react';
import ResourceSummary from '../ui/ResourceSummary';
import QuerySimulator from '../ui/QuerySimulator';
import FinalInsight from '../ui/FinalInsight';

const DeploymentStage = ({ 
  dataAmount, 
  powerUsed, 
  waterUsed, 
  co2Emitted, 
  queryCount, 
  onSimulateQuery, 
  onReset 
}) => {
  return (
    <div className="deployment-stage">
      <h2 className="stage-title">Step 4: Model Completion – "Deployment & Ongoing Costs"</h2>
      
      <div className="completion-banner">
        <div className="completion-icon">🎉</div>
        <div className="completion-text">
          <h3>Training Complete!</h3>
          <p>Your {dataAmount}GB LLM is ready for deployment.</p>
        </div>
      </div>
      
      {/* Resource summary */}
      <ResourceSummary 
        powerUsed={powerUsed}
        waterUsed={waterUsed}
        co2Emitted={co2Emitted}
      />
      
      {/* Inference simulation */}
      <QuerySimulator 
        dataAmount={dataAmount}
        queryCount={queryCount}
        onSimulateQuery={onSimulateQuery}
      />
      
      {/* Final insight (shows after some queries) */}
      {queryCount >= 5 && (
        <FinalInsight />
      )}
      
      {/* Reset button */}
      <button 
        className="reset-button"
        onClick={onReset}
      >
        Reset Simulation
      </button>
    </div>
  );
};

export default DeploymentStage;