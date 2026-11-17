import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { applyRouteSeo } from './utils/seo.js';
import { SiteHeader } from './components/common/SiteHeader.jsx';
import { PageDockNav } from './components/common/PageDockNav.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { WorkPage } from './pages/WorkPage.jsx';
import { PlaygroundPage } from './pages/PlaygroundPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';

gsap.registerPlugin(ScrollTrigger);

const VALID_PAGES = new Set(['work', 'playground', 'about', 'contact']);

function getRouteFromLocation() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (VALID_PAGES.has(path)) {
    return path;
  }
  const hash = window.location.hash.replace('#/', '').replace('#', '').trim().toLowerCase();
  if (VALID_PAGES.has(hash)) {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getRouteFromLocation);
  const pageContainerRef = useRef(null);
  const wipeBarRef = useRef(null);

  const navigate = useCallback((page) => {
    const targetPage = VALID_PAGES.has(page) ? page : 'home';
    const nextPath = targetPage === 'home' ? '/' : `/${targetPage}`;

    setCurrentPage(targetPage);
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState({ page: targetPage }, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const syncFromUrl = () => {
      setCurrentPage(getRouteFromLocation());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  useEffect(() => {
    applyRouteSeo(currentPage);

    const frameId = requestAnimationFrame(() => ScrollTrigger.refresh());

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => cancelAnimationFrame(frameId);
    }

    const container = pageContainerRef.current;
    const wipe = wipeBarRef.current;
    if (container) {
      gsap.fromTo(
        container,
        { opacity: 0.25, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          force3D: true,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          onComplete: () => ScrollTrigger.refresh(),
        }
      );
    }
    if (wipe) {
      gsap.fromTo(
        wipe,
        { scaleX: 1, transformOrigin: 'right center', opacity: 1 },
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.52,
          ease: 'power3.inOut',
          clearProps: 'transform,opacity',
        }
      );
    }

    return () => cancelAnimationFrame(frameId);
  }, [currentPage]);

  return (
    <div className="min-h-screen w-full bg-[#f4f1ea] text-[#141413] selection:bg-[#d9381e] overflow-hidden scrollbar-none selection:text-[#f4f1ea]">
      <SiteHeader currentPage={currentPage} onNavigate={navigate} />

      <div
        ref={wipeBarRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-16 left-0 right-0 z-40 h-[3px] bg-[#d9381e] scale-x-0 opacity-0"
      />

      <div ref={pageContainerRef} key={currentPage}>
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'work' && <WorkPage onNavigate={navigate} />}
        {currentPage === 'playground' && <PlaygroundPage onNavigate={navigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={navigate} />}
      </div>

      <PageDockNav currentPage={currentPage} onNavigate={navigate} />
    </div>
  );
}
