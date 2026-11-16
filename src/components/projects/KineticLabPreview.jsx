import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BAR_HEIGHTS = [0.5, 0.85, 0.4, 0.95, 0.65, 0.8, 0.45, 0.9, 0.6, 0.75];

export function KineticLabPreview() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-kbar]', {
        scaleY: () => gsap.utils.random(0.28, 1),
        duration: 0.55,
        stagger: { each: 0.08, repeat: -1, yoyo: true },
        ease: 'sine.inOut',
        transformOrigin: 'bottom center',
      });
      gsap.to('[data-kplayhead]', {
        xPercent: 100,
        duration: 3.2,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('[data-korbit]', {
        rotation: 360,
        duration: 14,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#1b1a18] p-6 sm:p-8 text-[#f4f1ea]"
    >
      <div className="flex items-center justify-between border-b border-[#f4f1ea]/15 pb-3 text-[11px] font-mono-tabular text-[#f4f1ea]/70">
        <span>2D GSAP TIMELINE LAB</span>
        <span className="text-[#d9381e]">60 FPS · COMPOSITOR</span>
      </div>

      <div className="my-auto grid grid-cols-12 items-center gap-4 py-3">
        <div className="col-span-5 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="h-28 w-28 text-[#f4f1ea]">
            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            <g data-korbit>
              <circle
                cx="60"
                cy="60"
                r="36"
                fill="none"
                stroke="#d9381e"
                strokeWidth="1.5"
                strokeDasharray="10 8"
              />
              <circle cx="60" cy="24" r="3.5" fill="#d9381e" />
            </g>
            <line x1="12" y1="60" x2="108" y2="60" stroke="currentColor" strokeOpacity="0.25" />
            <line x1="60" y1="12" x2="60" y2="108" stroke="currentColor" strokeOpacity="0.25" />
            <text
              x="60"
              y="64"
              textAnchor="middle"
              className="fill-current font-mono-tabular text-[10px]"
            >
              2D
            </text>
          </svg>
        </div>

        <div className="col-span-7 space-y-3">
          <div className="flex h-16 items-end gap-1.5 border-b border-[#f4f1ea]/20 pb-2">
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                data-kbar
                style={{ height: `${h * 100}%` }}
                className={`flex-1 ${i % 3 === 0 ? 'bg-[#d9381e]' : 'bg-[#f4f1ea]/80'}`}
              />
            ))}
          </div>
          <div className="relative h-2 w-full overflow-hidden bg-[#f4f1ea]/10">
            <div data-kplayhead className="h-full w-1/3 bg-[#d9381e] will-change-transform" />
          </div>
          <div className="flex justify-between font-mono-tabular text-[10px] text-[#f4f1ea]/55">
            <span>ease: power4.out</span>
            <span>stagger: 0.04s</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#f4f1ea]/75">
        <span className="font-serif-editorial text-lg italic text-[#f4f1ea]">Kinetic 2D</span>
        <span>MERN · JavaScript · GSAP</span>
      </div>
    </div>
  );
}
