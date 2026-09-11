import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ExternalLink, Sparkles, RefreshCw, Layers } from 'lucide-react';

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
  const base = import.meta.env.BASE_URL || './';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  // Candidate sources to try in priority order:
  // 1. Explicit project screenshot or local jpg
  // 2. Local png
  // 3. Local webp
  // 4. High-resolution live capture via thum.io
  // 5. Secondary live capture via microlink
  const candidateSources: string[] = React.useMemo(() => {
    const custom = project.screenshot
      ? `${normalizedBase}${project.screenshot.replace(/^\//, '')}`
      : null;

    const list: (string | null)[] = [
      custom,
      `${normalizedBase}screenshots/${project.id}.jpg`,
      `${normalizedBase}screenshots/${project.id}.png`,
      `${normalizedBase}screenshots/${project.id}.webp`,
      project.liveUrl ? `https://image.thum.io/get/width/1200/crop/750/noanimate/${project.liveUrl}` : null,
      project.liveUrl ? `https://api.microlink.io?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url` : null,
    ];

    // Remove duplicates and nulls
    return Array.from(new Set(list.filter(Boolean) as string[]));
  }, [project, normalizedBase]);

  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);

  // Reset if project changes
  useEffect(() => {
    setCurrentSourceIndex(0);
    setImageLoaded(false);
    setAllFailed(false);
  }, [project.id]);

  const handleImageError = () => {
    if (currentSourceIndex < candidateSources.length - 1) {
      setCurrentSourceIndex((prev) => prev + 1);
      setImageLoaded(false);
    } else {
      setAllFailed(true);
    }
  };

  const currentSrc = candidateSources[currentSourceIndex];

  if (allFailed) {
    // High-End Interactive Fallback when offline or images fail
    return (
      <div
        className={`relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white border border-slate-200/80 flex flex-col items-center justify-center p-6 text-center ${className}`}
        style={{ minHeight: mode === 'card' ? '220px' : '380px' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 shadow-lg border border-white/10"
          style={{ backgroundColor: `${project.accentColor}25`, color: project.accentColor }}
        >
          <Layers className="w-7 h-7" />
        </div>

        <div className="font-display font-bold text-lg text-white tracking-tight uppercase">
          {project.title}
        </div>
        <p className="font-body text-xs text-slate-300 max-w-xs mt-1 line-clamp-2">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#2563eb] hover:bg-blue-500 text-white font-mono-code text-[11px] font-semibold flex items-center space-x-1.5 transition-all shadow-md"
            >
              <span>LAUNCH LIVE SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => {
              setAllFailed(false);
              setCurrentSourceIndex(0);
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 font-mono-code text-[11px] flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>RETRY</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border border-slate-200/90 bg-slate-950 group/screen shadow-xs ${className}`}
      style={{ minHeight: mode === 'card' ? '220px' : '400px' }}
    >
      {/* Mini Virtual Browser Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-white/95 border-b border-slate-200 font-mono-code text-[10px] text-slate-500 z-10 relative">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="ml-2 font-semibold text-slate-700 truncate max-w-[140px] sm:max-w-[200px]">
            {project.title}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {project.highlightBadge && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#2563eb] text-[9px] font-bold">
              {project.highlightBadge}
            </span>
          )}
          <span className="text-[9px] text-emerald-600 font-bold hidden sm:inline flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE PREVIEW
          </span>
        </div>
      </div>

      {/* Screenshot Image Container with Hover Pan / Zoom */}
      <div className="relative w-full h-full overflow-hidden bg-slate-900 flex items-start justify-center">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/90 font-mono-code text-xs text-slate-500 z-10">
            <span className="animate-pulse flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#2563eb]" />
              <span>SYNCING WEBSITE PREVIEW...</span>
            </span>
          </div>
        )}

        <img
          key={currentSrc}
          src={currentSrc}
          alt={`${project.title} Website Preview`}
          onError={handleImageError}
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

