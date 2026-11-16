import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '../../data/ankitData.js';
import { SplitWords } from '../common/KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceTimeline() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-exp-word]', {
        yPercent: 115,
        duration: 0.68,
        stagger: 0.04,
        ease: 'power4.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('[data-exp-card]', {
        y: 36,
        opacity: 0,
        duration: 0.68,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '[data-exp-grid]',
          start: 'top 82%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1440px] px-[var(--page-padding)] py-20 border-b border-[#141413]/15"
    >
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]">
            Experience Ledger
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            <SplitWords text="Where I've Delivered" wordAttr="data-exp-word" />
          </h2>
        </div>
        <span className="font-mono-tabular text-xs text-[#141413]/55">
          2023 — Present · 3 Roles
        </span>
      </div>

      <div data-exp-grid className="grid gap-8 lg:grid-cols-3">
        {EXPERIENCES.map((exp) => (
          <article
            key={exp.id}
            data-exp-card
            className="flex flex-col justify-between border border-[#141413]/15 bg-[#e8e3d8]/45 p-7 transition-transform duration-300 hover:-translate-y-1 hover:border-[#d9381e]/60"
          >
            <div>
              <div className="flex items-center justify-between font-mono-tabular text-xs text-[#141413]/55">
                <span>{exp.index}</span>
                <span>{exp.period}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight">
                {exp.title}
              </h3>
              <p className="mt-1 font-serif-editorial text-lg italic text-[#141413]/80">
                {exp.organization}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#141413]/80">{exp.storyLead}</p>

              <ul className="mt-5 space-y-2 border-t border-[#141413]/12 pt-4 text-xs sm:text-sm text-[#141413]/75">
                {exp.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-[#d9381e]">—</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-[#141413]/12 pt-4 text-xs font-mono-tabular text-[#141413]/60">
              {exp.tags.join(' · ')}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
