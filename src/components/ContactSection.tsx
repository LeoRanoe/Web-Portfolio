import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { soundManager } from '../utils/sounds'

interface ContactSectionProps {
  id: string
}

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`

const Title = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
  }
`

const TerminalContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00ff00;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  overflow: hidden;
  position: relative;
  z-index: 1;
`

const TerminalHeader = styled.div`
  background: #00ff00;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const TerminalButton = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`

const TerminalContent = styled.div`
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  color: #00ff00;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 255, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff00;
    border-radius: 4px;
  }
`

const TerminalLine = styled.div<{ type: 'input' | 'response' | 'error' }>`
  margin: 0.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: ${props => {
    switch (props.type) {
      case 'error':
        return '#ff4444'
      case 'input':
        return '#00ff00'
      default:
        return '#ffffff'
    }
  }};
`

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 0.5rem;
`

const Input = styled.input`
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  flex: 1;
  outline: none;
  caret-color: #00ff00;

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }
`

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  const [terminalOutput, setTerminalOutput] = useState<Array<{ type: 'input' | 'response' | 'error', content: string }>>([
    { type: 'response', content: 'Welcome to the contact terminal! Type "help" for available commands.' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleCommand = (command: string) => {
    const newOutput = [...terminalOutput, { type: 'input', content: command }]
    setTerminalOutput(newOutput)

    switch (command.toLowerCase()) {
      case 'help':
        setTerminalOutput([
          ...newOutput,
          { type: 'response', content: 'Available commands:' },
          { type: 'response', content: '- help: Show this help message' },
          { type: 'response', content: '- email: Get my email address' },
          { type: 'response', content: '- github: Get my GitHub profile' },
          { type: 'response', content: '- linkedin: Get my LinkedIn profile' },
          { type: 'response', content: '- clear: Clear the terminal' },
        ])
        break
      case 'email':
        setTerminalOutput([
          ...newOutput,
          { type: 'response', content: 'Email: your.email@example.com' },
        ])
        break
      case 'github':
        setTerminalOutput([
          ...newOutput,
          { type: 'response', content: 'GitHub: https://github.com/yourusername' },
        ])
        break
      case 'linkedin':
        setTerminalOutput([
          ...newOutput,
          { type: 'response', content: 'LinkedIn: https://linkedin.com/in/yourusername' },
        ])
        break
      case 'clear':
        setTerminalOutput([
          { type: 'response', content: 'Welcome to the contact terminal! Type "help" for available commands.' },
        ])
        break
      default:
        setTerminalOutput([
          ...newOutput,
          { type: 'error', content: 'Command not found. Type "help" for available commands.' },
        ])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      soundManager.play('type')
      handleCommand(input)
      setInput('')
    }
  }

  return (
    <Section id={id}>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Contact
      </Title>
      <TerminalContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TerminalHeader>
          <TerminalButton color="#ff5f56" />
          <TerminalButton color="#ffbd2e" />
          <TerminalButton color="#27c93f" />
        </TerminalHeader>
        <TerminalContent>
          <AnimatePresence>
            {terminalOutput.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <TerminalLine type={line.type}>
                  {line.type === 'input' && <Prompt>$</Prompt>}
                  {line.content}
                </TerminalLine>
              </motion.div>
            ))}
          </AnimatePresence>
          <TerminalLine type="input">
            <Prompt>$</Prompt>
            <Input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setIsTyping(true)
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type a command..."
              autoFocus
            />
          </TerminalLine>
        </TerminalContent>
      </TerminalContainer>
    </Section>
  )
}

export default ContactSection 