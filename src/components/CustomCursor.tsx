import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPos({ x: e.clientX, y: e.clientY });

      // Check if target has custom cursor attributes
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor], button, a, [role="button"], input, textarea, select');

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor') || 
                           interactiveEl.getAttribute('data-cursor-text') || 
                           (interactiveEl.tagName === 'A' ? 'OPEN' : 
                            interactiveEl.tagName === 'BUTTON' ? 'EXEC' : '');
        setCursorText(customText);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth trailing ring animation loop
    let animationFrameId: number;
    const animateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(animateTrailing);
    };
    animationFrameId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Subtle ambient light following cursor */}
      <div
        className="fixed pointer-events-none z-40 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full blur-[90px] opacity-15"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.14) 0%, rgba(148, 163, 184, 0.06) 50%, transparent 70%)',
        }}
      />

      {/* Main interactive cursor */}
      <div
        className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
        }}
      >
        {/* Trailing expansion ring */}
        <div
          className={`absolute rounded-full border transition-all duration-200 flex items-center justify-center backdrop-blur-[1px] ${
            isHovered
              ? 'w-16 h-16 border-[#2563eb] bg-[#2563eb]/10 shadow-[0_0_20px_rgba(37,99,235,0.25)]'
              : 'w-8 h-8 border-slate-900/30 bg-transparent'
          }`}
        >
          {cursorText && isHovered && (
            <span className="font-mono-code text-[9px] font-bold tracking-widest text-[#2563eb] uppercase select-none">
              {cursorText}
            </span>
          )}
        </div>

        {/* Central dot */}
        <div
          className={`rounded-full transition-all duration-150 ${
            isHovered ? 'w-1.5 h-1.5 bg-[#2563eb]' : 'w-2 h-2 bg-[#09090b] shadow-sm'
          }`}
        />
      </div>
    </>
  );
};
