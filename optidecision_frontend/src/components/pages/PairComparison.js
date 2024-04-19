import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button, Card } from 'react-bootstrap';

function PairComparison() {
  const location = useLocation();
  const { projectName, criteria = [] } = location.state;
  const [pairwiseComparisons, setPairwiseComparisons] = useState({});
  const [results, setResults] = useState(null);

  useEffect(() => {
    const initialComparisons = {};

    // Generate comparisons for every pair of criteria
    for (let i = 0; i < criteria.length; i++) {
      for (let j = i + 1; j < criteria.length; j++) {
        const key1 = `${criteria[i].name} vs ${criteria[j].name}`;
        const key2 = `${criteria[j].name} vs ${criteria[i].name}`;
        initialComparisons[key1] = 1;
        initialComparisons[key2] = 1;
      }
      // Generate comparisons for sub-criteria within each criterion
      criteria[i].subCriteria.forEach((sub, idx) => {
        criteria[i].subCriteria.forEach((compareSub, compIdx) => {
          if (idx !== compIdx) {
            const key = `${criteria[i].name}: ${sub} vs ${compareSub}`;
            initialComparisons[key] = 1;
          }
        });
      });
    }

    setPairwiseComparisons(initialComparisons);
  }, [criteria]);

  const handleInputChange = (key, value) => {
    setPairwiseComparisons(prev => ({ ...prev, [key]: Number(value) }));
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

  const renderPairwiseTable = (criteriaList, title) => (
    <Card className="mb-3">
      <Card.Header><strong>{title}</strong></Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Comparison</th>
              <th>Value (1-9)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(criteriaList).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <Form.Control
                    type="number"
                    min="1"
                    max="9"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  const renderResults = () => (
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
                {criterion.subCriteria.map(sub => (
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
  );

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2>Pairwise Comparisons for {projectName}</h2>
          {Object.keys(pairwiseComparisons).filter(key => !key.includes(':')).length > 0 && renderPairwiseTable(
            Object.fromEntries(Object.entries(pairwiseComparisons).filter(([key]) => !key.includes(':'))),
            'Criteria Comparisons'
          )}
          {Object.keys(pairwiseComparisons).filter(key => key.includes(':')).length > 0 && renderPairwiseTable(
            Object.fromEntries(Object.entries(pairwiseComparisons).filter(([key]) => key.includes(':'))),
            'Sub-Criteria Comparisons'
          )}
          <Button onClick={handleSubmit} className="mt-3">Calculate Weights</Button>
          {results && renderResults()}
        </Col>
      </Row>
    </Container>
  );
}

export default PairComparison;
