import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div key={index} className="my-3">
        <div className="mb-3 flex items-center justify-center">
          <span>{`Criteria ${index + 1}`}</span>
          <input
            value={criterion.name}
            onChange={(e) => handleCriteriaChange(index, e.target.value)}
            placeholder={`Criteria ${index + 1} Name`}
            className="border border-gray-400 rounded-md p-1 ml-3"
          />
          <button onClick={() => removeCriteria(index)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105">Remove</button>
        </div>
        {criterion.subCriteria.map((subCriterion, subIndex) => (
          <div key={subIndex} className="mb-1 flex items-center justify-center">
            <span>{`Sub-Criteria ${index + 1}.${subIndex + 1}`}</span>
            <input
              value={subCriterion}
              onChange={(e) => handleSubCriteriaChange(index, subIndex, e.target.value)}
              placeholder={`Sub-Criteria ${subIndex + 1} Name`}
              className="border border-gray-400 rounded-md p-1 ml-3"
            />
            <button onClick={() => removeSubCriteria(index, subIndex)} className="ml-2 px-2 py-1 bg-gray-500 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105">Remove</button>
          </div>
        ))}
        <button onClick={() => addSubCriteria(index)} disabled={criterion.subCriteria.length >= 3} className="ml-3 px-2 py-1 bg-blue-500 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105">Add Sub-Criteria</button>
      </div>
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold mb-8">Project Setup</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="projectName" className="block">Nom du projet:</label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={handleProjectSelection}
              placeholder="Enter un nom du projet"
              list="predefined-projects"
              className="border border-gray-400 rounded-md p-2 w-full"
            />
            <datalist id="predefined-projects">
              {predefinedProjects.map((project, index) => (
                <option key={index} value={project.name} />
              ))}
            </datalist>
          </div>

          <div className="flex justify-center mb-4">
            <button onClick={addCriteria} disabled={criteria.length >= 5} className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 transition duration-300 ease-in-out transform hover:scale-105">Ajouter Critère</button>
            {renderCriteriaList()}
          </div>

          <div className="flex justify-center mb-4">
            <button variant="primary" onClick={() => setDisplayTree(!displayTree)} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 transition duration-300 ease-in-out transform hover:scale-105">
              {displayTree ? 'Hide' : 'Display'} Tree
            </button>
          </div>

          {displayTree && (
            <div ref={treeContainerRef} className="mt-8" style={{ width: '100%', height: '500px' }}>
              <Tree data={createTreeData()} translate={treeTranslate} orientation="vertical" pathFunc="straight" zoomable={false} />
            </div>
          )}

          <div className="flex justify-center">
            <button onClick={goToPairComparison} className="px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105">Proceed to Pair Comparison</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ProjectSetup;
