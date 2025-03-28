const fs = require('fs')
const { exec } = require('child_process')

// Install required packages
exec('npm install tone', (installError, stdout, stderr) => {
  if (installError) {
    console.error(`Error installing packages: ${installError}`)
    return
  }

  const { Tone } = require('tone')

  // Create sounds directory if it doesn't exist
  if (!fs.existsSync('public/sounds')) {
    fs.mkdirSync('public/sounds', { recursive: true })
  }

  // Helper function to generate and save sound
  const generateSound = async (name, synth, duration) => {
    try {
      const buffer = await Tone.Offline(() => synth, duration)
      fs.writeFileSync(`public/sounds/${name}.mp3`, buffer.get())
      console.log(`Generated ${name} sound`)
    } catch (err) {
      console.error(`Error generating ${name} sound:`, err)
    }
  }

  // Generate hover sound (short high beep)
  const hover = new Tone.Oscillator({
    frequency: 880,
    type: 'square',
    volume: -20
  }).toDestination()
  hover.start().stop('+0.1')
  generateSound('hover', hover, 0.1)

  // Generate click sound (short low beep)
  const click = new Tone.Oscillator({
    frequency: 440,
    type: 'square',
    volume: -15
  }).toDestination()
  click.start().stop('+0.15')
  generateSound('click', click, 0.15)

  // Generate success sound (ascending arpeggio)
  const success = new Tone.Synth({
    oscillator: { type: 'square' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
  }).toDestination()
  success.triggerAttackRelease('C4', '8n')
  success.triggerAttackRelease('E4', '8n', '+0.1')
  success.triggerAttackRelease('G4', '8n', '+0.2')
  generateSound('success', success, 0.5)

  // Generate error sound (descending minor third)
  const errorSound = new Tone.Synth({
    oscillator: { type: 'square' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 }
  }).toDestination()
  errorSound.triggerAttackRelease('A4', '8n')
  errorSound.triggerAttackRelease('F4', '8n', '+0.1')
  generateSound('error', errorSound, 0.3)

  // Generate type sound (tiny click)
  const type = new Tone.Oscillator({
    frequency: 1200,
    type: 'square',
    volume: -30
  }).toDestination()
  type.start().stop('+0.05')
  generateSound('type', type, 0.05)

  // Generate submit sound (success with reverb)
  const submit = new Tone.Synth({
    oscillator: { type: 'square' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 }
  }).connect(new Tone.Reverb(1.5).toDestination())
  submit.triggerAttackRelease('C5', '8n')
  submit.triggerAttackRelease('G4', '8n', '+0.1')
  submit.triggerAttackRelease('C4', '8n', '+0.2')
  generateSound('submit', submit, 0.8)

  // Generate startup sound (ascending major scale with reverb)
  const startup = new Tone.Synth({
    oscillator: { type: 'square' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 }
  }).connect(new Tone.Reverb(2).toDestination())
  startup.triggerAttackRelease('C4', '8n')
  startup.triggerAttackRelease('D4', '8n', '+0.1')
  startup.triggerAttackRelease('E4', '8n', '+0.2')
  startup.triggerAttackRelease('F4', '8n', '+0.3')
  startup.triggerAttackRelease('G4', '8n', '+0.4')
  startup.triggerAttackRelease('A4', '8n', '+0.5')
  startup.triggerAttackRelease('B4', '8n', '+0.6')
  startup.triggerAttackRelease('C5', '4n', '+0.7')
  generateSound('startup', startup, 1.5)

  console.log('Sound effects generation completed!')
}) 