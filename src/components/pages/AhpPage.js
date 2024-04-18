import React, { useState } from 'react';
import CriterionInput from '../part/CriterionInput';
import ComparisonInput from '../part/ComparisonInput';
import SubcriteriaWeightsInput from '../part/SubcriteriaWeightsInput';
import EvaluationResults from '../part/EvaluationResults'
const AhpPage = () => {
    const [step, setStep] = useState(1);
    const [criteriaNames, setCriteriaNames] = useState([]);
    const [comparisons, setComparisons] = useState({});
    const [subcriteriaWeights, setSubcriteriaWeights] = useState({});
    const [criteriaData, setCriteriaData] = useState([]); // Add state for criteriaData

    const handleCriterionSubmit = (names) => {
        setCriteriaNames(names);
        setStep(2);
    };

    const handleComparisonSubmit = (data) => {
        setComparisons(data);
        setStep(3);
    };

    const handleSubcriteriaWeightsSubmit = (weights) => {
        setSubcriteriaWeights(weights);
        // Here you could send all collected data to the backend for further processing
        // Then you can move to the next step or display the results
        // For now, let's just log the collected data
        console.log("Collected Data:", {
            criteriaNames,
            comparisons,
            subcriteriaWeights
        });
    evaluateHierarchy(criteriaNames, weights); // You can call a function to evaluate hierarchy here
    setStep(4);
    };

    const evaluateHierarchy = (criteriaNames, subcriteriaWeights) => {
        // Logic to calculate hierarchy evaluation results
        // Update criteriaData state with the evaluation results
        const evaluatedCriteriaData = [...criteriaData]; // Assuming criteriaData is an array of objects with structure similar to criteriaData in your code
        // Perform calculations and update evaluatedCriteriaData
        setCriteriaData(evaluatedCriteriaData);
      };

    return (
        <div>
            {step === 1 && <CriterionInput onSubmit={handleCriterionSubmit} />}
            {step === 2 && <ComparisonInput names={criteriaNames} onSubmit={handleComparisonSubmit} />}
            {step === 3 && <SubcriteriaWeightsInput criteriaNames={criteriaNames} onSubmit={handleSubcriteriaWeightsSubmit} />} {/* Pass criteriaNames to SubcriteriaWeightsInput */}
            {step === 4 && <EvaluationResults criteriaData={criteriaData} />}

        </div>
    );
}

export default AhpPage;
