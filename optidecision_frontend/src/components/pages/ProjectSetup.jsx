import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Tree from 'react-d3-tree';
import { SearchIcon } from '@heroicons/react/outline';
import { FiMinus, FiGitBranch } from 'react-icons/fi';

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
                <div className="flex overflow-x-auto max-w-full mt-8 space-x-8">
                    {criteria.map((criterion, index) => (
                        <div key={index} className="w-72 bg-white rounded-md p-4 shadow-md">
                            <div className="mb-3">
                                <label htmlFor={`criteria-${index}`} className="text-lg font-semibold block mb-2">Critère {index + 1} :</label>
                                <input
                                    type="text"
                                    id={`criteria-${index}`}
                                    value={criterion.name}
                                    onChange={(e) => handleCriteriaChange(index, e.target.value)}
                                    placeholder={`Nom du critère ${index + 1}`}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                            {criterion.subCriteria.map((subCriterion, subIndex) => (
                                <div key={subIndex} className="mb-3 flex items-center">
                                    <input
                                        type="text"
                                        id={`sub-criteria-${index}-${subIndex}`}
                                        value={subCriterion}
                                        onChange={(e) => handleSubCriteriaChange(index, subIndex, e.target.value)}
                                        placeholder={`Nom du sous-critère ${subIndex + 1}`}
                                        className="border border-gray-300 rounded-md p-2 mr-2 flex-1"
                                    />
                                    <button onClick={() => removeSubCriteria(index, subIndex)} className="text-gray-500 hover:text-red-500 focus:outline-none">
                                        <FiMinus />
                                    </button>
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button onClick={() => removeCriteria(index)} className="px-3 py-1 bg-[#CABBE9] text-[#0F1035] rounded-md transition duration-300 ease-in-out transform hover:scale-105">Supprimer</button>
                            </div>
                            <button onClick={(e) => addSubCriteria(index, e)} disabled={criterion.subCriteria.length >= 3} className="px-4 py-2 bg-[#86469C] text-white rounded-md mt-4 transition duration-300 ease-in-out transform hover:scale-105">Ajouter sous-critère</button>
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
        <div className="bg-[#FDFDFD] min-h-screen py-8">
            <div className="container mx-auto p-12 rounded-md shadow-xl border-2 border-[#CABBE9]">
                <h1 className="text-center text-4xl font-semibold tracking-wide mb-8 text-[#0F1035]">Configuration du projet</h1>
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
                                className="border border-gray-300 rounded-md p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-gradient-to-r from-[#A1EAFB] to-[#7FC7D9] bg-clip-text text-transparent bg-[#FDFDFD] hover:bg-[#FDFDFD] transition duration-300 shadow-md"
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
                        <button onClick={addCriteria} disabled={criteria.length >= 5} className="px-4 py-2 bg-[#0F1035] text-white rounded-md mr-2 transition duration-300 ease-in-out transform hover:scale-105">Ajouter critère</button>
                        <div className="flex items-center">
                            <button onClick={handleDisplayTree} className="px-4 py-2 bg-[#A1EAFB] text-white rounded-md mr-2 transition duration-300 ease-in-out transform hover:scale-105">
                                {displayTree ? 'Cacher' : 'Afficher'} l'arbre
                            </button>
                            <FiGitBranch size={20} className="ml-3 text-[#0F1035]" />
                        </div>
                    </div>

                    {renderCriteriaList()}

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
                        <button onClick={handleGoToPairComparison} className="px-4 py-2 rounded-md transition duration-500 ease-in-out transform hover:scale-125 bg-gradient-to-r from-[#0F1035] via-[#7FC7D9] to-[#CABBE9] text-white">
                            Passer à la comparaison par paire
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProjectSetup;
