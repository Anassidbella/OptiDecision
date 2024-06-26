import React from 'react';
import homeImage from '../../assets/images/optimization.jpg';
import FAQ from '../part/Faq';
import { Link } from 'react-router-dom';
import NotreMarque from '../part/NotreMarque';

function Home() {
  return (
    <div className="w-full">
      <div className="max-w-none py-8 px-4 lg:py-10 lg:px-6 xl:px-12">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-start">
          {/* Section gauche */}
          <div className="flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-4xl font-bold text-[#6C0345] mb-4">Bienvenue sur OptiDecision</h1>
            <p className="text-sm text-gray-800 mb-6 mr-5">OptiDecision est votre solution d'analyse multicritère et d'optimisation, conçue pour répondre à vos besoins professionnels les plus exigeants. Grâce à nos puissants outils basés sur les méthodes AHP et TOPSIS, vous pouvez prendre des décisions éclairées et efficaces dans une variété de domaines et de secteurs d'activité.</p>
            <Link to="/demo" className="bg-[#6C0345] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#4A0229] transition duration-300 mt-2 no-underline">En savoir plus</Link>
          </div>
          {/* Section droite (Image) */}
          <div className="py-2 w-full h-full">
            <img src={homeImage} className="w-full h-auto rounded-lg shadow-md" alt="OptiDecision" />
          </div>
        </div>
        <NotreMarque />
        <FAQ />

        
          </div>
    </div>
  );
}

export default Home;
