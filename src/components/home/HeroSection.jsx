import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { ANKIT_PROFILE } from '../../data/ankitData.js';
import { isReducedMotion } from '../../utils/gsapReveal.js';
import { SplitWords } from '../common/KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection({ onNavigate }) {
  const [visitorName, setVisitorName] = useState('');
  const heroSectionRef = useRef(null);
  const metricsRef = useRef(null);
  const primaryCtaRef = useRef(null);

  const greetingTarget = visitorName.trim() ? visitorName.trim() : 'stranger';

  useEffect(() => {
    const heroEl = heroSectionRef.current;
    if (isReducedMotion() || !heroEl) return;

    const ctx = gsap.context(() => {
      // Hero ScrollTrigger-backed entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', force3D: true },
        scrollTrigger: {
          trigger: heroEl,
          start: 'top 95%',
          once: true,
        },
      });

      tl.from('[data-hero-msg]', {
        y: 22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        clearProps: 'transform,opacity',
      })
        .from(
          '[data-hero-word]',
          {
            yPercent: 115,
            rotate: 1.5,
            duration: 0.72,
            stagger: 0.045,
            clearProps: 'transform',
          },
          '-=0.45'
        )
        .fromTo(
          '[data-hero-portrait-clip]',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.92,
            ease: 'power3.inOut',
            clearProps: 'clipPath',
          },
          '-=0.65'
        )
        .from(
          '[data-hero-portrait-img]',
          {
            scale: 1.14,
            duration: 1.0,
            ease: 'power3.out',
            clearProps: 'transform',
          },
          '<'
        );

      // Metrics bar ScrollTrigger 2D reveal
      if (metricsRef.current) {
        gsap.from('[data-hero-metric-line]', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 92%',
            once: true,
          },
        });

        gsap.from('[data-hero-metric]', {
          y: 24,
          opacity: 0,
          duration: 0.58,
          stagger: 0.08,
          force3D: true,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 92%',
            once: true,
          },
        });
      }

      gsap.to('[data-hero-orbit-slow]', {
        rotation: 360,
        duration: 38,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });

      gsap.to('[data-hero-float-badge]', {
        y: -8,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scroll-scrubbed 2D parallax on hero portrait
      gsap.to('[data-hero-portrait-img]', {
        yPercent: 8,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroEl);

    const targetLayer = heroEl.querySelector('[data-hero-2d-parallax]');
    let onHeroMove = null;
    if (targetLayer) {
      const moveX = gsap.quickTo(targetLayer, 'x', { duration: 0.7, ease: 'power3.out' });
      const moveY = gsap.quickTo(targetLayer, 'y', { duration: 0.7, ease: 'power3.out' });
      onHeroMove = (e) => {
        const rect = heroEl.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        moveX(nx * 28);
        moveY(ny * 20);
      };
      heroEl.addEventListener('mousemove', onHeroMove);
    }

    const btn = primaryCtaRef.current;
    let onBtnMove = null;
    let onBtnLeave = null;
    if (btn) {
      onBtnMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
        gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' });
      };
      onBtnLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
      };
      btn.addEventListener('mousemove', onBtnMove);
      btn.addEventListener('mouseleave', onBtnLeave);
    }

    return () => {
      if (onHeroMove) heroEl.removeEventListener('mousemove', onHeroMove);
      if (btn && onBtnMove && onBtnLeave) {
        btn.removeEventListener('mousemove', onBtnMove);
        btn.removeEventListener('mouseleave', onBtnLeave);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroSectionRef} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        data-hero-2d-parallax
        className="pointer-events-none absolute -top-12 right-0 h-[560px] w-[560px] opacity-35 lg:opacity-50 will-change-transform"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full text-[#141413]">
          <g data-hero-orbit-slow>
            <circle
              cx="220"
              cy="180"
              r="145"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="6 8"
            />
            <circle
              cx="220"
              cy="180"
              r="98"
              fill="none"
              stroke="#d9381e"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="24 14"
            />
          </g>
          <line x1="220" y1="10" x2="220" y2="350" stroke="currentColor" strokeOpacity="0.08" />
          <line x1="50" y1="180" x2="390" y2="180" stroke="currentColor" strokeOpacity="0.08" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-[var(--page-padding)] pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div
                data-hero-msg
                className="flex flex-wrap items-baseline gap-2 text-sm sm:text-base font-medium tracking-[-0.01em] text-[#141413]/80"
              >
                <span>Hey</span>
                <label className="sr-only" htmlFor="visitor-name-input">
                  Your first name
                </label>
                <input
                  id="visitor-name-input"
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="your name"
                  maxLength={20}
                  className="w-28 sm:w-32 border-b border-[#141413]/40 bg-transparent px-1 py-0.5 font-serif-editorial text-lg italic text-[#d9381e] placeholder:text-[#d9381e]/60 focus:border-[#d9381e] focus:outline-none"
                />
                <span>
                  — meet <strong className="font-semibold text-[#141413]">Ankit Kumar</strong>.
                </span>
              </div>

              <h1 className="mt-6 font-display text-[clamp(3rem,6.6vw,5.75rem)] font-bold uppercase leading-[0.9] tracking-tight text-balance">
                <SplitWords
                  text={ANKIT_PROFILE.heroCopy.headline}
                  wordAttr="data-hero-word"
                  accentLastWord
                />
              </h1>

              <p
                data-hero-msg
                className="mt-6 max-w-2xl text-base sm:text-lg leading-[1.6] text-[#141413]/85"
              >
                {ANKIT_PROFILE.heroCopy.subhead}
              </p>

              <p
                data-hero-msg
                className="mt-4 font-serif-editorial text-xl italic text-[#141413]/80"
              >
                Glad you stopped by, {greetingTarget}. Here is the work behind the résumé.
              </p>
            </div>

            <div data-hero-msg className="mt-8 flex flex-wrap items-center gap-6 pt-4">
              <button
                ref={primaryCtaRef}
                type="button"
                onClick={() => onNavigate('work')}
                className="inline-flex items-center gap-2.5 bg-[#d9381e] px-6 py-3.5 text-sm font-semibold text-[#f4f1ea] transition-colors hover:bg-[#141413] cursor-pointer"
              >
                <span>Explore Selected Works</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <a
                href="#chapter-turning-point"
                className="editorial-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[#141413]"
              >
                <span>Read the Story</span>
                <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              data-hero-portrait-clip
              className="relative h-[420px] sm:h-[520px] lg:h-full lg:min-h-[540px] w-full overflow-hidden border border-[#141413]/15 bg-[#e8e3d8]"
            >
              <img
                data-hero-portrait-img
                src={ANKIT_PROFILE.photos.hero}
                alt="Ankit Kumar studio portrait"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top will-change-transform"
              />
              <div
                data-hero-float-badge
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#141413]/88 via-[#141413]/40 to-transparent p-5 text-[#f4f1ea]"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Ankit Kumar · MERN &amp; Operations</span>
                  <span className="font-mono-tabular opacity-85">Darbhanga, IN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={metricsRef}
          className="relative mt-10 grid grid-cols-2 gap-6 border-b border-[#141413]/15 bg-[#f4f1ea]/85 py-6 sm:grid-cols-4"
        >
          <div
            data-hero-metric-line
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px bg-[#141413]/20"
          />
          {ANKIT_PROFILE.heroCopy.metrics.map((metric) => (
            <div key={metric.label} data-hero-metric>
              <p className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#141413]/65">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
