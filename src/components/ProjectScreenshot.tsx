import React, { useState } from 'react';
import { Project } from '../types';
import { Monitor, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ProjectScreenshotProps {
  project: Project;
  className?: string;
  mode?: 'card' | 'modal';
  isHovered?: boolean;
}

export const ProjectScreenshot: React.FC<ProjectScreenshotProps> = ({
  project,
  className = '',
  mode = 'card',
  isHovered = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fallback to relative path supporting GitHub Pages subdirectories
  const rawPath = project.screenshot || `screenshots/${project.id}.jpg`;
  const cleanPath = rawPath.replace(/^\//, '');
  const base = import.meta.env.BASE_URL || './';
  const screenshotSrc = `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;

  if (imageError) {
    // Elegant Architectural Fallback when screenshot hasn't been uploaded yet
    return (
      <div
        className={`relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-slate-200/80 flex flex-col items-center justify-center p-6 text-center ${className}`}
        style={{ minHeight: mode === 'card' ? '220px' : '380px' }}
      >
        {/* Subtle architectural background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 shadow-xs"
          style={{ backgroundColor: `${project.accentColor}15`, color: project.accentColor }}
        >
          <Monitor className="w-7 h-7" />
        </div>

        <div className="font-display font-bold text-lg text-[#09090b] tracking-tight uppercase">
          {project.title}
        </div>
        <p className="font-body text-xs text-slate-500 max-w-xs mt-1 line-clamp-2">
          {project.tagline}
        </p>

        <div className="mt-4 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-slate-500 font-mono-code text-[10px] flex items-center space-x-1.5 shadow-xs">
          <ImageIcon className="w-3 h-3 text-slate-400" />
          <span>UPLOAD TO: /public{screenshotSrc}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border border-slate-200/90 bg-slate-900 group/screen shadow-xs ${className}`}
      style={{ minHeight: mode === 'card' ? '220px' : '400px' }}
    >
      {/* Mini Virtual Browser Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-white/95 border-b border-slate-200 font-mono-code text-[10px] text-slate-500 z-10 relative">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="ml-2 font-semibold text-slate-600 truncate max-w-[140px] sm:max-w-[200px]">
            {project.title}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {project.highlightBadge && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#2563eb] text-[9px] font-bold">
              {project.highlightBadge}
            </span>
          )}
          <span className="text-[9px] text-emerald-600 font-bold hidden sm:inline">LIVE PREVIEW</span>
        </div>
      </div>

      {/* Screenshot Image Container with Hover Pan / Zoom */}
      <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-start justify-center">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 font-mono-code text-xs text-slate-400">
            <span className="animate-pulse flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#2563eb]" />
              <span>INITIALIZING PREVIEW...</span>
            </span>
          </div>
        )}

        <img
          src={screenshotSrc}
          alt={`${project.title} Website Screenshot`}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
          className={`w-full object-cover object-top transition-transform duration-700 ease-out ${
            mode === 'card'
              ? isHovered
                ? 'scale-105 -translate-y-2'
                : 'scale-100 translate-y-0'
              : 'scale-100 hover:scale-[1.02]'
          }`}
          style={{
            maxHeight: mode === 'card' ? '280px' : '650px',
            minHeight: mode === 'card' ? '200px' : '380px',
          }}
        />

        {/* Subtle Gloss Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
};
