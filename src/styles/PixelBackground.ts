import styled from 'styled-components';

export const PixelBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #000;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 255, 0, 0.05) 50%,
      transparent 100%
    );
    pointer-events: none;
  }
`; 