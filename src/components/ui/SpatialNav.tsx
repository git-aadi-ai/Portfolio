import React, { useState } from 'react';
import { Menu, X, Compass } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  code: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Intro', code: '01' },
  { id: 'identity', label: 'Identity', code: '02' },
  { id: 'engineer', label: 'Engineer & Skills', code: '03' },
  { id: 'projects', label: 'Selected Work', code: '04' },
  { id: 'patent', label: 'Patent & IP', code: '05' },
  { id: 'certifications', label: 'Certifications', code: '06' },
  { id: 'creative', label: 'Beyond Code', code: '07' },
  { id: 'past-experience', label: 'Past Experience', code: '08' },
  { id: 'contact', label: 'Contact', code: '09' },
];

interface SpatialNavProps {
  activeSection: string;
}

export const SpatialNav: React.FC<SpatialNavProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Vertical Telemetry Scrubber (Right Side) */}
      <nav
        id="spatial-telemetry-nav"
        aria-label="Section Navigation"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5 pointer-events-auto"
      >
        <div className="flex flex-col items-end gap-2.5 p-2 rounded-2xl glass-panel-subtle">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                data-cursor="pointer"
                className="group flex items-center gap-3 py-1.5 px-2 focus:outline-none"
                aria-label={`Jump to ${item.label}`}
              >
                {/* Floating label on hover or active */}
                <span
                  className={`text-[11px] font-body tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-300 font-bold opacity-100 translate-x-0'
                      : 'text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-slate-300 translate-x-2 group-hover:translate-x-0 font-medium'
                  }`}
                >
                  <span className="font-code text-cyan-400/80 mr-1.5">{item.code}</span>
                  {item.label}
                </span>

                {/* Node Pill Indicator */}
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? 'bg-cyan-400 scale-125 shadow-[0_0_12px_#38bdf8] ring-2 ring-cyan-400/40'
                      : 'bg-white/20 group-hover:bg-cyan-400/60 group-hover:scale-110'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Floating Menu Trigger */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-cursor="pointer"
          className="p-3.5 rounded-full bg-cyan-400 text-slate-950 shadow-2xl border border-cyan-300/40 flex items-center justify-center"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Modal Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#07080a]/95 backdrop-blur-xl flex flex-col justify-center px-8">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
              CHAPTER NAVIGATION
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-left font-display font-bold text-xl uppercase transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-slate-500">{item.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
