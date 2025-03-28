import styled from 'styled-components';

export const SoundControl = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  
  button {
    background: none;
    border: 2px solid #00ff00;
    color: #00ff00;
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease;
    
    &:hover {
      background: #00ff00;
      color: #000;
    }
  }
`; 