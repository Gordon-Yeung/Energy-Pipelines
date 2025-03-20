// components/ui/DataMeter.js
import React from 'react';

const DataMeter = ({ dataAmount, comparison }) => {
  return (
    <div className="data-meter">
      <div className="data-meter-header">
        <span>Data Amount</span>
        <span>{dataAmount} GB</span>
      </div>
      <div className="data-meter-bar">
        <div 
          className="data-meter-progress"
          style={{ width: `${Math.min(100, dataAmount)}%` }}
        ></div>
      </div>
      <div className="data-meter-comparison">
        {dataAmount > 0 
          ? comparison || `Equivalent to approximately ${dataAmount * 10000} books`
          : 'Drag data sources to begin'}
      </div>
    </div>
  );
};

export default DataMeter;