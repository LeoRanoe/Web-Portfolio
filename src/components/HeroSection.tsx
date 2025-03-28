import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
  50% { text-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
`

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`

interface HeroSectionProps {
  onStartClick: () => void
}

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #000000 0%, #001100 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem;
  text-align: center;

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

const Title = styled(motion.h1)`
  font-family: 'Press Start 2P', cursive;
  font-size: 3.5rem;
  color: #00ff00;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  animation: ${glow} 2s ease-in-out infinite;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.5rem;
  color: #00ff00;
  margin-bottom: 3rem;
  opacity: 0.8;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const LoadingText = styled(motion.div)`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  color: #00ff00;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '█';
    animation: ${blink} 1s infinite;
  }
`

const StartButton = styled(motion.button)`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  color: #000;
  background: #00ff00;
  border: 2px solid #00ff00;
  padding: 1rem 2rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-shadow: none;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.8);

    &::before {
      transform: translateX(100%);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`

const PixelDecoration = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00ff00;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  animation: ${glow} 2s ease-in-out infinite;
`

const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick }) => {
  const [pixels, setPixels] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    // Generate random pixel decorations
    const newPixels = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }))
    setPixels(newPixels)
  }, [])

  return (
    <Section id="hero">
      {pixels.map((pixel, index) => (
        <PixelDecoration
          key={index}
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Leonardo Ranoesendjojo
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Software Engineer Apprentice | Youth Tech Advocate
      </Subtitle>
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Loading Portfolio...
      </LoadingText>
      <StartButton
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        onClick={onStartClick}
      >
        Press Start
      </StartButton>
    </Section>
  )
}

export default HeroSection 