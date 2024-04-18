import axios from 'axios';

const baseUrl = 'http://localhost:8000'; // Mettez à jour l'URL en fonction de votre backend

const evaluateAhp = async (criteriaNames, subcriteriaWeights) => {
  try {
    const response = await axios.post(`${baseUrl}/ahp-evaluation/`, {
      criteriaNames,
      subcriteriaWeights
    });
    return response.data.results; // Renvoie les résultats de l'évaluation AHP
  } catch (error) {
    console.error('Error evaluating AHP:', error);
    return null;
  }
};

export { evaluateAhp };
