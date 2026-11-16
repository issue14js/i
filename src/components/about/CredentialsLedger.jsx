import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { ANKIT_PROFILE, EDUCATION_AND_CERTS } from '../../data/ankitData.js';
import { SplitWords } from '../common/KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

export function CredentialsLedger() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-cred-word]', {
        yPercent: 115,
        duration: 0.68,
        stagger: 0.04,
        ease: 'power4.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('[data-cred-row]', {
        x: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '[data-cred-list]',
          start: 'top 84%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1440px] px-[var(--page-padding)] py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-5">
          <p className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]">
            Credentials
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95] tracking-tight">
            <SplitWords text="Education & Verified Certificates" wordAttr="data-cred-word" />
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#141413]/75">
            Every certificate — from Sheryians Full Stack + DSA to NSDC, Deloitte, and Electronic
            Arts simulations — is available for immediate verification.
          </p>
          <a
            href={ANKIT_PROFILE.socials.certificates}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#d9381e] px-5 py-3 text-xs font-semibold text-[#f4f1ea] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#141413]"
          >
            <span>View Certificates on Google Drive</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div data-cred-list className="lg:col-span-7 space-y-10">
          <div>
            <h3 className="font-mono-tabular text-xs uppercase tracking-wider text-[#141413]/55">
              Education
            </h3>
            <div className="mt-3 divide-y divide-[#141413]/15 border-t border-b border-[#141413]/15">
              {EDUCATION_AND_CERTS.education.map((ed) => (
                <div
                  key={ed.title}
                  data-cred-row
                  className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-baseline"
                >
                  <div>
                    <p className="font-semibold">{ed.title}</p>
                    <p className="text-sm text-[#141413]/70">{ed.institution}</p>
                  </div>
                  <span className="font-mono-tabular text-xs text-[#141413]/60 shrink-0">
                    {ed.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono-tabular text-xs uppercase tracking-wider text-[#141413]/55">
              Certifications
            </h3>
            <div className="mt-3 divide-y divide-[#141413]/15 border-t border-b border-[#141413]/15">
              {EDUCATION_AND_CERTS.certifications.map((cert) => (
                <div
                  key={cert.title}
                  data-cred-row
                  className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-baseline"
                >
                  <div>
                    <p className="font-semibold">{cert.title}</p>
                    <p className="text-sm text-[#141413]/70">{cert.issuer}</p>
                  </div>
                  <span className="font-mono-tabular text-xs text-[#141413]/60 shrink-0">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
