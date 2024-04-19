import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, ListGroup, InputGroup, Alert } from 'react-bootstrap';
import Tree from 'react-d3-tree';

const predefinedProjects = [
  {
    name: 'Optimisation de la Chaine Logistique',
    criteria: [
      { name: 'Efficiency', subCriteria: ['Process', 'Energy Use'] },
      { name: 'Cost', subCriteria: ['Materials', 'Labor'] },
    ],
  },
  {
    name: 'Digital Transformation Initiative',
    criteria: [
      { name: 'Strategy', subCriteria: ['Alignment', 'Goals'] },
      { name: 'Technology', subCriteria: ['Infrastructure', 'Innovation'] },
      { name: 'Management', subCriteria: ['Change Management', 'Stakeholder Engagement'] },
    ],
  },
  {
    name: 'Sustainable Energy Development',
    criteria: [
      { name: 'Production', subCriteria: ['Efficiency', 'Cost-Effectiveness'] },
      { name: 'Conservation', subCriteria: ['Resource Management', 'Sustainability Practices'] },
      { name: 'Innovation', subCriteria: ['New Technologies', 'R&D Investments'] },
    ],
  },
];

function ProjectSetup() {
  const [projectName, setProjectName] = useState('');
  const [criteria, setCriteria] = useState([]);
  const [displayTree, setDisplayTree] = useState(false);
  const navigate = useNavigate();
  const treeContainerRef = useRef();

  useEffect(() => {
    if (displayTree && treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      setTreeTranslate({ x: dimensions.width / 2, y: 100 });
    }
  }, [displayTree]);

  const [treeTranslate, setTreeTranslate] = useState({ x: 400, y: 300 });

  const createTreeData = () => {
    return [{
      name: projectName || "Project",
      children: criteria.map(crit => ({
        name: crit.name,
        children: crit.subCriteria.map(sub => ({
          name: sub,
        }))
      }))
    }];
  };

  const renderCustomNodeElement = (rd3tProps) => {
    const textLength = rd3tProps.nodeDatum.name.length;
    const rectWidth = Math.max(100, textLength * 7); // Ensure minimum width and dynamically adjust
    return (
      <g>
        <rect width={rectWidth} height={40} x={-rectWidth / 2} y={-20} fill="white" stroke="black" />
        <text fill="black" x={-rectWidth / 2 + 10} y="0" textAnchor="start" alignmentBaseline="central" style={{ fontSize: '16px' }}>
          {rd3tProps.nodeDatum.name}
        </text>
      </g>
    );
  };

  const goToPairComparison = () => {
    navigate('/pair-comparison', { state: { projectName, criteria } });
  };

  const handleProjectSelection = (event) => {
    const selectedProjectName = event.target.value;
    setProjectName(selectedProjectName);
    const project = predefinedProjects.find(p => p.name === selectedProjectName);
    if (project) {
      setCriteria(project.criteria.map(c => ({ ...c, subCriteria: [...c.subCriteria] })));
    } else {
      setCriteria([]);
    }
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
          <Alert variant="info" className="text-center">Demo Version Limit: Up to 5 Criteria and 3 Sub-Criteria per Criterion</Alert>
          <h1>Project Setup</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name:</Form.Label>
              <Form.Control
                type="text"
                value={projectName}
                onChange={handleProjectSelection}
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
            {displayTree && (
              <div ref={treeContainerRef} style={{ width: '100%', height: '700px' }}>
                <Tree data={createTreeData()} translate={treeTranslate} orientation="vertical"
                      pathFunc="straight" renderCustomNodeElement={renderCustomNodeElement} zoomable={false} />
              </div>
            )}
            <Button variant="success" onClick={goToPairComparison}>Proceed to Pair Comparison</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectSetup;
