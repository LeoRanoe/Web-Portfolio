import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const TerminalContainer = styled.div`
  background: #000;
  border: 2px solid #00ff00;
  border-radius: 8px;
  padding: 1rem;
  max-width: 800px;
  margin: 2rem auto;
  font-family: 'VT323', monospace;
  color: #00ff00;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 0, 0.03) 0px,
      rgba(0, 255, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    animation: ${scanline} 10s linear infinite;
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #00ff00;
`;

const TerminalTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  color: #00ff00;
  margin: 0;
`;

const TerminalControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:nth-child(1) { background: #ff5f56; }
  &:nth-child(2) { background: #ffbd2e; }
  &:nth-child(3) { background: #27c93f; }
`;

const TerminalContent = styled.div`
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem;
`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const CommandInput = styled.input`
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: 'VT323', monospace;
  font-size: 1rem;
  flex: 1;
  outline: none;
  caret-color: #00ff00;
`;

const Output = styled.div`
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #00ff00;
  margin-left: 4px;
  animation: ${blink} 1s infinite;
`;

const ErrorMessage = styled.div`
  color: #ff5f56;
  margin-bottom: 0.5rem;
`;

const Link = styled.a`
  color: #00ff00;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const WelcomeMessage = styled.div`
  margin-bottom: 1rem;
  color: #00ff00;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  line-height: 1.5;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const commands = {
  help: () => `Available commands:
  help     - Show this help message
  contact  - Display contact information
  message  - Send a message (usage: message "your text")
  clear    - Clear the terminal
  about    - Show information about the developer
  guide    - Show user guide
  social   - Display social media links
  email    - Display email address
  github   - Display GitHub profile link
  linkedin - Display LinkedIn profile link`,

  guide: () => `=== Contact Terminal User Guide ===
  
1. Basic Commands:
   - Type 'help' to see all available commands
   - Type 'clear' to clear the terminal
   - Type 'about' to learn more about Leonardo

2. Contact Information:
   - Type 'contact' to see all contact details
   - Type 'email' for email address
   - Type 'github' for GitHub profile
   - Type 'linkedin' for LinkedIn profile
   - Type 'social' for all social media links

3. Sending Messages:
   - Use 'message "your text"' to send a message
   - Example: message "Hello Leonardo!"
   - Note: This is a simulation for demonstration

4. Navigation:
   - Use arrow keys to navigate command history
   - Press Enter to execute commands
   - Type 'clear' to start fresh

5. Tips:
   - Commands are case-insensitive
   - Use quotes for messages with spaces
   - Type 'help' anytime to see available commands`,

  contact: () => `=== Contact Information ===
  
Email: leonardo.ranoesendjojo@gmail.com
GitHub: https://github.com/LeonardoRanoesendjojo
LinkedIn: https://www.linkedin.com/in/leonardo-ranoesendjojo/

Use these commands for specific information:
- 'email' - Email address
- 'github' - GitHub profile
- 'linkedin' - LinkedIn profile
- 'social' - All social media links`,

  social: () => `=== Social Media Links ===
  
GitHub: https://github.com/LeonardoRanoesendjojo
LinkedIn: https://www.linkedin.com/in/leonardo-ranoesendjojo/

Use these commands for more details:
- 'github' - GitHub profile
- 'linkedin' - LinkedIn profile`,

  email: () => `Email: leonardo.ranoesendjojo@gmail.com`,

  github: () => `GitHub Profile: https://github.com/LeonardoRanoesendjojo`,

  linkedin: () => `LinkedIn Profile: https://www.linkedin.com/in/leonardo-ranoesendjojo/`,

  about: () => `=== About Leonardo Ranoesendjojo ===
  
Software Engineer Apprentice
Youth Tech Advocate
Passionate about technology and representing Suriname on the global tech stage.
Currently studying ICT, specializing in software development and networking.`,

  clear: () => '',

  message: (text: string) => {
    if (!text) return 'Error: Please provide a message (usage: message "your text")';
    return `Message received: "${text}"
    
(Note: This is a simulation. No actual message was sent.)
To contact Leonardo, please use the email command or visit his social media profiles.`;
  }
};

const TerminalMenu: React.FC = () => {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: '',
      output: `Welcome to Leonardo's Contact Terminal v1.0!
      
Type 'guide' to learn how to use this terminal.
Type 'help' to see available commands.
Type 'contact' to view contact information.`
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (command: string) => {
    if (!command.trim()) return;
    
    const [cmd, ...args] = command.split(' ');
    const output = commands[cmd.toLowerCase() as keyof typeof commands]?.(args.join(' ')) || 
      `Error: Command '${cmd}' not found. Type 'help' for available commands.`;
    
    setHistory(prev => [...prev, { command, output }]);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    setCurrentCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <TerminalContainer>
      <TerminalHeader>
        <TerminalTitle>Contact Terminal v1.0</TerminalTitle>
        <TerminalControls>
          <ControlButton />
          <ControlButton />
          <ControlButton />
        </TerminalControls>
      </TerminalHeader>
      <TerminalContent>
        {history.map((entry, index) => (
          <div key={index}>
            {entry.command && (
              <CommandLine>
                <Prompt>$</Prompt>
                {entry.command}
              </CommandLine>
            )}
            {entry.output && <Output>{entry.output}</Output>}
          </div>
        ))}
        <CommandLine>
          <Prompt>$</Prompt>
          <CommandInput
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <Cursor />
        </CommandLine>
      </TerminalContent>
    </TerminalContainer>
  );
};

export default TerminalMenu; 