import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: none;
  }

  body {
    font-family: 'Press Start 2P', cursive;
    background: #000000;
    color: #00ff00;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
    border: 1px solid #00ff00;
  }

  ::-webkit-scrollbar-thumb {
    background: #00ff00;
    border: 2px solid #000000;
    border-radius: 6px;

    &:hover {
      background: #00dd00;
    }
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00cc00;
  }

  ::selection {
    background: #00ff00;
    color: #000000;
  }

  a {
    color: #00ff00;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #00dd00;
      text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }
  }

  button {
    cursor: none;
  }

  input, textarea {
    cursor: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Press Start 2P', cursive;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: #00ff00;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }

  p {
    margin-bottom: 1rem;
  }

  section {
    position: relative;
    z-index: 1;
  }

  .scanline {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: repeating-linear-gradient(
      to bottom,
      rgba(0, 255, 0, 0.03) 0px,
      rgba(0, 255, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 999;
  }

  .vignette {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    pointer-events: none;
    z-index: 998;
  }
`

export default GlobalStyle 