import React from 'react';
import styled from 'styled-components';

// Styled component pour le conteneur de la page "About"
const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

// Styled component pour la vidéo
const VideoWrapper = styled.div`
  width: 80%;
  max-width: 600px; /* Largeur maximale de la vidéo */
`;

const EmbeddedVideo = styled.iframe`
  width: 100%;
  height: 400px; /* Hauteur de la vidéo */
`;

function About() {
    console.log("about is being rendered");

    return (
        <AboutContainer>
            <div className="content-container">




            </div>

            {/* Vidéo au centre */}
            <VideoWrapper>
                <EmbeddedVideo
                    src="https://www.youtube.com/embed/WaM7hP7wmHk"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    title="Embedded YouTube video"
                ></EmbeddedVideo>
            </VideoWrapper>
        </AboutContainer>
    );
}

export default About;