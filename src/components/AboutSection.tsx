import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
  50% { text-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  background: linear-gradient(180deg, #000000 0%, #001100 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 0, 0.03) 0px,
      rgba(0, 255, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    animation: ${scanline} 10s linear infinite;
  }
`

const Title = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;
  animation: ${glow} 2s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
  }
`

const CharacterSheet = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 17, 0, 0.5);
  border: 2px solid #00ff00;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
`

const CharacterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #00ff00;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const CharacterImage = styled.img`
  width: 150px;
  height: 150px;
  border: 2px solid #00ff00;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`

const CharacterInfo = styled.div`
  flex: 1;
`

const CharacterName = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
`

const CharacterClass = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
`

const CharacterLevel = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
`

const XPBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid #00ff00;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
`

const XPBar = styled.div`
  width: 75%;
  height: 100%;
  background: #00ff00;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  animation: ${glow} 2s ease-in-out infinite;
`

const MissionStatement = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #00ff00;
`

const MissionTitle = styled.h4`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1rem;
  margin-bottom: 1rem;
`

const MissionText = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  font-size: 0.8rem;
  line-height: 1.5;
`

const AboutSection: React.FC = () => {
  return (
    <Section id="about">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Character Profile
      </Title>
      <CharacterSheet
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CharacterHeader>
          <CharacterImage src="profile.jpg" alt="Leonardo Ranoesendjojo" />
          <CharacterInfo>
            <CharacterName>Leonardo Ranoesendjojo</CharacterName>
            <CharacterClass>Class: Software Engineer Apprentice</CharacterClass>
            <CharacterLevel>Level: 18</CharacterLevel>
            <XPBarContainer>
              <XPBar />
            </XPBarContainer>
          </CharacterInfo>
        </CharacterHeader>
        <MissionStatement>
          <MissionTitle>Mission Statement</MissionTitle>
          <MissionText>
            Passionate about technology and representing Suriname on the global tech stage. 
            Currently studying ICT, specializing in software development and networking. 
            Dedicated to inspiring youth through robotics and programming, while continuously 
            developing skills in web development and IT infrastructure.
          </MissionText>
        </MissionStatement>
      </CharacterSheet>
    </Section>
  )
}

export default AboutSection 