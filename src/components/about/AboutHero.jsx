import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANKIT_PROFILE } from '../../data/ankitData.js';
import {
  isReducedMotion,
  scrollRevealBlocks,
  scrollRevealClip,
  scrollRevealWords,
} from '../../utils/gsapReveal.js';
import { SplitWords } from '../common/KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

export function AboutHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (isReducedMotion() || !el) return;

    const ctx = gsap.context(() => {
      scrollRevealWords('[data-about-word]', el, { start: 'top 92%' });
      scrollRevealBlocks('[data-about-msg]', el, { start: 'top 90%', stagger: 0.09 });
      scrollRevealClip('[data-about-photo-clip]', '[data-about-photos]', {
        start: 'top 88%',
        stagger: 0.14,
      });

      gsap.from('[data-about-photo-img]', {
        scale: 1.14,
        duration: 1.0,
        stagger: 0.14,
        force3D: true,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '[data-about-photos]',
          start: 'top 88%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1440px] px-[var(--page-padding)] pt-14 pb-16 border-b border-[#141413]/15"
    >
      <p
        data-about-msg
        className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]"
      >
        About Ankit Kumar · Darbhanga, Bihar
      </p>
      <h1 className="mt-4 max-w-5xl font-display text-[clamp(3rem,7.2vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-tight text-balance">
        <SplitWords
          text="Half operations backbone. Half self-taught MERN builder."
          wordAttr="data-about-word"
        />
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6 space-y-5 text-base sm:text-lg leading-[1.65] text-[#141413]/85">
          <p data-about-msg>
            I started working on the ground floor in Darbhanga — managing medicine counters, stock
            data entry, and hospital billing at <strong>Ugana Medico</strong> inside Darbhanga
            Heart Hospital for three full years.
          </p>
          <p data-about-msg>
            Today, I serve as a Customer Care Officer at <strong>Galaxy Service</strong>{' '}
            (authorized Daikin &amp; Hitachi partner), while completing my Full Stack + DSA
            training, an internship at <strong>InCodec Technology</strong>, and building React,
            Node.js, AI, and GSAP 2D motion applications.
          </p>
          <p
            data-about-msg
            className="border-l-2 border-[#d9381e] pl-4 font-serif-editorial text-2xl italic text-[#141413]"
          >
            Fluent in Hindi and English. Comfortable in code editors, spreadsheets, and live customer
            calls alike.
          </p>
        </div>

        <div data-about-photos className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div
            data-about-photo-clip
            className="aspect-[4/3] overflow-hidden border border-[#141413]/15 bg-[#e8e3d8]"
          >
            <img
              data-about-photo-img
              src={ANKIT_PROFILE.photos.street}
              alt="Ankit Kumar outdoors in Darbhanga"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
            />
          </div>
          <div
            data-about-photo-clip
            className="aspect-[4/3] overflow-hidden border border-[#141413]/15 bg-[#e8e3d8]"
          >
            <img
              data-about-photo-img
              src={ANKIT_PROFILE.photos.desk}
              alt="Ankit Kumar coding at desk"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
