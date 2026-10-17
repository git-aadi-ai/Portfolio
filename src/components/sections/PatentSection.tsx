import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../../data/assets';
import { PATENT_DATA } from '../../data/portfolioData';
import { 
  FileText, 
  Maximize2, 
  X, 
  CheckCircle2, 
  Calendar, 
  Award, 
  ExternalLink,
  ShieldCheck,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const PatentSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const patentImages = ASSETS.patentImages && ASSETS.patentImages.length > 0 
    ? ASSETS.patentImages 
    : [ASSETS.patentPublication];

  const handleOpenModal = (index: number = 0) => {
    setCurrentPhotoIndex(index);
    setModalOpen(true);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : patentImages.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev < patentImages.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
      if (e.key === 'ArrowLeft') setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : patentImages.length - 1));
      if (e.key === 'ArrowRight') setCurrentPhotoIndex((prev) => (prev < patentImages.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, patentImages.length]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;
    if (diff > minSwipeDistance) {
      // Swiped left -> next
      handleNext();
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <>
      <section
        id="patent"
        className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-16 py-28 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-code text-xs font-semibold text-purple-400 tracking-[0.2em] uppercase">
                {PATENT_DATA.sectionCode}
              </span>
              <div className="h-[1px] w-12 bg-purple-500/30" />
            </div>
            <h2 className="font-display-italic text-[clamp(2.8rem,6.5vw,5.5rem)] text-white leading-[0.95] font-normal">
              Published
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-cyan-200">
                Patent & Inventions.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-slate-300 text-base sm:text-lg leading-relaxed font-body font-normal">
            {PATENT_DATA.tagline}
          </p>
        </div>

        {/* Master Patent Showcase Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 glass-panel border border-purple-500/25 hover:border-purple-400/50 transition-all duration-500 overflow-hidden group shadow-[0_0_50px_rgba(168,85,247,0.06)]">
          {/* Ambient Corner Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none group-hover:bg-purple-600/30 transition-all duration-700" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-600/15 blur-3xl pointer-events-none group-hover:bg-cyan-600/25 transition-all duration-700" />

          {/* Card Top HUD Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-code text-[11px] uppercase tracking-wider text-purple-400 font-bold block">
                  OFFICIAL PATENT PUBLICATION
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {PATENT_DATA.jurisdiction}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-code font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {PATENT_DATA.status}
              </span>
            </div>
          </div>

          {/* Main Grid: Document Image Preview & Structured Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left: Original Patent Publication Document Preview Container */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onClick={() => handleOpenModal(0)}
                data-cursor="explore"
                className="relative w-full max-w-md mx-auto aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950/80 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] group/img cursor-pointer hover:border-purple-400 transition-all duration-300 flex items-center justify-center p-3 sm:p-4"
              >
                {/* Visual HUD Corner Accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-purple-400 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-purple-400 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-purple-400 z-20 pointer-events-none" />

                {/* The EXACT Original Document Image (First Patent Photo) */}
                <img
                  src={ASSETS.patentPublication}
                  alt="Official Patent Publication Document - Intelligent Irrigation Control System"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover/img:scale-[1.02]"
                  loading="lazy"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-10">
                  <div className="p-3.5 rounded-full bg-purple-500 text-slate-950 shadow-xl scale-90 group-hover/img:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <span className="font-code text-xs tracking-wider uppercase font-semibold text-purple-200">
                    CLICK TO VIEW FULL SCREEN
                  </span>
                </div>
              </div>

              {/* View Full Screen Interaction Button */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => handleOpenModal(0)}
                  data-cursor="pointer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500 text-slate-950 font-body text-xs font-bold uppercase tracking-wider hover:bg-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>VIEW FULL SCREEN</span>
                </button>
              </div>
            </div>

            {/* Right: Patent Details & Telemetry Information */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Category & Badge */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-body uppercase tracking-wider font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    OFFICIAL PATENT
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-code text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                    APP NO: {PATENT_DATA.applicationNumber}
                  </span>
                </div>

                {/* Patent Title */}
                <h3 className="font-display-italic text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight mb-4">
                  "{PATENT_DATA.title}"
                </h3>

                {/* Technical Abstract / Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body font-normal mb-6">
                  {PATENT_DATA.abstract}
                </p>

                {/* Key Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 font-body">
                    <span className="text-slate-500 block text-[10px] font-code uppercase tracking-wider mb-1">
                      APPLICATION NUMBER
                    </span>
                    <span className="text-purple-300 font-code font-bold text-sm sm:text-base">
                      {PATENT_DATA.applicationNumber}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 font-body">
                    <span className="text-slate-500 block text-[10px] font-code uppercase tracking-wider mb-1">
                      PUBLICATION DATE
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-200 font-body text-sm font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{PATENT_DATA.publicationDate}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 font-body">
                    <span className="text-slate-500 block text-[10px] font-code uppercase tracking-wider mb-1">
                      FILING DATE
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-200 font-body text-sm font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{PATENT_DATA.filingDate}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 font-body">
                    <span className="text-slate-500 block text-[10px] font-code uppercase tracking-wider mb-1">
                      INVENTOR ROLE
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-200 font-body text-sm font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{PATENT_DATA.role}: <strong className="font-bold text-white">{PATENT_DATA.inventor}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Key Technical Highlights */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-code uppercase tracking-wider text-slate-400 block mb-2">
                    CORE INNOVATION HIGHLIGHTS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PATENT_DATA.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/15 text-xs text-slate-200 font-body"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Lightbox Viewer for Both Patent Photos */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl animate-fadeIn select-none"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full h-[94vh] flex flex-col rounded-3xl bg-[#08090d] border border-purple-500/40 shadow-[0_0_90px_rgba(168,85,247,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-slate-900/70 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm sm:text-base">
                    Official Patent Document
                  </h4>
                  <p className="text-slate-400 font-code text-[11px]">
                    Page {currentPhotoIndex + 1} of {patentImages.length} • App No: {PATENT_DATA.applicationNumber}
                  </p>
                </div>
              </div>

              {/* Header Actions & Close Button */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-code font-bold mr-1">
                  {currentPhotoIndex + 1} / {patentImages.length}
                </div>

                <a
                  href={patentImages[currentPhotoIndex]}
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
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Center Image Stage with Left/Right Navigation */}
            <div className="relative flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center bg-black/80">
              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                data-cursor="pointer"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-slate-900/80 border border-purple-500/40 text-purple-200 hover:text-white hover:bg-purple-600/60 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-md"
                aria-label="Previous patent photo"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* The EXACT Original Document Image at full scale with preserved aspect ratio */}
              <div className="w-full h-full flex items-center justify-center p-1 sm:p-2">
                <img
                  key={currentPhotoIndex}
                  src={patentImages[currentPhotoIndex]}
                  alt={`Official Patent Document Photo ${currentPhotoIndex + 1}`}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
                />
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                data-cursor="pointer"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-slate-900/80 border border-purple-500/40 text-purple-200 hover:text-white hover:bg-purple-600/60 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-md"
                aria-label="Next patent photo"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Modal Bottom Bar: Dots Pagination & Metadata */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-slate-900/70 flex flex-wrap items-center justify-between gap-3 text-xs font-body text-slate-400 shrink-0">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {patentImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentPhotoIndex === index
                        ? 'w-7 h-2 bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to patent photo ${index + 1}`}
                  />
                ))}
                <span className="font-code text-purple-300 text-xs ml-2">
                  {currentPhotoIndex + 1} / {patentImages.length}
                </span>
              </div>

              <div className="flex items-center gap-4 text-slate-300 text-xs">
                <span className="hidden sm:inline">Use arrows or swipe to toggle pages</span>
                <span className="font-code text-purple-300 font-semibold">{PATENT_DATA.publicationDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

