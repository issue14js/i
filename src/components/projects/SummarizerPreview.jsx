import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SummarizerPreview() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-scan-beam]', {
        y: 78,
        duration: 1.9,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col justify-between bg-[#141413] p-6 sm:p-8 text-[#f4f1ea]"
    >
      <div className="flex items-center justify-between border-b border-[#f4f1ea]/15 pb-3 text-[11px] font-mono-tabular text-[#f4f1ea]/65">
        <span>GROQ LLM ENGINE</span>
        <span>TEAM AFDHRUVAL</span>
      </div>

      <div className="my-auto grid gap-3 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded border border-[#f4f1ea]/15 bg-[#242321] p-3.5">
          <div
            data-scan-beam
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-2 h-0.5 bg-[#d9381e]/80 shadow-[0_0_10px_#d9381e]"
          />
          <p className="text-[10px] font-mono-tabular uppercase text-[#f4f1ea]/50">
            Raw Legal T&amp;C
          </p>
          <div className="mt-2.5 space-y-1.5">
            <div className="h-1.5 w-full rounded-sm bg-[#f4f1ea]/25" />
            <div className="h-1.5 w-5/6 rounded-sm bg-[#f4f1ea]/20" />
            <div className="h-1.5 w-full rounded-sm bg-[#f4f1ea]/15" />
            <div className="h-1.5 w-4/6 rounded-sm bg-[#f4f1ea]/20" />
            <div className="h-1.5 w-11/12 rounded-sm bg-[#f4f1ea]/15" />
          </div>
          <p className="mt-3 font-mono-tabular text-[10px] text-[#f4f1ea]/45">14,200 words</p>
        </div>

        <div className="rounded bg-[#a9ebd5] p-3.5 text-[#141413]">
          <p className="text-[10px] font-mono-tabular uppercase text-[#141413]/60">AI Summary</p>
          <ul className="mt-2 space-y-1.5 text-[11px] font-medium leading-snug">
            <li>• Auto-renewal notice: 14 days</li>
            <li>• Data shared with analytics only</li>
            <li>• Cancel anytime from settings</li>
          </ul>
          <p className="mt-3 font-mono-tabular text-[10px] text-[#141413]/65">Parsed in 0.8s</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#f4f1ea]/65">
        <span className="font-serif-editorial text-lg italic text-[#f4f1ea]">Clarity</span>
        <span>Node.js · Express.js · Groq</span>
      </div>
    </div>
  );
}
