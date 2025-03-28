import React from 'react'
import styled from 'styled-components'

interface DebugOverlayProps {
  fps: number
  errors: string[]
  activeInteractions: string[]
}

const DebugOverlay: React.FC<DebugOverlayProps> = ({ fps, errors, activeInteractions }) => {
  return (
    <Container>
      <DebugItem>FPS: {fps}</DebugItem>
      {errors.length > 0 && (
        <DebugItem error>Errors: {errors.length}</DebugItem>
      )}
      {activeInteractions.length > 0 && (
        <DebugItem>Active: {activeInteractions.join(', ')}</DebugItem>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: #ffffff;
  z-index: 9999;
`

const DebugItem = styled.div<{ error?: boolean }>`
  color: ${props => props.error ? '#ff4444' : '#ffffff'};
  margin: 2px 0;
`

export default DebugOverlay 