import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { soundManager } from '../utils/sounds'
import PandaGames from './PandaGames'

const idle = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const wave = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
`

const dance = keyframes`
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(10deg) translateY(-5px); }
  50% { transform: rotate(-5deg) translateY(-10px); }
  75% { transform: rotate(10deg) translateY(-5px); }
  100% { transform: rotate(0deg) translateY(0); }
`

const Container = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 64px;
  height: 64px;
  z-index: 1000;
  cursor: pointer;
`

const Sprite = styled.div<{ frame: number; isDancing: boolean }>`
  width: 64px;
  height: 64px;
  background-image: url('/sprites/panda.png');
  background-size: 512px 64px;
  background-position: ${props => `-${props.frame * 64}px 0`};
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  animation: ${props => props.isDancing ? dance : idle} 1s infinite;
`

const SpeechBubble = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 2px solid #000;
  padding: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  white-space: nowrap;
  margin-bottom: 1rem;
  color: #000;
  text-align: center;
  box-shadow: 2px 2px 0 #000;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #fff;
  }
`

const InteractionMenu = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  border: 2px solid #fff;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1001;
`

const MenuButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.6rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #fff;
    color: #000;
  }
`

const messages = [
  "Hello! I'm your pixel panda guide!",
  "Click me for a surprise!",
  "Welcome to my portfolio!",
  "Let's make something awesome!",
  "I love coding!",
  "Pixel art is the best!",
  "Want to see my skills?",
  "Check out my projects!",
  "Time to level up!",
  "Let's debug together!",
  "Want to play a game?",
  "Try the Code Puzzle!"
]

interface PixelPandaProps {
  onHover: () => void
}

const PixelPanda: React.FC<PixelPandaProps> = ({ onHover }) => {
  const [frame, setFrame] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [message, setMessage] = useState(messages[0])
  const [showMessage, setShowMessage] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isDancing, setIsDancing] = useState(false)
  const [mood, setMood] = useState<'happy' | 'excited' | 'normal'>('normal')
  const controls = useAnimation()
  const lastInteraction = useRef(Date.now())
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 8)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    soundManager.play('click')
    setMessage(messages[Math.floor(Math.random() * messages.length)])
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover()
    soundManager.play('hover')
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowMenu(false)
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowMenu(!showMenu)
    soundManager.play('click')
  }

  const handleDance = () => {
    setIsDancing(true)
    setMood('excited')
    soundManager.play('success')
    setTimeout(() => {
      setIsDancing(false)
      setMood('normal')
    }, 2000)
  }

  const handleWave = () => {
    controls.start({
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 }
    })
    setMood('happy')
    soundManager.play('hover')
    setTimeout(() => setMood('normal'), 1000)
  }

  const handleInteraction = () => {
    const now = Date.now()
    if (now - lastInteraction.current < 1000) {
      handleDance()
    } else {
      handleWave()
    }
    lastInteraction.current = now
  }

  const handleGameClick = () => {
    setShowGame(true)
    soundManager.play('success')
  }

  return (
    <Container
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: isHovered ? -5 : 0,
        scale: isHovered ? 1.1 : 1
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Sprite frame={frame} isDancing={isDancing} />
      {showMessage && (
        <SpeechBubble
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {message}
        </SpeechBubble>
      )}
      {showMenu && (
        <InteractionMenu
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <MenuButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDance}
          >
            Dance!
          </MenuButton>
          <MenuButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWave}
          >
            Wave!
          </MenuButton>
          <MenuButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGameClick}
          >
            Play Game!
          </MenuButton>
        </InteractionMenu>
      )}
      <PandaGames
        isVisible={showGame}
        onClose={() => setShowGame(false)}
      />
    </Container>
  )
}

export default PixelPanda 