import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'explore' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, [data-cursor]');
      if (interactive) {
        const customType = interactive.getAttribute('data-cursor');
        if (customType === 'explore') setCursorType('explore');
        else if (customType === 'drag') setCursorType('drag');
        else setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Precision Core Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_8px_#38bdf8]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Trailing Spatial Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out flex items-center justify-center -translate-x-1/2 -translate-y-1/2 ${
          cursorType === 'pointer'
            ? 'w-12 h-12 border-cyan-400/80 bg-cyan-500/10 scale-110'
            : cursorType === 'explore'
            ? 'w-16 h-16 border-amber-400/80 bg-amber-500/10 scale-125'
            : cursorType === 'drag'
            ? 'w-14 h-14 border-indigo-400/80 bg-indigo-500/15'
            : 'w-8 h-8 border-white/20 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {cursorType === 'explore' && (
          <span className="text-[9px] font-mono text-amber-300 font-bold uppercase tracking-widest">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
};
