import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  onStartClick: () => void
}

const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 1rem;
    justify-content: flex-start;
    margin-top: 2rem;
  }
`

const Title = styled(motion.h1)`
  font-family: 'Press Start 2P', cursive;
  font-size: 3.5rem;
  color: #00ff00;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;
  display: inline-block;
  line-height: 1.2;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 90%;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    max-width: 95%;
  }
`

const Tagline = styled(motion.p)`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
  }
`

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`

const SocialLink = styled.a`
  color: #00ff00;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);

  &:hover {
    color: #ffffff;
    transform: translateY(-3px);
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const StartButton = styled(motion.button)`
  font-family: 'Press Start 2P', cursive;
  padding: 1rem 2rem;
  font-size: 1rem;
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid #00ff00;
  color: #00ff00;
  text-transform: uppercase;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background: rgba(0, 255, 0, 0.2);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.8rem;
  }
`

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #00ff00;
  font-size: 1.5rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
  z-index: 1;
  cursor: pointer;

  &:hover {
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    font-size: 1.2rem;
  }
`

const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick }) => {
  return (
    <HeroContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Leonardo{'\n'}Ranoesendjojo
      </Title>
      <Tagline
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Full Stack Developer
      </Tagline>
      <SocialLinks
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <SocialLink
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </SocialLink>
        <SocialLink
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </SocialLink>
        <SocialLink
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i>
        </SocialLink>
      </SocialLinks>
      <StartButton
        onClick={onStartClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Journey
      </StartButton>
      <ScrollIndicator
        onClick={onStartClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-chevron-down"></i>
      </ScrollIndicator>
    </HeroContainer>
  )
}

export default HeroSection 