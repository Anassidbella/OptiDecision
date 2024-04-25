import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Tree from 'react-d3-tree';
import { SearchIcon } from '@heroicons/react/outline';
import { FiGitBranch } from 'react-icons/fi';

const predefinedProjects = [
  {
    name: 'Optimisation de la Chaine Logistique',
    criteria: [
      { name: 'Efficacité', subCriteria: ['Processus', 'Utilisation de l\'énergie'] },
      { name: 'Coût', subCriteria: ['Matériaux', 'Main d\'œuvre'] },
    ],
  },
  {
    name: 'Initiative de Transformation Numérique',
    criteria: [
      { name: 'Stratégie', subCriteria: ['Alignement', 'Objectifs'] },
      { name: 'Technologie', subCriteria: ['Infrastructure', 'Innovation'] },
      { name: 'Gestion', subCriteria: ['Gestion du changement', 'Engagement des parties prenantes'] },
    ],
  },
  {
    name: 'Développement d\'énergie durable',
    criteria: [
      { name: 'Production', subCriteria: ['Efficacité', 'Rentabilité'] },
      { name: 'Conservation', subCriteria: ['Gestion des ressources', 'Pratiques de durabilité'] },
      { name: 'Innovation', subCriteria: ['Nouvelles technologies', 'Investissements en R&D'] },
    ],
  },
];

const addButtonClass = "px-4 py-2 bg-[#6C0345] text-white rounded-md mr-2 transition duration-300 ease-in-out transform hover:scale-105";
const addsubButtonClass = "px-4 py-2 bg-[#DC6B19] text-white rounded-md mr-2 my-4 transition duration-300 ease-in-out transform hover:scale-105";
const hideButtonClass = " flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md mr-2 transition duration-300 ease-in-out transform hover:scale-105";
const deleteButtonClass = "px-3 py-1 bg-red-500 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105";

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
      name: projectName || "Projet",
      children: criteria.map(crit => ({
        name: crit.name,
        children: crit.subCriteria.map(sub => ({
          name: sub,
        }))
      }))
    }];
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

  const addCriteria = (event) => {
    event.preventDefault();
    if (criteria.length < 5) {
      setCriteria([...criteria, { name: '', subCriteria: [] }]);
    }
  };

  const removeCriteria = (criteriaIndex) => {
    const updatedCriteria = criteria.filter((_, index) => index !== criteriaIndex);
    setCriteria(updatedCriteria);
  };

  const addSubCriteria = (criteriaIndex, event) => {
    event.preventDefault();
    const updatedCriteria = [...criteria];
    if (updatedCriteria[criteriaIndex].subCriteria.length < 3) {
      updatedCriteria[criteriaIndex] = {
        ...updatedCriteria[criteriaIndex],
        subCriteria: [...updatedCriteria[criteriaIndex].subCriteria, '']
      };
      setCriteria(updatedCriteria);
    }
  };

  const removeSubCriteria = (criteriaIndex, subCriteriaIndex) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[criteriaIndex].subCriteria.splice(subCriteriaIndex, 1);
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
    if (!displayTree) {
      return (
        <div className="xl:grid xl:grid-cols-2 gap-2">
          {criteria.map((criterion, index) => (
            <div key={index} className="border rounded-md p-4 my-4">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor={`criteria-${index}`} className="text-lg font-semibold">Critère {index + 1} :</label>
                <button onClick={() => removeCriteria(index)} className={deleteButtonClass}>Supprimer</button>
              </div>
              <input
                type="text"
                id={`criteria-${index}`}
                value={criterion.name}
                onChange={(e) => handleCriteriaChange(index, e.target.value)}
                placeholder={`Nom du critère ${index + 1}`}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {criterion.subCriteria.map((subCriterion, subIndex) => (
                <div key={subIndex} className="flex items-center justify-between mt-3">
                  <label htmlFor={`sub-criteria-${index}-${subIndex}`} className="text-sm font-medium">Sous-critère {subIndex + 1} :</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id={`sub-criteria-${index}-${subIndex}`}
                      value={subCriterion}
                      onChange={(e) => handleSubCriteriaChange(index, subIndex, e.target.value)}
                      placeholder={`Nom du sous-critère ${subIndex + 1}`}
                      className="border border-gray-300 rounded-md p-2 mr-2"
                    />
                    <button onClick={() => removeSubCriteria(index, subIndex)} className={deleteButtonClass}>-</button>
                  </div>
                </div>
              ))}
              <button onClick={(e) => addSubCriteria(index, e)} disabled={criterion.subCriteria.length >= 3} className={addsubButtonClass}>Ajouter sous-critère</button>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  const handleDisplayTree = (event) => {
    event.preventDefault();
    setDisplayTree(!displayTree);
  };

  const handleGoToPairComparison = (event) => {
    event.preventDefault();
    navigate('/pair-comparison', { state: { projectName, criteria } });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 ">
      <div className="container mx-auto  bg-gray-50 p-12 rounded-md shadow-xl border-2 border-gray-300">
        <h1 className="text-center  text-5xl font-mono mb-8 text-[#6C0345]">Configuration du projet</h1>
        <form>
        <div className="mb-4 flex items-center justify-center">
          <div className="relative w-3/4">
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={handleProjectSelection}
              placeholder="Entrez un nom pour votre projet"
              list="predefined-projects"
              className="border border-gray-300 rounded-md p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-gradient-to-r from-green-800 to-yellow-200 bg-clip-text text-transparent bg-gray-100 hover:bg-gray-200 transition duration-300 shadow-md"
            />
            <SearchIcon className="absolute h-6 w-6 text-gray-400 top-1/2 right-3 transform -translate-y-1/2" />
          </div>
            <datalist id="predefined-projects">
              {predefinedProjects.map((project, index) => (
                <option key={index} value={project.name} />
              ))}
            </datalist>
          </div>

          <div className="flex justify-between items-center p-8">
            <button onClick={addCriteria} disabled={criteria.length >= 5} className={addButtonClass}>Ajouter critère</button>
            <div className={hideButtonClass} >
            <button onClick={handleDisplayTree} >
              {displayTree ? 'Cacher' : 'Afficher'} l'arbre 
            </button>
            <FiGitBranch size={20} className="ml-3 text-green-900 " />
          </div>


          </div>

          <div>
            {renderCriteriaList()}
          </div>
            {/* Ici le design du tree */}
              {displayTree && (
            <div ref={treeContainerRef} className="mt-8 shadow-lg border-b-4 mb-8 flex justify-center h-[500px]">
             <Tree
              data={createTreeData()}
              translate={treeTranslate}
              orientation="vertical"
              pathFunc="step"
              zoomable={true}
              separation={{ siblings: 1.8, nonSiblings: 0.8 }} // Espacement entre les nœuds

/>

            </div>
          )}

          <div className="flex justify-center">
          <button onClick={handleGoToPairComparison} className="px-4 py-2 rounded-md transition duration-500 ease-in-out transform hover:scale-125 bg-gradient-to-r from-[#6C0345] via-[#DC6B19] to-[#F7C566] text-white">
          Passer à la comparaison par paire
        </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectSetup;
