// components/ui/DataSource.js
import React from 'react';

const DataSource = ({ source, onDragStart }) => {
  return (
    <div 
      className={`data-source ${source.color}`}
      draggable
      onDragStart={(e) => onDragStart(e, source)}
    >
      <div className="data-source-emoji">{source.emoji}</div>
      <div className="data-source-name">{source.name}</div>
      <div className="data-source-size">{source.size} GB</div>
      <div className="data-source-description">{source.description}</div>
    </div>
  );
};

export default DataSource;