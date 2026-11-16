import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, X } from 'lucide-react';
import { ProjectShowcaseVisual } from './ProjectShowcaseVisual.jsx';

export function ProjectModal({ project, onClose, onAskAboutProject }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!project || !modalRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      modalRef.current,
      { y: 26, scale: 0.96, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.36, ease: 'power3.out', clearProps: 'transform,opacity' }
    );
  }, [project]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#141413]/85 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto bg-[#f4f1ea] p-6 sm:p-10 text-[#141413] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close case study"
          onClick={onClose}
          className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center border border-[#141413]/20 hover:bg-[#141413] hover:text-[#f4f1ea] cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="font-mono-tabular text-xs text-[#d9381e]">
          {project.indexLabel} · {project.year}
        </p>
        <h2
          id="work-modal-title"
          className="mt-2 font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95]"
        >
          {project.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#141413]/80">{project.tagline}</p>

        <div className="mt-6 aspect-[16/9] w-full overflow-hidden border border-[#141413]/15">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          ) : (
            <ProjectShowcaseVisual type={project.visualType} />
          )}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 border-t border-[#141413]/15 pt-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#141413]/55">
              What Was Built
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#141413]/85">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span className="font-mono-tabular text-xs text-[#d9381e]">→</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#141413]/55">
                Role &amp; Context
              </h3>
              <p className="mt-1 text-sm font-medium">{project.role}</p>
              <p className="mt-0.5 text-xs text-[#141413]/65">{project.primaryMetaValue}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#141413]/55">
                Tools Used
              </h3>
              <p className="mt-1 text-xs font-mono-tabular text-[#141413]/75">
                {project.stack.join(' · ')}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onAskAboutProject}
                className="inline-flex items-center gap-2 bg-[#d9381e] px-5 py-2.5 text-xs font-semibold text-[#f4f1ea] hover:bg-[#141413] cursor-pointer"
              >
                <span>Ask About This Project</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
