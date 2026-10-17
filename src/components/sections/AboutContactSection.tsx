import React, { useState } from 'react';
import { CONTACT_DATA, PERSONAL_INFO } from '../../data/portfolioData';
import { Linkedin, Github, FileText, Check, Copy, ArrowUpRight, Terminal, Code2 } from 'lucide-react';
import { AskAdityaAI } from '../ui/AskAdityaAI';

export const AboutContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-16 py-28 max-w-7xl mx-auto"
    >
      {/* Chapter Index */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-code text-xs font-semibold text-cyan-400 tracking-[0.2em] uppercase">
          06 // CONTACT & COLLABORATION
        </span>
        <div className="h-[1px] w-12 bg-cyan-500/30" />
      </div>

      {/* Main Grid: Editorial CTA + Direct Channels (Left) & Real AI Assistant (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Editorial Header & Verified Channels */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h2 className="font-display-italic text-[clamp(2.8rem,7vw,6rem)] text-white mb-6 leading-[0.95] font-normal">
              Let's
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-white">
                Build.
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-body font-normal mb-8 max-w-lg">
              {CONTACT_DATA.supportingText}
            </p>

            {/* Email Direct Trigger Card */}
            <div className="p-6 rounded-3xl glass-panel-glow border border-cyan-500/30 mb-8">
              <span className="text-xs font-body font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                DIRECT INBOX
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-code text-sm sm:text-base text-white select-all break-all">
                  {CONTACT_DATA.email}
                </span>
                <button
                  onClick={copyEmail}
                  data-cursor="pointer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-body text-xs font-bold uppercase tracking-wider transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Profiles & Platforms */}
            <div className="space-y-3">
              <span className="text-xs font-body font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                VERIFIED CHANNELS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all flex items-center justify-between group pointer-events-auto relative z-10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-body font-medium text-slate-200 group-hover:text-white">
                      LinkedIn Profile
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                <a
                  href={PERSONAL_INFO.hackerrank}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all flex items-center justify-between group pointer-events-auto relative z-10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-body font-medium text-slate-200 group-hover:text-white">
                      HackerRank (5-Star)
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                </a>

                <a
                  href="https://github.com/git-aadi-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all flex items-center justify-between group pointer-events-auto relative z-10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-body font-medium text-slate-200 group-hover:text-white">
                      GitHub Repos
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                <a
                  href="https://leetcode.com/u/adityajha_12345/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all flex items-center justify-between group pointer-events-auto relative z-10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-body font-medium text-slate-200 group-hover:text-white">
                      LeetCode
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                </a>

                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all flex items-center justify-between group sm:col-span-2 pointer-events-auto relative z-10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-body font-medium text-slate-200 group-hover:text-white">
                      Download Resume
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real AI Assistant */}
        <div className="lg:col-span-6">
          <AskAdityaAI />
        </div>
      </div>

      {/* Footer System Credits */}
      <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()}{' '}
          <span className="font-display-italic font-normal text-slate-300 text-sm">Aditya</span>{' '}
          <span className="font-body uppercase tracking-wider font-semibold">Kumar Jha</span> // ALL RIGHTS RESERVED
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium">HIGH-CRAFT SDE & AI PORTFOLIO</span>
        </div>
      </div>
    </section>
  );
};
