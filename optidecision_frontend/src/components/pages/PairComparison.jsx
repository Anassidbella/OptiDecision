import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PairComparison() {
  // Récupérer les données de l'URL
  const location = useLocation();
  const { projectName, criteria = [] } = location.state;

  // État pour stocker les comparaisons et les résultats
  const [pairwiseComparisons, setPairwiseComparisons] = useState({});
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  // Effet pour initialiser les comparaisons lorsque les critères changent
  useEffect(() => {
    const initialComparisons = {};

    // Initialiser les comparaisons pour les critères eux-mêmes
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

    // Initialiser les comparaisons pour les sous-critères de chaque critère
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

  // Gérer les changements de valeurs des éléments de sélection déroulante
  const handleInputChange = (key, value) => {
    const numericValue = Number(value);
    const inverseValue = numericValue ? 1 / numericValue : 0;

    let inverseKey;
    if (key.includes(':')) {
      const parts = key.split(': ');
      const subParts = parts[1].split(' vs ');
      inverseKey = `${parts[0]}: ${subParts[1]} vs ${subParts[0]}`;
    } else {
      const parts = key.split(' vs ');
      inverseKey = `${parts[1]} vs ${parts[0]}`;
    }

    setPairwiseComparisons(prev => ({
      ...prev,
      [key]: numericValue,
      [inverseKey]: inverseValue
    }));
  };

  // Soumettre les données pour calculer les poids
  const handleSubmit = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch('http://localhost:8000/api/weights/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify({ pairwiseComparisons }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Échec du calcul des poids:', error);
    }
  };
  // Aller à la page des alternatives
  const handleGoToAlternatives = (event) => {
    event.preventDefault();
    navigate('/alternative', { state: { projectName, criteria } });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-semibold text-center text-[#6C0345] mb-6">{projectName}</h2>
        
        {/* Tableau de comparaison des critères */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-center mb-4">Comparaisons des critères</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center bg-white border border-gray-200 rounded-md">
              <thead className="bg-[#6C0345] text-white">
                <tr>
                  <th className="px-4 py-2"></th>
                  {criteria.map(criterion => <th key={criterion.name} className="px-4 py-2">{criterion.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {criteria.map((criterion, i) => (
                  <tr key={criterion.name}>
                    <td className="px-4 py-2 font-semibold">{criterion.name}</td>
                    {criteria.map((compareCriterion, j) => (
                      <td key={compareCriterion.name} className="px-4 py-2">
                        {i !== j ? (
                          <select
                            value={pairwiseComparisons[`${criterion.name} vs ${compareCriterion.name}`] || '1'}
                            onChange={(e) => handleInputChange(`${criterion.name} vs ${compareCriterion.name}`, e.target.value)}
                            className="py-1 px-2 border rounded-md focus:outline-none focus:border-[#6C0345] w-18"
                          >
                            <option value="1">1: Moins adapté</option>
                            <option value="3">3: Peu adapté</option>
                            <option value="5">5: Adapté</option>
                            <option value="7">7: Très adapté</option>
                            <option value="9">9: Trop adapté</option>
                          </select>
                        ) : '1'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='my-5 border-b-4 border-indigo-200'></div>
        
        {/* Tables de comparaison des sous-critères pour chaque critère */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criteria.map((criterion, index) => (
            <div key={criterion.name} className={`bg-white rounded-lg shadow-md overflow-hidden ${index === 2 ? 'md:col-start-1 md:col-end-3 justify-self-center' : ''}`}>
              <h3 className="text-lg font-semibold px-4 py-3 text-white bg-[#DC6B19]">{criterion.name} Sous-Critères</h3>
              <div className="p-4">
                <table className="w-full text-center">
                  <thead>
                    <tr>
                      <th></th>
                      {criterion.subCriteria.map(compareSub => (
                        <th key={compareSub}>{compareSub}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {criterion.subCriteria.map((sub, i) => (
                     
<tr key={sub}>
  <td>{sub}</td>
  {criterion.subCriteria.map((compareSub, j) => (
    <td key={compareSub}>
      {i !== j ? (
        <select
          value={pairwiseComparisons[`${criterion.name}: ${sub} vs ${compareSub}`] || '1'}
          onChange={(e) => handleInputChange(`${criterion.name}: ${sub} vs ${compareSub}`, e.target.value)}
          className="w-18 py-1 px-2 border rounded-md"
        >
          <option value="1">1: Moins adapté</option>
          <option value="3">3: Peu adapté</option>
          <option value="5">5: Adapté</option>
          <option value="7">7: Très adapté</option>
          <option value="9">9: Trop adapté</option>
        </select>
      ) : '1'}
    </td>
  ))}
</tr>
))}
</tbody>
</table>
</div>
</div>
))}
</div>

<div className="flex justify-center gap-20 mt-6"> {/* Container for buttons */}
<button 
  onClick={handleSubmit} 
  className="px-4 py-2 bg-[#6C0345] text-white rounded-2xl hover:bg-[#4E022E] transition duration-300 ease-in-out  animate-twice animate-infinite animate-duration-1000 transform hover:scale-125"
>
  Calculer les poids
</button>
<button 
  onClick={handleGoToAlternatives} 
  className="px-4 py-2 bg-[#6C0345] text-white rounded-2xl hover:bg-[#4E022E] transition duration-300 ease-in-out  animate-twice animate-infinite animate-duration-1000 transform hover:scale-125"
>
  Saisir les alternatives
</button>
</div>

{/* Affichage des résultats */}
{results && (
<div className="mt-8">
<h3 className="text-2xl font-semibold text-center mb-4">Poids Calculés</h3>
<div className="bg-white rounded-lg shadow-md overflow-hidden">
<table className="w-full">
<thead className="bg-[#F7C566]">
<tr>
<th className="px-6 py-3 text-left">Critère / Sous-Critère</th>
<th className="px-6 py-3 text-left">Poids</th>
</tr>
</thead>
<tbody>
{criteria.map((criterion, index) => (
<React.Fragment key={criterion.name}>
<tr className='bg-[#FFF8DC]'>
<td className="px-6 py-4 font-semibold">{criterion.name}</td>
<td className="px-6 py-4">{results[criterion.name]}</td>
</tr>
{criterion.subCriteria && criterion.subCriteria.map((sub, i) => (
<tr key={`${criterion.name}-${sub}`} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
<td className="pl-12 py-2">{sub}</td>
<td className="px-6 py-2">{results[`${criterion.name}: ${sub}`]}</td>
</tr>
))}
</React.Fragment>
))}
</tbody>
</table>
</div>
</div>
)}
</div>
</div>
);
}

export default PairComparison;
