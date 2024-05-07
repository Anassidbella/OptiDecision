import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HomeCss = {
  container: 'max-w-none py-8 px-4 lg:py-10 lg:px-6 xl:px-12',
  content: 'container mx-auto flex justify-between items-start',
  title: 'text-4xl font-semibold text-[#0F1035] mb-4',
  learnMoreButton: 'bg-[#0F1035] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#7FC7D9] transition duration-300 mt-2 no-underline',
  cardContainer: 'flex overflow-x-auto space-x-4',
  card: 'bg-white rounded-lg shadow-lg p-6 w-[300px] flex-shrink-0',
  cardTitle: 'text-xl font-semibold text-[#0F1035] mb-4',
  cardDescription: 'text-gray-800',
};

function Home() {
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Défilement automatique des cartes
      if (cardContainerRef.current) {
        cardContainerRef.current.scrollLeft += cardContainerRef.current.offsetWidth;
      }
    }, 5000); // Changer la carte toutes les 5 secondes

    return () => {
      clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
    };
  }, []);

  return (
      <div className="w-full bg-[#FDFDFD]">
        <div className={HomeCss.container}>
          <div className={HomeCss.content}>
            <div className="flex flex-col justify-center items-center">
              <h1 className={HomeCss.title}>Bienvenue sur OptiDecision</h1>
              <Link to="/demo" className={HomeCss.learnMoreButton}>En savoir plus</Link>
            </div>
            <div className={HomeCss.cardContainer} ref={cardContainerRef}>
              <div className={HomeCss.card}>
                <h2 className={HomeCss.cardTitle}>Analyse multicritère</h2>
                <p className={HomeCss.cardDescription}>Utilisez nos outils d'analyse multicritère pour évaluer et comparer différentes options selon plusieurs critères et prendre des décisions éclairées.</p>
              </div>
              <div className={HomeCss.card}>
                <h2 className={HomeCss.cardTitle}>Optimisation</h2>
                <p className={HomeCss.cardDescription}>Optimisez vos processus et vos ressources grâce à nos méthodes d'optimisation avancées, basées sur les meilleures pratiques et les dernières recherches.</p>
              </div>
              <div className={HomeCss.card}>
                <h2 className={HomeCss.cardTitle}>Facile à utiliser</h2>
                <p className={HomeCss.cardDescription}>Notre plateforme est conçue pour être intuitive et conviviale, vous permettant de tirer le meilleur parti de nos fonctionnalités sans nécessiter une expertise technique approfondie.</p>
              </div>
              {/* Ajoutez plus de cartes ici */}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
