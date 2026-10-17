import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';
import { PAST_EXPERIENCE_DATA } from '../../data/portfolioData';
import {
  Instagram,
  ExternalLink,
  Users,
  Eye,
  Activity,
  History,
  Sparkles,
  Maximize2,
  X,
  TrendingUp,
} from 'lucide-react';

export const PastExperienceSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="past-experience"
        className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-16 py-28 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-code text-xs font-semibold text-cyan-400 tracking-[0.2em] uppercase">
                {PAST_EXPERIENCE_DATA.sectionCode}
              </span>
              <div className="h-[1px] w-12 bg-cyan-500/30" />
            </div>
            <h2 className="font-display-italic text-[clamp(2.8rem,6.5vw,5.5rem)] text-white leading-[0.95] font-normal">
              Beyond Code —
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300">
                Past Experiences.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-slate-300 text-base sm:text-lg leading-relaxed font-body font-normal">
            {PAST_EXPERIENCE_DATA.description}
          </p>
        </div>

        {/* Master Showcase Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 glass-panel border border-cyan-500/25 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.06)]">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-600/15 blur-3xl pointer-events-none group-hover:bg-cyan-600/25 transition-all duration-700" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none group-hover:bg-purple-600/30 transition-all duration-700" />

          {/* Card Top HUD Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="font-code text-[11px] uppercase tracking-wider text-pink-400 font-bold block">
                  DIGITAL ARCHIVE // PAST EXPERIENCE
                </span>
                <span className="font-mono text-xs text-slate-400">
                  Instagram: <strong className="text-slate-200 font-semibold">{PAST_EXPERIENCE_DATA.instagramHandle}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-code font-semibold">
                <History className="w-3.5 h-3.5" />
                PAST CHAPTER (COMPLETED)
              </span>
            </div>
          </div>

          {/* Main Grid: Image Showcase & Past Experience Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left: Original Instagram Collage Image Container */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div
                onClick={() => setModalOpen(true)}
                data-cursor="explore"
                className="relative w-full max-w-lg mx-auto aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)] group/img cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_45px_rgba(6,182,212,0.3)] transition-all duration-500 flex items-center justify-center p-3 sm:p-5"
              >
                {/* Visual HUD Corner Accents */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

                {/* EXACT Original Uploaded Instagram Collage Image */}
                <img
                  src={ASSETS.instagramExperience}
                  alt="Past Instagram Content Archive - @aadi_ediits_"
                  className="w-full h-full object-contain rounded-xl transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
                  loading="lazy"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-10">
                  <div className="p-3.5 rounded-full bg-cyan-400 text-slate-950 shadow-xl scale-90 group-hover/img:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <span className="font-code text-xs tracking-wider uppercase font-semibold text-cyan-200">
                    CLICK TO VIEW ARCHIVE
                  </span>
                </div>
              </div>

              {/* View Interaction Links */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={PAST_EXPERIENCE_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-body text-xs font-bold uppercase tracking-wider hover:opacity-95 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  <span>View Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                <button
                  onClick={() => setModalOpen(true)}
                  data-cursor="pointer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/40 text-slate-200 font-body text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>Inspect Showcase</span>
                </button>
              </div>
            </div>

            {/* Right: Metrics & Past Context */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Category & Badge */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-body uppercase tracking-wider font-semibold bg-pink-500/15 text-pink-300 border border-pink-500/30">
                    ARCHIVED EXPERIENCE
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-code text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                    {PAST_EXPERIENCE_DATA.instagramHandle}
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="font-display-italic text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight mb-4">
                  "Scaling Digital Media & Visual Virality."
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body font-normal mb-6">
                  {PAST_EXPERIENCE_DATA.description}
                </p>

                {/* 3 Core Metric Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 font-code text-[10px] uppercase tracking-wider">
                        FOLLOWERS
                      </span>
                      <Users className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-0.5">
                      11K+
                    </div>
                    <span className="text-[11px] text-cyan-300/80 font-body">
                      {PAST_EXPERIENCE_DATA.instagramHandle}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 font-code text-[10px] uppercase tracking-wider">
                        REACH
                      </span>
                      <Eye className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-0.5">
                      30M+
                    </div>
                    <span className="text-[11px] text-purple-300/80 font-body">
                      Content Impressions
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/20 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 font-code text-[10px] uppercase tracking-wider">
                        ENGAGEMENT
                      </span>
                      <Activity className="w-4 h-4 text-pink-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-0.5">
                      2.5M+
                    </div>
                    <span className="text-[11px] text-pink-300/80 font-body">
                      User Interactions
                    </span>
                  </div>
                </div>

                {/* Past Experience Context Notice */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-code font-semibold uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>FOUNDATIONAL CREATIVE CHAPTER</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-body">
                    {PAST_EXPERIENCE_DATA.disclaimer} This past work honed intuition for high-velocity user engagement, micro-storytelling, and digital aesthetic craft now applied across engineering and interactive user interfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Resolution Image Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fadeIn select-none"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full h-[90vh] flex flex-col rounded-3xl bg-[#08090d] border border-cyan-500/40 shadow-[0_0_90px_rgba(6,182,212,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/70 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-pink-500/20 text-pink-300">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-base">
                    Past Experience Archive — {PAST_EXPERIENCE_DATA.instagramHandle}
                  </h4>
                  <p className="text-slate-400 font-code text-xs">
                    11K+ Followers • 30M+ Reach • 2.5M+ Engagement
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={PAST_EXPERIENCE_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all"
                  title="View Instagram Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/25 hover:text-red-400 text-white transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body (Preserving full aspect ratio) */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/80">
              <img
                src={ASSETS.instagramExperience}
                alt="Past Instagram Content Showcase - @aadi_ediits_"
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-slate-900/70 flex flex-wrap items-center justify-between gap-3 text-xs font-body text-slate-400 shrink-0">
              <span>Past Content Creation Chapter — <strong className="text-white">{PAST_EXPERIENCE_DATA.instagramHandle}</strong></span>
              <a
                href={PAST_EXPERIENCE_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 font-code flex items-center gap-1"
              >
                <span>Open in Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
