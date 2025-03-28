import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import GlobalStyle from './styles/GlobalStyle'
import { soundManager } from './utils/sounds'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import CustomCursor from './components/CustomCursor'
import SoundControl from './components/SoundControl'
import VolumeControl from './components/VolumeControl'
import PixelPanda from './components/PixelPanda'
import PandaGames from './components/PandaGames'
import LoadingScreen from './components/LoadingScreen'
import ExperienceTimeline from './components/ExperienceTimeline'
import TerminalMenu from './components/TerminalMenu'

const Container = styled.div<{ isVisible: boolean }>`
  background-color: #000;
  color: #00ff00;
  min-height: 100vh;
  cursor: none;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 1s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 0, 0.03) 0px,
      rgba(0, 255, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 10;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    pointer-events: none;
    z-index: 11;
  }
`

const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isGameVisible, setIsGameVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contentVisible, setContentVisible] = useState(true)

  useEffect(() => {
    if (!isMuted) {
      soundManager.playBackground()
    } else {
      soundManager.stopBackground()
    }
  }, [isMuted])

  const handleVolumeChange = (volume: number) => {
    soundManager.setVolume(volume)
  }

  const handleSoundToggle = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    soundManager.setMuted(newMutedState)
  }

  const handleStartJourney = () => {
    setContentVisible(false)
    setIsLoading(true)
    soundManager.play('click')
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setContentVisible(true)
    }, 500)
  }

  return (
    <>
      <GlobalStyle />
      <div className="scanline" />
      <div className="vignette" />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      <Container isVisible={contentVisible}>
        <CustomCursor />
        <HeroSection onStartClick={handleStartJourney} />
        <AboutSection />
        <ExperienceTimeline />
        <ProjectsSection />
        <SkillsSection />
        <TerminalMenu />
        <PixelPanda />
        <PandaGames isVisible={isGameVisible} onClose={() => setIsGameVisible(false)} />
        <VolumeControl onVolumeChange={handleVolumeChange} />
        <SoundControl onToggle={handleSoundToggle} />
      </Container>
    </>
  )
}

export default App 