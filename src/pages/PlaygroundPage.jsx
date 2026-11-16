import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Grid, Move, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { PLAYGROUND_CARDS } from '../data/ankitData.js';
import {
  batchRevealCards,
  isReducedMotion,
  scrollRevealBlocks,
  scrollRevealWords,
} from '../utils/gsapReveal.js';
import { SplitWords } from '../components/common/KineticText.jsx';
import { NextChapterNav } from '../components/common/NextChapterNav.jsx';
import { SiteFooter } from '../components/common/SiteFooter.jsx';
import { ElasticDivider } from '../components/physics/ElasticDivider.jsx';
import { PhysicsTokenTray } from '../components/physics/PhysicsTokenTray.jsx';
import { PlaygroundCardVisual } from '../components/projects/PlaygroundCardVisual.jsx';
import { PlaygroundModal } from '../components/playground/PlaygroundModal.jsx';

gsap.registerPlugin(ScrollTrigger);

const SCATTER_OFFSETS = [
  { x: -12, y: -10, rotate: -2.5 },
  { x: 14, y: 12, rotate: 2 },
  { x: -8, y: 16, rotate: -1.5 },
  { x: 18, y: -14, rotate: 2.5 },
  { x: -16, y: 8, rotate: -2 },
  { x: 10, y: 14, rotate: 1.5 },
  { x: -12, y: -12, rotate: 2 },
  { x: 14, y: -8, rotate: -1.5 },
  { x: -8, y: 12, rotate: 1.5 },
  { x: 12, y: 8, rotate: -1 },
];

export function PlaygroundPage({ onNavigate }) {
  const [viewMode, setViewMode] = useState('grid');
  const [scatterSeed, setScatterSeed] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (isReducedMotion() || !el) return;

    const ctx = gsap.context(() => {
      scrollRevealWords('[data-pg-word]', '[data-pg-header]', { start: 'top 92%' });
      scrollRevealBlocks('[data-pg-head-msg]', '[data-pg-header]', {
        start: 'top 90%',
        stagger: 0.08,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (isReducedMotion() || !el || viewMode !== 'grid') return;

    const ctx = gsap.context(() => {
      batchRevealCards('[data-pg-card]', { start: 'top 88%', y: 30, scale: 0.96, stagger: 0.06 });
    }, el);

    return () => ctx.revert();
  }, [viewMode]);

  return (
    <main ref={rootRef} className="min-h-screen w-full bg-[#f4f1ea] text-[#141413]">
      <section
        data-pg-header
        className="mx-auto max-w-[1440px] px-[var(--page-padding)] pt-14 pb-12 border-b border-[#141413]/15"
      >
        <p
          data-pg-head-msg
          className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]"
        >
          Lab &amp; 2D Micro-Experiments
        </p>

        <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h1 className="font-display text-[clamp(3rem,7.5vw,6.75rem)] font-bold uppercase leading-[0.88] tracking-tight">
            <SplitWords text="Playground" wordAttr="data-pg-word" />
          </h1>

          <div data-pg-head-msg className="flex max-w-md items-start gap-4">
            <ArrowDownRight className="mt-1 h-5 w-5 shrink-0 text-[#d9381e]" aria-hidden="true" />
            <p className="text-sm sm:text-base leading-relaxed text-[#141413]/80">
              UI studies, GSAP 2D timing curves, magnetic spring interactions, Groq AI prompt
              experiments, and operations grids.
            </p>
          </div>
        </div>

        <div data-pg-head-msg className="mt-8 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1 border border-[#141413]/20 bg-[#e8e3d8]/70 p-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#141413] text-[#f4f1ea]'
                  : 'text-[#141413]/70 hover:text-[#141413]'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Grid View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('drag')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'drag'
                  ? 'bg-[#d9381e] text-[#f4f1ea]'
                  : 'text-[#141413]/70 hover:text-[#141413]'
              }`}
            >
              <Move className="h-3.5 w-3.5" />
              <span>Interactive 2D Scatter</span>
            </button>
          </div>

          {viewMode === 'drag' && (
            <button
              type="button"
              onClick={() => setScatterSeed((s) => s + 1)}
              className="inline-flex items-center gap-2 border border-[#141413]/20 px-4 py-2 text-xs font-semibold text-[#141413] hover:bg-[#141413] hover:text-[#f4f1ea] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Board</span>
            </button>
          )}
        </div>
      </section>

      {viewMode === 'grid' ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-padding)] py-14">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PLAYGROUND_CARDS.map((card) => (
              <article
                key={card.id}
                data-pg-card
                className={`group overflow-hidden border border-[#141413]/12 transition-transform duration-300 hover:-translate-y-1 ${
                  card.colSpan === 2 ? 'sm:col-span-2' : ''
                }`}
                style={{ backgroundColor: card.bg }}
              >
                <button
                  type="button"
                  onClick={() => setActiveCard(card)}
                  className="block aspect-[537/447] w-full text-left cursor-pointer"
                >
                  <PlaygroundCardVisual card={card} />
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1440px] px-[var(--page-padding)] py-14 overflow-hidden">
          <p className="mb-8 font-mono-tabular text-xs text-[#141413]/60">
            Drag cards freely across the 2D studio board · Click Inspect to open details
          </p>
          <div
            key={scatterSeed}
            className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PLAYGROUND_CARDS.map((card, i) => {
              const offset = SCATTER_OFFSETS[i % SCATTER_OFFSETS.length];
              return (
                <motion.div
                  key={card.id}
                  drag
                  dragMomentum={false}
                  whileHover={{ scale: 1.02 }}
                  whileDrag={{ scale: 1.05, zIndex: 40, rotate: 0 }}
                  initial={{ opacity: 0, scale: 0.9, x: 0, y: 24, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: offset.x,
                    y: offset.y,
                    rotate: offset.rotate,
                  }}
                  transition={{ duration: 0.45, delay: i * 0.035 }}
                  className="group relative aspect-[537/447] cursor-grab active:cursor-grabbing border border-[#141413]/15 shadow-lg"
                  style={{ backgroundColor: card.bg }}
                >
                  <PlaygroundCardVisual card={card} />
                  <button
                    type="button"
                    onClick={() => setActiveCard(card)}
                    className="absolute right-3 bottom-3 bg-[#f4f1ea] px-3 py-1 text-xs font-semibold text-[#141413] opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                  >
                    Inspect
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      <ElasticDivider />

      <PhysicsTokenTray title="Live 2D Rigid-Body Gravity & Scroll-Impulse Sandbox" />

      <NextChapterNav currentPage="playground" onNavigate={onNavigate} />

      <SiteFooter onNavigate={onNavigate} />

      <PlaygroundModal card={activeCard} onClose={() => setActiveCard(null)} />
    </main>
  );
}
