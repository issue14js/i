import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '../../utils/gsapReveal.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Interactive 2D Elastic String Divider:
 * Bows dynamically with scroll velocity and plucks with damped spring oscillation on hover.
 */
export function ElasticDivider({ dark = false, accent = false }) {
  const wrapperRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const wrap = wrapperRef.current;
    const pathEl = pathRef.current;
    if (!wrap || !pathEl || isReducedMotion()) return;

    const state = { cx: 500, cy: 20 };

    const renderPath = () => {
      pathEl.setAttribute('d', `M 0 20 Q ${state.cx} ${state.cy} 1000 20`);
    };

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-18, 18, self.getVelocity() * 0.012);
        if (Math.abs(v) > 0.6) {
          gsap.to(state, {
            cx: 500,
            cy: 20 + v,
            duration: 0.14,
            ease: 'power2.out',
            onUpdate: renderPath,
            onComplete: () => {
              gsap.to(state, {
                cy: 20,
                duration: 0.9,
                ease: 'elastic.out(1.2, 0.25)',
                onUpdate: renderPath,
              });
            },
          });
        }
      },
    });

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 1000;
      const relY = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 44;
      gsap.to(state, {
        cx: gsap.utils.clamp(120, 880, relX),
        cy: 20 + gsap.utils.clamp(-18, 18, relY),
        duration: 0.16,
        ease: 'power2.out',
        onUpdate: renderPath,
      });
    };

    const onLeave = () => {
      gsap.to(state, {
        cx: 500,
        cy: 20,
        duration: 1.05,
        ease: 'elastic.out(1.25, 0.22)',
        onUpdate: renderPath,
      });
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);

    return () => {
      st.kill();
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const strokeColor = accent
    ? '#d9381e'
    : dark
      ? 'rgba(244, 241, 234, 0.24)'
      : 'rgba(20, 20, 19, 0.22)';

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`w-full select-none py-1 cursor-ns-resize ${
        dark ? 'bg-[#141413]' : 'bg-[#f4f1ea]'
      }`}
    >
      <svg
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
        className="block h-8 w-full overflow-visible"
      >
        <path
          ref={pathRef}
          d="M 0 20 Q 500 20 1000 20"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.25"
        />
      </svg>
    </div>
  );
}
