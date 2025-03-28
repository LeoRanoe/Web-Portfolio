import React from 'react'
import styled from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background: #000;
`

const PixelLayer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.05) 0px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 2px
  );
  background-size: 100% 4px;
`

const PixelGrid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.3;
`

const AnimatedTexture = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
  animation: pulse 4s ease-in-out infinite;
`

const FloatingPixels = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const Pixel = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`

const PixelBackground: React.FC = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 200])
  const opacity = useTransform(scrollY, [0, 500], [0.3, 0.1])

  // Generate random floating pixels
  const pixels = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2
  }))

  return (
    <BackgroundContainer>
      <PixelLayer
        style={{
          y,
          opacity,
        }}
      />
      <PixelGrid
        style={{
          opacity,
        }}
      />
      <AnimatedTexture
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <FloatingPixels>
        {pixels.map(pixel => (
          <Pixel
            key={pixel.id}
            initial={{ x: `${pixel.x}%`, y: `${pixel.y}%` }}
            animate={{
              y: [`${pixel.y}%`, `${pixel.y - 10}%`, `${pixel.y}%`],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: pixel.duration,
              delay: pixel.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </FloatingPixels>
    </BackgroundContainer>
  )
}

export default PixelBackground 