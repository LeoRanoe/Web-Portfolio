import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`

const MascotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 80px;
  height: 80px;
  z-index: 1000;
  padding: 10px;
  will-change: transform;
  pointer-events: auto;
  transform-origin: bottom left;
`

const CatBody = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  transform-origin: center;
`

const Pixel = styled.div<{ color: string; x: number; y: number }>`
  width: 4px;
  height: 4px;
  background: ${props => props.color};
  position: absolute;
  left: ${props => props.x * 4}px;
  top: ${props => props.y * 4}px;
  image-rendering: pixelated;
`

const SpeechBubble = styled(motion.div)`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: #00ff00;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.6rem;
  white-space: nowrap;
  z-index: 1001;
  border: 2px solid #00ff00;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #00ff00;
  }
`

const messages = [
  "Meow! Need help?",
  "Purr~ Nice code!",
  "Time for coding!",
  "Pet me! ^_^",
  "Looking good!",
  "Keep it up!",
  "Nya~ Debug time!",
  "Let's code together!"
]

const catPixels = [
  // Body
  ...Array.from({ length: 8 }, (_, i) => ({ color: '#00ff00', x: 6 + i, y: 10 })),
  ...Array.from({ length: 8 }, (_, i) => ({ color: '#00ff00', x: 6 + i, y: 11 })),
  
  // Head
  ...Array.from({ length: 6 }, (_, i) => ({ color: '#00ff00', x: 7 + i, y: 8 })),
  ...Array.from({ length: 6 }, (_, i) => ({ color: '#00ff00', x: 7 + i, y: 9 })),
  
  // Ears
  { color: '#00ff00', x: 7, y: 7 },
  { color: '#00ff00', x: 12, y: 7 },
  
  // Eyes
  { color: '#000000', x: 8, y: 9 },
  { color: '#000000', x: 11, y: 9 },
  { color: '#ffffff', x: 8, y: 9 },
  { color: '#ffffff', x: 11, y: 9 },
  
  // Nose
  { color: '#ff9999', x: 9, y: 10 },
  { color: '#ff9999', x: 10, y: 10 },
  
  // Tail
  { color: '#00ff00', x: 13, y: 11 },
  { color: '#00ff00', x: 14, y: 10 },
  { color: '#00ff00', x: 15, y: 9 },
  
  // Paws
  { color: '#00ff00', x: 6, y: 12 },
  { color: '#00ff00', x: 8, y: 12 },
  { color: '#00ff00', x: 11, y: 12 },
  { color: '#00ff00', x: 13, y: 12 },
]

const PixelMascot: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const memoizedPixels = useMemo(() => catPixels.map((pixel, index) => (
    <Pixel
      key={index}
      color={pixel.color}
      x={pixel.x}
      y={pixel.y}
    />
  )), [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    let timeoutId: number
    if (showMessage) {
      timeoutId = window.setTimeout(() => {
        setShowMessage(false)
        setIsAnimating(false)
      }, 3000)
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [showMessage])

  const handleClick = useCallback(() => {
    setShowMessage(true)
    setIsAnimating(true)
  }, [])

  const handleHoverStart = useCallback(() => setIsHovered(true), [])
  const handleHoverEnd = useCallback(() => setIsHovered(false), [])

  return (
    <MascotContainer
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={handleClick}
    >
      {showMessage && (
        <SpeechBubble
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {messages[currentMessage]}
        </SpeechBubble>
      )}
      <CatBody
        animate={isHovered ? {
          scale: 1.1,
          y: -5
        } : isAnimating ? {
          rotate: [0, -10, 10, -5, 5, 0],
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        } : {
          scale: 1,
          y: 0
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        {memoizedPixels}
      </CatBody>
    </MascotContainer>
  )
}

export default React.memo(PixelMascot) 