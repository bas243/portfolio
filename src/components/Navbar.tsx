import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isAudioActive, setIsAudioActive] = useState(sound.enabled);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const nextState = sound.toggle();
    setIsAudioActive(nextState);
  };

  const navLinks = [
    { id: 'hero', label: 'OVERVIEW', num: '01' },
    { id: 'identity', label: 'CRAFT & ETHOS', num: '02' },
    { id: 'projects', label: 'SELECTED WORK', num: '03' },
    { id: 'skills', label: 'EXPERTISE', num: '04' },
    { id: 'services', label: 'SERVICES', num: '05' },
    { id: 'process', label: 'METHODOLOGY', num: '06' },
    { id: 'about', label: 'ABOUT', num: '07' },
    { id: 'contact', label: 'GET IN TOUCH', num: '08' },
  ];

  const handleLinkClick = (id: string) => {
    sound.playClick();
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between pointer-events-none">
        {/* Left Branding */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => handleLinkClick('hero')}
            onMouseEnter={() => sound.playHover()}
            data-cursor="HOME"
            className="flex items-center space-x-2 text-left group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#09090b] group-hover:text-[#2563eb] transition-colors">
              BASIT NABI
            </span>
          </button>
          <span className="text-slate-300 hidden md:inline">/</span>
          <span className="font-mono-code text-[11px] text-slate-500 tracking-wider hidden md:inline font-medium">
            CREATIVE DEV
          </span>
        </div>

        {/* Center Clock / Jammu & Kashmir Telemetry (Desktop) */}
        <div className="hidden lg:flex items-center space-x-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 font-mono-code text-[11px] text-slate-600 shadow-[0_2px_15px_rgba(0,0,0,0.04)]">
          <span className="text-[#2563eb] font-semibold whitespace-nowrap">JAMMU & KASHMIR:</span>
          <span className="text-slate-900 font-medium whitespace-nowrap">{time} IST</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            OPEN FOR COMMISSIONS
          </span>
        </div>

        {/* Right Action Controls */}
        <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            onMouseEnter={() => sound.playHover()}
            data-cursor="AUDIO"
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-full border transition-all text-xs font-mono-code shadow-xs ${
              isAudioActive
                ? 'border-blue-200 bg-blue-50 text-[#2563eb] font-semibold'
                : 'border-slate-200/90 bg-white/95 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
            title="Toggle procedural UI audio feedback"
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAudioActive ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Minimal Menu Button */}
          <button
            onClick={() => {
              sound.playClick();
              setIsMenuOpen(true);
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="MENU"
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-200/90 bg-white/95 backdrop-blur-md text-[#09090b] hover:border-[#2563eb] hover:text-[#2563eb] transition-all text-xs sm:text-sm font-mono-code tracking-wider shadow-[0_2px_15px_rgba(0,0,0,0.05)] group font-medium"
          >
            <Menu className="w-4 h-4 text-[#09090b] group-hover:text-[#2563eb] transition-colors" />
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Animated Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#f8fafc]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 text-[#09090b] select-none overflow-y-auto"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-6">
              <div className="font-mono-code text-xs sm:text-sm text-slate-500 tracking-widest font-medium">
                [ INDEX // BASIT NABI PORTFOLIO ]
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsMenuOpen(false);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="CLOSE"
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-300 hover:border-slate-900 text-slate-700 hover:text-slate-900 transition-all font-mono-code text-xs uppercase font-medium bg-white shadow-xs"
              >
                <X className="w-4 h-4" />
                <span>CLOSE [ESC]</span>
              </button>
            </div>

            {/* Main Menu Links */}
            <div className="my-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  whileHover={{ x: 8 }}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="JUMP"
                  className="flex items-baseline justify-between p-4 border-b border-slate-200/80 hover:border-[#2563eb] text-left group transition-all"
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="font-mono-code text-xs text-slate-400 group-hover:text-[#2563eb] transition-colors font-medium">
                      {link.num}
                    </span>
                    <span className={`font-display text-2xl sm:text-4xl font-bold tracking-tight transition-colors ${
                      activeSection === link.id ? 'text-[#2563eb]' : 'text-slate-800 group-hover:text-[#09090b]'
                    }`}>
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#2563eb] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </motion.button>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/80 pt-6 font-mono-code text-xs text-slate-500 gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-slate-700 font-medium">BASIT NABI // CREATIVE DEVELOPER & ARCHITECT</span>
                <span>•</span>
                <span>JAMMU & KASHMIR / WORKING GLOBALLY</span>
              </div>
              <div className="flex items-center space-x-5 text-[#2563eb] font-semibold flex-wrap justify-center gap-y-2">
                <a href="https://github.com/bas243" target="_blank" rel="noreferrer" className="hover:underline">GITHUB</a>
                <a href="https://instagram.com/basit284_" target="_blank" rel="noreferrer" className="hover:underline">INSTAGRAM</a>
                <a href="https://x.com/skieee284" target="_blank" rel="noreferrer" className="hover:underline">X</a>
                <a href="https://www.linkedin.com/in/basit-nabi-885759430/" target="_blank" rel="noreferrer" className="hover:underline">LINKEDIN</a>
                <a href="mailto:baasitnaabi@gmail.com" className="hover:underline">EMAIL</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
