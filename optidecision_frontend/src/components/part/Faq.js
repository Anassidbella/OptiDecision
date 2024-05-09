import React from 'react';

function FAQ() {
  return (
    <div className="container mx-auto mt-16">
      <h2 className="text-3xl font-bold text-[#6C0345] mb-4">Frequently Asked Questions (FAQ)</h2>
      <div className="grid gap-4">
        {/* Question 1 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Question 1: What methods does OptiDecision use?</h3>
          <p className="mt-2">Answer: OptiDecision utilizes the Analytic Hierarchy Process (AHP) and the Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS) methods for multicriteria analysis and optimization.</p>
        </div>
        
        {/* Question 2 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Question 2: How can I start using OptiDecision?</h3>
          <p className="mt-2">Answer: You can start by creating an account on our platform and accessing our multicriteria analysis tools. Follow the setup steps to specify your criteria and compare different alternatives.</p>
        </div>
        
        {/* Question 3 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Question 3: Does OptiDecision provide customer support?</h3>
          <p className="mt-2">Answer: Yes, we offer dedicated customer support to address all your questions and assist you in getting the most out of our application. Feel free to contact us whenever needed.</p>
        </div>
        
        {/* Ajoutez plus de questions et de réponses selon vos besoins */}
      </div>
    </div>
  );
}

export default FAQ;
