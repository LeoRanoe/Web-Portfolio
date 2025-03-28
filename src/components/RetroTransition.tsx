import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { soundManager } from '../utils/sounds'

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Scanline = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  animation: ${scanline} 2s linear infinite;
`

const GlitchText = styled(motion.div)`
  font-family: 'Press Start 2P', monospace;
  font-size: 2rem;
  color: #fff;
  text-shadow: 2px 2px 0 #ff00ff;
  animation: ${glitch} 0.3s linear infinite;
  text-align: center;
`

interface RetroTransitionProps {
  text: string
  onComplete: () => void
}

const RetroTransition: React.FC<RetroTransitionProps> = ({ text, onComplete }) => {
  React.useEffect(() => {
    soundManager.play('success')
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Scanline />
      <GlitchText
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </GlitchText>
    </Container>
  )
}

export default RetroTransition 