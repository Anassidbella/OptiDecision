import React, { useState } from 'react';


function ComparisonInput({ names, onSubmit }) {
    const [comparisons, setComparisons] = useState({});
  
    const handleComparisonChange = (name1, name2, value) => {
      setComparisons(prev => ({
        ...prev,
        [`${name1}-${name2}`]: value,
        [`${name2}-${name1}`]: 1 / value
      }));
    };
  
    const handleSubmit = () => {
      onSubmit(comparisons);
    };
  
    return (
      <div>
        <h2>Enter Comparisons</h2>
        {names.map((name1, index1) => (
          names.slice(index1 + 1).map((name2, index2) => (
            <div key={`${name1}-${name2}`}>
              <label>{name1} vs {name2}:</label>
              <input type="number" min="0" step="0.01" onChange={(e) => handleComparisonChange(name1, name2, parseFloat(e.target.value))} />
            </div>
          ))
        ))}
        <button onClick={handleSubmit}>Next</button>
      </div>
    );
  }

export default ComparisonInput