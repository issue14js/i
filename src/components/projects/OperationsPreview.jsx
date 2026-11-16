import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function OperationsPreview() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-ops-ping]', {
        scale: 1.65,
        opacity: 0,
        duration: 1.4,
        repeat: -1,
        ease: 'power2.out',
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col justify-between bg-[#e8e3d8] p-6 sm:p-8 text-[#141413]"
    >
      <div className="flex items-center justify-between border-b border-[#141413]/15 pb-3 text-[11px] font-mono-tabular text-[#141413]/65">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              data-ops-ping
              className="absolute inline-flex h-full w-full rounded-full bg-[#d9381e]"
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d9381e]" />
          </span>
          OPERATIONS · DARBHANGA
        </span>
        <span>2023 — PRESENT</span>
      </div>

      <div className="my-auto space-y-3">
        <div className="rounded border border-[#141413]/15 bg-[#f4f1ea] p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Galaxy Service (Daikin &amp; Hitachi)</span>
            <span className="font-mono-tabular text-[11px] text-[#d9381e] font-semibold">CCO</span>
          </div>
          <p className="mt-1 text-[11px] text-[#141413]/70">
            Inbound AC support, complaint resolution &amp; technician visit scheduling.
          </p>
        </div>

        <div className="rounded border border-[#141413]/15 bg-[#f4f1ea] p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Ugana Medico (Heart Hospital)</span>
            <span className="font-mono-tabular text-[11px] text-[#141413]/60">3 Yrs</span>
          </div>
          <p className="mt-1 text-[11px] text-[#141413]/70">
            Pharmacy counter sales, daily stock data entry, billing &amp; patient coordination.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#141413]/65">
        <span className="font-serif-editorial text-lg italic text-[#141413]">Precision</span>
        <span>Customer Care · Data Ops</span>
      </div>
    </div>
  );
}
