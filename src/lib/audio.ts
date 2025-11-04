export class AudioManager {
  private context: AudioContext | null = null;
  private buffers: Map<string, AudioBuffer> = new Map();
  private gainNode: GainNode | null = null;
  private bgmSource: AudioBufferSourceNode | null = null;
  private bgmGainNode: GainNode | null = null;
  private isBgmPlaying: boolean = false;

  async init(): Promise<void> {
    if (this.context) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.context = new AudioContextClass();
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);

    this.bgmGainNode = this.context.createGain();
    this.bgmGainNode.connect(this.context.destination);

    await this.loadSound('click', '/sounds/bead-click.mp3');
    await this.loadSound('bell', '/sounds/completion-bell.mp3');
    await this.loadSound('bgm', '/sounds/zen-bgm.mp3');
  }

  async loadSound(name: string, url: string): Promise<void> {
    if (!this.context) await this.init();

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context!.decodeAudioData(arrayBuffer);
      this.buffers.set(name, audioBuffer);
    } catch (error) {
      console.error(`Failed to load sound ${name}:`, error);
    }
  }

  play(name: string, volume: number = 1): void {
    if (!this.context || !this.gainNode) return;

    const buffer = this.buffers.get(name);
    if (!buffer) {
      console.warn(`Sound ${name} not loaded`);
      return;
    }

    const source = this.context.createBufferSource();
    source.buffer = buffer;

    const gainNode = this.context.createGain();
    gainNode.gain.value = Math.max(0, Math.min(1, volume));

    source.connect(gainNode);
    gainNode.connect(this.gainNode);

    source.start(0);
  }

  setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  stop(): void {
    if (this.context && this.context.state === 'running') {
      this.context.suspend();
    }
  }

  resume(): void {
    if (this.context && this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  playBgm(volume: number = 0.3): void {
    if (!this.context || !this.bgmGainNode || this.isBgmPlaying) return;

    const buffer = this.buffers.get('bgm');
    if (!buffer) {
      console.warn('BGM not loaded');
      return;
    }

    this.bgmSource = this.context.createBufferSource();
    this.bgmSource.buffer = buffer;
    this.bgmSource.loop = true;

    this.bgmGainNode.gain.value = Math.max(0, Math.min(1, volume));
    this.bgmSource.connect(this.bgmGainNode);

    this.bgmSource.start(0);
    this.isBgmPlaying = true;
  }

  pauseBgm(): void {
    if (this.bgmSource && this.isBgmPlaying) {
      this.bgmSource.stop();
      this.bgmSource = null;
      this.isBgmPlaying = false;
    }
  }

  setBgmVolume(volume: number): void {
    if (this.bgmGainNode) {
      this.bgmGainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  isBgmActive(): boolean {
    return this.isBgmPlaying;
  }
}

export const audioManager = new AudioManager();
