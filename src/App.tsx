import React, { useState, useEffect } from 'react';
import { Unified3DCanvas } from './components/canvas/Unified3DCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { TelemetryHUD } from './components/ui/TelemetryHUD';
import { SpatialNav } from './components/ui/SpatialNav';
import { ProjectModal } from './components/ui/ProjectModal';

import { HeroSection } from './components/sections/HeroSection';
import { IdentityStorySection } from './components/sections/IdentityStorySection';
import { EngineerSection } from './components/sections/EngineerSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { PatentSection } from './components/sections/PatentSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { CreativeSection } from './components/sections/CreativeSection';
import { PastExperienceSection } from './components/sections/PastExperienceSection';
import { AboutContactSection } from './components/sections/AboutContactSection';

import { Project } from './types';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll listener to update 3D camera spline & active chapter
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(Math.max(currentScroll / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);

      // Detect active section based on scroll offsets
      const sectionIds = [
        'hero',
        'identity',
        'engineer',
        'projects',
        'patent',
        'certifications',
        'creative',
        'past-experience',
        'contact',
      ];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToIdentity = () => {
    const el = document.getElementById('identity');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-body">
      {/* Background Spatial Grid */}
      <div className="fixed inset-0 bg-spatial-grid pointer-events-none z-0 opacity-35" />

      {/* Unified 3D WebGL Three.js Canvas */}
      <Unified3DCanvas scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* Custom Precision Magnetic Cursor */}
      <CustomCursor />

      {/* Top Floating Telemetry Header */}
      <TelemetryHUD onContactClick={scrollToContact} />

      {/* Side Spatial Navigation Scrubber */}
      <SpatialNav activeSection={activeSection} />

      {/* Continuous Cinematic Chapters */}
      <main className="relative z-10">
        <HeroSection onExploreClick={scrollToIdentity} />
        <IdentityStorySection />
        <EngineerSection />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        <PatentSection />
        <CertificationsSection />
        <CreativeSection />
        <PastExperienceSection />
        <AboutContactSection />
      </main>

      {/* Modal Inspector for Project Case Studies */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
