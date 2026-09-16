// Audio disabled per user preference
class SoundManager {
  public enabled: boolean = false;

  playClick(): void {}
  playCatch(): void {}
  playMiss(): void {}
  playSuccess(): void {}
}

export const soundManager = new SoundManager();

