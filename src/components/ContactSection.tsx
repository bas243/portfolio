import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Terminal, Send, CheckCircle2, RotateCcw, Mail, ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { sound } from '../utils/audio';
import { siteConfig } from '../data/siteConfig';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'E-COMMERCE / SHOPIFY',
    budget: '₹50,000 - ₹1,00,000',
    message: '',
  });

  const [transmissionStatus, setTransmissionStatus] = useState<'idle' | 'initializing' | 'packet_created' | 'sent' | 'complete'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    sound.playConfirm();
    setTransmissionStatus('initializing');

    setTimeout(() => {
      sound.playGlitch();
      setTransmissionStatus('packet_created');
    }, 700);

    setTimeout(() => {
      sound.playClick();
      setTransmissionStatus('sent');
    }, 1500);

    setTimeout(() => {
      sound.playConfirm();
      setTransmissionStatus('complete');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#09090b', '#3b82f6', '#cbd5e1'],
      });
    }, 2200);
  };

  const handleReset = () => {
    sound.playClick();
    setTransmissionStatus('idle');
    setFormData({
      name: '',
      email: '',
      projectType: 'E-COMMERCE / SHOPIFY',
      budget: '₹50,000 - ₹1,00,000',
      message: '',
    });
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 bg-[#f8fafc] border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 font-mono-code text-xs text-slate-500 tracking-widest uppercase">
              <span className="text-[#2563eb] font-semibold">08</span>
              <span>// INITIATE PROJECT</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-[#09090b] uppercase tracking-tight">
              LET'S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09090b] via-[#1e293b] to-[#2563eb]">
                TOGETHER.
              </span>
            </h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-mono-code text-xs text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CURRENTLY ACCEPTING Q3/Q4 COMMISSIONS</span>
            </div>
            <p className="font-mono-code text-xs text-slate-500">
              Response window: typically within 12 business hours.
            </p>
          </div>
        </div>

        {/* Two-Column Grid: Direct Contact & Command Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct channels */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-6">
              <div className="font-mono-code text-xs text-slate-400 uppercase font-semibold">
                DIRECT CHANNELS
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  data-cursor="EMAIL"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#2563eb]" />
                    <span className="font-mono-code text-xs text-[#09090b] font-medium">{siteConfig.email}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#09090b] transition-colors" />
                </a>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono-code text-xs">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>TIMEZONE: IST (UTC+5:30)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>LOCATION: {siteConfig.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="font-mono-code text-[11px] text-slate-400 uppercase font-semibold">
                  FIND ME ON
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono-code text-xs">
                  {siteConfig.socials.slice(0, 4).map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 transition-colors uppercase flex items-center justify-between text-[11px] font-medium"
                    >
                      <span>{social.name}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Command Terminal Interface Frame */}
          <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-[0_2px_15px_rgba(0,0,0,0.03)] relative overflow-hidden">
            {/* Terminal Titlebar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-8 font-mono-code text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-[#2563eb]" />
                <span className="font-semibold text-slate-700">PROJECT INQUIRY FORM</span>
              </div>
              <span className="text-emerald-700 font-semibold">READY FOR SUBMISSION</span>
            </div>

            <AnimatePresence mode="wait">
              {transmissionStatus === 'idle' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block font-mono-code text-xs text-slate-700 uppercase font-semibold">
                        YOUR NAME / COMPANY *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#09090b] font-mono-code text-sm focus:border-[#2563eb] focus:outline-none focus:bg-white transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block font-mono-code text-xs text-slate-700 uppercase font-semibold">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#09090b] font-mono-code text-sm focus:border-[#2563eb] focus:outline-none focus:bg-white transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label className="block font-mono-code text-xs text-slate-700 uppercase font-semibold">
                        SERVICE REQUIRED
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#09090b] font-mono-code text-sm focus:border-[#2563eb] focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="E-COMMERCE / SHOPIFY">01 // E-COMMERCE / SHOPIFY</option>
                        <option value="INTERACTIVE 3D WEBSITE">02 // INTERACTIVE 3D WEBSITE</option>
                        <option value="HIGH-END BESPOKE BRAND SITE">03 // HIGH-END BESPOKE BRAND SITE</option>
                        <option value="CUSTOM WEB APPLICATION">04 // CUSTOM WEB APPLICATION</option>
                        <option value="WEBSITE MANAGEMENT & OPTIMIZATION">05 // MANAGEMENT & OPTIMIZATION</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <label className="block font-mono-code text-xs text-slate-700 uppercase font-semibold">
                        ESTIMATED BUDGET
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#09090b] font-mono-code text-sm focus:border-[#2563eb] focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (INR)</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 (INR / Recommended)</option>
                        <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000 (INR)</option>
                        <option value="₹2,50,000+">₹2,50,000+ (INR / Enterprise Custom System)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block font-mono-code text-xs text-slate-700 uppercase font-semibold">
                      PROJECT OVERVIEW / GOALS
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about what you want to create, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#09090b] font-mono-code text-sm focus:border-[#2563eb] focus:outline-none focus:bg-white transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  {/* Submit Execute Button */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-mono-code text-[11px] text-slate-500 hidden sm:inline">
                      * Strictly confidential client inquiry
                    </span>

                    <button
                      type="submit"
                      onMouseEnter={() => sound.playHover()}
                      data-cursor="EXECUTE"
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-[#09090b] text-white font-mono-code text-xs font-bold uppercase tracking-wider hover:bg-[#2563eb] transition-all shadow-md"
                    >
                      <span>SEND INQUIRY &rarr;</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Animated Transmission Status Screen */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center space-y-6 font-mono-code"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#2563eb]">
                    {transmissionStatus === 'complete' ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                      SUBMISSION STATUS:
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-[#09090b] uppercase">
                      {transmissionStatus === 'initializing' && 'PROCESSING INQUIRY...'}
                      {transmissionStatus === 'packet_created' && 'PREPARING BRIEF...'}
                      {transmissionStatus === 'sent' && 'TRANSMITTING DIRECTLY...'}
                      {transmissionStatus === 'complete' && 'INQUIRY RECEIVED.'}
                    </h3>
                  </div>

                  {transmissionStatus === 'complete' && (
                    <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                      <p className="text-emerald-700 font-bold">
                        MESSAGE VERIFIED // DISPATCHED
                      </p>
                      <p className="text-slate-600 leading-relaxed">
                        Thank you, <span className="text-[#09090b] font-bold">{formData.name}</span>. I have received your project notes regarding <span className="text-[#09090b] font-bold">{formData.projectType}</span> and will reach back out promptly.
                      </p>
                    </div>
                  )}

                  {transmissionStatus === 'complete' && (
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        onMouseEnter={() => sound.playHover()}
                        data-cursor="RESET"
                        className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-slate-300 hover:border-[#09090b] text-slate-800 text-xs uppercase tracking-wider transition-colors bg-white font-semibold shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>SEND ANOTHER MESSAGE</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
