import React from 'react';

function Home() {
  return (
    <div className="content-container">
      {/* Hero Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Empower Your Decision-Making with OptiDecision</h1>
        <p className="text-lg mb-6">Utilize AHP and TOPSIS to Navigate Complex Choices</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Discover How
        </button>
      </div>

      {/* Decision Pathways Section */}
      <div className="flex flex-wrap items-center justify-center my-10">
      <img src={`${process.env.PUBLIC_URL}/decision_pathways.jpg`} alt="Decision Pathways" className="w-full sm:w-1/2 p-4"/>
        <div className="w-full sm:w-1/2 p-4">
          <h2 className="text-3xl font-semibold mb-3">Begin with Clarity</h2>
          <p>
            Start your decision-making process on the right foot. OptiDecision guides you through organizing your choices clearly, setting the stage for effective analysis and selection.
          </p>
        </div>
      </div>

      {/* Analytical Brainstorming Section */}
      <div className="flex flex-wrap items-center justify-center my-10">
        <div className="w-full sm:w-1/2 p-4 order-last sm:order-first">
          <h2 className="text-3xl font-semibold mb-3">Collaborate and Analyze</h2>
          <p>
            Harness the collective expertise of your team with OptiDecision. Our tools facilitate deep dive analyses, prioritizing factors that matter most in your decision-making journey.
          </p>
        </div>
        <img src={`${process.env.PUBLIC_URL}/Analytical Brainstorming.jpg`} alt="Decision Pathways" className="w-full sm:w-1/2 p-4"/>
      </div>

      {/* Features and Benefits */}
      <div className="my-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Why Choose OptiDecision?</h2>
        <p className="text-center">
          Discover the features that make OptiDecision the premier choice for navigating complex decision matrices. From intuitive interfaces to comprehensive analysis tools, we equip you with everything needed to make informed decisions confidently.
        </p>
        {/* Consider adding a list of features or a grid of benefits here */}
      </div>

      {/* Final Call to Action */}
      <div className="text-center py-10">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Get Started with OptiDecision Today
        </button>
      </div>
    </div>
  );
}

export default Home;
