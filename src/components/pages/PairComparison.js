import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

function PairComparison() {
  const location = useLocation();
  const { projectName, criteria } = location.state; // Assuming state is passed correctly
  const [pairwiseComparisons, setPairwiseComparisons] = useState({});
  console.log(location.state); // Add this to see what's received


  // Initialize the pairwise comparisons data structure
  useEffect(() => {
    const initialComparisons = {};
    criteria.forEach((criterion, i) => {
      criterion.subCriteria.forEach((subCriterion, j) => {
        criterion.subCriteria.forEach((_, k) => {
          if (j !== k) {
            const key = `${criterion.name}_${subCriterion}_${criterion.subCriteria[k]}`;
            initialComparisons[key] = ''; // Initialize with empty value
          }
        });
      });
    });
    setPairwiseComparisons(initialComparisons);
  }, [criteria]);

  const handleInputChange = (key, value) => {
    setPairwiseComparisons(prev => ({ ...prev, [key]: value }));
  };

  const renderPairwiseTable = () => {
    return criteria.map((criterion, idx) => (
      <div key={idx}>
        <h4>{criterion.name}</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Comparison</th>
              <th>Value (1-9)</th>
            </tr>
          </thead>
          <tbody>
            {criterion.subCriteria.map((subCriterion, subIdx) =>
              criterion.subCriteria.map((comparisonSub, compSubIdx) => {
                if (subIdx !== compSubIdx) {
                  const key = `${criterion.name}_${subCriterion}_${comparisonSub}`;
                  return (
                    <tr key={key}>
                      <td>{`${subCriterion} vs ${comparisonSub}`}</td>
                      <td>
                        <Form.Control
                          type="number"
                          min="1"
                          max="9"
                          value={pairwiseComparisons[key]}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                      </td>
                    </tr>
                  );
                }
                return null;
              })
            )}
          </tbody>
        </Table>
      </div>
    ));
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2>Pairwise Comparisons for {projectName}</h2>
          {renderPairwiseTable()}
          <Button onClick={() => console.log('Calculating weights...')}>Calculate Weights</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PairComparison;
