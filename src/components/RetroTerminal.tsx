import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const TerminalContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  height: 300px;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #00ff00;
  border-radius: 8px;
  font-family: 'Press Start 2P', cursive;
  z-index: 1000;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
`

const TerminalHeader = styled.div`
  background: #00ff00;
  color: #000;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TerminalTitle = styled.div`
  font-size: 0.8rem;
`

const TerminalControls = styled.div`
  display: flex;
  gap: 8px;
`

const ControlButton = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`

const TerminalContent = styled.div`
  padding: 16px;
  height: calc(100% - 40px);
  overflow-y: auto;
  color: #00ff00;
  font-size: 0.7rem;
  line-height: 1.5;
`

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Prompt = styled.span`
  color: #00ff00;
`

const Input = styled.input`
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  width: 100%;
  outline: none;
`

const Output = styled.div`
  margin: 8px 0;
  white-space: pre-wrap;
`

const RetroTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<{ type: 'input' | 'output', content: string }[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = {
    help: () => `Available commands:
- help: Show this help message
- about: Learn about the developer
- skills: View my skills
- projects: See my projects
- clear: Clear the terminal
- matrix: Enter the matrix
- easter: Find Easter eggs
- music: Toggle background music
- theme: Change terminal theme
- exit: Close the terminal`,
    about: () => `I'm a passionate Full Stack Developer with expertise in modern web technologies.
I love creating engaging and interactive web experiences.`,
    skills: () => `Frontend: React, TypeScript, Styled Components
Backend: Node.js, Express, MongoDB
Tools: Git, Docker, AWS
And many more...`,
    projects: () => `Check out my projects at:
- Project 1: A retro-style portfolio
- Project 2: An interactive game
- Project 3: A full-stack application`,
    clear: () => {
      setHistory([])
      return 'Terminal cleared!'
    },
    matrix: () => {
      // Matrix rain effect
      return 'Entering the matrix...'
    },
    easter: () => `Easter eggs found:
1. Try pressing arrow keys
2. Click the terminal title
3. Type 'konami' for a surprise`,
    music: () => 'Toggling background music...',
    theme: () => 'Changing terminal theme...',
    exit: () => {
      setIsOpen(false)
      return 'Closing terminal...'
    },
    konami: () => {
      // Konami code Easter egg
      return '🎮 Konami Code activated! 🎮'
    }
  }

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    const output = commands[cmd as keyof typeof commands]?.() || 'Command not found. Type "help" for available commands.'
    
    setHistory(prev => [
      ...prev,
      { type: 'input', content: `> ${command}` },
      { type: 'output', content: output }
    ])
    setCurrentInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
    }
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            padding: '8px 16px',
            background: 'rgba(0, 255, 0, 0.1)',
            border: '2px solid #00ff00',
            color: '#00ff00',
            fontFamily: "'Press Start 2P', cursive",
            cursor: 'pointer',
            zIndex: 1000
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open Terminal
        </motion.button>
      )}

      {isOpen && (
        <TerminalContainer
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <TerminalHeader>
            <TerminalTitle>Retro Terminal</TerminalTitle>
            <TerminalControls>
              <ControlButton color="#ff5f56" onClick={() => setIsOpen(false)} />
              <ControlButton color="#ffbd2e" />
              <ControlButton color="#27c93f" />
            </TerminalControls>
          </TerminalHeader>
          <TerminalContent>
            {history.map((item, index) => (
              <div key={index}>
                {item.type === 'input' ? (
                  <CommandLine>
                    <Prompt>$</Prompt>
                    <span>{item.content}</span>
                  </CommandLine>
                ) : (
                  <Output>{item.content}</Output>
                )}
              </div>
            ))}
            <CommandLine>
              <Prompt>$</Prompt>
              <Input
                ref={inputRef}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </CommandLine>
          </TerminalContent>
        </TerminalContainer>
      )}
    </>
  )
}

export default RetroTerminal 