import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export type CursorType = 'default' | 'pointer' | 'hover' | 'typing' | 'loading' | 'panda'

interface CustomCursorProps {
  type: CursorType
}

const CursorContainer = styled(motion.div)`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`

const CursorDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CursorRing = styled(motion.div)`
  width: 32px;
  height: 32px;
  border: 2px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CursorTrail = styled(motion.div)`
  position: fixed;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
`

const Cursor = styled.div<{ type: CursorType }>`
  width: 20px;
  height: 20px;
  background: ${props => {
    switch (props.type) {
      case 'pointer':
        return '#4CAF50'
      case 'hover':
        return '#2196F3'
      case 'typing':
        return '#FFC107'
      case 'loading':
        return '#9C27B0'
      case 'panda':
        return '#000000'
      default:
        return '#FFFFFF'
    }
  }};
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: all 0.2s ease;
  transform: translate(-50%, -50%);
`

const CustomCursor: React.FC<CustomCursorProps> = ({ type }) => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [trails, setTrails] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Update trail
      setTrails(prev => {
        const newTrail = { x: e.clientX, y: e.clientY }
        return [newTrail, ...prev].slice(0, 20) // Keep last 20 positions
      })
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const getCursorStyle = () => {
    switch (type) {
      case 'hover':
        return {
          scale: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }
      case 'typing':
        return {
          scale: 0.8,
          backgroundColor: '#fff',
        }
      case 'loading':
        return {
          scale: 1.2,
          borderColor: '#00ff00',
          borderWidth: '3px',
        }
      case 'panda':
        return {
          scale: 1.5,
          backgroundColor: '#000',
          borderColor: '#fff',
        }
      default:
        return {
          scale: 1,
          backgroundColor: 'transparent',
        }
    }
  }

  return (
    <>
      {trails.map((trail, index) => (
        <CursorTrail
          key={index}
          style={{
            x: trail.x,
            y: trail.y,
            opacity: 1 - index / trails.length,
          }}
        />
      ))}
      <CursorContainer
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <CursorRing
          animate={getCursorStyle()}
          transition={{ type: 'spring', damping: 25, stiffness: 700 }}
        />
        <CursorDot
          animate={{
            scale: type === 'hover' ? 1.5 : 1,
            opacity: type === 'hover' ? 0.5 : 1,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 700 }}
        />
      </CursorContainer>
    </>
  )
}

export default CustomCursor 