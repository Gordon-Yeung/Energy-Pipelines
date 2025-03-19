// components/ui/ResourceSummary.js
import React from 'react';

const ResourceSummary = ({ powerUsed, waterUsed, co2Emitted }) => {
  // Create more tangible comparisons
  const electricityComparison = 
    powerUsed < 100 ? "power for a household for a week" :
    powerUsed < 1000 ? `electricity to charge ${Math.round(powerUsed * 80)} smartphones` :
    powerUsed < 10000 ? `energy to power ${Math.round(powerUsed / 30)} homes for a month` :
    `electricity for a small town for a day`;
  
  const waterComparison =
    waterUsed < 5000 ? `${Math.round(waterUsed / 200)} household's daily water usage` :
    waterUsed < 50000 ? `${Math.round(waterUsed / 2500)} Olympic swimming pools` :
    waterUsed < 500000 ? `water for ${Math.round(waterUsed / 150)} people for a year` :
    `enough water to irrigate ${Math.round(waterUsed / 1000000)} acres of farmland`;
  
  const carbonComparison =
    co2Emitted < 50 ? `carbon absorbed by ${Math.round(co2Emitted * 50)} trees in a year` :
    co2Emitted < 500 ? `emissions from ${Math.round(co2Emitted / 4)} gasoline cars for a year` :
    co2Emitted < 5000 ? `carbon footprint of ${Math.round(co2Emitted / 10)} people for a year` :
    `emissions from a small factory for a month`;
  
  return (
    <div className="resource-summary">
      <h3 className="resource-summary-title">Training Resource Summary</h3>
      
      <div className="resource-summary-grid">
        <div className="resource-summary-card">
          <div className="resource-summary-icon electricity-icon">⚡</div>
          <div className="resource-summary-content">
            <div className="resource-summary-value">{Math.round(powerUsed)} kWh</div>
            <div className="resource-summary-label">Total Electricity</div>
            <div className="resource-summary-comparison">{electricityComparison}</div>
          </div>
        </div>
        
        <div className="resource-summary-card">
          <div className="resource-summary-icon water-icon">💧</div>
          <div className="resource-summary-content">
            <div className="resource-summary-value">{Math.round(waterUsed / 1000)}K liters</div>
            <div className="resource-summary-label">Water Used</div>
            <div className="resource-summary-comparison">{waterComparison}</div>
          </div>
        </div>
        
        <div className="resource-summary-card">
          <div className="resource-summary-icon carbon-icon">🏭</div>
          <div className="resource-summary-content">
            <div className="resource-summary-value">{Math.round(co2Emitted)} kg</div>
            <div className="resource-summary-label">CO₂ Emitted</div>
            <div className="resource-summary-comparison">{carbonComparison}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

// components/ui/FinalInsight.js
import React from 'react';

const FinalInsight = () => {
  return (
    <div className="final-insight">
      <h3 className="final-insight-title">Final Insight: "Every AI Query Has a Cost"</h3>
      
      <div className="insight-content">
        <p>
          While we focus on the enormous energy required to train LLMs, the cumulative 
          environmental impact of billions of daily queries across deployed models can 
          surpass the initial training costs.
        </p>
        
        <div className="insight-key-points">
          <div className="key-point">
            <div className="key-point-icon">🔄</div>
            <div className="key-point-text">
              <strong>Operational Costs Exceed Training:</strong> For widely used models, the energy used for inference often becomes the dominant environmental factor.
            </div>
          </div>
          
          <div className="key-point">
            <div className="key-point-icon">📏</div>
            <div className="key-point-text">
              <strong>Model Size Matters:</strong> Smaller, more efficient models require less energy per query, dramatically reducing long-term environmental impact.
            </div>
          </div>
          
          <div className="key-point">
            <div className="key-point-icon">🔋</div>
            <div className="key-point-text">
              <strong>Energy Sources Are Crucial:</strong> Running AI systems on renewable energy can dramatically reduce their carbon footprint.
            </div>
          </div>
        </div>
        
        <p className="insight-conclusion">
          This is why many companies are now researching more efficient architectures, 
          smaller specialized models, quantization techniques, and renewable energy 
          solutions to make AI more sustainable.
        </p>
      </div>
    </div>
  );
};

// components/ui/ProgressTracker.js
import React from 'react';

const ProgressTracker = ({ currentStage }) => {
  const stages = [
    { id: 1, name: "Data Collection" },
    { id: 2, name: "GPU Training" },
    { id: 3, name: "Carbon Emissions" },
    { id: 4, name: "Deployment" }
  ];
  
  return (
    <div className="progress-tracker">
      {stages.map(stage => (
        <div 
          key={stage.id}
          className={`progress-stage ${currentStage >= stage.id ? 'active' : ''}`}
        >
          <div className="stage-number">{stage.id}</div>
          <div className="stage-name">{stage.name}</div>
        </div>
      ))}
    </div>
  );
};

export { ResourceSummary, QuerySimulator, FinalInsight, ProgressTracker };