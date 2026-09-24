// Web Audio API procedurally synthesized stamp thud sound
// No external audio files needed; plays instantly with zero latency!

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  try {
    localStorage.setItem("boykot-sound-enabled", JSON.stringify(enabled));
  } catch {
    /* ignore */
  }
}

export function initSoundPreference(): boolean {
  try {
    const saved = localStorage.getItem("boykot-sound-enabled");
    if (saved !== null) {
      soundEnabled = JSON.parse(saved);
    }
  } catch {
    soundEnabled = true;
  }
  return soundEnabled;
}

export function playStampSound(): void {
  if (!soundEnabled) return;
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // 1. Deep sub bass punch (stamp slam)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.16);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.22);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.22);

    // 2. High-frequency friction / paper impact thud
    const bufferSize = Math.floor(audioCtx.sampleRate * 0.07);
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.015));
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, now);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    noise.start(now);
  } catch {
    // Ignore audio permission or playback errors
  }
}
