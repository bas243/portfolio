import React from 'react';
import { motion } from 'motion/react';
import { Hero3DScene } from './Hero3DScene';
import { ArrowDown, Terminal, Sparkles, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onContact }) => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden pt-24 sm:pt-28 bg-[#f8fafc]">
      {/* 3D WebGL Background Canvas */}
      <Hero3DScene />

      {/* Top HUD Metadata */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-code text-[11px] text-slate-500 tracking-wider">
        <div className="flex items-center space-x-2 bg-white/95 border border-slate-200 px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5 text-[#2563eb]" />
          <span className="text-slate-800 font-medium">DESIGN ENGINEER & CREATIVE DEVELOPER</span>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
          <span className="text-[#2563eb] font-semibold">INTERACTIVE WEB</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium">SHOPIFY COMMERCE</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium">3D & THREE.JS</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium">MOTION SYSTEMS</span>
        </div>
      </div>

      {/* Massive Display Typography */}
      <div className="relative z-10 my-auto py-10 sm:py-14 max-w-4xl xl:max-w-5xl pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center space-x-2 font-mono-code text-xs text-[#2563eb] uppercase tracking-widest bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full mb-5 pointer-events-auto shadow-xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
            <span className="font-semibold">PORTFOLIO // 2026 EDITION</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] tracking-tighter text-[#09090b] uppercase select-none">
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09090b] via-[#1e293b] to-[#2563eb]">
              DIGITAL THINGS
            </span> <br />
            THAT SHOULDN&apos;T <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#09090b]">
              EXIST.
            </span>
          </h1>
        </motion.div>

        {/* Action Button Row */}
        <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
          <button
            onClick={() => {
              sound.playClick();
              onExplore();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="EXPLORE"
            className="group relative inline-flex items-center space-x-3 px-7 sm:px-9 py-4 rounded-full bg-[#09090b] text-white font-mono-code text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#2563eb] shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)] transition-all duration-300"
          >
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onContact();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="START"
            className="inline-flex items-center space-x-2 px-7 sm:px-9 py-4 rounded-full border border-slate-300 bg-white/95 backdrop-blur-md text-[#09090b] font-mono-code text-xs sm:text-sm font-semibold uppercase tracking-wider hover:border-[#2563eb] hover:text-[#2563eb] hover:bg-blue-50/50 transition-all shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
            <span>START A PROJECT</span>
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-slate-200/90 pt-4 gap-4 font-mono-code text-xs text-slate-500">
        <div className="flex items-center space-x-3">
          <span className="text-[#2563eb] font-semibold">LOCATION:</span>
          <span className="text-slate-900 font-bold">KASHMIR</span>
          <span className="text-slate-300">//</span>
          <span className="text-slate-600 font-medium">WORKING WORLDWIDE</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onExplore();
          }}
          onMouseEnter={() => sound.playHover()}
          data-cursor="SCROLL"
          className="flex items-center space-x-2 text-slate-700 hover:text-[#2563eb] transition-colors group font-medium"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-[#2563eb]" />
        </button>

        <div className="hidden lg:flex items-center space-x-2 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>AVAILABLE FOR SELECT COMMISSIONS</span>
        </div>
      </div>
    </section>
  );
};
