import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { SoundController } from '../audio/SoundController';
import { Terminal, Sparkles, Send } from 'lucide-react';

interface TelemetryHUDProps {
  onContactClick: () => void;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ onContactClick }) => {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Monogram / Identity */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="#hero"
            id="hud-brand-logo"
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel hover:border-cyan-500/50 transition-all group"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_#38bdf8]" />
            <span className="text-xs tracking-wider text-slate-100 group-hover:text-white">
              <span className="font-display-italic font-normal">Aditya</span>{' '}
              <span className="font-body font-semibold uppercase tracking-wider">Kumar Jha</span>
            </span>
            <span className="text-[10px] font-body font-bold text-cyan-300 hidden sm:inline px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 tracking-wider">
              SDE // AI
            </span>
          </a>
        </div>

        {/* Center: Real-time Status */}
        <div className="hidden md:flex items-center gap-4 pointer-events-auto">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-body text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-bold tracking-wider uppercase">{PERSONAL_INFO.status}</span>
          </div>

          {/* IST Time */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-code text-slate-400">
            <span className="text-slate-500">IST:</span>
            <span className="text-slate-200 font-semibold">{istTime || '12:00:00'}</span>
          </div>
        </div>

        {/* Right: Audio Control & Direct CTA */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <SoundController />

          <button
            onClick={onContactClick}
            id="hud-contact-cta"
            data-cursor="pointer"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-body font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_22px_rgba(56,189,248,0.45)] active:scale-95"
          >
            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span className="hidden sm:inline">LET'S BUILD</span>
          </button>
        </div>
      </div>
    </header>
  );
};
