import React from 'react';

function EvaluationResults({ criteriaData }) {
  return (
    <div>
      <h2>Hierarchy Evaluation Results</h2>
      {criteriaData.map((criterion) => (
        <div key={criterion.name}>
          <h3>{criterion.name}</h3>
          <p>Global Weight: {criterion.global_weight}</p>
          <h4>Subcriteria:</h4>
          <ul>
            {criterion.subcriteria.map((subcriterion) => (
              <li key={subcriterion.name}>
                {subcriterion.name}: {subcriterion.weight}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EvaluationResults;
