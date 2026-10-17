import React from 'react';
import { IDENTITY_DATA } from '../../data/portfolioData';
import { Layers, Terminal, Sparkles, Code2, Wrench, Lightbulb, Compass, GraduationCap } from 'lucide-react';

export const IdentityStorySection: React.FC = () => {
  const icons = [Wrench, Code2, Sparkles, GraduationCap];

  return (
    <section
      id="identity"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-16 py-28 max-w-7xl mx-auto"
    >
      {/* Chapter index */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-code text-xs font-semibold text-cyan-400 tracking-[0.2em] uppercase">
          02 // IDENTITY & PHILOSOPHY
        </span>
        <div className="h-[1px] w-12 bg-cyan-500/30" />
      </div>

      {/* Main Heading & Supporting Text */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        <div className="lg:col-span-6">
          <h2 className="font-display-italic text-[clamp(2.8rem,6.5vw,5.5rem)] text-white leading-[0.95] font-normal">
            Engineered
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-white">
              To Build.
            </span>
          </h2>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-body font-normal p-6 rounded-3xl glass-panel border border-white/10">
            {IDENTITY_DATA.supportingText}
          </p>
        </div>
      </div>

      {/* 4 Philosophy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {IDENTITY_DATA.philosophyCards.map((card, idx) => {
          const Icon = icons[idx] || Code2;
          return (
            <div
              key={card.number}
              className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-code text-xs text-cyan-400 font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {card.number}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display-italic text-2xl sm:text-3xl text-white mb-2 group-hover:text-cyan-200 transition-colors font-normal">
                  {card.title}
                </h3>
              </div>

              <p className="font-body text-slate-300 text-sm leading-relaxed mt-4 font-normal">
                "{card.tagline}"
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
