import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function Alternative() {
    const [alternatives, setAlternatives] = useState([]);
    const location = useLocation();
    const { projectName, criteria = [] } = location.state || { projectName: "Default Project Name", criteria: [] };
    const navigate = useNavigate();

    const addAlternative = () => {
        setAlternatives([...alternatives, { name: "", scores: {} }]);
    };

    const handleAlternativeChange = (index, value) => {
        const updatedAlternatives = [...alternatives];
        updatedAlternatives[index].name = value;
        setAlternatives(updatedAlternatives);
    };

    const handleScoreChange = (alternativeIndex, critName, subCritName, value) => {
        const updatedAlternatives = [...alternatives];
        const scores = updatedAlternatives[alternativeIndex].scores;
        const critScores = scores[critName] || {};
        critScores[subCritName] = parseFloat(value);
        scores[critName] = critScores;
        setAlternatives(updatedAlternatives);
    };

    const removeAlternative = (index) => {
        const updatedAlternatives = [...alternatives];
        updatedAlternatives.splice(index, 1);
        setAlternatives(updatedAlternatives);
    };

    const handleSubmit = async () => {
        // Créer un tableau pour stocker les données des alternatives au format requis
        const formattedData = alternatives.map((alt,index) => {
            const scores = {};
            Object.entries(alt.scores).forEach(([critName, subScores]) => {
                const critScore = Object.values(subScores).reduce((acc, val) => acc + val, 0) / Object.keys(subScores).length;
                scores[`Criterion ${critName}`] = critScore;
            });
            return {
                name: `Alternative ${alt.name}`,
                scores
            };
        });
        
        // Afficher les données des alternatives dans la console
        console.log("Formatted alternative data:", formattedData);
        
        try {
            // Envoyer les données des alternatives vers le backend
            const response = await axios.post('http://localhost:8000/api/topsis/', { alternatives: formattedData });
            console.log("TOPSIS results:", response.data); // Affiche les résultats après réception
            
            // Utiliser le routeur de réaction pour naviguer vers la page RankingPage
            navigate('/ranking', { state: { formattedData } });
        } catch (error) {
            console.error("Error while submitting alternative data:", error);
        }
    };
    
    
    

    
    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-4xl font-bold text-center mb-4">{projectName}</h1>
                <button onClick={addAlternative} className="mb-4 bg-[#6C0345] text-white px-4 py-2 rounded hover:bg-[#4E022E]">Add Alternative</button>                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-[#6C0345] text-white">
                            <th className="p-3">Alternative</th>
                            {criteria.map(crit => (
                                crit.subCriteria.length > 0 ? (
                                    <React.Fragment key={crit.name}>
                                        <th colSpan={crit.subCriteria.length} className="p-3">{crit.name}</th>
                                    </React.Fragment>
                                ) : <th key={crit.name} className="p-3">{crit.name}</th>
                            ))}
                        </tr>
                        <tr className="bg-[#4E022E] text-white">
                            <th></th>
                            {criteria.map(crit => (
                                crit.subCriteria.length > 0 ? (
                                    crit.subCriteria.map(subCrit => (
                                        <th key={`${crit.name}-${subCrit}`} className="p-3">{subCrit}</th>
                                    ))
                                ) : <th key={crit.name}></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {alternatives.map((alt, altIndex) => (
                            <tr key={altIndex}>
                                <td className="relative">
                                    <input 
                                        type="text" 
                                        value={alt.name} 
                                        onChange={e => handleAlternativeChange(altIndex, e.target.value)} 
                                        placeholder="Enter alternative name"
                                        className="p-2 border rounded w-full"
                                    />
                                    <AiOutlineDelete 
                                        onClick={() => removeAlternative(altIndex)} 
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer hover:text-red-600"
                                        size={24}
                                    />
                                </td>
                                {criteria.map(crit => (
                                    crit.subCriteria.length > 0 ? (
                                        crit.subCriteria.map(subCrit => (
                                            <td key={`${crit.name}-${subCrit}`}>
                                              <select 
                                                value={((alt.scores[crit.name] && alt.scores[crit.name][subCrit]) || '')}
                                                onChange={e => handleScoreChange(altIndex, crit.name, subCrit, e.target.value)}
                                                className="p-2 border rounded w-full"
                                              >
                                                <option value="">Select score</option>
                                                <option value="1">1: Moins adapté</option>
                                                <option value="3">3: Peu adapté</option>
                                                <option value="5">5: Adapté</option>
                                                <option value="7">7: Très adapté</option>
                                                <option value="9">9: Trop adapté</option>
                                              </select>
                                            </td>
                                        ))
                                    ) : (
                                        <td key={crit.name}>
                                            <input 
                                                type="number"
                                                min="0"
                                                value={((alt.scores[crit.name] && alt.scores[crit.name]['overall']) || '')}
                                                onChange={e => handleScoreChange(altIndex, crit.name, 'overall', e.target.value)}
                                                className="p-2 border rounded w-full"
                                            />
                                        </td>
                                    )
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
               
                <div className="text-center mt-6">
                    <button onClick={handleSubmit} className="px-4 py-2 bg-[#6C0345] text-white rounded-2xl hover:bg-[#4E022E]">Submit Alternatives</button>
                </div>
            </div>
        </div>
    );
}

export default Alternative;
