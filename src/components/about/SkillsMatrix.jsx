import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitWords } from '../common/KineticText.jsx';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_CATEGORIES = [
  {
    group: 'Frontend Engineering',
    items: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'GSAP', 'Motion 2D', 'Tailwind CSS'],
  },
  {
    group: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Authentication', 'Groq AI API'],
  },
  {
    group: 'Customer Service & Ops',
    items: ['Inbound Call Handling', 'Complaint Resolution', 'Service Scheduling', 'Front-Desk Coordination'],
  },
  {
    group: 'Pharmacy & Data Entry',
    items: ['Medicine Sales', 'Fast & Accurate Typing', 'MS Excel / Word', 'Billing Software', 'Inventory Control'],
  },
];

export function SkillsMatrix() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-skills-word]', {
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

      gsap.from('[data-skill-col]', {
        y: 26,
        opacity: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '[data-skills-grid]',
          start: 'top 82%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#141413] py-20 text-[#f4f1ea]">
      <div className="mx-auto max-w-[1440px] px-[var(--page-padding)]">
        <div className="mb-12">
          <p className="font-mono-tabular text-xs font-medium uppercase tracking-widest text-[#d9381e]">
            Capabilities &amp; Tools
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            <SplitWords text="Technical + Operational Stack" wordAttr="data-skills-word" />
          </h2>
        </div>

        <div data-skills-grid className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS_CATEGORIES.map((cat) => (
            <div key={cat.group} data-skill-col className="border-t border-[#f4f1ea]/20 pt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#f4f1ea]/55">
                {cat.group}
              </h3>
              <ul className="mt-4 space-y-2 text-base font-medium">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-[#f4f1ea]/90 transition-transform duration-200 hover:translate-x-1.5 hover:text-[#d9381e]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
