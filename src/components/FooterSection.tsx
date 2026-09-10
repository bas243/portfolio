import React from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../data/siteConfig';
import { ArrowUp, ArrowUpRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#f8fafc] text-[#09090b] pt-24 sm:pt-32 pb-12 px-6 sm:px-10 md:px-14 border-t border-slate-200/80 overflow-hidden">
      {/* Background subtle ambient warmth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#2563eb]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Massive Display Farewell Headline */}
        <div className="space-y-6">
          <div className="font-mono-code text-xs text-[#2563eb] font-semibold uppercase tracking-widest flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO OUTRO // CREATIVE DIRECTION</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] text-[#09090b] uppercase select-none"
          >
            SEE YOU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09090b] via-[#1e293b] to-[#2563eb]">
              ON THE
            </span> <br />
            INTERNET.
          </motion.h2>
        </div>

        {/* Social Links Network */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-slate-200">
          {siteConfig.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              data-cursor="LINK"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-800 hover:shadow-md transition-all group flex flex-col justify-between min-h-[110px]"
            >
              <div className="flex items-center justify-between text-slate-500 group-hover:text-[#2563eb] transition-colors">
                <span className="font-mono-code text-[11px] font-bold">{social.name}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="font-mono-code text-xs text-slate-800 group-hover:text-[#09090b] font-medium transition-colors">
                {social.handle}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom Metadata & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-slate-200 font-mono-code text-xs text-slate-500 gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left gap-2">
            <span>&copy; {new Date().getFullYear()} BASIT NABI</span>
            <span className="hidden sm:inline">•</span>
            <span>DESIGNED & ENGINEERED FOR HIGH-IMPACT EXPERIENCES</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            data-cursor="TOP"
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-300 hover:border-[#09090b] hover:text-[#09090b] text-slate-700 bg-white shadow-xs transition-all uppercase font-medium"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
