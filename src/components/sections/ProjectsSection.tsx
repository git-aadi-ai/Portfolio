import React from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { ArrowUpRight, Github, ExternalLink, Bot, Shield, CheckCircle2, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section
      id="projects"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-16 py-28 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-code text-xs font-semibold text-cyan-400 tracking-[0.2em] uppercase">
              04 // SELECTED WORK & INVENTIONS
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/30" />
          </div>
          <h2 className="font-display-italic text-[clamp(2.8rem,6.5vw,5.5rem)] text-white leading-[0.95] font-normal">
            Selected
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-200">
              Work & Inventions.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-slate-300 text-base sm:text-lg leading-relaxed font-body font-normal">
          Selected projects where software, AI, and engineering come together.
        </p>
      </div>

      {/* Flagship Projects Stack */}
      <div className="flex flex-col gap-12">
        {PROJECTS.map((project, index) => {
          const isPatent = project.isPatent;

          return (
            <div
              key={project.id}
              className={`p-6 sm:p-10 lg:p-12 rounded-3xl transition-all duration-500 relative overflow-hidden group ${
                isPatent
                  ? 'glass-panel border-purple-500/25 hover:border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.05)]'
                  : 'glass-panel border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_40px_rgba(56,189,248,0.05)]'
              }`}
            >
              {/* Ambient Glow */}
              <div
                className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 ${
                  isPatent ? 'bg-purple-500' : 'bg-cyan-500'
                }`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Information Column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Category & Number Pill */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-code text-xs text-slate-500 font-bold">
                        0{index + 1} //
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-body uppercase tracking-wider font-semibold border ${
                          isPatent
                            ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                            : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display-italic text-3xl sm:text-4xl lg:text-5xl text-white mb-2 group-hover:text-cyan-200 transition-colors font-normal">
                      {project.title}
                    </h3>

                    {/* Subtitle / Purpose */}
                    <p className="text-sm sm:text-base text-cyan-400/90 font-body font-semibold tracking-wide mb-4">
                      {project.subtitle}
                    </p>

                    {/* Short Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body font-normal mb-6">
                      {project.description}
                    </p>

                    {/* Problem → Solution Breakdown */}
                    <div className="space-y-3 mb-6 p-4 rounded-2xl bg-black/30 border border-white/5 font-body text-xs">
                      <div>
                        <span className="text-cyan-400 font-display font-bold uppercase tracking-wider block mb-1">
                          PROBLEM
                        </span>
                        <p className="text-slate-300 font-body text-sm leading-relaxed">{project.problem}</p>
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <span className="text-emerald-400 font-display font-bold uppercase tracking-wider block mb-1">
                          SOLUTION
                        </span>
                        <p className="text-slate-300 font-body text-sm leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mb-6">
                      <div className="text-[11px] font-code uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        TECH STACK
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technology.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-body font-medium text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      data-cursor="explore"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body uppercase tracking-wider font-bold transition-all shadow-md ${
                        isPatent
                          ? 'bg-purple-400 text-slate-950 hover:bg-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                          : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                      }`}
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="pointer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-slate-200 hover:text-white text-xs font-body font-semibold tracking-wider transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GITHUB</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Interactive Architecture Visualizer & Key Highlights Card */}
                <div className="lg:col-span-5 relative">
                  <div
                    className={`rounded-2xl p-6 sm:p-8 border transition-all duration-500 ${
                      isPatent
                        ? 'bg-purple-950/20 border-purple-500/20 group-hover:border-purple-400/40'
                        : 'bg-cyan-950/20 border-cyan-500/20 group-hover:border-cyan-400/40'
                    }`}
                  >
                    {isPatent ? (
                      /* Hardware & IoT Project Visualizer & Highlights */
                      <div className="flex flex-col gap-4 font-body text-xs">
                        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 text-purple-300 font-code">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-purple-400 animate-pulse" />
                            <span>HARDWARE & IoT PROJECT</span>
                          </div>
                          <span>HARDWARE // IOT</span>
                        </div>

                        <div className="space-y-2.5 font-code">
                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span className="text-slate-500 block text-[10px] uppercase">STATUS</span>
                            <span className="text-purple-300 font-semibold">{project.patentStatus}</span>
                          </div>

                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span className="text-slate-500 block text-[10px] uppercase">PROJECT FOCUS</span>
                            <span className="text-white font-body text-xs">{project.innovation}</span>
                          </div>
                        </div>

                        {/* Key Highlights */}
                        <div className="space-y-2 pt-1">
                          <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-code">
                            KEY HIGHLIGHTS
                          </span>
                          {project.keyHighlights?.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-black/30 border border-white/5 text-[11px] text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-body">
                          Detailed implementation and project documentation available in the case study.
                        </div>
                      </div>
                    ) : (
                      /* AI Assessment Platform Visualizer & Highlights */
                      <div className="flex flex-col gap-4 font-body text-xs">
                        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 text-cyan-300 font-code">
                          <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                            <span>INTERVUIQ PLATFORM</span>
                          </div>
                          <span className="text-emerald-400">CURRENT</span>
                        </div>

                        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 font-code">
                          <div className="text-slate-500">// INTERVUIQ ENGINE</div>
                          <div className="text-cyan-300">&gt; Evaluating technical response...</div>
                          <div className="text-emerald-400">&gt; Analyzing DSA pattern, speech tempo, and ATS logic.</div>
                          <div className="text-slate-400">&gt; Generating structured assessment insights...</div>
                        </div>

                        {/* Key Highlights */}
                        <div className="space-y-2 pt-1">
                          <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-code">
                            KEY HIGHLIGHTS
                          </span>
                          {project.keyHighlights?.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-black/30 border border-white/5 text-[11px] text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
