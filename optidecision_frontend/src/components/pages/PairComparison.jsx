import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PairComparison() {
  const location = useLocation();
  const { projectName, criteria = [] } = location.state;
  const [pairwiseComparisons, setPairwiseComparisons] = useState({});
  const [results, setResults] = useState(null);

  useEffect(() => {
    const initialComparisons = {};

    criteria.forEach((criterion, i) => {
      criteria.forEach((compareCriterion, j) => {
        if (i !== j) {
          const key1 = `${criterion.name} vs ${compareCriterion.name}`;
          const key2 = `${compareCriterion.name} vs ${criterion.name}`;
          initialComparisons[key1] = 1;
          initialComparisons[key2] = 1;
        }
      });
    });

    criteria.forEach(criterion => {
      if (criterion.subCriteria) {
        criterion.subCriteria.forEach((sub, i) => {
          criterion.subCriteria.forEach((compareSub, j) => {
            if (i !== j) {
              const key1 = `${criterion.name}: ${sub} vs ${compareSub}`;
              const key2 = `${criterion.name}: ${compareSub} vs ${sub}`;
              initialComparisons[key1] = 1;
              initialComparisons[key2] = 1;
            }
          });
        });
      }
    });

    setPairwiseComparisons(initialComparisons);
  }, [criteria]);

  const handleInputChange = (key, value) => {
    const numericValue = Number(value);
    const inverseValue = numericValue ? 1 / numericValue : 0;

    let inverseKey;
    if (key.includes(':')) {
      const parts = key.split(': ');
      const subParts = parts[1].split(' vs ');
      inverseKey = `${parts[0]}: ${subParts[1]} vs ${subParts[0]}`;
    } else {
      const parts = key.split(' vs ');
      inverseKey = `${parts[1]} vs ${parts[0]}`;
    }

    setPairwiseComparisons(prev => ({
      ...prev,
      [key]: numericValue,
      [inverseKey]: inverseValue
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/weights/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ pairwiseComparisons }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Failed to calculate weights:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-semibold text-center text-[#6C0345] mb-6">{projectName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {criteria.map((criterion, index) => (
        <div key={criterion.name} className={`bg-white rounded-lg shadow-md overflow-hidden ${index === 2 ? 'md:col-start-1 md:col-end-3 justify-self-center' : ''}`}>
              <h3 className="text-lg font-semibold px-4 py-3 text-white bg-[#DC6B19]">{criterion.name}</h3>
              <div className="p-4">
                <table className="w-full text-center">
                  <thead>
                    <tr>
                      <th></th>
                      {criteria.map(compareCriterion => (
                        <th key={compareCriterion.name}>{compareCriterion.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {criterion.subCriteria && criterion.subCriteria.map(sub => (
                      <tr key={sub}>
                        <td>{sub}</td>
                        {criteria.map(compareCriterion => (
                          <td key={compareCriterion.name}>
                            {criterion !== compareCriterion && (
                              <input
                                type="number"
                                min="1"
                                max="9"
                                value={pairwiseComparisons[`${criterion.name}: ${sub} vs ${compareCriterion.name}`] || 1}
                                onChange={(e) => handleInputChange(`${criterion.name}: ${sub} vs ${compareCriterion.name}`, e.target.value)}
                                className="w-12 py-1 px-2 border rounded-md"
                              />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
        <button 
          onClick={handleSubmit} 
          className="px-4 py-2 bg-[#6C0345] text-white rounded-2xl hover:bg-[#4E022E] transition duration-300 ease-in-out  animate-twice animate-infinite animate-duration-1000 transform hover:scale-125"
          >
          Calculate Weights
        </button>
        </div>
        {results && (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold text-center mb-4">Calculated Weights</h3>
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#F7C566]">
          <tr>
            <th className="px-6 py-3 text-left">Criteria / Sub-Criteria</th>
            <th className="px-6 py-3 text-left">Weight</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, index) => (
            <React.Fragment key={criterion.name}>
              <tr className='bg-[#FFF8DC]'>
                <td className="px-6 py-4 font-semibold">{criterion.name}</td>
                <td className="px-6 py-4">{results[criterion.name]}</td>
              </tr>
              {criterion.subCriteria && criterion.subCriteria.map(sub => (
                <tr key={`${criterion.name}-${sub}`} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="pl-12 py-2">{sub}</td>
                  <td className="px-6 py-2">{results[`${criterion.name}: ${sub}`]}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )}

      </div>
    </div>
  );
}

export default PairComparison;
