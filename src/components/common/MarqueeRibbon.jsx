import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MarqueeRibbon({ items, speed = 24, reverse = false, dark = false }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    const wrap = wrapperRef.current;
    if (!el || !wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        el,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration: speed,
          ease: 'none',
          repeat: -1,
        }
      );

      // Scroll-velocity physics: tilt/skew & speed momentum proportional to scroll speed
      const skewTo = gsap.quickTo(el, 'skewX', { duration: 0.45, ease: 'elastic.out(1, 0.4)' });

      ScrollTrigger.create({
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const vel = self.getVelocity();
          const skew = gsap.utils.clamp(-7, 7, vel * 0.004);
          const boost = 1 + Math.min(Math.abs(vel) / 900, 2.2);
          tween.timeScale(boost);
          skewTo(skew);
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [speed, reverse]);

  const rowContent = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {items.map((item, idx) => (
        <span key={`${item}-${idx}`} className="inline-flex items-center gap-6 whitespace-nowrap">
          <span className="font-mono-tabular text-xs font-medium uppercase tracking-[0.18em]">
            {item}
          </span>
          <span className="text-[#d9381e]" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={`w-full overflow-hidden border-t border-b py-3.5 select-none ${
        dark
          ? 'border-[#f4f1ea]/15 bg-[#141413] text-[#f4f1ea]/80'
          : 'border-[#141413]/15 bg-[#e8e3d8]/75 text-[#141413]/80'
      }`}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {rowContent}
        {rowContent}
      </div>
    </div>
  );
}
