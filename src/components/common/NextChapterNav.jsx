import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { isReducedMotion } from '../../utils/gsapReveal.js';

gsap.registerPlugin(ScrollTrigger);

const PAGE_SEQUENCE = [
  { id: 'home', num: '01', title: 'Story & Home', subtitle: 'Hospital counters to MERN code' },
  { id: 'work', num: '02', title: 'Selected Works', subtitle: '4 real builds & operations cases' },
  { id: 'playground', num: '03', title: 'Playground & Physics', subtitle: '2D motion & Groq experiments' },
  { id: 'about', num: '04', title: 'About & Credentials', subtitle: 'Timeline, skills & certificates' },
  { id: 'contact', num: '05', title: 'Contact & Inquiry', subtitle: 'Direct form & IST availability' },
];

export function NextChapterNav({ currentPage, onNavigate }) {
  const wrapRef = useRef(null);
  const currentIdx = Math.max(
    0,
    PAGE_SEQUENCE.findIndex((p) => p.id === currentPage)
  );
  const prevPage = PAGE_SEQUENCE[(currentIdx - 1 + PAGE_SEQUENCE.length) % PAGE_SEQUENCE.length];
  const nextPage = PAGE_SEQUENCE[(currentIdx + 1) % PAGE_SEQUENCE.length];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-next-chapter-card]', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        force3D: true,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [currentPage]);

  return (
    <section
      ref={wrapRef}
      aria-label="Page sequence navigation"
      className="border-t border-[#141413]/15 bg-[#e8e3d8]/45 py-12"
    >
      <div className="mx-auto max-w-[1440px] px-[var(--page-padding)]">
        <div className="mb-4 flex items-center justify-between font-mono-tabular text-[11px] uppercase tracking-widest text-[#141413]/55">
          <span>Continue Exploring</span>
          <span>
            Page {PAGE_SEQUENCE[currentIdx].num} / 0{PAGE_SEQUENCE.length}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            data-next-chapter-card
            onClick={() => onNavigate(prevPage.id)}
            className="group flex items-center justify-between border border-[#141413]/15 bg-[#f4f1ea] p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#141413] cursor-pointer"
          >
            <div>
              <span className="font-mono-tabular text-xs text-[#141413]/50">
                ← Previous · {prevPage.num}
              </span>
              <p className="mt-1 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                {prevPage.title}
              </p>
              <p className="mt-0.5 text-xs text-[#141413]/65">{prevPage.subtitle}</p>
            </div>
            <ArrowLeft className="h-5 w-5 shrink-0 text-[#141413]/60 transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:text-[#d9381e]" />
          </button>

          <button
            type="button"
            data-next-chapter-card
            onClick={() => onNavigate(nextPage.id)}
            className="group flex items-center justify-between border border-[#141413] bg-[#141413] p-6 text-left text-[#f4f1ea] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9381e] hover:border-[#d9381e] cursor-pointer"
          >
            <div>
              <span className="font-mono-tabular text-xs text-[#f4f1ea]/65">
                Next Chapter · {nextPage.num} →
              </span>
              <p className="mt-1 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                {nextPage.title}
              </p>
              <p className="mt-0.5 text-xs text-[#f4f1ea]/75">{nextPage.subtitle}</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-[#f4f1ea] transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
