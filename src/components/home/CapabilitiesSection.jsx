import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Minus, Plus } from 'lucide-react';
import { CAPABILITIES } from '../../data/ankitData.js';
import { SplitWords } from '../common/KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

export function CapabilitiesSection() {
  const [activeCapId, setActiveCapId] = useState(CAPABILITIES[0].id);
  const sectionRef = useRef(null);
  const capContentRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-cap-word]', {
        yPercent: 115,
        duration: 0.68,
        stagger: 0.035,
        ease: 'power4.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('[data-cap-msg]', {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('[data-cap-row]', {
        x: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '[data-cap-list]',
          start: 'top 82%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!capContentRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      capContentRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity' }
    );
  }, [activeCapId]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1440px] px-[var(--page-padding)] py-20 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-4">
          <p
            data-cap-msg
            className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]"
          >
            02. What I Actually Do
          </p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-balance">
            <SplitWords
              text="Built for messy reality, not just clean slides."
              wordAttr="data-cap-word"
            />
          </h2>
          <p data-cap-msg className="text-sm sm:text-base leading-relaxed text-[#141413]/75">
            Select a capability to see the real work, projects, and operational discipline backing
            it.
          </p>
        </div>

        <div
          data-cap-list
          className="lg:col-span-8 divide-y divide-[#141413]/15 border-t border-b border-[#141413]/15"
        >
          {CAPABILITIES.map((cap) => {
            const isOpen = activeCapId === cap.id;
            return (
              <div key={cap.id} data-cap-row className="py-5">
                <button
                  type="button"
                  onClick={() => setActiveCapId(cap.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-baseline justify-between gap-4 text-left cursor-pointer group"
                >
                  <div className="flex items-baseline gap-5 transition-transform duration-300 group-hover:translate-x-1.5">
                    <span className="font-mono-tabular text-xs text-[#141413]/45">{cap.number}</span>
                    <span
                      className={`font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight transition-colors ${
                        isOpen ? 'text-[#d9381e]' : 'text-[#141413] group-hover:text-[#d9381e]'
                      }`}
                    >
                      {cap.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-[#141413]/60 transition-transform duration-200 group-hover:scale-110">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div ref={capContentRef} className="mt-4 pl-0 sm:pl-9 space-y-3">
                    <p className="text-base font-medium text-[#141413]">{cap.shortHook}</p>
                    <p className="text-sm leading-relaxed text-[#141413]/75">{cap.proof}</p>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1 text-xs font-mono-tabular text-[#141413]/65">
                      {cap.tools.map((tool, i) => (
                        <span key={tool}>
                          {tool}
                          {i < cap.tools.length - 1 && (
                            <span className="ml-2.5 opacity-40" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
