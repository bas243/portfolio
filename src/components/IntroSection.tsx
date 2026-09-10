import React from 'react';
import { motion } from 'motion/react';
import { Code2, Layers, Cpu, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

export const IntroSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'DESIGN',
      icon: Layers,
      accent: '#2563eb',
      desc: 'Thoughtfully sculpted visual identities, spatial typography, and high-contrast gallery elegance.',
    },
    {
      num: '02',
      title: 'DEVELOPMENT',
      icon: Code2,
      accent: '#09090b',
      desc: 'Sub-second rendering, resilient TypeScript architectures, and fluid 60FPS motion.',
    },
    {
      num: '03',
      title: 'ECOMMERCE',
      icon: Cpu,
      accent: '#059669',
      desc: 'High-conversion bespoke Shopify systems, custom liquid themes, and seamless checkouts.',
    },
    {
      num: '04',
      title: 'EXPERIMENTS',
      icon: Compass,
      accent: '#7c3aed',
      desc: 'Interactive Three.js shaders, reactive physics, and custom creative web prototypes.',
    },
  ];

  return (
    <section id="identity" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 border-t border-slate-200/80 bg-[#f8fafc]">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#2563eb]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header Tag */}
        <div className="flex items-center space-x-3 font-mono-code text-xs text-slate-500 tracking-widest uppercase">
          <span className="text-[#2563eb] font-semibold">02</span>
          <span>// CRAFT & ETHOS</span>
        </div>

        {/* Scroll Revealed Headline */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight text-[#09090b] uppercase">
              I MAKE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09090b] via-[#1e293b] to-[#2563eb]">
                INTERNET FEEL
              </span> <br />
              LESS BORING.
            </h2>
          </motion.div>
        </div>

        {/* Animated Metadata Pillars with Giant Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200/80">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="CORE"
                className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-400 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="font-display font-black text-4xl sm:text-5xl transition-colors"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.num}
                  </span>
                  <div
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 group-hover:scale-105 transition-transform"
                    style={{ color: pillar.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#09090b] tracking-wide mb-2 group-hover:text-[#2563eb] transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>

                {/* Subtle bottom indicator line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                  style={{ backgroundColor: pillar.accent }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
