import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { PlaygroundCardVisual } from '../projects/PlaygroundCardVisual.jsx';

export function PlaygroundModal({ card, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!card || !modalRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      modalRef.current,
      { y: 24, scale: 0.96, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.34, ease: 'power3.out', clearProps: 'transform,opacity' }
    );
  }, [card]);

  if (!card) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pg-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#141413]/85 p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-[#f4f1ea] p-6 sm:p-8 text-[#141413] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close experiment modal"
          onClick={onClose}
          className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center border border-[#141413]/20 hover:bg-[#141413] hover:text-[#f4f1ea] cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div
          className="aspect-[16/10] w-full overflow-hidden border border-[#141413]/15"
          style={{ backgroundColor: card.bg }}
        >
          <PlaygroundCardVisual card={card} />
        </div>

        <div className="mt-6">
          <p className="font-mono-tabular text-xs text-[#d9381e]">
            {card.category} · {card.year}
          </p>
          <h2
            id="pg-modal-title"
            className="mt-1 font-display text-3xl font-bold uppercase tracking-tight"
          >
            {card.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#141413]/80">{card.description}</p>
          <p className="mt-4 font-mono-tabular text-xs text-[#141413]/60">{card.stack}</p>
        </div>
      </div>
    </div>
  );
}
