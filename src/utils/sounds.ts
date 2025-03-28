// Sound effect URLs (you'll need to add actual sound files to your public directory)
export const SOUNDS = {
  hover: new Audio('/sounds/hover.mp3'),
  click: new Audio('/sounds/click.mp3'),
  success: new Audio('/sounds/success.mp3'),
  error: new Audio('/sounds/error.mp3'),
  background: new Audio('/sounds/background.mp3')
};

class SoundManager {
  private volume: number = 0.5;
  private isMuted: boolean = false;

  constructor() {
    Object.values(SOUNDS).forEach(sound => {
      sound.volume = this.volume;
    });

    SOUNDS.background.loop = true;
  }

  play(soundName: keyof typeof SOUNDS) {
    if (!this.isMuted) {
      const sound = SOUNDS[soundName];
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }

  setVolume(volume: number) {
    this.volume = volume;
    Object.values(SOUNDS).forEach(sound => {
      sound.volume = volume;
    });
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      Object.values(SOUNDS).forEach(sound => {
        sound.pause();
      });
    }
  }

  playBackground() {
    if (!this.isMuted) {
      SOUNDS.background.play().catch(() => {});
    }
  }

  stopBackground() {
    SOUNDS.background.pause();
    SOUNDS.background.currentTime = 0;
  }
}

export const soundManager = new SoundManager(); 