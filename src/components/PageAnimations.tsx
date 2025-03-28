import React from 'react'
import styled, { keyframes } from 'styled-components'

const scanline = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`

const flicker = keyframes`
  0% { opacity: 0.97; }
  5% { opacity: 0.95; }
  10% { opacity: 0.9; }
  15% { opacity: 0.95; }
  20% { opacity: 0.98; }
  25% { opacity: 0.95; }
  30% { opacity: 0.9; }
  35% { opacity: 0.95; }
  40% { opacity: 0.98; }
  45% { opacity: 0.95; }
  50% { opacity: 0.9; }
  55% { opacity: 0.95; }
  60% { opacity: 0.98; }
  65% { opacity: 0.95; }
  70% { opacity: 0.9; }
  75% { opacity: 0.95; }
  80% { opacity: 0.98; }
  85% { opacity: 0.95; }
  90% { opacity: 0.9; }
  95% { opacity: 0.95; }
  100% { opacity: 0.98; }
`

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`

const Scanline = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 0, 0.1);
  animation: ${scanline} 6s linear infinite;
  pointer-events: none;
  z-index: 9999;

  @media (max-width: 768px) {
    height: 1px;
    background: rgba(0, 255, 0, 0.05);
    animation: ${scanline} 4s linear infinite;
  }
`

const FlickerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.03);
  animation: ${flicker} 0.15s infinite;
  pointer-events: none;
  z-index: 9998;

  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.02);
    animation: ${flicker} 0.3s infinite;
  }
`

const GlitchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9997;
  mix-blend-mode: difference;
  animation: ${glitch} 0.3s infinite;
  opacity: 0.05;

  @media (max-width: 768px) {
    opacity: 0.03;
    animation: ${glitch} 0.5s infinite;
  }
`

const CRTOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 9996;

  @media (max-width: 768px) {
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 3px
    );
  }
`

const Vignette = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 9995;

  @media (max-width: 768px) {
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.3);
  }
`

const MobileOptimizer = styled.div`
  @media (max-width: 768px) {
    * {
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }

    body {
      overflow-x: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }
  }
`

interface PageAnimationsProps {
  children: React.ReactNode;
}

const PageAnimations: React.FC<PageAnimationsProps> = ({ children }) => {
  return (
    <MobileOptimizer>
      <Scanline />
      <FlickerOverlay />
      <GlitchOverlay />
      <CRTOverlay />
      <Vignette />
      {children}
    </MobileOptimizer>
  )
}

export default PageAnimations 