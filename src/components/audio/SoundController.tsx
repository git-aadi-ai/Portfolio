import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundController: React.FC = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Soft ambient low drone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
      gain.gain.setValueAtTime(0.015, ctx.currentTime);

      // Filter for warm soothing sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      droneOscRef.current = osc;
      droneGainRef.current = gain;
    } catch (e) {
      console.warn('AudioContext not supported or blocked:', e);
    }
  };

  const toggleAudio = () => {
    if (!isAudioEnabled) {
      if (!audioCtxRef.current) {
        initAudio();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setIsAudioEnabled(true);
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsAudioEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      id="sound-toggle-btn"
      onClick={toggleAudio}
      data-cursor="pointer"
      aria-label={isAudioEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all group"
    >
      {isAudioEnabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">AUDIO: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">AUDIO: OFF</span>
        </>
      )}
    </button>
  );
};
