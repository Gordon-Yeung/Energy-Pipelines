import React from 'react';
import CarbonComparison from '../ui/CarbonComparison';

const EmissionsStage = ({ co2Emitted }) => {
  return (
    <div className="emissions-stage">
      <h2>Carbon Emissions Impact</h2>
      <CarbonComparison co2Amount={co2Emitted} />
    </div>
  );
};

export default EmissionsStage; 