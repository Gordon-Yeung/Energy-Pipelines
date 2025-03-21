// components/ui/QuerySimulator.js
import React, { useState } from 'react';

const QuerySimulator = ({ dataAmount, queryCount, onSimulateQuery }) => {
  const [selectedQueryType, setSelectedQueryType] = useState(null);
  const [showEnergyPopup, setShowEnergyPopup] = useState(false);
  const [energyUsed, setEnergyUsed] = useState(0);
  
  const queryTypes = [
    { id: 'classify', name: 'Classify Text', icon: '📝', energy: 0.015 },
    { id: 'summarize', name: 'Summarize', icon: '📋', energy: 0.02 },
    { id: 'generate', name: 'Generate Text', icon: '✍️', energy: 0.025 },
    { id: 'multitask', name: 'Multitask', icon: '🔄', energy: 0.03 },
    { id: 'generate-image', name: 'Generate Image', icon: '🎨', energy: 0.05 }
  ];
  
  const handleQuerySubmit = () => {
    if (!selectedQueryType) return;
    
    const queryType = queryTypes.find(q => q.id === selectedQueryType);
    const baseEnergy = queryType.energy;
    const scaledEnergy = baseEnergy * (1 + (dataAmount / 100));
    
    setEnergyUsed(scaledEnergy);
    setShowEnergyPopup(true);
    onSimulateQuery(scaledEnergy);
    
    // Reset selection after submission
    setSelectedQueryType(null);
  };
  
  return (
    <div className="query-simulator">
      <h3 className="query-simulator-title">Ongoing Inference Costs</h3>
      
      <p className="query-simulator-description">
        Training was just the beginning. Each time someone queries your model, 
        more energy is consumed. For large-scale deployments, this ongoing cost 
        can eventually surpass the initial training costs.
      </p>
      
      <div className="query-types-grid">
        {queryTypes.map(type => (
          <div 
            key={type.id}
            className={`query-type-card ${selectedQueryType === type.id ? 'selected' : ''}`}
            onClick={() => setSelectedQueryType(type.id)}
          >
            <div className="query-type-icon">{type.icon}</div>
            <div className="query-type-name">{type.name}</div>
            <div className="query-type-energy">~{type.energy.toFixed(2)} kWh</div>
          </div>
        ))}
      </div>
      
      <button 
        className="query-submit-button"
        onClick={handleQuerySubmit}
        disabled={!selectedQueryType}
      >
        Submit Query
      </button>
      
      {showEnergyPopup && (
        <div className="energy-popup">
          <div className="energy-popup-content">
            <h4>Energy Usage</h4>
            <p>This query used {energyUsed.toFixed(2)} kWh of energy</p>
            <button onClick={() => setShowEnergyPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuerySimulator;
