import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button, Card } from 'react-bootstrap';

function PairComparison() {
  const location = useLocation();
  const { projectName, criteria = [] } = location.state;
  const [pairwiseComparisons, setPairwiseComparisons] = useState({});
  const [results, setResults] = useState(null);  // Correctly define results and its setter

  useEffect(() => {
    const initialComparisons = {};

    // Initialize comparisons for criteria
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

    // Initialize comparisons for sub-criteria within each criterion
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
    const inverseValue = numericValue ? 1 / numericValue : 0; // Prevent division by zero

    let inverseKey;
    if (key.includes(':')) { // Handling sub-criteria
      const parts = key.split(': ');
      const subParts = parts[1].split(' vs ');
      inverseKey = `${parts[0]}: ${subParts[1]} vs ${subParts[0]}`;
    } else { // Handling criteria
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

  const renderMatrixTable = (criteriaList, title, isSubCriteria = false) => (
    <Card className="mb-3">
      <Card.Header><strong>{title}</strong></Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              {criteriaList.map(crit => <th key={crit}>{crit}</th>)}
            </tr>
          </thead>
          <tbody>
            {criteriaList.map((crit, i) => (
              <tr key={i}>
                <td>{crit}</td>
                {criteriaList.map((compareCrit, j) => (
                  <td key={j}>
                    {i !== j ? (
                      <Form.Control
                        type="number"
                        min="1"
                        max="9"
                        value={pairwiseComparisons[isSubCriteria ? `${title}: ${crit} vs ${compareCrit}` : `${crit} vs ${compareCrit}`] || 1}
                        onChange={(e) => handleInputChange(isSubCriteria ? `${title}: ${crit} vs ${compareCrit}` : `${crit} vs ${compareCrit}`, e.target.value)}
                      />
                    ) : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2>Pairwise Comparisons for {projectName}</h2>
          {renderMatrixTable(criteria.map(crit => crit.name), 'Criteria Comparisons')}
          {criteria.map(crit => 
            crit.subCriteria && crit.subCriteria.length > 1 &&
            renderMatrixTable(crit.subCriteria, `${crit.name} Sub-Criteria Comparisons`, true)
          )}
          <Button onClick={handleSubmit} className="mt-3">Calculate Weights</Button>
          {results && (
            <Card className="mt-4">
              <Card.Header><strong>Calculated Weights</strong></Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Criteria / Sub-Criteria</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteria.map(criterion => (
                      <>
                        <tr key={criterion.name}>
                          <td>{criterion.name}</td>
                          <td>{results[criterion.name]}</td>
                        </tr>
                        {criterion.subCriteria && criterion.subCriteria.map(sub => (
                          <tr key={sub}>
                            <td style={{ paddingLeft: '20px' }}>{sub}</td>
                            <td>{results[`${criterion.name}: ${sub}`]}</td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PairComparison;
