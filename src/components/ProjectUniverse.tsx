import React, { useState } from 'react';
import { motion } from 'motion/react';
import { projects } from '../data/projects';
import { Project } from '../types';
import { ArrowUpRight, Sparkles, Eye } from 'lucide-react';
import { sound } from '../utils/audio';
import { ProjectScreenshot } from './ProjectScreenshot';

interface ProjectUniverseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectUniverse: React.FC<ProjectUniverseProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const categories = ['ALL', 'TOP DESIGNS', 'E-COMMERCE', 'SaaS & TECH', 'SERVICES'];

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : activeCategory === 'TOP DESIGNS'
      ? projects.filter((p) => p.bestDesign)
      : projects.filter((p) => {
          if (activeCategory === 'E-COMMERCE') return p.category.includes('COMMERCE');
          if (activeCategory === 'SaaS & TECH') return p.category.includes('SaaS') || p.category.includes('TECHNOLOGY') || p.category.includes('STUDIO');
          if (activeCategory === 'SERVICES') return p.category.includes('SERVICE');
          return true;
        });

  return (
    <section id="projects" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 bg-white border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#2563eb]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-slate-400/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 font-mono-code text-xs text-slate-500 tracking-widest uppercase">
              <span className="text-[#2563eb] font-semibold">03</span>
              <span>// SELECTED CLIENT WORK</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#09090b] uppercase tracking-tight">
              FEATURED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09090b] via-[#1e293b] to-[#2563eb]">
                PROJECTS.
              </span>
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            High-conversion digital flagships, 3D WebGL architectures, and bespoke software experiences. Hover to inspect perspective, click to launch in-depth case studies.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-slate-200/80 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="FILTER"
              className={`px-4 py-2 rounded-full font-mono-code text-xs tracking-wider transition-all uppercase ${
                activeCategory === cat
                  ? 'bg-[#09090b] text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Floating Project Universe Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => {
                  sound.playHover();
                  setHoveredProjectId(project.id);
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => {
                  sound.playConfirm();
                  onSelectProject(project);
                }}
                data-cursor="VIEW"
                className="group relative cursor-pointer"
                style={{ perspective: 1200 }}
              >
                {/* 3D Tilted Card Container */}
                <div
                  className={`relative rounded-2xl md:rounded-3xl p-6 sm:p-8 bg-white border transition-all duration-500 ease-out flex flex-col justify-between min-h-[480px] overflow-hidden ${
                    isHovered
                      ? 'border-slate-400 shadow-[0_20px_50px_rgba(0,0,0,0.08)] -translate-y-2 scale-[1.01]'
                      : 'border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:border-slate-300'
                  }`}
                  style={{
                    transform: isHovered ? 'rotateX(2deg) rotateY(-1.5deg)' : 'rotateX(0deg) rotateY(0deg)',
                  }}
                >
                  {/* Subtle Corner Glow Accent */}
                  <div
                    className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-[90px] opacity-15 pointer-events-none transition-opacity duration-300"
                    style={{ backgroundColor: project.accentColor }}
                  />

                  {/* Browser Header Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 font-mono-code text-xs text-slate-400">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="ml-2 text-slate-500 font-bold hidden sm:inline">{project.number}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-medium">
                      {project.highlightBadge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563eb] font-mono-code font-bold flex items-center space-x-1 shadow-xs">
                          <Sparkles className="w-2.5 h-2.5 text-[#2563eb]" />
                          <span>{project.highlightBadge}</span>
                        </span>
                      )}
                      <span>{project.year}</span>
                      <span>•</span>
                      <span className="uppercase font-semibold tracking-wider" style={{ color: project.accentColor }}>{project.category}</span>
                    </div>
                  </div>

                  {/* Interactive Visual Window / Website Preview */}
                  <div className="relative my-2 rounded-2xl overflow-hidden transition-all">
                    <ProjectScreenshot project={project} mode="card" isHovered={isHovered} />
                  </div>

                  {/* Project Info & Description */}
                  <div className="mt-4 mb-2 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-xl sm:text-2xl text-[#09090b] tracking-tight uppercase group-hover:text-[#2563eb] transition-colors">
                        {project.title}
                      </h4>
                      <div className="flex items-center space-x-1.5 font-mono-code text-[11px] text-[#2563eb] font-semibold">
                        <Eye className="w-3.5 h-3.5" />
                        <span>CASE STUDY</span>
                      </div>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {project.summary}
                    </p>

                    {/* Metric Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/80 font-mono-code text-[10px] shadow-xs">
                          <span className="text-slate-500 mr-1">{m.label}:</span>
                          <span className="font-bold text-[#09090b]">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Tech Stack & Launch Arrow */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono-code bg-slate-100 border border-slate-200/80 text-slate-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono-code bg-slate-100 text-slate-600 font-medium">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                          }}
                          className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#09090b] hover:text-white text-slate-700 font-mono-code text-[11px] font-semibold flex items-center space-x-1 transition-all shadow-xs"
                          title="Visit live production website"
                        >
                          <span>LIVE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <div className="p-2 rounded-full bg-slate-100 group-hover:bg-[#2563eb] group-hover:text-white text-slate-700 transition-all flex items-center justify-center shadow-xs" title="Explore full case study">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
