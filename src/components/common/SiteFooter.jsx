import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { ANKIT_PROFILE } from '../../data/ankitData.js';
import { SplitWords } from './KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_PAGES = [
  { id: 'home', label: '01. Story & Home' },
  { id: 'work', label: '02. Selected Works' },
  { id: 'playground', label: '03. Playground' },
  { id: 'about', label: '04. About & Credentials' },
  { id: 'contact', label: '05. Contact' },
];

export function SiteFooter({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-footer-word]', {
        yPercent: 115,
        duration: 0.72,
        stagger: 0.03,
        ease: 'power4.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          once: true,
        },
      });

      gsap.from('[data-footer-msg]', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(ANKIT_PROFILE.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer ref={footerRef} className="w-full bg-[#141413] text-[#f4f1ea]">
      <div className="mx-auto max-w-[1440px] px-[var(--page-padding)] pt-20 pb-10">
        {/* Top Story Callout */}
        <div className="grid gap-10 border-b border-[#f4f1ea]/15 pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p
              data-footer-msg
              className="font-mono-tabular text-xs uppercase tracking-widest text-[#d9381e]"
            >
              Available for Full-Time Roles &amp; Builds
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.75rem,7vw,6.25rem)] font-bold uppercase leading-[0.9] tracking-tight">
              <SplitWords
                text="Need a developer who ships fast and actually understands users?"
                wordAttr="data-footer-word"
              />
            </h2>
          </div>

          <div className="lg:col-span-4 lg:text-right" data-footer-msg>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2.5 bg-[#d9381e] px-6 py-3.5 text-sm font-semibold text-[#f4f1ea] transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-95 cursor-pointer"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Middle Contact & Navigation Columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4" data-footer-msg>
            <p className="text-xs uppercase tracking-wider text-[#f4f1ea]/50">Direct Line</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${ANKIT_PROFILE.email}`}
                className="font-display text-2xl sm:text-4xl tracking-tight text-[#f4f1ea] hover:text-[#d9381e] transition-colors"
              >
                {ANKIT_PROFILE.email}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address"
                className="inline-flex items-center gap-1.5 border border-[#f4f1ea]/20 px-3 py-1.5 text-xs text-[#f4f1ea]/80 hover:border-[#f4f1ea] hover:text-[#f4f1ea] cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-sm text-[#f4f1ea]/70">
              {ANKIT_PROFILE.phoneDisplay} · {ANKIT_PROFILE.addressFull}
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3" data-footer-msg>
            <p className="text-xs uppercase tracking-wider text-[#f4f1ea]/50">Pages</p>
            <ul className="space-y-2 text-sm">
              {FOOTER_PAGES.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.id === 'home' ? '/' : `/${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    className="font-mono-tabular text-xs text-[#f4f1ea]/75 hover:text-[#f4f1ea] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3" data-footer-msg>
            <p className="text-xs uppercase tracking-wider text-[#f4f1ea]/50">Connect</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={ANKIT_PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#f4f1ea]/80 hover:text-[#f4f1ea]"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={ANKIT_PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#f4f1ea]/80 hover:text-[#f4f1ea]"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={ANKIT_PROFILE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#f4f1ea]/80 hover:text-[#f4f1ea]"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={ANKIT_PROFILE.socials.certificates}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#f4f1ea]/80 hover:text-[#f4f1ea]"
                >
                  <span>Certificates Folder</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={ANKIT_PROFILE.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#f4f1ea]/80 hover:text-[#f4f1ea]"
                >
                  <span>Resume</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        {/* <div
          data-footer-msg
          className="flex flex-col items-start justify-between gap-3 border-t border-[#f4f1ea]/12 pt-6 text-xs text-[#f4f1ea]/50 sm:flex-row sm:items-center"
        >
          <span>© {new Date().getFullYear()} Ankit Kumar · {ANKIT_PROFILE.originQuote}</span>
          <span>Hindi · English · Darbhanga, Bihar</span>
        </div> */}
      </div>
    </footer>
  );
}
