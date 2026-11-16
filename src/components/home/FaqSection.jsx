import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Minus, Plus } from 'lucide-react';
import { FAQS } from '../../data/ankitData.js';
import { SplitWords } from '../common/KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState(FAQS[0].id);
  const sectionRef = useRef(null);
  const faqAnswerRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-faq-word]', {
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

      gsap.from('[data-faq-row]', {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '[data-faq-list]',
          start: 'top 84%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!faqAnswerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      faqAnswerRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.32, ease: 'power2.out', clearProps: 'transform,opacity' }
    );
  }, [openFaqId]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1440px] px-[var(--page-padding)] py-20 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-4">
          <p className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]">
            04. Before You Ask
          </p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-balance">
            <SplitWords text="Honest answers for hiring teams." wordAttr="data-faq-word" />
          </h2>
        </div>

        <div
          data-faq-list
          className="lg:col-span-8 divide-y divide-[#141413]/15 border-t border-b border-[#141413]/15"
        >
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} data-faq-row className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 text-left cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-semibold leading-snug text-[#141413] transition-transform duration-200 group-hover:translate-x-1">
                    {faq.question}
                  </span>
                  <span className="mt-1 shrink-0 text-[#d9381e]">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p
                    ref={faqAnswerRef}
                    className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#141413]/75"
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
