import styled from 'styled-components';

export const CustomCursor = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #00ff00;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  mix-blend-mode: difference;
`; 