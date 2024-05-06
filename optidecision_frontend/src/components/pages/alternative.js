import React, { useState } from 'react';

function Alternative() {
    // État pour stocker les alternatives
    const [alternatives, setAlternatives] = useState([]);

    // Fonction pour ajouter une alternative
    const addAlternative = () => {
        setAlternatives([...alternatives, '']);
    };

    // Fonction pour gérer les changements dans le champ d'alternative
    const handleAlternativeChange = (index, value) => {
        const updatedAlternatives = [...alternatives];
        updatedAlternatives[index] = value;
        setAlternatives(updatedAlternatives);
    };

    // Fonction pour supprimer une alternative
    const removeAlternative = (index) => {
        const updatedAlternatives = [...alternatives];
        updatedAlternatives.splice(index, 1);
        setAlternatives(updatedAlternatives);
    };

    // Fonction pour soumettre les alternatives
    const handleSubmit = () => {
        // Ici, vous pouvez envoyer les alternatives au backend Django
        console.log("Alternatives submitted:", alternatives);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-3xl font-semibold text-center text-[#6C0345] mb-6">Add Alternatives</h2>
                <div className="grid grid-cols-1 gap-6">
                    {alternatives.map((alternative, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4">
                                <input
                                    type="text"
                                    value={alternative}
                                    onChange={(e) => handleAlternativeChange(index, e.target.value)}
                                    placeholder={`Alternative ${index + 1}`}
                                    className="w-full py-2 px-4 border rounded-md"
                                />
                                <button onClick={() => removeAlternative(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-6">
                    <button onClick={addAlternative} className="px-4 py-2 bg-[#6C0345] text-white rounded-2xl hover:bg-[#4E022E] transition duration-300 ease-in-out">Add Alternative</button>
                    <button onClick={handleSubmit} className="ml-4 px-4 py-2 bg-[#6C0345] text-white rounded-2xl hover:bg-[#4E022E] transition duration-300 ease-in-out">Submit Alternatives</button>
                </div>
            </div>
        </div>
    );
}

export default Alternative;
