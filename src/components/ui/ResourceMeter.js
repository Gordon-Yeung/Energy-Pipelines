// components/ui/ResourceMeter.js
import React from 'react';

const ResourceMeter = ({ 
  label, 
  value, 
  unit, 
  maxValue, 
  color, 
  comparison,
  detailedComparison 
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="resource-meter">
      <div className="meter-header">
        <span className="meter-label">{label}</span>
        <span className="meter-value">{value} {unit}</span>
      </div>
      <div className="meter-bar-container">
        <div 
          className={`meter-bar ${color}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      {comparison && (
        <div className="meter-comparison">
          {comparison}
        </div>
      )}
      {detailedComparison && (
        <div className="meter-detailed-comparison">
          {detailedComparison}
        </div>
      )}
    </div>
  );
};

export default ResourceMeter;


