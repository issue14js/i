import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const STAGES = [
  { stage: 'Qualified', count: '18', val: '₹4.2L' },
  { stage: 'Proposal', count: '09', val: '₹2.8L' },
  { stage: 'Closed', count: '14', val: '₹6.5L' },
];

export function VanguardPreview({ compact = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-vanguard-pulse]', {
        opacity: 0.45,
        scale: 0.92,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col justify-between bg-[#292724] p-6 sm:p-8 text-[#f4f1ea]"
    >
      <div className="flex items-center justify-between border-b border-[#f4f1ea]/15 pb-3 text-[11px] font-mono-tabular uppercase tracking-wider text-[#f4f1ea]/65">
        <span>Tactile Ivory System</span>
        <span>React · Context API</span>
      </div>

      <div className="my-auto rounded-lg bg-[#fefff8] p-4 sm:p-5 text-[#141413] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#141413]/10 pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#141413]/55">Pipeline</p>
            <p className="text-sm font-semibold tracking-tight">Vanguard CRM</p>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono-tabular text-xs font-medium text-[#141413]/75">
            <span
              data-vanguard-pulse
              className="h-2 w-2 rounded-full bg-[#d9381e]"
              aria-hidden="true"
            />
            Auth · Active
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-left">
          {STAGES.map((col) => (
            <div
              key={col.stage}
              className="rounded border border-[#141413]/10 bg-[#e8e3d8]/55 p-2.5"
            >
              <p className="text-[10px] text-[#141413]/60">{col.stage}</p>
              <p className="mt-1 font-mono-tabular text-base font-semibold">{col.count}</p>
              <p className="font-mono-tabular text-[10px] text-[#141413]/60">{col.val}</p>
            </div>
          ))}
        </div>
        {!compact && (
          <div className="mt-3 space-y-1.5 border-t border-[#141413]/10 pt-2.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="font-medium">Multi-level Filter</span>
              <span className="font-mono-tabular text-[#141413]/60">Stage · Source · Date</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">State Store</span>
              <span className="font-mono-tabular text-[#141413]/60">Context + Reducers</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#f4f1ea]/60">
        <span className="font-serif-editorial text-lg italic text-[#f4f1ea]">Vanguard</span>
        <span>Login · Register · Leads</span>
      </div>
    </div>
  );
}
