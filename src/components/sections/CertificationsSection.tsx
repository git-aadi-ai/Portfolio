import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../data/assets';
import { CERTIFICATIONS_DATA } from '../../data/portfolioData';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  X,
  Calendar,
  Building,
  CheckCircle2,
  Cpu,
  Sparkles,
  Layers,
} from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const cert = CERTIFICATIONS_DATA.certificate;

  // Keyboard navigation & ESC close
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <>
      <section
        id="certifications"
        className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-16 py-28 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-code text-xs font-semibold text-emerald-400 tracking-[0.2em] uppercase">
                {CERTIFICATIONS_DATA.sectionCode}
              </span>
              <div className="h-[1px] w-12 bg-emerald-500/30" />
            </div>
            <h2 className="font-display-italic text-[clamp(2.8rem,6.5vw,5.5rem)] text-white leading-[0.95] font-normal">
              Industry & —
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                Certifications.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-slate-300 text-base sm:text-lg leading-relaxed font-body font-normal">
            {CERTIFICATIONS_DATA.description}
          </p>
        </div>

        {/* Master Showcase Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 glass-panel border border-emerald-500/25 hover:border-emerald-400/50 transition-all duration-500 overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.06)]">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none group-hover:bg-emerald-600/25 transition-all duration-700" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-600/15 blur-3xl pointer-events-none group-hover:bg-teal-600/25 transition-all duration-700" />

          {/* Card Top HUD Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-code text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
                  VERIFIED INDUSTRY ACCREDITATION
                </span>
                <span className="font-mono text-xs text-slate-400">
                  Issuer: <strong className="text-slate-200 font-semibold">{cert.issuer}</strong> • Platform: <strong className="text-slate-200 font-semibold">{cert.platform}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-code font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                VERIFIED CREDENTIAL
              </span>
            </div>
          </div>

          {/* Main Grid: Certificate Showcase & Deep Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left: Certificate Preview Card */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div
                onClick={() => setModalOpen(true)}
                data-cursor="explore"
                className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950/80 border border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.15)] group/img cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_45px_rgba(16,185,129,0.25)] transition-all duration-500 flex items-center justify-center p-3 sm:p-4"
              >
                {/* Visual HUD Corner Accents */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-400 z-20 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-400 z-20 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-400 z-20 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-400 z-20 pointer-events-none" />

                {/* EXACT Original Uploaded Certificate Image */}
                <img
                  src={ASSETS.nvidiaCourseraCert}
                  alt={`${cert.title} - ${cert.issuer}`}
                  className="w-full h-full object-contain rounded-xl transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
                  loading="lazy"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-10">
                  <div className="p-3.5 rounded-full bg-emerald-400 text-slate-950 shadow-xl scale-90 group-hover/img:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <span className="font-code text-xs tracking-wider uppercase font-semibold text-emerald-200">
                    CLICK TO VIEW FULL CERTIFICATE
                  </span>
                </div>
              </div>

              {/* View Interaction Buttons */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  data-cursor="pointer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-slate-950 font-body text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>View Full Certificate</span>
                </button>
              </div>
            </div>

            {/* Right: Detailed Certificate Metadata */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Issuer Badge & Category */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-body uppercase tracking-wider font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    NVIDIA TRAINING
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-code text-teal-300 bg-teal-500/10 border border-teal-500/20">
                    COURSERA VERIFIED
                  </span>
                </div>

                {/* Main Title */}
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight mb-4">
                  {cert.title}
                </h3>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 flex items-center gap-3">
                    <Building className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-code text-slate-400 block tracking-wider">
                        ISSUED BY
                      </span>
                      <strong className="text-white text-sm font-body font-semibold">
                        {cert.issuer}
                      </strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-code text-slate-400 block tracking-wider">
                        ISSUE DATE
                      </span>
                      <strong className="text-white text-sm font-body font-semibold">
                        {cert.issueDate}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Syllabus / Technical Domain Pillars */}
                <div className="space-y-2 mb-6">
                  <span className="font-code text-xs uppercase text-slate-400 tracking-wider font-semibold block">
                    Core Technical Competencies Mastered:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cert.topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs font-body text-slate-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Notice */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-emerald-500/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-body">
                      Validated by <strong>{cert.verifiedBy}</strong>
                    </span>
                  </div>
                  <span className="font-code text-[11px] text-emerald-400 font-semibold uppercase">
                    ID: {cert.credentialId.split(' ')[1] || 'XS36A92INGIJ'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen / Lightbox Certificate Viewer Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl animate-fadeIn select-none"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full h-[92vh] flex flex-col rounded-3xl bg-[#08090d] border border-emerald-500/40 shadow-[0_0_90px_rgba(16,185,129,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-slate-900/70 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm sm:text-base">
                    {cert.title}
                  </h4>
                  <p className="text-slate-400 font-code text-[11px]">
                    {cert.issuer} • {cert.platform} • {cert.issueDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={ASSETS.nvidiaCourseraCert}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all"
                  title="Open Original in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/25 hover:text-red-400 text-white transition-all shadow-md"
                  aria-label="Close certificate viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body (Preserving full aspect ratio) */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/80">
              <img
                src={ASSETS.nvidiaCourseraCert}
                alt={`${cert.title} Full Certificate`}
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-slate-900/70 flex flex-wrap items-center justify-between gap-3 text-xs font-body text-slate-400 shrink-0">
              <span>Credential: <strong className="text-white">{cert.title}</strong></span>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-slate-400">Press ESC or click outside to close</span>
                <span className="font-code text-emerald-400 font-semibold">{cert.issueDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
