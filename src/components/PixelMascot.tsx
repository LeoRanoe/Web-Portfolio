import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const MascotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  animation: ${float} 3s ease-in-out infinite;
`;

const PixelArt = styled.div`
  width: 100px;
  height: 100px;
  background: #000;
  position: relative;
  border: 2px solid #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 60px;
    height: 60px;
    background: #00ff00;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 20%,
      80% 20%,
      80% 40%,
      100% 40%,
      100% 60%,
      80% 60%,
      80% 80%,
      100% 80%,
      100% 100%,
      0 100%
    );
  }
`;

const PixelMascot: React.FC = () => {
  return (
    <MascotContainer
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PixelArt />
    </MascotContainer>
  );
};

export default PixelMascot; 