import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const GameContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000;
  border: 2px solid #00ff00;
  padding: 20px;
  z-index: 1100;
  width: 90%;
  max-width: 500px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
`

const Cell = styled.button<{ isSelected: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.isSelected ? '#00ff00' : '#000'};
  border: 2px solid #00ff00;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.isSelected ? '#00ff00' : '#001100'};
  }
`

const Title = styled.h2`
  color: #00ff00;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Press Start 2P', cursive;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #00ff00;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: #fff;
  }
`

interface PandaGamesProps {
  isVisible: boolean
  onClose: () => void
}

const PandaGames: React.FC<PandaGamesProps> = ({ isVisible, onClose }) => {
  const [selectedCells, setSelectedCells] = useState<number[]>([])

  const handleCellClick = (index: number) => {
    setSelectedCells(prev => {
      const newSelection = [...prev]
      const cellIndex = newSelection.indexOf(index)
      
      if (cellIndex === -1) {
        newSelection.push(index)
      } else {
        newSelection.splice(cellIndex, 1)
      }
      
      return newSelection
    })
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <GameContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <Title>Memory Pattern</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Grid>
            {Array.from({ length: 9 }, (_, i) => (
              <Cell
                key={i}
                isSelected={selectedCells.includes(i)}
                onClick={() => handleCellClick(i)}
              />
            ))}
          </Grid>
        </GameContainer>
      )}
    </AnimatePresence>
  )
}

export default PandaGames 