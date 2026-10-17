import React from 'react';
import { ASSETS } from '../../data/assets';
import { CREATIVE_DATA, PERSONAL_INFO } from '../../data/portfolioData';
import { Sparkles, Palette, Film, Compass, Zap, Layers, Eye } from 'lucide-react';

export const CreativeSection: React.FC = () => {
  return (
    <section
      id="creative"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-16 py-28 max-w-7xl mx-auto"
    >
      {/* Chapter Index */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-code text-xs font-semibold text-purple-400 tracking-[0.2em] uppercase">
          05 // CREATIVE HORIZON
        </span>
        <div className="h-[1px] w-12 bg-purple-500/30" />
      </div>

      {/* Main Grid: Creative Portrait + Editorial Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Creative Portrait with Goggles */}
        <div className="lg:col-span-5 relative group order-2 lg:order-1">
          {/* Chromatic Ambient Glow */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/30 via-pink-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/30 p-2.5 shadow-2xl">
            {/* Top HUD bar */}
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 mb-2 font-code text-[11px] text-purple-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="font-bold tracking-wider">CREATIVE // MATRIX</span>
              </div>
              <span className="text-slate-400 tracking-wider">EXPANSION</span>
            </div>

            {/* Creative Image Container */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={ASSETS.creativePortrait}
                alt="Aditya Kumar Jha - Creative Technologist"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Spatial vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-80" />

              {/* Bottom Card Identity Inside Photo */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel-glow border border-purple-500/30">
                <h3 className="text-white text-base tracking-wide">
                  <span className="font-display-italic font-normal text-lg">Aditya</span>{' '}
                  <span className="font-body font-bold uppercase tracking-wider text-sm">Kumar Jha</span>
                </h3>
                <p className="text-purple-300 font-body text-xs font-semibold tracking-wider uppercase">
                  CREATIVE TECHNOLOGIST & BUILDER
                </p>
              </div>
            </div>

            {/* Footer Telemetry */}
            <div className="flex items-center justify-between px-3.5 py-2 text-[10px] font-code text-slate-500 mt-1">
              <span>VISUAL STORYTELLER</span>
              <span>MOTION & SPATIAL UX</span>
            </div>
          </div>
        </div>

        {/* Right: Editorial Typography & Creative Philosophy */}
        <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
          <h2 className="font-display-italic text-[clamp(2.8rem,6.5vw,5.5rem)] text-white mb-6 leading-[0.95] font-normal">
            Beyond
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300">
              Pure Code.
            </span>
          </h2>

          <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-purple-500/20 mb-8">
            <blockquote className="font-display-italic text-xl sm:text-2xl text-slate-100 mb-2 leading-relaxed font-normal">
              "{CREATIVE_DATA.supportingStatement}"
            </blockquote>
          </div>

          {/* 4 Creative Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CREATIVE_DATA.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-body font-bold text-purple-400 tracking-wider uppercase block mb-1">
                    {pillar.tag}
                  </span>
                  <h4 className="font-display-italic text-white text-lg mb-2 font-normal">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-300 font-body text-xs leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
