import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Lightbulb, PenTool, Hammer, Bug, Wrench, Rocket, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const ProcessTimeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(2); // Default to 'BUILD'

  const stages = [
    {
      num: '01',
      title: 'IDEA',
      icon: Lightbulb,
      subtitle: 'DECONSTRUCTION & STRATEGY',
      desc: 'Filtering noise. Analyzing the core product premise, target user psychology, and defining an unfair visual competitive advantage.',
      log: 'SYS_LOG: Strategy compiled. Scope locked. High-concept blueprint drafted.',
    },
    {
      num: '02',
      title: 'DESIGN',
      icon: PenTool,
      subtitle: 'SPATIAL ART & PROTOTYPES',
      desc: 'Sculpting high-contrast layouts in Figma, choreographing motion curves, typography hierarchy, and shader mood boards.',
      log: 'SYS_LOG: Vector layout exported. Bezier easing curves calibrated.',
    },
    {
      num: '03',
      title: 'BUILD',
      icon: Hammer,
      subtitle: 'PRODUCTION TS & THREE.JS',
      desc: 'Writing clean, declarative code. Instantiating Three.js scenes, configuring state machines, and fine-tuning responsive layouts.',
      log: 'SYS_LOG: WebGL context initialized. React 19 component tree rendered.',
    },
    {
      num: '04',
      title: 'BREAK',
      icon: Bug,
      subtitle: 'CHAOS TESTING & STRESS TESTS',
      desc: 'Simulating worst-case conditions: 3G network throttles, 100 concurrent clicks, mobile viewport resizing, and edge memory leaks.',
      log: 'SYS_LOG: Stress test engaged. 12 edge cases flagged and isolated.',
    },
    {
      num: '05',
      title: 'FIX',
      icon: Wrench,
      subtitle: '60FPS HARDENING & ZERO-DEFECTS',
      desc: 'Refining memory disposal loops, compressing geometry buffers, eliminating layout shifts, and perfecting micro-interactions.',
      log: 'SYS_LOG: GC cycles verified. Lighthouse score: 100/100.',
    },
    {
      num: '06',
      title: 'SHIP',
      icon: Rocket,
      subtitle: 'DEPLOYMENT TO THE INTERNET',
      desc: 'Global edge distribution, custom domain linking, DNS verification, and final transmission into the digital wild.',
      log: 'SYS_LOG: 200 OK. Global CDN cache warmed. Live to the world.',
    },
  ];

  return (
    <section id="process" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 font-mono-code text-xs text-slate-500 tracking-widest uppercase">
              <span className="text-[#2563eb] font-semibold">06</span>
              <span>// PROCESS & DELIVERY</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#09090b] uppercase tracking-tight">
              FROM CONCEPT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09090b] via-[#1e293b] to-[#2563eb]">
                TO INTERNET.
              </span>
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            The six-stage pipeline of digital creation. Click any milestone to inspect architectural protocols and QA telemetry.
          </p>
        </div>

        {/* Timeline Interactive Track */}
        <div className="space-y-8">
          {/* Progress Path Indicator Bar */}
          <div className="relative w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#09090b] via-[#334155] to-[#2563eb]"
              style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Timeline Milestones Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;

              return (
                <button
                  key={stage.num}
                  onClick={() => {
                    sound.playClick();
                    setActiveStage(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="STAGE"
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    isActive
                      ? 'bg-white border-[#09090b] text-[#09090b] shadow-[0_2px_15px_rgba(0,0,0,0.04)] font-bold'
                      : 'bg-slate-50 border-slate-200/80 hover:border-slate-300 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono-code text-xs font-bold ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`}>
                      {stage.num}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${
                      isActive ? 'border-slate-200 bg-slate-100 text-[#09090b]' : 'border-slate-200/60 bg-white text-slate-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className={`font-display font-bold text-base sm:text-lg uppercase ${
                    isActive ? 'text-[#09090b]' : 'text-slate-700'
                  }`}>
                    {stage.title}
                  </div>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2563eb]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Milestone Deep-Dive Terminal Card */}
          <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] relative overflow-hidden space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/60 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="font-mono-code text-xs text-[#2563eb] font-bold">
                  PHASE_{stages[activeStage].num}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-mono-code text-xs uppercase text-slate-600 font-medium">
                  {stages[activeStage].subtitle}
                </span>
              </div>
              <div className="font-mono-code text-xs text-emerald-700 flex items-center space-x-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>PHASE STATUS: VALIDATED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-display font-black text-3xl sm:text-5xl text-[#09090b] uppercase tracking-tight">
                  {stages[activeStage].title} — {stages[activeStage].subtitle}
                </h3>
                <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                  {stages[activeStage].desc}
                </p>
              </div>

              {/* Console log telemetry box */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-slate-200 font-mono-code text-xs space-y-3 shadow-xs">
                <div className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
                  TELEMETRY LOG STREAM
                </div>
                <div className="text-[#2563eb] font-medium">
                  &gt; {stages[activeStage].log}
                </div>
                <div className="text-slate-400 text-[11px] pt-2 border-t border-slate-100 flex justify-between">
                  <span>FRAME TIME: 16.6MS</span>
                  <span className="text-emerald-700 font-bold">ZERO DROPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
