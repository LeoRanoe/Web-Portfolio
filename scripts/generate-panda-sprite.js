import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

// Create sprites directory if it doesn't exist
const spritesDir = path.join(process.cwd(), 'public', 'sprites')
if (!fs.existsSync(spritesDir)) {
  fs.mkdirSync(spritesDir, { recursive: true })
}

// Create a base SVG for the panda
const createPandaSVG = (frame) => {
  // Different expressions based on frame
  const expressions = {
    eyes: {
      normal: { width: 8, height: 8 },
      happy: { width: 12, height: 4 },
      excited: { width: 10, height: 10 }
    },
    mouth: {
      normal: { height: 2, y: 40 },
      happy: { height: 4, y: 38 },
      excited: { height: 6, y: 36 }
    }
  }

  const expression = frame % 3 === 0 ? 'normal' : frame % 3 === 1 ? 'happy' : 'excited'
  const eyes = expressions.eyes[expression]
  const mouth = expressions.mouth[expression]

  return `
    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <rect x="16" y="16" width="32" height="32" fill="white"/>
      <!-- Head -->
      <rect x="8" y="8" width="48" height="48" fill="white"/>
      <!-- Ears -->
      <rect x="12" y="12" width="16" height="16" fill="black"/>
      <rect x="36" y="12" width="16" height="16" fill="black"/>
      <!-- Eyes -->
      <rect x="20" y="24" width="${eyes.width}" height="${eyes.height}" fill="black"/>
      <rect x="36" y="24" width="${eyes.width}" height="${eyes.height}" fill="black"/>
      <!-- Nose -->
      <rect x="28" y="32" width="8" height="8" fill="black"/>
      <!-- Mouth -->
      <rect x="24" y="${mouth.y}" width="16" height="${mouth.height}" fill="black"/>
      <!-- Cheeks -->
      <rect x="16" y="32" width="8" height="8" fill="#FFB6C1"/>
      <rect x="40" y="32" width="8" height="8" fill="#FFB6C1"/>
    </svg>
  `
}

// Generate sprite sheet
const generateSpriteSheet = async () => {
  const frames = []
  for (let i = 0; i < 8; i++) {
    const svg = createPandaSVG(i)
    frames.push(sharp(Buffer.from(svg)).png().toBuffer())
  }

  const frameBuffers = await Promise.all(frames)
  const spriteSheet = await sharp({
    create: {
      width: 512,
      height: 64,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(
      frameBuffers.map((buffer, i) => ({
        input: buffer,
        top: 0,
        left: i * 64
      }))
    )
    .png()
    .toBuffer()

  fs.writeFileSync(path.join(spritesDir, 'panda.png'), spriteSheet)
  console.log('Panda sprite sheet generated successfully!')
}

generateSpriteSheet().catch(console.error) 