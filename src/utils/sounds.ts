// Sound effect URLs (you'll need to add actual sound files to your public directory)
const SOUNDS = {
  hover: '/sounds/hover.mp3',
  click: '/sounds/click.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  type: '/sounds/type.mp3',
  submit: '/sounds/submit.mp3',
  startup: '/sounds/startup.mp3',
  background: '/sounds/background.mp3',
} as const

class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement }
  private isMuted: boolean

  constructor() {
    this.sounds = {
      click: new Audio('/sounds/click.mp3'),
      hover: new Audio('/sounds/hover.mp3'),
      type: new Audio('/sounds/type.mp3'),
      success: new Audio('/sounds/success.mp3'),
      error: new Audio('/sounds/error.mp3'),
      background: new Audio('/sounds/background.mp3')
    }

    this.isMuted = false

    // Set volume for all sounds
    Object.values(this.sounds).forEach(sound => {
      sound.volume = 0.3
    })

    // Loop background music
    this.sounds.background.loop = true
  }

  play(soundName: keyof typeof this.sounds) {
    if (this.isMuted) return

    const sound = this.sounds[soundName]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(error => {
        console.warn('Failed to play sound:', error)
      })
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    if (this.isMuted) {
      this.sounds.background.pause()
    } else {
      this.sounds.background.play().catch(error => {
        console.warn('Failed to play background music:', error)
      })
    }
  }

  startBackgroundMusic() {
    if (!this.isMuted) {
      this.sounds.background.play().catch(error => {
        console.warn('Failed to play background music:', error)
      })
    }
  }

  stopBackgroundMusic() {
    this.sounds.background.pause()
    this.sounds.background.currentTime = 0
  }

  setVolume(volume: number) {
    const normalizedVolume = Math.max(0, Math.min(1, volume))
    Object.values(this.sounds).forEach(sound => {
      sound.volume = normalizedVolume
    })
  }
}

export const soundManager = new SoundManager() 