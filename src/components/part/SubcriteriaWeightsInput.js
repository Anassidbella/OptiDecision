import React, { useState } from 'react';

function SubcriteriaWeightsInput({ criteriaNames, onSubmit }) {
  const [subcriteriaData, setSubcriteriaData] = useState({});

  const handleNumSubcriteriaChange = (criterionName, e) => {
    const numSubcriteria = parseInt(e.target.value);
    setSubcriteriaData(prev => ({
      ...prev,
      [criterionName]: {
        numSubcriteria,
        subcriteriaWeights: Array.from({ length: numSubcriteria }, () => 1) // Initialize weights to 1
      }
    }));
  };

  const handleWeightChange = (criterionName, subcriterionIndex, value) => {
    setSubcriteriaData(prev => ({
      ...prev,
      [criterionName]: {
        ...prev[criterionName],
        subcriteriaWeights: prev[criterionName].subcriteriaWeights.map((weight, index) => index === subcriterionIndex ? value : weight)
      }
    }));
  };

  const handleSubmit = () => {
    onSubmit(subcriteriaData);
  };

  return (
    <div>
      <h2>Enter Subcriteria Weights</h2>
      {criteriaNames.map((criterionName) => (
        <div key={criterionName}>
          <h3>{criterionName}</h3>
          <label>Number of Subcriteria:</label>
          <input type="number" min="0" onChange={(e) => handleNumSubcriteriaChange(criterionName, e)} />
          {subcriteriaData[criterionName] && Array.from({ length: subcriteriaData[criterionName].numSubcriteria }).map((_, index) => (
            <div key={index}>
              <label>{`Subcriterion ${index + 1} Weight:`}</label>
              <input type="number" min="0" step="0.01" onChange={(e) => handleWeightChange(criterionName, index, parseFloat(e.target.value))} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default SubcriteriaWeightsInput;
