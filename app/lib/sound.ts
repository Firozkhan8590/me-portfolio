"use client";

// Web Audio API Zero-Asset Synthetic Sound Engine
// Generates Hollywood-grade warm cinematic ambient drone and UI tactile chimes
// Strictly disabled by default; requires explicit user toggle to start

class SyntheticSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private oscs: OscillatorNode[] = [];
  private isRunning: boolean = false;

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported in this browser:", e);
    }
  }

  // Toggle audio on/off
  public toggleMute(): boolean {
    this.initContext();
    if (!this.ctx) return true;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      if (!this.isRunning) {
        this.startAmbientDrone();
      }
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0.3, this.ctx.currentTime, 0.5);
      }
      this.playChime(587.33, 0.2); // D5 golden tone
    } else {
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
      }
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Warm cinematic orchestral drone (Christopher Nolan / Ludwig Göransson / Hans Zimmer aesthetic)
  private startAmbientDrone() {
    if (!this.ctx || !this.masterGain || this.isRunning) return;
    this.isRunning = true;

    // Drone sub-bus
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.22, this.ctx.currentTime);

    // Warm Low-pass filter (sub-bass focus with gentle resonance)
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(160, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.8, this.ctx.currentTime);

    // Subtle LFO modulation for organic breath
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(35, this.ctx.currentTime);
    this.lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    this.lfo.start();

    // Harmonic chord: Deep sub-root (55Hz A1), fifth (82.5Hz E2), octave (110Hz A2)
    const frequencies = [55, 82.5, 110];
    this.oscs = frequencies.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = idx === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      const oscGain = this.ctx!.createGain();
      oscGain.gain.setValueAtTime(idx === 0 ? 0.32 : 0.12, this.ctx!.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      return osc;
    });

    filter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);
  }

  // Futuristic UI telemetry feedback sound
  public playTelemetry(freq: number = 720) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      if (this.ctx.state === "suspended") return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore audio glitches safely
    }
  }

  // Warm champagne gold chime
  public playChime(freq: number = 587.33, duration: number = 0.25) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      if (this.ctx.state === "suspended") return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio glitches safely
    }
  }
}

export const soundEngine = new SyntheticSoundEngine();
