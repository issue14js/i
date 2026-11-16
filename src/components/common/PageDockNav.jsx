import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUp } from 'lucide-react';
import { isReducedMotion } from '../../utils/gsapReveal.js';

const DOCK_ITEMS = [
  { id: 'home', num: '01', label: 'Story' },
  { id: 'work', num: '02', label: 'Works' },
  { id: 'playground', num: '03', label: 'Lab' },
  { id: 'about', num: '04', label: 'About' },
  { id: 'contact', num: '05', label: 'Contact' },
];

/**
 * Floating GSAP Quick-Navigation Dock appearing smoothly on scroll across every page.
 */
export function PageDockNav({ currentPage, onNavigate }) {
  const dockRef = useRef(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const reduced = isReducedMotion();
    if (!reduced) {
      gsap.set(dock, { y: 36, opacity: 0, pointerEvents: 'none' });
    }

    const onScroll = () => {
      const shouldShow = window.scrollY > 180;
      if (shouldShow === visibleRef.current) return;
      visibleRef.current = shouldShow;

      if (reduced) {
        dock.style.opacity = shouldShow ? '1' : '0';
        dock.style.pointerEvents = shouldShow ? 'auto' : 'none';
        return;
      }

      gsap.to(dock, {
        y: shouldShow ? 0 : 36,
        opacity: shouldShow ? 1 : 0,
        pointerEvents: shouldShow ? 'auto' : 'none',
        duration: shouldShow ? 0.42 : 0.25,
        ease: shouldShow ? 'back.out(1.4)' : 'power2.in',
        overwrite: 'auto',
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={dockRef}
      role="navigation"
      aria-label="Quick page switcher"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 border border-[#141413]/25 bg-[#f4f1ea]/95 px-2 py-1.5 shadow-xl backdrop-blur-sm will-change-transform"
    >
      <div className="flex items-center gap-1">
        {DOCK_ITEMS.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 sm:px-3 py-1.5 font-mono-tabular text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#d9381e] text-[#f4f1ea]'
                  : 'text-[#141413]/75 hover:bg-[#141413] hover:text-[#f4f1ea]'
              }`}
            >
              <span className="hidden sm:inline opacity-65 mr-1">{item.num}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        <span className="mx-1 h-4 w-px bg-[#141413]/20" aria-hidden="true" />

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Back to top"
          className="inline-flex h-7 w-7 items-center justify-center border border-[#141413]/20 bg-[#141413] text-[#f4f1ea] transition-colors hover:bg-[#d9381e] hover:border-[#d9381e] cursor-pointer"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
