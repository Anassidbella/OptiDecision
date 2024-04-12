import React from 'react';

function FAQ() {
  return (
    <div className="container mx-auto mt-16">
      <h2 className="text-3xl font-bold text-[#6C0345] mb-4">Foire aux questions (FAQ)</h2>
      <div className="grid gap-4">
        {/* Question 1 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Question 1: Quels sont les méthodes utilisées par OptiDecision?</h3>
          <p className="mt-2">Réponse: OptiDecision utilise les méthodes Analytic Hierarchy Process (AHP) et Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS) pour l'analyse multicritère et l'optimisation.</p>
        </div>
        
        {/* Question 2 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Question 2: Comment puis-je commencer à utiliser OptiDecision?</h3>
          <p className="mt-2">Réponse: Vous pouvez commencer en créant un compte sur notre plateforme et en accédant à nos outils d'analyse multicritère. Suivez les étapes de configuration pour spécifier vos critères et comparer différentes alternatives.</p>
        </div>
        
        {/* Question 3 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Question 3: Est-ce que OptiDecision offre un support client?</h3>
          <p className="mt-2">Réponse: Oui, nous offrons un support client dédié pour répondre à toutes vos questions et vous aider à tirer le meilleur parti de notre application. N'hésitez pas à nous contacter en cas de besoin.</p>
        </div>
        
        {/* Ajoutez plus de questions et de réponses selon vos besoins */}
      </div>
    </div>
  );
}

export default FAQ;
