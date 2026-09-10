import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { sound } from '../utils/audio';

interface AvailabilitySectionProps {
  onStartProject: () => void;
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ onStartProject }) => {
  return (
    <section className="relative w-full py-28 sm:py-36 px-6 sm:px-10 md:px-14 bg-white border-t border-slate-200/80 overflow-hidden">
      {/* Subtle background ambient pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563eb]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
        {/* Availability Status Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 font-mono-code text-xs text-emerald-800 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span className="font-bold tracking-wider">● CURRENTLY AVAILABLE FOR SELECT COMMISSIONS</span>
        </div>

        {/* Huge High-Impact Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-[#09090b] uppercase tracking-tight"
        >
          YOUR NEXT WEBSITE <br />
          <span className="text-slate-400">
            SHOULDN&apos;T LOOK LIKE
          </span> <br />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#09090b] to-[#334155]">
            EVERY OTHER WEBSITE.
          </span>
        </motion.h2>

        <p className="font-body text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Open for high-end boutique e-commerce, custom 3D web environments, and bespoke web apps with brands that value distinction.
        </p>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={() => {
              sound.playClick();
              onStartProject();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="START"
            className="group inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#09090b] text-white font-mono-code text-sm font-bold uppercase tracking-wider hover:bg-[#2563eb] transition-all shadow-md"
          >
            <span>START A PROJECT</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
