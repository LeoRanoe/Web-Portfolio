import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: 'Press Start 2P', cursive;
`

const LoadingText = styled(motion.div)`
  color: #fff;
  font-size: 1.5rem;
  text-shadow: 2px 2px 0 #000;
  position: relative;
  overflow: hidden;
`

const GlitchEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.1) 0px,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  mix-blend-mode: difference;
`

interface LoadingScreenProps {
  isLoading: boolean
  text?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, text = 'Loading...' }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingText>
            {text}
            <GlitchEffect
              animate={{
                y: [0, -2, 0, 2, 0],
                opacity: [0, 1, 0, 1, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </LoadingText>
        </LoadingContainer>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen 