import React from "react";
import logo from '../../assets/images/optidecision.png'
export default function NotreMarque() {
    

    return(
        <div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo OptiDecision" className="w-[45%] h-auto" />
          <p className="text-gray-800 mt-4 text-center">OptiDecision est une marque de confiance, reconnue pour ses solutions d'analyse multicritère et d'optimisation de pointe. Faites confiance à notre expertise pour prendre des décisions éclairées et efficaces.</p>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#6C0345]">Optimisez vos décisions avec OptiDecision</h2>
          <p className="text-gray-800 mt-4 text-center">Notre plateforme vous offre des outils puissants et intuitifs pour prendre des décisions stratégiques dans votre entreprise.</p>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#6C0345]">Pourquoi choisir OptiDecision ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 ">
            <div className=" rounded-lg shadow-md p-6 hover:bg-red-100">
              <h3 className="text-xl font-bold text-[#6C0345]">Analyse multicritère</h3>
              <p className="text-gray-800 mt-4">Notre outil d'analyse multicritère vous permet d'évaluer vos options en fonction de multiples critères, pour prendre des décisions éclairées.</p>
            </div>
            <div className="rounded-lg shadow-md p-6 hover:bg-red-100">
              <h3 className="text-xl font-bold text-[#6C0345]">Optimisation</h3>
              <p className="text-gray-800 mt-4">Nos algorithmes d'optimisation vous aident à trouver la meilleure solution parmi un ensemble d'options complexes.</p>
            </div>
            <div className=" rounded-lg shadow-md p-6 hover:bg-red-100">
              <h3 className="text-xl font-bold text-[#6C0345]">Expertise</h3>
              <p className="text-gray-800 mt-4">Notre équipe d'experts est à votre disposition pour vous accompagner dans l'utilisation de nos outils et vous conseiller sur vos problématiques.</p>
            </div>
          </div>
        </div>

        </div>

    )
}