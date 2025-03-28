import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #0a0a0a;
    color: #ffffff;
    line-height: 1.6;
    overflow-x: hidden;
    cursor: none;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: #00ff00;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00cc00;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    border: none;
    outline: none;
    cursor: none;
  }
`

export default GlobalStyle 