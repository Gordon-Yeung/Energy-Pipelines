// components/stages/DataCollectionStage.js
import React from 'react';

const DataCollectionStage = ({ 
  dataAmount, 
  onAddData, 
  onStartTraining,
  getBookComparison 
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    // Simulate adding 20GB of data
    onAddData(20);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  return (
    <div className="data-collection-stage">
      <h2>Step 1: Data Collection</h2>
      
      <div className="data-sources">
        <div 
          className="data-source"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('text', 'data')}
        >
          📚 Books
        </div>
        <div 
          className="data-source"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('text', 'data')}
        >
          📄 Articles
        </div>
        <div 
          className="data-source"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('text', 'data')}
        >
          💬 Conversations
        </div>
      </div>

      <div 
        className="computer-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="computer-icon">💻</div>
        <p>Drop data here</p>
        {dataAmount > 0 && (
          <div className="data-amount">
            <span>{dataAmount} GB</span>
            <span className="comparison">{getBookComparison()}</span>
          </div>
        )}
      </div>

      {dataAmount >= 10 && (
        <button 
          className="start-training-button"
          onClick={onStartTraining}
        >
          Start Training
        </button>
      )}
    </div>
  );
};

export default DataCollectionStage;