import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/ankitData.js';
import {
  batchRevealCards,
  isReducedMotion,
  scrollRevealBlocks,
  scrollRevealClip,
  scrollRevealWords,
} from '../../utils/gsapReveal.js';
import { SplitWords } from '../common/KineticText.jsx';
import { ProjectShowcaseVisual } from '../projects/ProjectShowcaseVisual.jsx';

gsap.registerPlugin(ScrollTrigger);

export function SelectedWorksPreview({ onNavigate }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (isReducedMotion() || !el) return;

    const ctx = gsap.context(() => {
      scrollRevealWords('[data-work-sec-word]', el, { start: 'top 84%' });
      scrollRevealBlocks('[data-work-sec-msg]', el, { start: 'top 84%' });
      batchRevealCards('[data-project-card]', { start: 'top 86%', y: 38, stagger: 0.1 });
      scrollRevealClip('[data-project-visual-clip]', '[data-projects-grid]', {
        start: 'top 82%',
        fromClip: 'inset(0% 0% 100% 0%)',
        stagger: 0.1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-b border-[#f4f1ea]/12 bg-[#141413] py-20 lg:py-28 text-[#f4f1ea]"
    >
      <div className="mx-auto max-w-[1440px] px-[var(--page-padding)]">
        <div className="flex flex-col justify-between gap-6 border-b border-[#f4f1ea]/15 pb-8 sm:flex-row sm:items-end">
          <div>
            <p
              data-work-sec-msg
              className="font-mono-tabular text-xs uppercase tracking-widest text-[#d9381e]"
            >
              03. Proof of Work
            </p>
            <h2 className="mt-2 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-tight">
              <SplitWords text="Selected Projects & Ops" wordAttr="data-work-sec-word" />
            </h2>
          </div>

          <button
            data-work-sec-msg
            type="button"
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-2 border border-[#f4f1ea]/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f4f1ea] hover:text-[#141413] cursor-pointer w-fit"
          >
            <span>All 4 Case Studies</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div data-projects-grid className="mt-12 grid gap-8 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              data-project-card
              className="group flex flex-col justify-between border border-[#f4f1ea]/12 bg-[#1e1e1d] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#d9381e]/55"
            >
              <div>
                <div
                  data-project-visual-clip
                  className="aspect-[16/10] w-full overflow-hidden border border-[#f4f1ea]/10 bg-[#292724]"
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <ProjectShowcaseVisual type={project.visualType} compact />
                  )}
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4 text-xs font-mono-tabular text-[#f4f1ea]/55">
                  <span>{project.indexLabel}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight transition-colors duration-200 group-hover:text-[#d9381e]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f4f1ea]/75">{project.story}</p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#f4f1ea]/12 pt-4">
                <div className="text-xs text-[#f4f1ea]/60">
                  {project.stack.slice(0, 3).join(' · ')}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('work')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d9381e] hover:underline cursor-pointer"
                >
                  <span>Open Case</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
