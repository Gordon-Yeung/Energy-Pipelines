// components/ui/ResourceMeter.js
import React from 'react';

const ResourceMeter = ({ label, value, unit, maxValue, color, comparison, detailedComparison }) => {
  const percentage = Math.min(100, (value / maxValue) * 100);
  
  return (
    <div className="resource-meter">
      <div className="resource-meter-header">
        <span>{label}</span>
        <span>{value} {unit}</span>
      </div>
      <div className="resource-meter-bar">
        <div 
          className={`resource-meter-progress ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="resource-meter-comparison">{comparison}</div>
      {detailedComparison && (
        <div className="resource-meter-detailed">{detailedComparison}</div>
      )}
    </div>
  );
};


