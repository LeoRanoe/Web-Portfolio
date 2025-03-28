import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface RetroLoadingScreenProps {
  onLoadingComplete: () => void
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 0, 0.03) 0px,
      rgba(0, 255, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

const LoadingText = styled(motion.div)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 90%;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    max-width: 95%;
  }
`

const ProgressBar = styled.div`
  width: 80%;
  max-width: 400px;
  height: 4px;
  background: rgba(0, 255, 0, 0.2);
  border: 1px solid #00ff00;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 90%;
    height: 3px;
    margin-bottom: 1.5rem;
  }
`

const ProgressFill = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #00ff00;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`

const LoadingDetails = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
  text-align: center;
  margin-top: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 90%;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    max-width: 95%;
  }
`

const RetroLoadingScreen: React.FC<RetroLoadingScreenProps> = ({ onLoadingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM...')

  const loadingSteps = [
    { text: 'INITIALIZING SYSTEM...', duration: 800 },
    { text: 'LOADING ASSETS...', duration: 1200 },
    { text: 'ESTABLISHING CONNECTION...', duration: 1000 },
    { text: 'CONFIGURING INTERFACE...', duration: 1000 },
    { text: 'READY TO LAUNCH', duration: 500 }
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const updateLoading = () => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text)
        setProgress((currentStep + 1) * (100 / loadingSteps.length))
        
        timeout = setTimeout(() => {
          setCurrentStep(prev => prev + 1)
        }, loadingSteps[currentStep].duration)
      } else {
        onLoadingComplete()
      }
    }

    updateLoading()
    return () => clearTimeout(timeout)
  }, [currentStep, loadingSteps, onLoadingComplete])

  return (
    <LoadingContainer>
      <LoadingText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loadingText}
      </LoadingText>
      <ProgressBar>
        <ProgressFill
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </ProgressBar>
      <LoadingDetails>PRESS ANY KEY TO SKIP {'>'}_</LoadingDetails>
    </LoadingContainer>
  )
}

export default RetroLoadingScreen 