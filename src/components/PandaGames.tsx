import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { soundManager } from '../utils/sounds'

const GameContainer = styled(motion.div)`
  position: fixed;
  bottom: 5rem;
  left: 2rem;
  background: #000;
  border: 2px solid #fff;
  padding: 1rem;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  z-index: 1000;
  min-width: 300px;
`

const GameTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #00ff00;
`

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const GameCell = styled(motion.button)<{ isActive: boolean; isCorrect: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.isActive ? '#00ff00' : '#333'};
  border: 1px solid ${props => props.isCorrect ? '#00ff00' : '#fff'};
  color: ${props => props.isActive ? '#000' : '#fff'};
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const GameControls = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

const GameButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.6rem;
  cursor: pointer;
  flex: 1;

  &:hover {
    background: #fff;
    color: #000;
  }
`

const GameMessage = styled(motion.div)`
  text-align: center;
  margin-bottom: 1rem;
  color: #00ff00;
  font-size: 0.8rem;
`

interface PandaGamesProps {
  isVisible: boolean
  onClose: () => void
}

const patterns = [
  {
    name: 'Binary',
    pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1],
    hint: 'Binary code: 1s and 0s'
  },
  {
    name: 'RGB',
    pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    hint: 'RGB pattern: Red, Green, Blue'
  },
  {
    name: 'Loop',
    pattern: [1, 1, 1, 0, 0, 0, 1, 1, 1],
    hint: 'Infinite loop pattern'
  }
]

const PandaGames: React.FC<PandaGamesProps> = ({ isVisible, onClose }) => {
  const [currentPattern, setCurrentPattern] = useState(0)
  const [selectedCells, setSelectedCells] = useState<number[]>([])
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)

  const handleCellClick = (index: number) => {
    if (selectedCells.includes(index)) {
      setSelectedCells(prev => prev.filter(i => i !== index))
      soundManager.play('error')
    } else if (selectedCells.length < 9) {
      setSelectedCells(prev => [...prev, index])
      soundManager.play('click')
    }
  }

  const checkPattern = () => {
    const isCorrect = selectedCells.every((cell, index) => 
      patterns[currentPattern].pattern[index] === (selectedCells.includes(index) ? 1 : 0)
    )

    if (isCorrect) {
      setMessage('Correct! Well done!')
      soundManager.play('success')
      setScore(prev => prev + 100)
      setTimeout(() => {
        setCurrentPattern(prev => (prev + 1) % patterns.length)
        setSelectedCells([])
        setMessage('')
      }, 2000)
    } else {
      setMessage('Try again!')
      soundManager.play('error')
    }
  }

  const resetGame = () => {
    setSelectedCells([])
    setMessage('')
    setScore(0)
    setCurrentPattern(0)
    soundManager.play('click')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <GameContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <GameTitle>Code Puzzle</GameTitle>
          <GameMessage>{message || patterns[currentPattern].hint}</GameMessage>
          <GameGrid>
            {Array.from({ length: 9 }).map((_, index) => (
              <GameCell
                key={index}
                isActive={selectedCells.includes(index)}
                isCorrect={patterns[currentPattern].pattern[index] === 1}
                onClick={() => handleCellClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedCells.includes(index) ? '1' : '0'}
              </GameCell>
            ))}
          </GameGrid>
          <GameControls>
            <GameButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={checkPattern}
            >
              Check
            </GameButton>
            <GameButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
            >
              Reset
            </GameButton>
            <GameButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Close
            </GameButton>
          </GameControls>
          <GameMessage>Score: {score}</GameMessage>
        </GameContainer>
      )}
    </AnimatePresence>
  )
}

export default PandaGames 