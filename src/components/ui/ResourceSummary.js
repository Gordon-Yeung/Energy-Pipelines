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

export default ResourceSummary;