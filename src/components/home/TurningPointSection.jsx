import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { ANKIT_PROFILE } from '../../data/ankitData.js';
import { MaskedLine, SplitWords } from '../common/KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

export function TurningPointSection({ onNavigate }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-story-clip]',
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.95,
          ease: 'power3.inOut',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            once: true,
          },
        }
      );

      gsap.from('[data-story-img]', {
        scale: 1.14,
        duration: 1.05,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.to('[data-story-img]', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.from('[data-story-word]', {
        yPercent: 115,
        duration: 0.7,
        stagger: 0.035,
        ease: 'power4.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from('[data-story-msg]', {
        y: 26,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '[data-story-copy]',
          start: 'top 80%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chapter-turning-point"
      className="border-b border-[#141413]/12 bg-[#e8e3d8]/55 py-20 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-[var(--page-padding)] lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <div
            data-story-clip
            className="aspect-[4/3] w-full overflow-hidden border border-[#141413]/15 bg-[#141413]"
          >
            <img
              data-story-img
              src={ANKIT_PROFILE.photos.desk}
              alt="Ankit Kumar coding late at night with masala chai"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
          <div
            data-story-msg
            className="mt-3 flex items-center justify-between text-xs text-[#141413]/60"
          >
            <span>Late-night MERN &amp; DSA builds in Darbhanga</span>
            <span className="font-mono-tabular">Chai + Terminal</span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6" data-story-copy>
          <MaskedLine attr="data-story-msg">
            <p className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]">
              01. The Turning Point
            </p>
          </MaskedLine>

          <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-balance">
            <SplitWords text={ANKIT_PROFILE.turningPoint.title} wordAttr="data-story-word" />
          </h2>

          <blockquote
            data-story-msg
            className="border-l-2 border-[#d9381e] pl-5 font-serif-editorial text-2xl sm:text-[1.7rem] italic leading-[1.35] text-[#141413]"
          >
            {ANKIT_PROFILE.turningPoint.quote}
          </blockquote>

          <div className="space-y-4 text-sm sm:text-base leading-[1.7] text-[#141413]/80">
            <p data-story-msg>{ANKIT_PROFILE.turningPoint.body1}</p>
            <p data-story-msg>{ANKIT_PROFILE.turningPoint.body2}</p>
          </div>

          <div data-story-msg className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="editorial-underline inline-flex items-center gap-2 text-sm font-semibold text-[#141413] cursor-pointer"
            >
              <span>Read full timeline &amp; credentials</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
