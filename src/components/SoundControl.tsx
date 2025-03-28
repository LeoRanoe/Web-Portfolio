import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { soundManager } from '../utils/sounds'

const Container = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Button = styled(motion.button)`
  background: #000;
  border: 2px solid #fff;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: #fff;
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

const SoundControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)

  const handleMuteToggle = () => {
    const newMuteState = soundManager.toggleMute()
    setIsMuted(newMuteState)
    soundManager.play('click')
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    soundManager.setVolume(newVolume)
    soundManager.play('hover')
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
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
        onClick={handleMuteToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? '🔇' : '🔊'}
      </Button>
    </Container>
  )
}

export default SoundControl 