import React from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../data/siteConfig';
import { sound } from '../utils/audio';

export const StatsSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-10 md:px-14 bg-[#f8fafc] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex items-center space-x-3 font-mono-code text-xs text-slate-500 tracking-widest uppercase">
          <span className="text-[#2563eb] font-semibold">06</span>
          <span>// VERIFIED PERFORMANCE METRICS</span>
        </div>

        {/* Massive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="METRIC"
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:border-slate-400 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              <div className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-[#09090b] group-hover:text-[#2563eb] transition-colors tracking-tight">
                {stat.number}
              </div>

              <div className="font-mono-code text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mt-4">
                {stat.label}
              </div>

              <p className="font-body text-xs text-slate-600 leading-relaxed mt-2">
                {stat.subtext}
              </p>

              <div className="absolute top-0 right-0 p-4 font-mono-code text-[11px] text-slate-300 group-hover:text-[#2563eb]/50 transition-colors font-medium">
                0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
