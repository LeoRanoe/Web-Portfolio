import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glitch = keyframes`
  0% {
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    transform: translate(0);
  }
  20% {
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    transform: translate(-5px);
  }
  40% {
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    transform: translate(5px);
  }
  60% {
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    transform: translate(-5px);
  }
  80% {
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    transform: translate(0);
  }
`;

interface ContactSectionProps {
  id?: string
}

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #001100 0%, #000000 100%);
  position: relative;
  overflow: hidden;

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
`

const Title = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
  }
`

const FormContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(0, 17, 0, 0.5);
  border: 2px solid #00ff00;
  border-radius: 15px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(0, 255, 0, 0.1) 50%,
      transparent 100%
    );
    pointer-events: none;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  position: relative;
`

const Label = styled.label`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: block;
`

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid #00ff00;
  border-radius: 8px;
  color: #00ff00;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    background: rgba(0, 255, 0, 0.15);
  }

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid #00ff00;
  border-radius: 8px;
  color: #00ff00;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  min-height: 150px;
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;

  &:focus {
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    background: rgba(0, 255, 0, 0.15);
  }

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }
`

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: #00ff00;
  border: none;
  border-radius: 8px;
  color: #000;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #00dd00;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
  }

  &:disabled {
    background: #004400;
    cursor: not-allowed;
    transform: none;
  }
`

const StatusMessage = styled(motion.div)<{ success?: boolean }>`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  text-align: center;
  background: ${props => props.success ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'};
  color: ${props => props.success ? '#00ff00' : '#ff0000'};
  border: 2px solid ${props => props.success ? '#00ff00' : '#ff0000'};
  animation: ${glitch} 0.5s infinite;
`

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1em;
  background: #00ff00;
  margin-left: 4px;
  animation: ${blink} 1s infinite;
`

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      setStatus({
        message: 'Message sent successfully! I will get back to you soon.',
        success: true
      });
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        message: 'Failed to send message. Please try again later.',
        success: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Section id={id}>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Contact Me<Cursor />
      </Title>
      <FormContainer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="message">Message:</Label>
            <TextArea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Type your message here"
              required
            />
          </InputGroup>
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </Form>
        {status && (
          <StatusMessage
            success={status.success}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {status.message}
          </StatusMessage>
        )}
      </FormContainer>
    </Section>
  );
};

export default ContactSection 