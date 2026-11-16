import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function isReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Scroll-triggered 2D masked word slide-up (`yPercent: 115 -> 0`).
 */
export function scrollRevealWords(targets, trigger, options = {}) {
  const { start = 'top 85%', stagger = 0.04, duration = 0.72, delay = 0 } = options;
  return gsap.from(targets, {
    yPercent: 115,
    rotate: 1.2,
    duration,
    delay,
    stagger,
    force3D: true,
    ease: 'power4.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger,
      start,
      once: true,
    },
  });
}

/**
 * Scroll-triggered 2D block/message slide-up + fade (`y -> 0, opacity: 0 -> 1`).
 */
export function scrollRevealBlocks(targets, trigger, options = {}) {
  const { start = 'top 85%', y = 26, x = 0, stagger = 0.08, duration = 0.65 } = options;
  return gsap.from(targets, {
    y,
    x,
    opacity: 0,
    duration,
    stagger,
    force3D: true,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
    scrollTrigger: {
      trigger,
      start,
      once: true,
    },
  });
}

/**
 * Scroll-triggered 2D clip-path curtain wipe for photos & showcase frames.
 */
export function scrollRevealClip(target, trigger, options = {}) {
  const {
    start = 'top 84%',
    fromClip = 'inset(100% 0% 0% 0%)',
    duration = 0.9,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    target,
    { clipPath: fromClip },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration,
      stagger,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  );
}

/**
 * High-performance ScrollTrigger.batch 2D entrance for card grids.
 */
export function batchRevealCards(selector, options = {}) {
  const { start = 'top 88%', y = 32, scale = 0.97, stagger = 0.07 } = options;
  gsap.set(selector, { y, scale, opacity: 0, force3D: true });

  return ScrollTrigger.batch(selector, {
    start,
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.68,
        stagger,
        force3D: true,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    },
  });
}
