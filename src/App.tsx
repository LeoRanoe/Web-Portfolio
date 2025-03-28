import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import { soundManager } from './utils/sounds'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import CustomCursor from './components/CustomCursor'
import SoundControl from './components/SoundControl'
import VolumeControl from './components/VolumeControl'
import PixelPanda from './components/PixelPanda'
import PandaGames from './components/PandaGames'

const Container = styled.div`
  background-color: #000;
  color: #00ff00;
  min-height: 100vh;
  cursor: none;
`

const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isGameVisible, setIsGameVisible] = useState(false)

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

  return (
    <>
      <GlobalStyle />
      <Container>
        <CustomCursor />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection id="contact" />
        <PixelPanda />
        <PandaGames isVisible={isGameVisible} onClose={() => setIsGameVisible(false)} />
        <VolumeControl onVolumeChange={handleVolumeChange} />
        <SoundControl onToggle={handleSoundToggle} />
      </Container>
    </>
  )
}

export default App 