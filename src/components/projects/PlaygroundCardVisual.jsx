export function PlaygroundCardVisual({ card }) {
  const ink = card.darkText ? '#141413' : '#f4f1ea';
  const mutedInk = card.darkText ? 'rgba(20,20,19,0.62)' : 'rgba(244,241,234,0.68)';
  const borderInk = card.darkText ? 'rgba(20,20,19,0.18)' : 'rgba(244,241,234,0.22)';

  return (
    <div
      className="flex h-full w-full flex-col justify-between p-5 sm:p-7 transition-transform duration-500 ease-out group-hover:scale-[1.015]"
      style={{ color: ink }}
    >
      <div
        className="flex items-center justify-between border-b pb-2.5 text-[11px] font-mono-tabular"
        style={{ borderColor: borderInk, color: mutedInk }}
      >
        <span>{card.category}</span>
        <span>{card.year}</span>
      </div>

      {/* Central 2D Geometric / UI Study */}
      <div className="my-auto flex flex-col items-start justify-center py-4">
        {card.variant === 'ivory-system' && (
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded border border-white/30 bg-[#f4f1ea] transition-transform duration-300 group-hover:-translate-y-1" />
            <div className="h-14 w-14 rounded border border-white/30 bg-[#e8e3d8] transition-transform duration-300 delay-75 group-hover:-translate-y-1.5" />
            <div className="h-14 w-14 rounded border border-white/30 bg-[#d9381e] transition-transform duration-300 delay-150 group-hover:-translate-y-2" />
          </div>
        )}

        {card.variant === 'groq-parser' && (
          <div className="w-full max-w-[260px] space-y-2 border p-3" style={{ borderColor: borderInk }}>
            <div className="text-[10px] font-mono-tabular uppercase">Summary Output</div>
            <div className="h-2 w-11/12 bg-current opacity-80 transition-all duration-500 group-hover:w-full" />
            <div className="h-2 w-4/5 bg-current opacity-50 transition-all duration-500 group-hover:w-11/12" />
            <div className="h-2 w-3/4 bg-current opacity-35 transition-all duration-500 group-hover:w-5/6" />
          </div>
        )}

        {card.variant === 'gsap-motion' && (
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1 flex-1 bg-current opacity-35 transition-all duration-500 group-hover:opacity-90" />
              <span className="font-mono-tabular text-[11px]">power4.out · 2D</span>
            </div>
            <p className="font-serif-editorial text-4xl italic transition-transform duration-300 group-hover:translate-x-2">
              Velocity
            </p>
          </div>
        )}

        {card.variant === 'magnetic-2d' && (
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-current font-mono-tabular text-xs transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1">
              dx/dy
            </div>
            <svg viewBox="0 0 80 40" className="h-10 w-20">
              <path
                d="M 4 32 Q 40 2, 76 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            </svg>
          </div>
        )}

        {card.variant === 'crm-pipeline' && (
          <div className="grid w-full max-w-[240px] grid-cols-3 gap-2">
            <div className="h-14 border p-2 text-[10px] font-mono-tabular" style={{ borderColor: borderInk }}>
              New
            </div>
            <div className="h-14 border p-2 text-[10px] font-mono-tabular" style={{ borderColor: borderInk }}>
              Warm
            </div>
            <div className="h-14 bg-[#f4f1ea] p-2 text-[10px] font-mono-tabular text-[#141413] transition-transform duration-300 group-hover:-translate-y-1">
              Won
            </div>
          </div>
        )}

        {card.variant === 'billing-grid' && (
          <div className="grid w-full max-w-[380px] grid-cols-4 gap-2 font-mono-tabular text-[11px]">
            <span className="border-b pb-1" style={{ borderColor: borderInk }}>SKU</span>
            <span className="border-b pb-1" style={{ borderColor: borderInk }}>BATCH</span>
            <span className="border-b pb-1" style={{ borderColor: borderInk }}>STOCK</span>
            <span className="border-b pb-1" style={{ borderColor: borderInk }}>STATUS</span>
            <span>MED-402</span>
            <span>B-209</span>
            <span>148</span>
            <span>OK</span>
            <span>MED-811</span>
            <span>B-314</span>
            <span>024</span>
            <span className="text-[#d9381e] font-semibold">REORDER</span>
          </div>
        )}

        {card.variant === 'jwt-auth' && (
          <div className="font-mono-tabular text-xs leading-relaxed">
            <p className="opacity-65">POST /api/auth/login → 200 OK</p>
            <p className="mt-1 font-medium">Authorization: Bearer eyJhbGciOiJIUzI1Ni...</p>
          </div>
        )}

        {card.variant === 'dispatch-map' && (
          <div className="space-y-1.5 font-mono-tabular text-[11px]">
            <p>09:30 · Daikin Split AC · Benta</p>
            <p className="opacity-70">11:45 · Hitachi Inverter · Laheriasarai</p>
            <p className="opacity-50">14:15 · Preventive Check · Sahganj</p>
          </div>
        )}

        {card.variant === 'type-study' && (
          <div className="text-4xl leading-none tracking-[-0.04em]">
            <span className="font-serif-editorial italic">A</span>nkit{' '}
            <span className="font-serif-editorial italic">K</span>umar
          </div>
        )}

        {card.variant === 'dsa-matrix' && (
          <div className="grid grid-cols-4 gap-1.5 font-mono-tabular text-[11px]">
            {['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'].map((c) => (
              <span key={c} className="border px-2 py-1" style={{ borderColor: borderInk }}>
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-medium tracking-[-0.025em]">{card.title}</h3>
        <p className="mt-1 text-xs" style={{ color: mutedInk }}>
          {card.stack}
        </p>
      </div>
    </div>
  );
}
