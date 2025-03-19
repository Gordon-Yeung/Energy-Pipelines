// components/stages/DataCollectionStage.js
import React, { useState } from 'react';
import DataSource from '../ui/DataSource';
import ComputerDropZone from '../ui/ComputerDropZone';
import DataMeter from '../ui/DataMeter';

const DataCollectionStage = ({ dataAmount, onAddData, onStartTraining, getBookComparison }) => {
  const [draggingItem, setDraggingItem] = useState(null);
  
  // Data sources with visual properties
  const dataSources = [
    { 
      id: 1, 
      name: "Books & Literature", 
      size: 5, 
      emoji: "📚", 
      color: "bg-amber-100",
      description: "Classic literature, academic textbooks, fiction novels"
    },
    { 
      id: 2, 
      name: "Web Data", 
      size: 15, 
      emoji: "🌐", 
      color: "bg-blue-100",
      description: "Websites, blogs, articles, documentation"
    },
    { 
      id: 3, 
      name: "Research Papers", 
      size: 10, 
      emoji: "📑", 
      color: "bg-green-100",
      description: "Scientific papers, journals, conference proceedings"
    },
    { 
      id: 4, 
      name: "Social Media", 
      size: 20, 
      emoji: "💬", 
      color: "bg-purple-100",
      description: "Posts, comments, discussions, tweets"
    },
    { 
      id: 5, 
      name: "Code Repositories", 
      size: 12, 
      emoji: "💻", 
      color: "bg-gray-100",
      description: "Open source code, documentation, tutorials"
    },
    { 
      id: 6, 
      name: "Wikipedia", 
      size: 8, 
      emoji: "🔍", 
      color: "bg-yellow-100",
      description: "Encyclopedia entries, references, facts"
    }
  ];
  
  // Handle drag start
  const handleDragStart = (e, source) => {
    setDraggingItem(source);
    
    // Make the drag image transparent (for better UX)
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  
  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('active-dropzone');
  };
  
  // Handle drag leave
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('active-dropzone');
  };
  
  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('active-dropzone');
    
    if (draggingItem) {
      onAddData(draggingItem.size);
      setDraggingItem(null);
    }
  };

  return (
    <div className="data-collection-stage">
      <h2 className="stage-title">Step 1: Data Collection – "Feed the Model"</h2>
      <p className="stage-description">
        Drag different data sources to the computer to build your training dataset.
        The more diverse your data, the more capable your model, but larger datasets
        will require significantly more resources to train.
      </p>
      
      <div className="data-collection-container">
        {/* Left side: Data Sources */}
        <div className="data-sources-container">
          <h3 className="section-title">Available Data Sources</h3>
          <div className="data-sources-grid">
            {dataSources.map(source => (
              <DataSource 
                key={source.id}
                source={source}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
        
        {/* Right side: Computer and Metrics */}
        <div className="computer-container">
          <h3 className="section-title">Training Computer</h3>
          
          <ComputerDropZone 
            dataAmount={dataAmount}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
          
          <DataMeter 
            dataAmount={dataAmount}
            comparison={getBookComparison()}
          />
          
          {dataAmount > 0 && (
            <button 
              className="start-training-button"
              onClick={onStartTraining}
            >
              Start Training
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataCollectionStage;