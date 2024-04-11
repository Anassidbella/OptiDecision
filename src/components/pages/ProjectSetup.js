import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const predefinedProjects = [
  {
    name: 'Optimisation de la Chaine Logistique',
    criteria: [
      { name: 'Efficiency', subCriteria: ['Process', 'Energy Use'] },
      { name: 'Cost', subCriteria: ['Materials', 'Labor'] },
      // More criteria...
    ],
  },
  // Additional predefined projects...
];

function ProjectSetup() {
    
  const [projectName, setProjectName] = useState('');
  const [criteria, setCriteria] = useState([]);
  const [displayTree, setDisplayTree] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  const goToPairComparison = () => {
    navigate('/pair-comparison', { state: { projectName, criteria } }); // Navigate with state
  };

  const addCriteria = () => {
    if (criteria.length < 5) {
      setCriteria([...criteria, { name: '', subCriteria: [] }]);
    }
  };

  const removeCriteria = (criteriaIndex) => {
    const updatedCriteria = criteria.filter((_, index) => index !== criteriaIndex);
    setCriteria(updatedCriteria);
  };

  const addSubCriteria = (criteriaIndex) => {
    const updatedCriteria = criteria.map((criterion, index) =>
      index === criteriaIndex ? { ...criterion, subCriteria: [...criterion.subCriteria, ''] } : criterion
    );
    setCriteria(updatedCriteria);
  };

  const removeSubCriteria = (criteriaIndex, subCriteriaIndex) => {
    const updatedCriteria = criteria.map((criterion, index) =>
      index === criteriaIndex ? { ...criterion, subCriteria: criterion.subCriteria.filter((_, i) => i !== subCriteriaIndex) } : criterion
    );
    setCriteria(updatedCriteria);
  };

  const handleCriteriaChange = (index, newName) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index].name = newName;
    setCriteria(updatedCriteria);
  };

  const handleSubCriteriaChange = (criteriaIndex, subIndex, newSubName) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[criteriaIndex].subCriteria[subIndex] = newSubName;
    setCriteria(updatedCriteria);
  };

  const renderCriteriaList = () => {
    return criteria.map((criterion, index) => (
      <ListGroup.Item key={index}>
        <InputGroup className="mb-3">
          <InputGroup.Text>{`Criteria ${index + 1}`}</InputGroup.Text>
          <Form.Control
            value={criterion.name}
            onChange={(e) => handleCriteriaChange(index, e.target.value)}
            placeholder={`Criteria ${index + 1} Name`}
          />
          <Button variant="outline-danger" onClick={() => removeCriteria(index)}>Remove</Button>
        </InputGroup>
        {criterion.subCriteria.map((subCriterion, subIndex) => (
          <InputGroup key={subIndex} className="mb-1">
            <InputGroup.Text>{`Sub-Criteria ${index + 1}.${subIndex + 1}`}</InputGroup.Text>
            <Form.Control
              value={subCriterion}
              onChange={(e) => handleSubCriteriaChange(index, subIndex, e.target.value)}
              placeholder={`Sub-Criteria ${subIndex + 1} Name`}
            />
            <Button variant="outline-secondary" onClick={() => removeSubCriteria(index, subIndex)}>Remove</Button>
          </InputGroup>
        ))}
        <Button onClick={() => addSubCriteria(index)} disabled={criterion.subCriteria.length >= 3}>Add Sub-Criteria</Button>
      </ListGroup.Item>
    ));
  };

  return (
    <Container className="content-container">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Alert variant="info" className="text-center">
            Demo Version Limit: Up to 5 Criteria and 3 Sub-Criteria per Criterion
          </Alert>
          <h1>Project Setup</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name:</Form.Label>
              <Form.Control
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter or select a project name"
                list="predefined-projects"
              />
              <datalist id="predefined-projects">
                {predefinedProjects.map((project, index) => (
                  <option key={index} value={project.name} />
                ))}
              </datalist>
            </Form.Group>

            <Button onClick={addCriteria} disabled={criteria.length >= 5}>Add Criteria</Button>
            <ListGroup className="my-3">{renderCriteriaList()}</ListGroup>
            <Button variant="primary" onClick={() => setDisplayTree(!displayTree)}>
              {displayTree ? 'Hide' : 'Display'} Tree
            </Button>
          </Form>
          <Button variant="success" onClick={goToPairComparison}>Proceed to Pair Comparison</Button> {/* Button to navigate */}


          {displayTree && (
            <div>
              <h3>Project Tree</h3>
              <div><strong>Name:</strong> {projectName}</div>
              <ul>
                {criteria.map((criterion, index) => (
                  <li key={index}>
                    <strong>{`Criteria ${index + 1}:`}</strong> {criterion.name}
                    <ul>
                      {criterion.subCriteria.map((subCriterion, subIndex) => (
                        <li key={subIndex}><strong>{`Sub-Criteria ${subIndex + 1}:`}</strong> {subCriterion}</li>
                    ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectSetup;
