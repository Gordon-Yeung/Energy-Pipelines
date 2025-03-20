// components/ui/CarbonComparison.js
import React from 'react';

const CarbonComparison = ({ co2Amount }) => {
  // Calculate various impacts
  const flights = Math.round(co2Amount / 2);
  const drivingMiles = Math.round(co2Amount * 250);
  const treePlanting = Math.round(co2Amount / 0.06); // Trees needed to offset (avg 60kg per tree over 10 years)
  const homeEnergy = Math.round(co2Amount / 3.5); // Average home monthly emissions in CO2 kg
  
  return (
    <div className="carbon-comparison">
      <h3 className="carbon-comparison-title">Carbon Footprint Comparison</h3>
      <div className="carbon-impact-grid">
        <div className="carbon-impact-item">
          <div className="impact-icon">✈️</div>
          <div className="impact-text">
            <strong>{flights}</strong> round-trip flights from NY to London
          </div>
        </div>
        
        <div className="carbon-impact-item">
          <div className="impact-icon">🚗</div>
          <div className="impact-text">
            <strong>{drivingMiles}</strong> miles driven in a gasoline car
          </div>
        </div>
        
        <div className="carbon-impact-item">
          <div className="impact-icon">🏠</div>
          <div className="impact-text">
            <strong>{homeEnergy}</strong> months of average home energy usage
          </div>
        </div>
        
        <div className="carbon-impact-item">
          <div className="impact-icon">🌳</div>
          <div className="impact-text">
            <strong>{treePlanting}</strong> trees planted for 10 years to offset
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonComparison;