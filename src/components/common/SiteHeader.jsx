import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { ANKIT_PROFILE } from '../../data/ankitData.js';
import { isReducedMotion } from '../../utils/gsapReveal.js';

const NAV_LINKS = [
  { id: 'home', num: '01', label: 'Story' },
  { id: 'work', num: '02', label: 'Works' },
  { id: 'playground', num: '03', label: 'Playground' },
  { id: 'about', num: '04', label: 'About' },
];

export function SiteHeader({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef(null);
  const navContainerRef = useRef(null);
  const activeBarRef = useRef(null);
  const linkRefs = useRef({});
  const drawerRef = useRef(null);

  const moveIndicatorTo = useCallback((pageId) => {
    const bar = activeBarRef.current;
    const container = navContainerRef.current;
    const target = linkRefs.current[pageId];
    if (!bar || !container) return;

    if (!target) {
      gsap.to(bar, { opacity: 0, duration: 0.2, overwrite: 'auto' });
      return;
    }

    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    gsap.to(bar, {
      x: tRect.left - cRect.left,
      width: tRect.width,
      opacity: 1,
      duration: isReducedMotion() ? 0 : 0.36,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  useEffect(() => {
    moveIndicatorTo(currentPage);
    const onResize = () => moveIndicatorTo(currentPage);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [currentPage, moveIndicatorTo]);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      gsap.to(bar, {
        scaleX: progress,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [currentPage]);

  useEffect(() => {
    if (!mobileOpen || !drawerRef.current || isReducedMotion()) return;
    gsap.fromTo(
      drawerRef.current.querySelectorAll('[data-drawer-link]'),
      { x: -16, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.32, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,opacity' }
    );
  }, [mobileOpen]);

  const handleGo = (page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const getHref = (id) => (id === 'home' ? '/' : `/${id}`);

  const handleLinkClick = (e, page) => {
    e.preventDefault();
    handleGo(page);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#141413]/12 bg-[#f4f1ea]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-[var(--page-padding)]">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-xl font-bold uppercase tracking-tight text-[#141413] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {ANKIT_PROFILE.fullName}
        </a>

        {/* Zone 2: Nav Links with Sliding GSAP Indicator */}
        <nav
          ref={navContainerRef}
          onMouseLeave={() => moveIndicatorTo(currentPage)}
          className="relative hidden md:flex items-center gap-7 py-2"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <a
                key={link.id}
                href={getHref(link.id)}
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                onClick={(e) => handleLinkClick(e, link.id)}
                onMouseEnter={() => moveIndicatorTo(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex items-baseline gap-1.5 text-sm font-medium tracking-[-0.01em] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive ? 'text-[#d9381e]' : 'text-[#141413]/75 hover:text-[#141413]'
                }`}
              >
                <span className="font-mono-tabular text-[10px] opacity-50">{link.num}</span>
                <span>{link.label}</span>
              </a>
            );
          })}

          <span
            ref={activeBarRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-[#d9381e] opacity-0"
          />
        </nav>

        {/* Zone 3: Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className={`px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'contact'
                ? 'bg-[#d9381e] text-[#f4f1ea]'
                : 'bg-[#141413] text-[#f4f1ea] hover:bg-[#d9381e]'
            }`}
          >
            Hire Ankit
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#141413]/15 md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* GSAP Scroll Progress Hairline */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="h-[2px] w-full origin-left scale-x-0 bg-[#d9381e]"
      />

      {/* GSAP-Animated Mobile Drawer */}
      {mobileOpen && (
        <div
          ref={drawerRef}
          className="border-t border-[#141413]/12 bg-[#f4f1ea] px-[var(--page-padding)] py-5 md:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {[...NAV_LINKS, { id: 'contact', num: '05', label: 'Contact' }].map((link) => (
              <a
                key={link.id}
                href={getHref(link.id)}
                data-drawer-link
                onClick={(e) => handleLinkClick(e, link.id)}
                aria-current={currentPage === link.id ? 'page' : undefined}
                className={`flex items-baseline gap-3 py-2 text-left font-display text-2xl uppercase tracking-tight cursor-pointer ${
                  currentPage === link.id ? 'text-[#d9381e]' : 'text-[#141413]'
                }`}
              >
                <span className="font-mono-tabular text-xs opacity-50">{link.num}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
