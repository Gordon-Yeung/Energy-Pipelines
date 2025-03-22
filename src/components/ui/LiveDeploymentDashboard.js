import React, { useState, useEffect } from 'react';
import FinalInsight from './FinalInsight';

const LiveDeploymentDashboard = ({ 
  onClose, 
  initialUsers = 0, 
  initialQueries = 0,
  onUpdateResources 
}) => {
  const [users, setUsers] = useState(initialUsers);
  const [queries, setQueries] = useState(initialQueries);
  const [growthRate, setGrowthRate] = useState(1);
  const [showFinalInsight, setShowFinalInsight] = useState(false);
  const [hasShownInsight, setHasShownInsight] = useState(false);
  
  useEffect(() => {
    // Only start the interval if we haven't shown the insight yet
    if (!hasShownInsight) {
      const interval = setInterval(() => {
        // Update users and queries with growth rate
        setUsers(prev => {
          const newUsers = prev + (Math.random() * 10 * growthRate);
          return Math.floor(newUsers);
        });
        
        setQueries(prev => {
          const newQueries = prev + (Math.random() * 50 * growthRate);
          return Math.floor(newQueries);
        });
        
        // Update resources based on queries
        const resourceUpdate = {
          power: queries * 0.1,
          water: queries * 0.2,
          co2: queries * 0.05
        };
        onUpdateResources(resourceUpdate);
        
        // Show final insight when users > 1000 and queries > 5000
        if (users > 1000 && queries > 5000 && !hasShownInsight) {
          setShowFinalInsight(true);
          setHasShownInsight(true);
          clearInterval(interval); // Stop the interval when showing insight
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [users, queries, growthRate, hasShownInsight, onUpdateResources]);
  
  const handleSpeedUp = () => {
    setGrowthRate(prev => prev * 2);
  };
  
  const handleCloseInsight = () => {
    setShowFinalInsight(false);
    onClose(); // Close the entire dashboard when insight is closed
  };
  
  return (
    <div className="live-deployment-dashboard">
      <div className="dashboard-header">
        <h2>Live Deployment Dashboard</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{users.toLocaleString()}</div>
          <div className="stat-label">Active Users</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-value">{queries.toLocaleString()}</div>
          <div className="stat-label">Total Queries</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-value">{growthRate}x</div>
          <div className="stat-label">Growth Rate</div>
        </div>
      </div>
      
      <button 
        className="speed-up-button"
        onClick={handleSpeedUp}
      >
        Speed Up Growth
      </button>
      
      {/* Use the FinalInsight component directly in a modal wrapper */}
      {showFinalInsight && (
        <div className="final-insight-popup">
          <div className="final-insight-content">
            <FinalInsight />
            <button onClick={handleCloseInsight}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveDeploymentDashboard; 