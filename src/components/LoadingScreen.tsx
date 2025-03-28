import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const glitch = keyframes`
  0% {
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    transform: translate(0);
  }
  20% {
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    transform: translate(-5px);
  }
  30% {
    clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    transform: translate(5px);
  }
  40% {
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    transform: translate(-5px);
  }
  50% {
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    transform: translate(0);
  }
  55% {
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    transform: translate(5px);
  }
  60% {
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    transform: translate(-5px);
  }
  65% {
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    transform: translate(5px);
  }
  70% {
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    transform: translate(-5px);
  }
  80% {
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    transform: translate(0);
  }
  85% {
    clip-path: polygon(0 60%, 100% 60%, 100% 65%, 0 65%);
  }
  95% {
    clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingText = styled.h2`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 2rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  animation: ${glitch} 2s infinite;
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 20px;
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid #00ff00;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: #00ff00;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const Scanline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 0, 0.2);
  animation: ${scanline} 6s linear infinite;
`;

const LoadingTips = styled(motion.p)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.8rem;
  margin-top: 2rem;
  text-align: center;
  opacity: 0.7;
  max-width: 80%;
`;

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const tips = [
  "Loading pixel shaders...",
  "Generating virtual world...",
  "Initializing neural networks...",
  "Calibrating quantum processors...",
  "Synchronizing timeline...",
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [tip, setTip] = React.useState(tips[0]);

  React.useEffect(() => {
    let tipIndex = 0;
    const tipInterval = setInterval(() => {
      tipIndex = (tipIndex + 1) % tips.length;
      setTip(tips[tipIndex]);
    }, 2000);

    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 6000);

    return () => {
      clearInterval(tipInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingText>LOADING</LoadingText>
      <ProgressBar>
        <Progress
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5 }}
        />
      </ProgressBar>
      <LoadingTips
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5 }}
      >
        {tip}
      </LoadingTips>
      <Scanline />
    </LoadingContainer>
  );
};

export default LoadingScreen 