import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '../../utils/gsapReveal.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * 2D Scroll-Driven Mechanical Physics Band:
 * Scroll progress scrubs counterweights & cogs; scroll velocity swings the 2D pendulum with inertia.
 */
export function ScrollPendulumDial() {
  const bandRef = useRef(null);

  useEffect(() => {
    const el = bandRef.current;
    if (!el || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const pendulumEl = el.querySelector('[data-physics-pendulum]');
      const swingTo = pendulumEl
        ? gsap.quickTo(pendulumEl, 'rotation', { duration: 0.55, ease: 'elastic.out(1, 0.32)' })
        : null;

      // Scrub-driven gear rotation & counterweights on scroll
      gsap.to('[data-physics-gear]', {
        rotation: 270,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4,
        },
      });

      gsap.fromTo(
        '[data-physics-weight-a]',
        { xPercent: -20 },
        {
          xPercent: 25,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '[data-physics-weight-b]',
        { xPercent: 25 },
        {
          xPercent: -20,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (!swingTo) return;
          const angle = gsap.utils.clamp(-24, 24, self.getVelocity() * 0.015);
          swingTo(angle);
        },
        onScrubComplete: () => {
          if (swingTo) swingTo(0);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bandRef}
      aria-hidden="true"
      className="w-full overflow-hidden border-t border-b border-[#141413]/15 bg-[#e8e3d8]/45 py-4"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-[var(--page-padding)]">
        {/* Left Counterweight */}
        <div className="hidden sm:flex items-center gap-3 overflow-hidden">
          <div
            data-physics-weight-a
            className="h-3 w-16 border border-[#141413]/35 bg-[#141413] will-change-transform"
          />
          <span className="font-mono-tabular text-[11px] uppercase tracking-widest text-[#141413]/55">
            Scroll Inertia
          </span>
        </div>

        {/* Center 2D Pendulum + Gear */}
        <div className="mx-auto flex items-center gap-6 sm:mx-0">
          <svg viewBox="0 0 64 64" className="h-10 w-10 text-[#141413]">
            <g data-physics-gear style={{ transformOrigin: '32px 32px' }}>
              <circle
                cx="32"
                cy="32"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <circle cx="32" cy="32" r="8" fill="none" stroke="#d9381e" strokeWidth="1.5" />
              <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeOpacity="0.35" />
              <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeOpacity="0.35" />
            </g>
          </svg>

          <svg viewBox="0 0 80 56" className="h-10 w-16 overflow-visible text-[#141413]">
            <line x1="10" y1="6" x2="70" y2="6" stroke="currentColor" strokeOpacity="0.35" />
            <g data-physics-pendulum style={{ transformOrigin: '40px 6px' }}>
              <line x1="40" y1="6" x2="40" y2="42" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="40" cy="44" r="7" fill="#d9381e" />
            </g>
          </svg>
        </div>

        {/* Right Counterweight */}
        <div className="hidden sm:flex items-center gap-3 overflow-hidden">
          <span className="font-mono-tabular text-[11px] uppercase tracking-widest text-[#141413]/55">
            2D Kinematics
          </span>
          <div
            data-physics-weight-b
            className="h-3 w-16 border border-[#d9381e] bg-[#d9381e] will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}
