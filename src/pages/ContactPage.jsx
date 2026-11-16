import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  isReducedMotion,
  scrollRevealBlocks,
  scrollRevealWords,
} from '../utils/gsapReveal.js';
import { SplitWords } from '../components/common/KineticText.jsx';
import { NextChapterNav } from '../components/common/NextChapterNav.jsx';
import { SiteFooter } from '../components/common/SiteFooter.jsx';
import { ElasticDivider } from '../components/physics/ElasticDivider.jsx';
import { ContactForm } from '../components/contact/ContactForm.jsx';
import { ContactDetailsLedger } from '../components/contact/ContactDetailsLedger.jsx';

gsap.registerPlugin(ScrollTrigger);

export function ContactPage({ onNavigate }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (isReducedMotion() || !el) return;

    const ctx = gsap.context(() => {
      scrollRevealWords('[data-contact-word]', '[data-contact-section]', { start: 'top 92%' });
      scrollRevealBlocks('[data-contact-stagger]', '[data-contact-section]', {
        start: 'top 90%',
        stagger: 0.08,
      });
      scrollRevealBlocks('[data-contact-ledger-row]', '[data-contact-ledger]', {
        start: 'top 88%',
        x: 20,
        y: 0,
        stagger: 0.07,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen w-full bg-[#f4f1ea] text-[#141413]">
      <section
        data-contact-section
        className="mx-auto max-w-[1440px] px-[var(--page-padding)] pt-14 pb-20"
      >
        <p
          data-contact-stagger
          className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]"
        >
          Contact &amp; Availability
        </p>

        <div className="mt-4 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-display text-[clamp(3rem,7.2vw,6.25rem)] font-bold uppercase leading-[0.88] tracking-tight text-balance">
              <SplitWords
                text="Let's build something that pulls its weight."
                wordAttr="data-contact-word"
              />
            </h1>

            <p
              data-contact-stagger
              className="max-w-xl text-base sm:text-lg leading-relaxed text-[#141413]/80"
            >
              Whether you&apos;re hiring a MERN stack developer, need reliable customer operations,
              or want a sharp web application shipped cleanly — I&apos;m ready to relocate or start
              remotely.
            </p>

            <ContactForm />
          </div>

          <div data-contact-ledger className="lg:col-span-5">
            <ContactDetailsLedger />
          </div>
        </div>
      </section>

      <ElasticDivider accent />

      <NextChapterNav currentPage="contact" onNavigate={onNavigate} />

      <SiteFooter onNavigate={onNavigate} />
    </main>
  );
}
