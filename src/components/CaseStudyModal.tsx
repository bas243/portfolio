import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, ExternalLink, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, TrendingUp, Layers } from 'lucide-react';
import { sound } from '../utils/audio';
import { ProjectScreenshot } from './ProjectScreenshot';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onNextProject: (currentId: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onNextProject }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.94, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.12)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Modal Sticky Top Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
            <div className="flex items-center space-x-3 font-mono-code text-xs">
              <span className="text-[#2563eb] font-bold">{project.number}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-600 uppercase font-semibold">{project.category}</span>
              {project.highlightBadge && (
                <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563eb] font-mono-code text-[10px] font-bold">
                  {project.highlightBadge}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  data-cursor="LAUNCH"
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#09090b] font-mono-code text-xs font-semibold hover:bg-[#09090b] hover:text-white transition-all shadow-xs"
                >
                  <span>VIEW LIVE SITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="CLOSE"
                className="p-2 rounded-full border border-slate-200 hover:border-slate-900 hover:text-slate-900 text-slate-500 bg-white transition-colors"
                title="Close overlay"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 md:p-12 space-y-10 custom-scrollbar">
            {/* Title & Tagline Banner */}
            <div className="space-y-3">
              <div className="inline-block font-mono-code text-xs uppercase px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-600 font-semibold">
                CLIENT: {project.client} // {project.year}
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#09090b] tracking-tight uppercase">
                {project.title}
              </h2>
              <p className="font-display text-base sm:text-xl text-[#2563eb] font-semibold tracking-wide">
                {project.tagline}
              </p>
            </div>

            {/* Visual Interactive Device Frame with Full Screenshot Preview */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-6">
              {/* Full Screenshot Preview */}
              <div className="relative w-full">
                <ProjectScreenshot project={project} mode="modal" />
              </div>

              {/* Architectural Overview & Metrics */}
              <div className="p-6 rounded-xl bg-[#f8fafc] border border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-display font-bold text-xl text-[#09090b] uppercase">
                    {project.title} — PERFORMANCE & METRICS
                  </h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-[#2563eb] font-mono-code text-xs font-semibold hover:underline"
                    >
                      <span>VISIT LIVE WEBSITE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <div className="font-display font-black text-2xl sm:text-3xl text-[#09090b]">
                        {m.value}
                      </div>
                      <div className="font-mono-code text-[11px] text-[#2563eb] uppercase font-semibold mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metadata Grid (Role & Stack) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="space-y-1">
                <span className="font-mono-code text-xs text-slate-400 uppercase font-semibold">ENGINEERING ROLE:</span>
                <p className="font-display font-bold text-lg text-[#09090b]">{project.role}</p>
              </div>

              <div className="space-y-2">
                <span className="font-mono-code text-xs text-slate-400 uppercase font-semibold">STACK ARCHITECTURE:</span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 font-mono-code text-xs text-slate-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deep Dive: Problem, Solution, Result */}
            <div className="space-y-6">
              {/* Problem */}
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <div className="flex items-center space-x-2 font-mono-code text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>01 // THE CHALLENGE & FRICTION</span>
                </div>
                <p className="font-body text-base text-slate-800 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                <div className="flex items-center space-x-2 font-mono-code text-xs font-bold text-blue-800 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>02 // THE ARCHITECTURAL SOLUTION</span>
                </div>
                <p className="font-body text-base text-slate-800 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Result */}
              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center space-x-2 font-mono-code text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>03 // THE IMPACT & VERIFIABLE OUTCOME</span>
                </div>
                <p className="font-body text-base text-slate-800 leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Bottom Actions: Next Project & Live Site */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  data-cursor="OPEN"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#09090b] text-white font-mono-code text-xs font-bold uppercase tracking-wider hover:bg-[#2563eb] transition-all shadow-md"
                >
                  <span>VIEW LIVE SITE</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : <div />}

              <button
                onClick={() => {
                  sound.playClick();
                  onNextProject(project.id);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="NEXT"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full border border-slate-300 hover:border-slate-900 text-slate-800 font-mono-code text-xs font-semibold uppercase tracking-wider transition-all bg-white shadow-xs"
              >
                <span>NEXT PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
