import React, { useState } from 'react';
import { services } from '../data/services';
import { ArrowUpRight, CheckCircle2, Box, ShoppingBag, Globe, Cpu, Wrench, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  // Dynamic preview visual HUD based on hovered service
  const renderInteractiveHUD = (index: number) => {
    switch (index) {
      case 0: // HIGH-END WEBSITES
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-mono-code text-[#2563eb] border-b border-slate-200 pb-2">
              <span className="flex items-center space-x-1.5 font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>UI ARCHITECTURE: 60FPS</span>
              </span>
              <span className="font-bold">LIGHTHOUSE: 100/100</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-3 w-1/3 bg-[#2563eb]/30 rounded" />
              <div className="h-2 w-full bg-slate-200 rounded" />
              <div className="h-2 w-4/5 bg-slate-200 rounded" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-12 rounded bg-white border border-slate-200 shadow-xs" />
                <div className="h-12 rounded bg-white border border-slate-200 shadow-xs" />
                <div className="h-12 rounded bg-[#2563eb]/10 border border-[#2563eb]/30" />
              </div>
            </div>
          </div>
        );
      case 1: // SHOPIFY STORES
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-mono-code text-emerald-700 border-b border-slate-200 pb-2 font-medium">
              <span className="flex items-center space-x-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>SHOPIFY COMMERCE ENGINE</span>
              </span>
              <span className="font-bold">LATENCY: 42MS</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-900 font-mono-code text-xs font-bold">BESPOKE MERCHANDISE</span>
                <span className="text-emerald-700 font-mono-code text-xs font-bold">₹4,999</span>
              </div>
              <div className="flex space-x-2">
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono-code text-slate-600">SIZE: S</span>
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-mono-code font-bold">SIZE: M</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono-code text-slate-600">SIZE: L</span>
              </div>
              <div className="w-full py-2 text-center rounded bg-[#09090b] text-white font-mono-code text-xs font-bold shadow-xs">
                1-CLICK CHECKOUT READY
              </div>
            </div>
          </div>
        );
      case 2: // CUSTOM WEB EXPERIENCES
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-mono-code text-violet-700 border-b border-slate-200 pb-2 font-medium">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPERIENTIAL ACTIVATION</span>
              </span>
              <span className="font-bold">PARALLAX: ACTIVE</span>
            </div>
            <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-200 space-y-2 text-center">
              <div className="font-display font-black text-2xl text-violet-950 tracking-wider">
                KINETIC CANVAS
              </div>
              <p className="font-mono-code text-xs text-slate-600">
                SCROLL VELOCITY SYNCHRONIZATION // SOUND REACTIVE
              </p>
            </div>
          </div>
        );
      case 3: // E-COMMERCE SYSTEMS
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-mono-code text-[#2563eb] border-b border-slate-200 pb-2 font-medium">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>INVENTORY TELEMETRY</span>
              </span>
              <span className="font-bold">SYNC: REAL-TIME</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center font-mono-code text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px]">ERP HOOKS</div>
                <div className="text-slate-900 font-bold mt-1">CONNECTED</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px]">DROP QUEUE</div>
                <div className="text-[#2563eb] font-bold mt-1">10K REQ/SEC</div>
              </div>
            </div>
          </div>
        );
      case 4: // WEBSITE MANAGEMENT
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-mono-code text-slate-600 border-b border-slate-200 pb-2 font-medium">
              <span className="flex items-center space-x-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>MAINTENANCE TELEMETRY</span>
              </span>
              <span className="text-emerald-700 font-bold">UPTIME: 99.99%</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between font-mono-code text-xs">
                <span className="text-slate-500">SECURITY PATCHES:</span>
                <span className="text-emerald-700 font-bold">UP TO DATE</span>
              </div>
              <div className="flex justify-between font-mono-code text-xs">
                <span className="text-slate-500">CORE WEB VITALS:</span>
                <span className="text-emerald-700 font-bold">ALL GREEN</span>
              </div>
            </div>
          </div>
        );
      case 5: // INTERACTIVE / 3D WEBSITES
      default:
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-mono-code text-[#2563eb] border-b border-slate-200 pb-2 font-medium">
              <span className="flex items-center space-x-1.5">
                <Box className="w-3.5 h-3.5" />
                <span>SPATIAL WEBGL PIPELINE</span>
              </span>
              <span className="font-bold">SHADERS: GLSL</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#2563eb] animate-spin border-t-transparent" />
              <div className="font-mono-code text-xs text-[#2563eb] font-bold">
                COMPUTE BUFFERS ALLOCATED
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="services" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 font-mono-code text-xs text-slate-500 tracking-widest uppercase">
              <span className="text-[#2563eb] font-semibold">05</span>
              <span>// SERVICES & SCOPE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#09090b] uppercase tracking-tight">
              WHAT I <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09090b] via-[#1e293b] to-[#2563eb]">
                BUILD.
              </span>
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            Tailored digital platforms for ambitious founders and global brands. Hover each service to preview architecture and deliverables.
          </p>
        </div>

        {/* Services Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Giant Typography List */}
          <div className="lg:col-span-8 divide-y divide-slate-200">
            {services.map((service, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={service.number}
                  onMouseEnter={() => {
                    sound.playHover();
                    setHoveredIndex(index);
                  }}
                  data-cursor="INSPECT"
                  className={`group py-6 sm:py-8 cursor-pointer transition-all ${
                    isHovered ? 'pl-4 sm:pl-6 bg-[#f8fafc] shadow-[0_2px_15px_rgba(0,0,0,0.03)] rounded-2xl border border-slate-200/80' : 'hover:pl-2'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline space-x-4 sm:space-x-8">
                      <span className={`font-mono-code text-sm sm:text-base font-bold transition-colors ${
                        isHovered ? 'text-[#2563eb]' : 'text-slate-400'
                      }`}>
                        {service.number}
                      </span>
                      <div>
                        <h3 className={`font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight transition-all duration-300 ${
                          isHovered
                            ? 'text-[#09090b] translate-x-1'
                            : 'text-slate-700 group-hover:text-[#09090b]'
                        }`}>
                          {service.title}
                        </h3>
                        <p className="font-mono-code text-xs text-slate-500 uppercase mt-1">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className={`p-2 rounded-full border transition-all ${
                      isHovered
                        ? 'border-[#09090b] bg-[#09090b] text-white rotate-45 shadow-xs'
                        : 'border-slate-200 text-slate-400'
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Expanded description on mobile or when active */}
                  {isHovered && (
                    <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-3">
                      <p className="font-body text-sm text-slate-700 max-w-2xl leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {service.deliverables.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 font-mono-code text-[11px] text-slate-700 font-medium shadow-xs"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#2563eb]" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sticky Dynamic HUD Preview Box (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] relative overflow-hidden">
              <div className="font-mono-code text-xs text-slate-400 uppercase mb-4 flex items-center justify-between">
                <span>ACTIVE CAPABILITY</span>
                <span className="text-[#2563eb] font-semibold">{services[hoveredIndex].badge}</span>
              </div>

              <h4 className="font-display font-black text-2xl text-[#09090b] uppercase mb-2">
                {services[hoveredIndex].title}
              </h4>
              <p className="font-body text-xs text-slate-600 leading-relaxed mb-6">
                {services[hoveredIndex].description}
              </p>

              {/* Dynamic Reactive Visual HUD */}
              <div className="pt-4 border-t border-slate-100">
                {renderInteractiveHUD(hoveredIndex)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
