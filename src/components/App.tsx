import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { GlobalStyle } from '../styles/GlobalStyle'
import { AppContainer } from '../styles/AppContainer'
import { CustomCursor } from '../styles/CustomCursor'
import { SoundControl } from '../styles/SoundControl'
import { PixelBackground } from '../styles/PixelBackground'
import { DebugOverlay } from '../styles/DebugOverlay'
import { HeroSection } from '../sections/HeroSection'
import { AboutSection } from '../sections/AboutSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { SkillsSection } from '../sections/SkillsSection'
import { ContactSection } from '../sections/ContactSection'
import { LoadingScreen } from '../styles/LoadingScreen'

interface SectionProps {
  id?: string;
}

interface LoadingScreenProps {
  isLoading?: boolean;
}

interface DebugOverlayProps {
  fps?: number;
  errors?: string[];
  activeInteractions?: string[];
}

type CursorType = 'default' | 'pointer' | 'hover' | 'typing' | 'loading' | 'panda';

const App: React.FC = () => {
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')
  const [fps, setFps] = useState(0)
  const [errors, setErrors] = useState<string[]>([])
  const [activeInteractions, setActiveInteractions] = useState<string[]>([])

  // ... rest of the component code ...

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />
  }

  return (
    <AppContainer>
      <GlobalStyle />
      <CustomCursor type={cursorType} />
      <SoundControl />
      <PixelBackground />
      <DebugOverlay
        fps={fps}
        errors={errors}
        activeInteractions={activeInteractions}
      />

      <AnimatePresence>
        {showContent && (
          <>
            <HeroSection id="hero">
              {/* ... existing hero section content ... */}
            </HeroSection>

            <AboutSection id="about" />
            <ProjectsSection id="projects" />
            <SkillsSection id="skills" />
            <ContactSection id="contact" />
          </>
        )}
      </AnimatePresence>
    </AppContainer>
  )
}

export default App 