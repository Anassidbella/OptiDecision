import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function RankingPage() {
  const [rankedAlternatives, setRankedAlternatives] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const { formattedData } = location.state || {}; // Obtenez les données formatées de l'état de l'emplacement

  useEffect(() => {
    if (formattedData) {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/topsis/', {
            alternatives: formattedData 
          });
          const { ranked_alternatives, message } = response.data;
          setRankedAlternatives(ranked_alternatives);
          setMessage(message);
        } catch (error) {
          console.error("Error while fetching ranking data:", error);
        }
      };

      fetchData();
    }
  }, [formattedData]);

  return (
    <div className="container mx-auto py-16 px-4 md:px-8">
<h1 className="text-3xl font-semibold text-center text-purple-600 mb-4 pb-2 border-b-2 border-purple-600 border-dashed">Classement des Alternatives</h1>
      
      <div className="max-w-lg mx-auto mb-8">
        <p className="text-lg font-medium text-center mb-4 text-gray-700">{message}</p>
        <div className="flex flex-col space-y-4">
          {rankedAlternatives.map((alternative, index) => (
            <div key={alternative} className="flex items-center justify-center py-2 px-4 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300">
              <span className="text-lg font-semibold text-purple-700 relative">
                <span className="rounded-full bg-purple-500 text-white w-8 h-8 flex items-center justify-center mr-4 hover:bg-purple-300 transition duration-300">{index + 1}</span>
              </span>
              <span className="text-lg text-purple-700">{alternative}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RankingPage;
