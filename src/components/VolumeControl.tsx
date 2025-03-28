import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const VolumeContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  padding: 8px;
  background: #000000;
  border: 2px solid #00ff00;
  image-rendering: pixelated;
  font-family: 'Press Start 2P', monospace;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 1px solid #000000;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 1px solid #00ff00;
    opacity: 0.5;
    pointer-events: none;
  }
`

const VolumeIcon = styled.button<{ isMuted: boolean }>`
  width: 24px;
  height: 24px;
  background: ${props => props.isMuted ? '#001100' : '#000000'};
  border: 2px solid #00ff00;
  color: #00ff00;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: ${props => props.isMuted ? 0.5 : 1};
  image-rendering: pixelated;

  &:hover {
    background: #001100;
  }

  &:active {
    background: #002200;
  }
`

const VolumeBarContainer = styled.div`
  width: 80px;
  height: 24px;
  position: relative;
  background: #000000;
  border: 2px solid #00ff00;
  padding: 4px;
  image-rendering: pixelated;
`

const VolumeLevel = styled.div<{ width: number }>`
  position: absolute;
  left: 4px;
  top: 4px;
  height: calc(100% - 8px);
  width: ${props => props.width}%;
  background: #00ff00;
  transition: width 0.1s steps(8);
`

const VolumeSegments = styled.div`
  position: absolute;
  left: 4px;
  top: 4px;
  right: 4px;
  bottom: 4px;
  display: flex;
  gap: 2px;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      to right,
      transparent,
      transparent 8px,
      rgba(0, 0, 0, 0.3) 8px,
      rgba(0, 0, 0, 0.3) 10px
    );
  }
`

interface VolumeControlProps {
  onVolumeChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ onVolumeChange }) => {
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newVolume = Math.max(0, Math.min(1, x / rect.width))
    setVolume(newVolume)
    setIsMuted(false)
    onVolumeChange(newVolume)
  }

  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    onVolumeChange(newMutedState ? 0 : volume)
  }

  return (
    <VolumeContainer
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <VolumeIcon
        as={motion.button}
        isMuted={isMuted}
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? '×' : '♪'}
      </VolumeIcon>
      <VolumeBarContainer onClick={handleVolumeClick}>
        <VolumeLevel width={isMuted ? 0 : volume * 100} />
        <VolumeSegments />
      </VolumeBarContainer>
    </VolumeContainer>
  )
}

export default VolumeControl 