import React from 'react';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();

  const navigateToDemo = () => {
    navigate('/demo'); // Ajustez le chemin si nécessaire
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#6C0345]">Pourquoi choisir OptiDecision ?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#DC6B19]">Processus de Hiérarchie Analytique (AHP)</h2>
          <p className="text-lg leading-relaxed text-[#6C0345]">
            AHP simplifie la prise de décision complexe en décomposant le processus en une hiérarchie de parties plus gérables. Cette approche permet une comparaison systématique de différents critères, assurant que chaque aspect de la décision est pris en compte.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#DC6B19]">Technique de l'Ordre de Préférence par Similarité avec la Solution Idéale (TOPSIS)</h2>
          <p className="text-lg leading-relaxed text-[#6C0345]">
            TOPSIS identifie l'option qui correspond le mieux à la solution idéale. Cette méthode met en évidence non seulement les choix les plus appropriés, mais elle classe également toutes les options disponibles, offrant une vue d'ensemble claire des alternatives.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#DC6B19]">Combinaison de AHP et TOPSIS</h2>
          <p className="text-lg leading-relaxed text-[#6C0345]">
            En intégrant AHP et TOPSIS, OptiDecision exploite les forces des deux méthodes pour offrir une solution complète qui assure que les décisions sont non seulement choisies de manière optimale, mais également évaluées de manière exhaustive selon un ensemble de critères.
          </p>
        </div>

        {/* Vous pouvez ajouter plus de cartes ici pour décrire des services ou des avantages supplémentaires */}
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          className="bg-[#DC6B19] text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#F7C566] hover:text-[#6C0345]"
          onClick={navigateToDemo}
        >
          Explorez notre outil
        </button>
      </div>
    </div>
  );
}

export default Services;
