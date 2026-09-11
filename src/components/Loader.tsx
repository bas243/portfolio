import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

const STEPS = [
  'PREPARING WORKSPACE...',
  'LOADING SELECTED PROJECTS...',
  'INITIALIZING 3D ENVIRONMENT...',
  'SETTING UP INTERACTIVE STAGES...',
  'READY. WELCOME.',
];

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Escape key listener to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFinished(true);
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Hard fallback timer (max 2.2 seconds) to ensure loader never hangs
    const safetyTimeout = setTimeout(() => {
      setIsFinished(true);
      onComplete();
    }, 2200);

    // Smooth progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearTimeout(safetyTimeout);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 300);
          }, 200);
          return 100;
        }
        const jump = Math.floor(Math.random() * 16) + 10;
        const next = Math.min(prev + jump, 100);
        const stepIdx = Math.min(Math.floor((next / 100) * STEPS.length), STEPS.length - 1);
        setCurrentStepIndex(stepIdx);
        return next;
      });
    }, 80);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-12 bg-[#f8fafc] text-[#09090b] select-none"
        >
          {/* Top Header telemetry */}
          <div className="flex items-center justify-between font-mono-code text-xs text-slate-500 border-b border-slate-200/80 pb-4">
            <div className="flex items-center space-x-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2563eb]" />
              <span>PORTFOLIO // 2026</span>
            </div>
            <div className="hidden sm:flex items-center space-x-6">
              <span>KASHMIR / REMOTE</span>
              <span>CREATIVE DEVELOPER</span>
            </div>
            <button
              onClick={() => {
                setIsFinished(true);
                onComplete();
              }}
              className="text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              [ SKIP ESC ]
            </button>
          </div>

          {/* Center Title & Distortion */}
          <div className="my-auto text-center space-y-6">
            <div className="relative inline-block">
              <motion.h1
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-[#09090b]"
              >
                BASIT NABI
              </motion.h1>
              <div className="font-mono-code text-xs sm:text-sm tracking-[0.25em] text-[#2563eb] uppercase mt-2 font-semibold">
                CREATIVE DEVELOPER & ARCHITECT
              </div>
            </div>

            {/* Current Terminal Status Line */}
            <div className="h-6 flex items-center justify-center font-mono-code text-xs tracking-wider text-slate-600 font-medium">
              <span className="text-[#2563eb] mr-2">—</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStepIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {STEPS[currentStepIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Progress Percentage & Bar */}
            <div className="max-w-md mx-auto space-y-2 pt-4">
              <div className="flex justify-between font-mono-code text-xs text-slate-500">
                <span>LOADING ASSETS</span>
                <span className="text-slate-900 font-semibold">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2563eb] via-slate-900 to-[#2563eb]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="flex items-center justify-between font-mono-code text-[11px] text-slate-400 border-t border-slate-200/80 pt-4">
            <span>WEBGL & THREE.JS CRAFT</span>
            <span className="tracking-widest font-medium">SMOOTH 60 FPS</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
