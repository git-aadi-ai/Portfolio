import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';
import { PERSONAL_INFO, SKILL_CATEGORIES } from '../../data/portfolioData';
import { Terminal, Code2, Cpu, Database, Binary, ShieldCheck, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const EngineerSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section
      id="engineer"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-16 py-28 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-code text-xs font-semibold text-cyan-400 tracking-[0.2em] uppercase">
              03 // TECHNICAL MASTERY
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/30" />
          </div>
          <h2 className="font-display-italic text-[clamp(2.8rem,6.5vw,5.5rem)] text-white leading-[0.95] font-normal">
            Technical
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-white">
              Foundations.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-slate-300 text-base sm:text-lg leading-relaxed font-body font-normal">
          An aspiring SDE focused on problem solving, software engineering, full-stack development, and applied AI.
        </p>
      </div>

      {/* Main Grid: Portrait HUD + Clean Skills Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Formal Portrait with Precision Frame */}
        <div className="lg:col-span-5 relative group">
          {/* Spatial Ambient Glow */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-purple-500/15 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 p-2.5 shadow-2xl">
            {/* Header Telemetry Bar */}
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 mb-2 font-code text-[11px] text-cyan-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold tracking-wider">PROFILE // SOFTWARE ENGINEER</span>
              </div>
              <span className="text-slate-400 tracking-wider">ENGINEERING FOCUS</span>
            </div>

            {/* Portrait Image Container */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-cyan-950/20 via-slate-900/40 to-[#07080a] flex items-end justify-center">
              <img
                src={ASSETS.formalPortrait}
                alt="Aditya Kumar Jha - Aspiring Software Development Engineer"
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ objectPosition: 'center 35%' }}
                referrerPolicy="no-referrer"
              />

              {/* Spatial vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-75 pointer-events-none" />

              {/* Bottom Card Identity Inside Photo */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel-glow border border-white/15">
                <h3 className="text-white text-base tracking-wide">
                  <span className="font-display-italic font-normal text-lg">Aditya</span>{' '}
                  <span className="font-body font-bold uppercase tracking-wider text-sm">Kumar Jha</span>
                </h3>
                <p className="text-cyan-300 font-body text-xs font-semibold tracking-wider uppercase">
                  ASPIRING SOFTWARE DEVELOPMENT ENGINEER
                </p>
              </div>
            </div>

            {/* Footer Telemetry Coordinates */}
            <div className="flex items-center justify-between px-3.5 py-2 text-[10px] font-code text-slate-500 mt-1">
              <span>LOCATION: {PERSONAL_INFO.location.toUpperCase()}</span>
              <span>FOCUS: SYSTEMS & AI</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Stack & Competency Matrix */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-2 rounded-2xl glass-panel-subtle border border-white/5">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(idx)}
                data-cursor="pointer"
                className={`px-4 py-2.5 rounded-xl text-xs font-body uppercase tracking-wider font-semibold transition-all ${
                  activeCategory === idx
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Active Category Skills Display */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display-italic text-2xl text-white flex items-center gap-3 font-normal">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>{SKILL_CATEGORIES[activeCategory].name}</span>
              </h3>
              <span className="text-xs font-body font-semibold tracking-wider text-slate-400 uppercase">
                {SKILL_CATEGORIES[activeCategory].skills.length} CORE SKILLS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SKILL_CATEGORIES[activeCategory].skills.map((skillName) => (
                <div
                  key={skillName}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all flex items-center gap-3 group"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />
                  <span className="font-body font-semibold text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors">
                    {skillName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Overview of All 5 Pillars */}
          <div className="p-5 rounded-2xl glass-panel-subtle border border-white/5">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
              FULL CORE STACK OVERVIEW
            </span>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.flatMap((c) => c.skills).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 hover:border-cyan-400/30 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
