import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { soundManager } from '../utils/sounds'

const Container = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`

const Button = styled.button<{ isMuted: boolean }>`
  background: none;
  border: 2px solid #00ff00;
  color: #00ff00;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: ${props => props.isMuted ? 0.5 : 1};

  &:hover {
    background: #00ff00;
    color: #000;
  }
`

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  background: #fff;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: #fff;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #fff;
    cursor: pointer;
  }
`

interface SoundControlProps {
  onToggle: () => void;
}

const SoundControl: React.FC<SoundControlProps> = ({ onToggle }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)

  const handleClick = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    onToggle();
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    soundManager.setVolume(newVolume)
    soundManager.play('hover')
  }

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <VolumeSlider
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
      <Button
        isMuted={isMuted}
        onClick={handleClick}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </Button>
    </Container>
  )
}

export default SoundControl 