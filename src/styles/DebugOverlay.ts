import styled from 'styled-components';

export const DebugOverlay = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: #00ff00;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  z-index: 9999;
  pointer-events: none;
`; 