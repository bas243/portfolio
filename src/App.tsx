import React, { useState } from 'react';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { ProjectUniverse } from './components/ProjectUniverse';
import { CaseStudyModal } from './components/CaseStudyModal';
import { DigitalDNA3D } from './components/DigitalDNA3D';
import { ServicesSection } from './components/ServicesSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { AvailabilitySection } from './components/AvailabilitySection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { projects } from './data/projects';
import { Project } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextProject = (currentId: string) => {
    const currentIndex = projects.findIndex((p) => p.id === currentId);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-[#09090b] selection:bg-[#2563eb] selection:text-white font-body overflow-x-hidden">
      {/* Cinematic Boot Loader */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Context-Aware Custom Cursor with Trailing Ring & Light */}
      <CustomCursor />

      {/* Persistent HUD Navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Experience Stream */}
      <main className="relative z-10">
        {/* Section 01: Hero / Entry World with 3D Core */}
        <HeroSection
          onExplore={() => handleNavigate('projects')}
          onContact={() => handleNavigate('contact')}
        />

        {/* Section 02: The Intro / Identity */}
        <IntroSection />

        {/* Section 03: 3D Project Universe Showcase */}
        <ProjectUniverse onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 04: Skills / Digital DNA 3D Constellation */}
        <DigitalDNA3D />

        {/* Section 05: Services / What I Build Giant Typography */}
        <ServicesSection />

        {/* Section 06: Process / From Idea to Internet */}
        <ProcessTimeline />

        {/* Section 07: Numbers / Massive Statistics */}
        <StatsSection />

        {/* Section 08: About the Builder Terminal & Geometric Prism */}
        <AboutSection />

        {/* Section 09: Availability Statement */}
        <AvailabilitySection onStartProject={() => handleNavigate('contact')} />

        {/* Section 10: Contact Direct Intake */}
        <ContactSection />

        {/* Section 11: Footer / See You On The Internet */}
        <FooterSection />
      </main>

      {/* Expanded Case Study Presentation Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNextProject={handleNextProject}
      />
    </div>
  );
}
