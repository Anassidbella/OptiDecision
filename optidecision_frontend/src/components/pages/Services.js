import React from 'react';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();

  const navigateToDemo = () => {
    navigate('/demo'); // Adjust the path as needed
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#6C0345]">Why OptiDecision?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-[#DC6B19]">Analytic Hierarchy Process (AHP)</h2>
          <p className="text-lg leading-relaxed text-[#6C0345]">
            AHP simplifies complex decision-making by breaking down the process into a hierarchy of more manageable parts. This approach allows for a systematic comparison of different criteria, ensuring every aspect of the decision is considered.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-[#DC6B19]">Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS)</h2>
          <p className="text-lg leading-relaxed text-[#6C0345]">
            TOPSIS identifies the option that best aligns with the ideal solution. This method not only highlights the most suitable choices but also ranks all available options, providing a clear overview of the alternatives.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-[#DC6B19]">Combining AHP and TOPSIS</h2>
          <p className="text-lg leading-relaxed text-[#6C0345]">
            By integrating AHP and TOPSIS, OptiDecision leverages the strengths of both methods to offer a comprehensive solution that ensures decisions are both optimally chosen and thoroughly evaluated against a set of criteria.
          </p>
        </div>

        {/* You can add more cards here to describe additional services or benefits */}
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          className="bg-[#DC6B19] text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#F7C566] hover:text-[#6C0345]"
          onClick={navigateToDemo}
        >
          Explore Our Tool
        </button>
      </div>
    </div>
  );
}

export default Services;
