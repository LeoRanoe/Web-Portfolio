import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

type MessageType = 'input' | 'response' | 'error'

interface Message {
  type: MessageType
  content: string
}

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

const TerminalLine = styled.div<{ type: MessageType }>`
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
  background: none;
  border: none;
  color: #00ff00;
  font-family: monospace;
  width: 100%;
  outline: none;
  
  &::placeholder {
    color: #00ff00;
    opacity: 0.5;
  }
`

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  const [terminalOutput, setTerminalOutput] = useState<Message[]>([
    { type: 'response' as const, content: 'Welcome to the terminal! Type "help" for available commands.' }
  ])
  const [currentInput, setCurrentInput] = useState('')

  const handleCommand = (command: string) => {
    const newOutput: Message[] = [
      ...terminalOutput,
      { type: 'input' as const, content: `> ${command}` }
    ]

    switch (command.toLowerCase()) {
      case 'help':
        setTerminalOutput([
          ...newOutput,
          { type: 'response' as const, content: 'Available commands:' },
          { type: 'response' as const, content: '- help: Show this help message' },
          { type: 'response' as const, content: '- email: Show contact email' },
          { type: 'response' as const, content: '- clear: Clear the terminal' }
        ])
        break
      case 'email':
        setTerminalOutput([
          ...newOutput,
          { type: 'response' as const, content: 'Contact email: your.email@example.com' }
        ])
        break
      case 'clear':
        setTerminalOutput([])
        break
      default:
        setTerminalOutput([
          ...newOutput,
          { type: 'error' as const, content: 'Command not found. Type "help" for available commands.' }
        ])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleCommand(currentInput.trim())
      setCurrentInput('')
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
            {terminalOutput.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <TerminalLine type={message.type}>
                  {message.type === 'input' && <Prompt>$</Prompt>}
                  {message.content}
                </TerminalLine>
              </motion.div>
            ))}
          </AnimatePresence>
          <TerminalLine type="input">
            <Prompt>$</Prompt>
            <Input
              value={currentInput}
              onChange={(e) => {
                setCurrentInput(e.target.value)
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type a command..."
            />
          </TerminalLine>
        </TerminalContent>
      </TerminalContainer>
    </Section>
  )
}

export default ContactSection 