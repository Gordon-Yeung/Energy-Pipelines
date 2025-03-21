// components/EnergyPipeline.js
import React, { useState, useEffect } from 'react';
import IntroStage from './stages/introstages/IntroStage';
import DataCollectionStage from './stages/introstages/DataCollectionStage';
import TrainingStage from './stages/TrainingStage';
import EmissionsStage from './stages/EmissionsStage';
import DeploymentStage from './stages/DeploymentStage';
import MessagePopup from './ui/MessagePopUp';
import ProgressTracker from './ui/ProgressTracker';
import TrainingCompletePopup from './ui/TrainingCompletePopup';
import './EnergyPipeline.css';

const EnergyPipeline = () => {
  // State variables
  const [stage, setStage] = useState(0);
  const [dataAmount, setDataAmount] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [powerUsed, setPowerUsed] = useState(0);
  const [waterUsed, setWaterUsed] = useState(0);
  const [co2Emitted, setCo2Emitted] = useState(0);
  const [queryCount, setQueryCount] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [training, setTraining] = useState(false);
  const [gpuCount, setGpuCount] = useState(4);
  const [showTrainingComplete, setShowTrainingComplete] = useState(false);

  // Data for comparisons and messages
  const comparisons = {
    books: [
      { threshold: 20, text: "as many books as a small public library" },
      { threshold: 50, text: "comparable to a university department's library" },
      { threshold: 100, text: "equivalent to all books published in the US last year" },
      { threshold: 200, text: "about half of the Library of Congress collection" }
    ],
    water: [
      { threshold: 100, text: "enough to fill a backyard swimming pool" },
      { threshold: 1000, text: "equivalent to 1 Olympic swimming pool" },
      { threshold: 10000, text: "the daily water consumption of a small town" },
      { threshold: 100000, text: "enough for a year of showers for 500 people" }
    ],
    power: [
      { threshold: 50, text: "enough to power a home for a month" },
      { threshold: 500, text: "equivalent to charging 40,000 smartphones" },
      { threshold: 5000, text: "the monthly electricity use of a small data center" },
      { threshold: 50000, text: "enough to power 5,000 homes for a day" }
    ]
  };
  
  // Get a comparison text based on current value
  const getComparison = (type, value) => {
    const matches = comparisons[type].filter(comp => value >= comp.threshold);
    return matches.length > 0 ? matches[matches.length - 1].text : "";
  };

  // Start the training process
  const startTraining = () => {
    if (dataAmount < 10) {
      setMessage("You need at least 10GB of data to start training.");
      setShowMessage(true);
      return;
    }
    
    setStage(2);
    setTraining(true);
    setMessage("Training started. GPUs are consuming energy...");
    setShowMessage(true);
  };
  
  // Add GPU resources to accelerate training
  const addGpus = (count) => {
    const newCount = gpuCount + count;
    setGpuCount(newCount);
    setMessage(`Scaled up to ${newCount} GPUs. Training speed increased, but power consumption has grown exponentially!`);
    setShowMessage(true);
  };

  // Training effect simulation
  useEffect(() => {
    let interval = null;
    
    if (training && trainingProgress < 100) {
      interval = setInterval(() => {
        setTrainingProgress(prev => {
          // Adjust speed based on GPU count - more GPUs = faster training
          const speedFactor = Math.log2(gpuCount) / 2;
          const increment = speedFactor * (0.5 / Math.sqrt(dataAmount));
          const newValue = Math.min(100, prev + increment);
          
          // Resource consumption increases with each step, scaled by GPU count
          const powerScale = gpuCount / 4; // Base scaling for initial 4 GPUs
          const powerInc = powerScale * (dataAmount / 50) * increment;
          
          // Water usage starts slower but ramps up with progress and GPU count
          const waterScale = Math.pow(newValue / 25, 1.5); // Exponential scaling with progress
          const waterInc = powerScale * (dataAmount / 100) * increment * waterScale;
          
          // CO2 emissions stay proportional to power usage
          const co2Inc = powerInc * 0.4; // ~0.4 kg CO2 per kWh (average grid mix)
          
          setPowerUsed(p => p + powerInc);
          setWaterUsed(w => w + waterInc);
          setCo2Emitted(c => c + co2Inc);
          
          // Show milestone messages
          if (Math.floor(prev / 10) !== Math.floor(newValue / 10)) {
            const milestoneIndex = Math.floor(newValue / 10);
            if (milestoneIndex > 0 && milestoneIndex <= 10) {
              const milestones = [
                "GPUs are heating up rapidly. Cooling systems activated.",
                `Water cooling is now using ${Math.round(waterUsed + waterInc)} liters - ${getComparison('water', waterUsed + waterInc)}`,
                `Power consumption has reached ${Math.round(powerUsed + powerInc)} kWh - ${getComparison('power', powerUsed + powerInc)}`,
                "Heat generation is increasing. More water being diverted to cooling.",
                "Halfway through training. Carbon footprint is substantial.",
                `CO₂ emissions now at ${Math.round(co2Emitted + co2Inc)} kg, equivalent to ${Math.round((co2Emitted + co2Inc)/2)} NY-London flights`,
                `Water cooling has used ${Math.round((waterUsed + waterInc)/1000)}K liters - that's enough drinking water for ${Math.round((waterUsed + waterInc)/500)} people per day`,
                "Training at 70%. Environmental impact continues to accumulate.",
                "Almost complete. Final calculations and model optimization in progress.",
                "Training complete! Your model is ready for deployment."
              ];
              
              setMessage(milestones[milestoneIndex - 1]);
              setShowMessage(true);
            }
          }
          
          // Complete training
          if (newValue >= 100) {
            clearInterval(interval);
            setTraining(false);
            setShowTrainingComplete(true);
            return 100;
          }
          
          return newValue;
        });
      }, 300);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [training, dataAmount, gpuCount, waterUsed, powerUsed, co2Emitted]);
  
  // Update data amount
  const updateDataAmount = (amount) => {
    setDataAmount(prev => prev + amount);
    
    const newTotal = dataAmount + amount;
    const bookComparison = getComparison('books', newTotal);
    
    setMessage(`Added ${amount}GB of data. Total: ${newTotal}GB - ${bookComparison}`);
    setShowMessage(true);
  };
  
  // Simulate a query in the deployment stage
  const simulateQuery = () => {
    const queryCost = 0.02 * (1 + (dataAmount / 100));
    setPowerUsed(p => p + queryCost);
    setCo2Emitted(c => c + (queryCost * 0.4));
    setQueryCount(q => q + 1);
    
    if (queryCount === 0) {
      setMessage(`This query used ${queryCost.toFixed(2)} kWh. Imagine billions of these daily!`);
    } else if (queryCount === 5) {
      setMessage("At scale, inference energy costs can surpass training costs. Many tech companies now face this challenge.");
    } else {
      setMessage(`Query #${queryCount + 1} used ${queryCost.toFixed(2)} kWh of energy.`);
    }
    setShowMessage(true);
  };
  
  // Reset the simulation
  const resetSimulation = () => {
    setStage(1);
    setDataAmount(0);
    setTrainingProgress(0);
    setPowerUsed(0);
    setWaterUsed(0);
    setCo2Emitted(0);
    setQueryCount(0);
    setGpuCount(4);
    setTraining(false);
    setMessage("Simulation reset. Drag data to the computer to begin.");
    setShowMessage(true);
  };
  
  // Start the experience
  const startExperience = () => {
    setStage(1);
    setMessage("Drag data sources to the computer to start training your model.");
    setShowMessage(true);
  };
  
  // Close message popup
  const closeMessage = () => {
    setShowMessage(false);
  };

  // Handle proceeding to emissions stage
  const handleProceedToEmissions = () => {
    setShowTrainingComplete(false);
    setStage(3);
  };

  return (
    <div className="energy-pipeline-container">
      <h1 className="main-title">The Energy Pipeline – How Does an LLM Get Born?</h1>
      
      {/* Progress tracker */}
      <ProgressTracker 
        currentStage={stage} 
        onStageClick={(newStage) => {
          setStage(newStage);
          if (newStage === 0) {
            // Reset state when going back to intro
            setDataAmount(0);
            setTrainingProgress(0);
            setPowerUsed(0);
            setWaterUsed(0);
            setCo2Emitted(0);
            setQueryCount(0);
            setGpuCount(4);
            setTraining(false);
            setMessage("Welcome back! Start your journey again.");
            setShowMessage(true);
          }
        }}
      />
      
      {/* Stage content */}
      {stage === 0 && (
        <IntroStage onStart={startExperience} />
      )}
      
      {stage === 1 && (
        <DataCollectionStage 
          dataAmount={dataAmount} 
          onAddData={updateDataAmount}
          onStartTraining={startTraining}
          getBookComparison={() => getComparison('books', dataAmount)}
        />
      )}
      
      {stage === 2 && (
        <TrainingStage 
          stage={stage}
          trainingProgress={trainingProgress}
          powerUsed={powerUsed}
          waterUsed={waterUsed}
          co2Emitted={co2Emitted}
          gpuCount={gpuCount}
          onAddGpus={addGpus}
          getPowerComparison={() => getComparison('power', powerUsed)}
          getWaterComparison={() => getComparison('water', waterUsed)}
        />
      )}

      {stage === 3 && (
        <EmissionsStage 
          dataAmount={dataAmount}
          powerUsed={powerUsed}
          waterUsed={waterUsed}
          co2Emitted={co2Emitted}
          onProceedToDeployment={() => {
            setStage(4);
            setMessage("Welcome to the deployment stage. Let's see the ongoing environmental costs of your model.");
            setShowMessage(true);
          }}
        />
      )}
      
      {stage === 4 && (
        <DeploymentStage 
          dataAmount={dataAmount}
          powerUsed={powerUsed}
          waterUsed={waterUsed}
          co2Emitted={co2Emitted}
          queryCount={queryCount}
          onSimulateQuery={simulateQuery}
          onReset={resetSimulation}
        />
      )}
      
      {/* Training completion popup */}
      {showTrainingComplete && (
        <TrainingCompletePopup
          powerUsed={powerUsed}
          waterUsed={waterUsed}
          co2Emitted={co2Emitted}
          onProceed={handleProceedToEmissions}
          onClose={() => setShowTrainingComplete(false)}
        />
      )}
      
      {/* Message popup */}
      {showMessage && !showTrainingComplete && (
        <MessagePopup message={message} onClose={closeMessage} />
      )}
    </div>
  );
};

export default EnergyPipeline;