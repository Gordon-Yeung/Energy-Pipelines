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

export default FinalInsight;