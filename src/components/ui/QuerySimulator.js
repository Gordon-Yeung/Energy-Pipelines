import React from 'react';

const QuerySimulator = ({ onSimulateQuery, queryCount }) => {
  return (
    <div className="query-simulator">
      <h3>Query Simulator</h3>
      <div className="query-info">
        <span>Queries Run: {queryCount}</span>
      </div>
      <button 
        className="simulate-query-button"
        onClick={onSimulateQuery}
      >
        Run Query
      </button>
    </div>
  );
};

export default QuerySimulator; 