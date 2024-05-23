import React from 'react';

function About() {
    console.log("About is being rendered");

    return (
        <div className="content-container px-6 py-12 bg-[#FFF8DC] text-[#6C0345]">
            <h1 className="text-4xl font-bold text-center mb-8 text-[#6C0345]">À propos de OptiDecision</h1>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-3 text-[#DC6B19]">Notre Mission</h2>
                <p className="text-lg leading-relaxed">
                    Chez OptiDecision, notre mission est d'habiliter les individus et les organisations à prendre des décisions meilleures et plus informées. Nous comprenons la complexité des processus décisionnels, surtout lorsque plusieurs critères sont impliqués. Notre objectif est de simplifier ces processus avec notre outil innovant, combinant des méthodologies éprouvées avec une technologie conviviale.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-3 text-[#DC6B19]">Notre Histoire</h2>
                <p className="text-lg leading-relaxed">
                    Fondé en [Année], OptiDecision est né d'un désir de résoudre un problème commun : la paralysie décisionnelle. Nos fondateurs, [Noms des Fondateurs], ont eux-mêmes vécu les défis de la prise de décision optimale dans des contextes personnels et professionnels. Frustrés par le manque d'outils efficaces, ils ont entrepris de créer une solution qui non seulement rationaliserait la prise de décision, mais assurerait également que les résultats soient aussi objectifs et bénéfiques que possible.
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                    Avec des parcours en [Contexte Pertinent, par ex. analyse de données, développement logiciel, stratégie d'entreprise], notre équipe a développé OptiDecision pour utiliser le Processus de Hiérarchie Analytique (AHP) et la Technique de l'Ordre de Préférence par Similarité avec la Solution Idéale (TOPSIS). Ces méthodologies fournissent une base solide pour évaluer des scénarios complexes et identifier des voies claires à suivre.
                </p>
            </section>

            <div className="text-center">
                <button className="bg-[#DC6B19] text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#F7C566] hover:text-[#6C0345]">
                    En savoir plus
                </button>
            </div>
        </div>
    );
}

export default About;
