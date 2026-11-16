import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/ankitData.js';
import {
  isReducedMotion,
  scrollRevealBlocks,
  scrollRevealClip,
  scrollRevealWords,
} from '../utils/gsapReveal.js';
import { SplitWords } from '../components/common/KineticText.jsx';
import { MarqueeRibbon } from '../components/common/MarqueeRibbon.jsx';
import { NextChapterNav } from '../components/common/NextChapterNav.jsx';
import { SiteFooter } from '../components/common/SiteFooter.jsx';
import { ElasticDivider } from '../components/physics/ElasticDivider.jsx';
import { ProjectShowcaseVisual } from '../components/projects/ProjectShowcaseVisual.jsx';
import { ProjectModal } from '../components/projects/ProjectModal.jsx';

gsap.registerPlugin(ScrollTrigger);

export function WorkPage({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (isReducedMotion() || !el) return;

    const ctx = gsap.context(() => {
      scrollRevealWords('[data-work-word]', '[data-work-header]', { start: 'top 92%' });
      scrollRevealBlocks('[data-work-head-msg]', '[data-work-header]', {
        start: 'top 90%',
        stagger: 0.08,
      });

      gsap.utils.toArray('[data-work-row]').forEach((row) => {
        const texts = row.querySelectorAll('[data-work-item]');
        const visual = row.querySelector('[data-work-visual]');

        if (texts.length) {
          scrollRevealBlocks(texts, row, { start: 'top 84%', y: 28, stagger: 0.07 });
        }

        if (visual) {
          scrollRevealClip(visual, row, {
            start: 'top 82%',
            fromClip: 'inset(0% 0% 100% 0%)',
            duration: 0.85,
          });
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen w-full bg-[#f4f1ea] text-[#141413]">
      <section
        data-work-header
        className="mx-auto max-w-[1440px] px-[var(--page-padding)] pt-14 pb-12 border-b border-[#141413]/15"
      >
        <p
          data-work-head-msg
          className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]"
        >
          Case Studies &amp; 2D Motion Systems
        </p>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h1 className="font-display text-[clamp(3rem,7.5vw,6.75rem)] font-bold uppercase leading-[0.88] tracking-tight">
            <SplitWords text="Selected Works" wordAttr="data-work-word" />
          </h1>
          <p
            data-work-head-msg
            className="max-w-md text-sm sm:text-base leading-relaxed text-[#141413]/75"
          >
            From custom Tactile Ivory CRM architecture and Groq AI legal parsers to kinetic 2D GSAP
            timelines and 3+ years of live service-desk execution.
          </p>
        </div>
      </section>

      <MarqueeRibbon
        items={[
          '01 · Vanguard CRM',
          '02 · Groq T&C AI Summarizer',
          '03 · Kinetic 2D & GSAP Lab',
          '04 · Operations & Care Command',
        ]}
        speed={24}
      />

      <section className="mx-auto max-w-[1440px] px-[var(--page-padding)] py-12">
        <div className="divide-y divide-[#141413]/15">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              data-work-row
              className="grid gap-10 py-14 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-5 space-y-5">
                <div
                  data-work-item
                  className="flex items-center justify-between font-mono-tabular text-xs text-[#141413]/55"
                >
                  <span>{project.indexLabel}</span>
                  <span>{project.year}</span>
                </div>

                <div data-work-item>
                  <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold uppercase leading-[0.94] tracking-tight">
                    {project.title}
                  </h2>
                  <p className="mt-1 font-serif-editorial text-xl italic text-[#141413]/75">
                    {project.subtitle}
                  </p>
                </div>

                <p data-work-item className="text-sm sm:text-base leading-relaxed text-[#141413]/80">
                  {project.story}
                </p>

                <dl
                  data-work-item
                  className="grid grid-cols-2 gap-4 border-t border-[#141413]/12 pt-4 text-xs"
                >
                  <div>
                    <dt className="text-[#141413]/50">{project.primaryMetaLabel}</dt>
                    <dd className="mt-1 font-semibold">{project.primaryMetaValue}</dd>
                  </div>
                  <div>
                    <dt className="text-[#141413]/50">Outcome</dt>
                    <dd className="mt-1 font-semibold">{project.outcome}</dd>
                  </div>
                </dl>

                <div
                  data-work-item
                  className="flex flex-wrap gap-x-2.5 gap-y-1 text-xs font-mono-tabular text-[#141413]/60"
                >
                  {project.stack.map((tech, i) => (
                    <span key={tech}>
                      {tech}
                      {i < project.stack.length - 1 && (
                        <span className="ml-2.5 opacity-40" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                <div data-work-item className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 bg-[#141413] px-5 py-2.5 text-xs font-semibold text-[#f4f1ea] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d9381e] cursor-pointer"
                  >
                    <span>Read Full Breakdown</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <button
                  type="button"
                  data-work-visual
                  onClick={() => setSelectedProject(project)}
                  className="group block aspect-[16/10] w-full overflow-hidden border border-[#141413]/15 bg-[#e8e3d8] text-left cursor-pointer"
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <ProjectShowcaseVisual type={project.visualType} />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ElasticDivider accent />

      <NextChapterNav currentPage="work" onNavigate={onNavigate} />

      <SiteFooter onNavigate={onNavigate} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onAskAboutProject={() => {
          setSelectedProject(null);
          onNavigate('contact');
        }}
      />
    </main>
  );
}
