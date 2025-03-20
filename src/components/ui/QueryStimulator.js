// components/ui/QuerySimulator.js
import React, { useState } from 'react';

const QuerySimulator = ({ dataAmount, queryCount, onSimulateQuery }) => {
  const [totalInferencePower, setTotalInferencePower] = useState(0);
  
  // When simulating a query, update the total inference power
  const handleSimulateQuery = () => {
    const queryCost = 0.02 * (1 + (dataAmount / 100));
    setTotalInferencePower(prev => prev + queryCost);
    onSimulateQuery();
  };
  
  // Calculate projected daily/yearly impact
  const dailyImpact = totalInferencePower * 1000; // Assuming 1000 queries per day
  const yearlyImpact = dailyImpact * 365;
  
  // Determine if inference is starting to outpace training
  const showScaleWarning = queryCount >= 5 && totalInferencePower > 0;
  const showCriticalWarning = queryCount >= 10 && totalInferencePower > 0;
  
  return (
    <div className="query-simulator">
      <h3 className="query-simulator-title">Ongoing Inference Costs</h3>
      
      <p className="query-simulator-description">
        Training was just the beginning. Each time someone queries your model, 
        more energy is consumed. For large-scale deployments, this ongoing cost 
        can eventually surpass the initial training costs.
      </p>
      
      <div className="query-simulator-controls">
        <button 
          className="query-button"
          onClick={handleSimulateQuery}
        >
          Simulate a Query
        </button>
        
        <div className="query-stats">
          <div className="query-count">Queries: {queryCount}</div>
          <div className="query-energy">Energy per query: ~{(0.02 * (1 + (dataAmount / 100))).toFixed(2)} kWh</div>
        </div>
      </div>
      
      {queryCount > 0 && (
        <div className="inference-metrics">
          <div className="inference-energy-meter">
            <div className="inference-energy-label">Inference Energy Usage</div>
            <div className="inference-energy-bar">
              <div 
                className="inference-energy-progress"
                style={{ width: `${Math.min(100, (queryCount * 5))}%` }}
              ></div>
            </div>
            <div className="inference-energy-value">
              Total: {totalInferencePower.toFixed(1)} kWh
            </div>
          </div>
          
          {showScaleWarning && (
            <div className="inference-scale-impact">
              <h4>Projected Impact at Scale</h4>
              <div className="scale-metrics">
                <div className="scale-metric">
                  <span className="scale-label">1,000 queries/day:</span>
                  <span className="scale-value">{dailyImpact.toFixed(1)} kWh</span>
                </div>
                <div className="scale-metric">
                  <span className="scale-label">365,000 queries/year:</span>
                  <span className="scale-value">{yearlyImpact.toFixed(1)} kWh</span>
                </div>
              </div>
            </div>
          )}
          
          {showCriticalWarning && (
            <div className="inference-critical-warning">
              <span className="warning-icon">⚠️</span>
              <span className="warning-text">
                At 1 million queries per day, inference energy would exceed training energy within{' '}
                {Math.round(totalInferencePower * 1000000 / 30)} days.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuerySimulator;
