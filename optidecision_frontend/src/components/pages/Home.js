import React from 'react';
//import homeImage from '../../assets/images/optimization.jpg';
import newhomeImage from '../../assets/images/4.jpg';
import FAQ from '../part/Faq';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="w-full">
      <div className="max-w-none py-8 px-4 lg:py-10 lg:px-6 xl:px-12">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-start">
          {/* Section gauche */}
          <div className="flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-4xl font-mono text-[#6C0345] mb-4">Welcome to OptiDecision</h1>
            <p className="text-sm text-gray-800 mb-6 mr-5">OptiDecision is your comprehensive, state-of-the-art multicriteria analysis and optimization solution, meticulously crafted to cater to your most intricate and demanding professional requirements. Armed with our robust suite of tools, meticulously developed and grounded in the principles of Analytic Hierarchy Process (AHP) and Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS) methods, you gain the ability to make informed, strategic decisions that drive success across diverse fields and industries.</p>
            <Link to="/demo" className="bg-[#6C0345] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#4A0229] transition duration-300 mt-2 no-underline">See more.</Link>
          </div>
          {/* Section droite (Image) */}
          <div className="py-2 w-[80%]">
            <img src={newhomeImage} className="w-full h-auto rounded-lg shadow-md" alt="OptiDecision" />
          </div>
        </div>

        <FAQ />
      </div>
    </div>
  );
}

export default Home;
