import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Subtle desktop mouse parallax (max 6-8px, strictly disabled if reduced motion is preferred)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 12; // -6px to +6px
      const normY = (e.clientY / window.innerHeight - 0.5) * 12; // -6px to +6px
      targetX = normX;
      targetY = normY;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMouseOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const heroHeadingLetters = (PERSONAL_INFO.heroHeading || 'ADITYA KR. JHA').split('');

  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 pt-28 pb-16 text-center select-none overflow-hidden"
    >
      {/* Decorative Parallax Container */}
      <div
        className="flex flex-col items-center w-full max-w-6xl mx-auto transition-transform ease-out duration-75"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      >
        {/* Supporting Telemetry Badges (Step 0: Fast initial fade-in) */}
        <div
          className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-6 hero-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-code tracking-wider uppercase bg-white/[0.04] border border-white/10 text-cyan-300 flex items-center gap-2 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white transition-all duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            SOFTWARE DEVELOPMENT
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-code tracking-wider uppercase bg-white/[0.04] border border-white/10 text-slate-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white transition-all duration-300">
            ARTIFICIAL INTELLIGENCE
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-code tracking-wider uppercase bg-white/[0.04] border border-white/10 text-purple-300 hover:-translate-y-0.5 hover:border-purple-400/40 hover:bg-white/[0.08] hover:text-white transition-all duration-300">
            FULL-STACK & DSA
          </span>
        </div>

        {/* Editorial Greeting Accent ("Hi, I'm Aditya!") */}
        <div
          className="mb-4 hero-greeting-anim"
          style={{ animationDelay: '60ms' }}
        >
          <p className="font-body font-medium text-lg sm:text-2xl text-slate-300 tracking-wide">
            Hi, I'm{' '}
            <span className="font-display-italic text-3xl sm:text-4xl text-cyan-300 font-normal underline decoration-cyan-500/40 underline-offset-4 decoration-2">
              Aditya
            </span>
            <span className="text-cyan-400 font-display-italic">!</span>
          </p>
        </div>

        {/* Main Name: ADITYA KR. JHA with Staggered Letter Animation */}
        <div className="relative mb-6 sm:mb-8 max-w-6xl mx-auto">
          <h1 className="font-display-italic text-[clamp(2.5rem,8vw,7.5rem)] text-white leading-[0.95] drop-shadow-2xl font-normal">
            <span className="text-white block tracking-normal">
              {heroHeadingLetters.map((char, index) => (
                <span
                  key={`hero-${index}`}
                  className="hero-letter-l1"
                  style={{ animationDelay: `${150 + index * 24}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Primary Role & Supporting Identity Badge (Delay: 650ms) */}
        <div
          className="inline-flex flex-wrap justify-center items-center gap-3 px-5 py-2.5 rounded-full glass-panel-glow mb-6 max-w-full hero-fade-up hover:-translate-y-0.5 hover:border-cyan-400/40 transition-all duration-300"
          style={{ animationDelay: '650ms' }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          <span className="font-body font-bold text-xs sm:text-sm tracking-[0.08em] uppercase text-cyan-200">
            {PERSONAL_INFO.primaryRole}
          </span>
          <span className="text-slate-500 font-code text-xs hidden sm:inline">•</span>
          <span className="font-body text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
            {PERSONAL_INFO.supportingIdentity}
          </span>
        </div>

        {/* Hero Description (Delay: 800ms) */}
        <p
          className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-body font-normal mb-12 px-4 hero-fade-up"
          style={{ animationDelay: '800ms' }}
        >
          {PERSONAL_INFO.heroDescription}
        </p>

        {/* Scroll to Explore Interactive Prompt (Delay: 950ms with gentle continuous pulse) */}
        <div
          className="flex flex-col items-center gap-3 hero-fade-up"
          style={{ animationDelay: '950ms' }}
        >
          <button
            onClick={onExploreClick}
            data-cursor="explore"
            className="group flex flex-col items-center gap-2.5 text-xs font-body font-semibold uppercase tracking-widest text-slate-400 hover:text-cyan-300 transition-colors focus:outline-none"
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="p-2.5 rounded-full border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all hero-scroll-pulse">
              <ArrowDown className="w-4 h-4 text-cyan-400" />
            </div>
          </button>
        </div>
      </div>

      {/* System Watermarks */}
      <div className="absolute left-6 bottom-8 hidden md:block font-mono text-[10px] text-slate-600 tracking-widest">
        LOCATION // {PERSONAL_INFO.location.toUpperCase()}
      </div>
      <div className="absolute right-6 bottom-8 hidden md:block font-mono text-[10px] text-slate-600 tracking-widest">
        SYSTEM STATE // INITIALIZED
      </div>
    </section>
  );
};

