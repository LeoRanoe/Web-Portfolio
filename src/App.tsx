import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import CustomCursor from './components/CustomCursor'
import DebugOverlay from './components/DebugOverlay'
import GlobalStyle from './styles/GlobalStyle'
import VolumeControl from './components/VolumeControl'
import PixelMascot from './components/PixelMascot'
import RetroLoadingScreen from './components/RetroLoadingScreen'
import PageAnimations from './components/PageAnimations'

const AppContainer = styled.div`
  min-height: 100vh;
  background: #000;
  color: #00ff00;
  overflow-x: hidden;
  position: relative;
`

const MainContent = styled.div`
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.3s ease;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: auto;
  }
`

type CursorType = 'default' | 'loading' | 'hover' | 'pointer'

const App: React.FC = () => {
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [fps, setFps] = useState<number>(0)
  const [errors] = useState<string[]>([])
  const [activeInteractions] = useState<string[]>([])
  const [volume, setVolume] = useState(0.5)
  const [isLoading, setIsLoading] = useState(true)

  // FPS Counter
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    
    const updateFps = () => {
      const currentTime = performance.now()
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round(frameCount * 1000 / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(updateFps)
    }
    
    requestAnimationFrame(updateFps)
  }, [])

  // Update cursor type based on interactions
  const handleMouseEnter = () => setCursorType('hover')
  const handleMouseLeave = () => setCursorType('default')
  const handleClick = () => {
    setCursorType('pointer')
    setTimeout(() => setCursorType('default'), 150)
  }

  const handleStartClick = () => {
    setIsLoading(true)
    setCursorType('loading')
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setCursorType('default')
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
  }

  // Handle keyboard events for loading screen
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isLoading) {
        setIsLoading(false)
        setCursorType('default')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isLoading])

  return (
    <PageAnimations>
      <AppContainer>
        <GlobalStyle />
        <CustomCursor type={cursorType} />
        <VolumeControl onVolumeChange={handleVolumeChange} />
        
        <MainContent>
          <Section id="hero">
            <HeroSection onStartClick={handleStartClick} />
          </Section>

          <Section id="about">
            <AboutSection id="about" />
          </Section>

          <Section id="projects">
            <ProjectsSection id="projects" />
          </Section>

          <Section id="skills">
            <SkillsSection id="skills" />
          </Section>

          <Section id="contact">
            <ContactSection id="contact" />
          </Section>

          <DebugOverlay 
            fps={fps}
            errors={errors}
            activeInteractions={activeInteractions}
          />

          <PixelMascot />
        </MainContent>
      </AppContainer>

      {isLoading && (
        <RetroLoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
    </PageAnimations>
  )
}

export default App 