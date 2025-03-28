import styled from 'styled-components';

export const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  
  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 4px solid #00ff00;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`; 