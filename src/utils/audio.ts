// Audio utility using Web Audio API and Web Speech API

type SpeakingCallback = (isSpeaking: boolean, currentText: string) => void;

class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public voiceEnabled: boolean = true;
  public speechRate: number = 0.88; // Default learner friendly rate
  private voices: SpeechSynthesisVoice[] = [];
  private listeners: SpeakingCallback[] = [];
  public currentSpeakingText: string = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();
  }

  public subscribeSpeaking(callback: SpeakingCallback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notifySpeaking(isSpeaking: boolean, text: string) {
    this.currentSpeakingText = isSpeaking ? text : '';
    this.listeners.forEach(cb => cb(isSpeaking, text));
  }

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Pleasant click sound
  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  // Harmonic chord for successful card match
  playMatchSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.07;
        const duration = 0.22;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {
      // ignore
    }
  }

  // Low gentle boop for wrong match
  playError() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // ignore
    }
  }

  // Cheerful fanfare for level win
  playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.1;
        const duration = 0.35;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.01, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {
      // ignore
    }
  }

  // Streak multiplier sound
  playStreak() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  // Text-to-speech pronunciation
  speak(text: string) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = this.speechRate;
      utterance.pitch = 1.0;

      if (this.voices.length === 0) {
        this.voices = window.speechSynthesis.getVoices();
      }

      // Best English natural voice selection
      const enVoice = this.voices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('English'))
      ) || this.voices.find(v => v.lang.startsWith('en'));

      if (enVoice) {
        utterance.voice = enVoice;
      }

      utterance.onstart = () => {
        this.notifySpeaking(true, text);
      };

      utterance.onend = () => {
        this.notifySpeaking(false, '');
      };

      utterance.onerror = () => {
        this.notifySpeaking(false, '');
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.notifySpeaking(false, '');
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.notifySpeaking(false, '');
    }
  }
}

export const soundManager = new SoundManager();
