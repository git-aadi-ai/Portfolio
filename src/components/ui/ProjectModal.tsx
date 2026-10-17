import React from 'react';
import { Project } from '../../types';
import { X, Github, ExternalLink, Bot, Activity, CheckCircle2, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-glow border border-white/15 p-6 sm:p-10 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="pointer"
          aria-label="Close project modal"
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/15 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wider uppercase border ${
              project.isPatent
                ? 'bg-purple-500/15 border-purple-400/30 text-purple-300'
                : 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300'
            }`}
          >
            {project.category}
          </span>
        </div>

        {/* Project Title & Subtitle */}
        <h2 className="font-display-italic text-3xl sm:text-4xl text-white mb-2 font-normal">
          {project.title}
        </h2>
        <p className="text-cyan-400/90 font-body font-semibold text-sm sm:text-base tracking-wide mb-6">
          {project.subtitle}
        </p>

        {/* Description */}
        <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-body font-normal">
            {project.description}
          </p>
        </div>

        {/* Problem & Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-body text-xs">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-cyan-400 font-display font-bold uppercase tracking-wider block mb-2">
              // PROBLEM STATEMENT
            </span>
            <p className="text-slate-300 font-body text-sm leading-relaxed">{project.problem}</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-emerald-400 font-display font-bold uppercase tracking-wider block mb-2">
              // ENGINEERED SOLUTION
            </span>
            <p className="text-slate-300 font-body text-sm leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Key Highlights */}
        {project.keyHighlights && (
          <div className="mb-6">
            <h4 className="text-xs font-body font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              KEY HIGHLIGHTS
            </h4>
            <div className="space-y-2.5">
              {project.keyHighlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-sm text-slate-200 font-body"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patent / Hardware Innovation & Status */}
        {project.isPatent && (
          <div className="mb-6 p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 font-mono text-xs space-y-3">
            <div className="flex items-center gap-2 text-purple-300 font-bold">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>PROJECT DETAILS & IMPLEMENTATION</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">STATUS</span>
              <span className="text-purple-200 font-semibold">{project.patentStatus}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">PROJECT FOCUS</span>
              <span className="text-white font-sans text-sm">{project.innovation}</span>
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div className="mb-8">
          <h4 className="text-xs font-body font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            CORE TECHNOLOGIES
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technology.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-body font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-slate-200 hover:text-white text-xs font-body font-semibold tracking-wider transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-body font-bold text-xs uppercase tracking-wider transition-colors"
          >
            CLOSE CASE STUDY
          </button>
        </div>
      </div>
    </div>
  );
};
