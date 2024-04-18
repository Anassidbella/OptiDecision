import React, { useState } from 'react';

function CriterionInput({ onSubmit }) {
  const [numCriteria, setNumCriteria] = useState(0);
  const [criteriaNames, setCriteriaNames] = useState([]);

  const handleNumCriteriaChange = (e) => {
    setNumCriteria(parseInt(e.target.value));
    setCriteriaNames([]);
  };

  const handleCriterionNameChange = (index, e) => {
    const newNames = [...criteriaNames];
    newNames[index] = e.target.value;
    setCriteriaNames(newNames);
  };

  const handleSubmit = () => {
    onSubmit(criteriaNames);
  };

  return (
    <div>
      <h2>Enter Criteria</h2>
      <label htmlFor="numCriteria">Number of Criteria:</label>
      <input type="number" id="numCriteria" value={numCriteria} onChange={handleNumCriteriaChange} />
      {Array.from({ length: numCriteria }).map((_, index) => (
        <div key={index}>
          <label htmlFor={`criterionName${index}`}>Criterion {index + 1} Name:</label>
          <input type="text" id={`criterionName${index}`} value={criteriaNames[index] || ''} onChange={(e) => handleCriterionNameChange(index, e)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default CriterionInput;