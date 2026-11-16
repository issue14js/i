import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefreshCw, Sparkles } from 'lucide-react';
import { isReducedMotion } from '../../utils/gsapReveal.js';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_BODIES = [
  { label: 'React.js', color: '#141413', text: '#f4f1ea', r: 38 },
  { label: 'Node.js', color: '#d9381e', text: '#f4f1ea', r: 36 },
  { label: 'GSAP 2D', color: '#a9ebd5', text: '#141413', r: 38 },
  { label: 'MongoDB', color: '#f4f1ea', text: '#141413', r: 37 },
  { label: 'Groq AI', color: '#d7ff46', text: '#141413', r: 35 },
  { label: 'Express', color: '#141413', text: '#f4f1ea', r: 35 },
  { label: 'DSA', color: '#d9381e', text: '#f4f1ea', r: 32 },
  { label: 'Ops CCO', color: '#f4f1ea', text: '#141413', r: 36 },
];

/**
 * Interactive 2D Rigid-Body Gravity & Scroll-Impulse Sandbox:
 * - Real 2D gravity, wall/floor restitution, and circle-circle elastic collisions
 * - ScrollTrigger injects vertical velocity impulse when user scrolls past fast
 * - Pointer grab & throw + hover repulsion + Zero-G toggle
 */
export function PhysicsTokenTray({ title = 'Interactive 2D Physics Stack' }) {
  const [zeroG, setZeroG] = useState(false);
  const zeroGRef = useRef(false);
  const stageRef = useRef(null);
  const bodyElsRef = useRef([]);
  const simRef = useRef([]);
  const dragRef = useRef({ index: -1, lastX: 0, lastY: 0, vx: 0, vy: 0 });
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    zeroGRef.current = zeroG;
    if (zeroG) {
      simRef.current.forEach((b) => {
        b.vy -= 2.2;
        b.vx += (Math.random() - 0.5) * 3;
      });
    }
  }, [zeroG]);

  const impulseKick = useCallback((strength = 1) => {
    simRef.current.forEach((b) => {
      b.vy -= (6 + Math.random() * 5) * strength;
      b.vx += (Math.random() - 0.5) * 7 * strength;
      b.vr += (Math.random() - 0.5) * 6;
    });
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const width = stage.clientWidth || 720;
    const height = stage.clientHeight || 280;

    simRef.current = INITIAL_BODIES.map((spec, i) => {
      const cols = Math.max(4, Math.floor(width / 110));
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        ...spec,
        x: 70 + col * ((width - 140) / Math.max(cols - 1, 1)),
        y: 55 + row * 70,
        vx: (Math.random() - 0.5) * 2.5,
        vy: 0,
        rot: (Math.random() - 0.5) * 12,
        vr: 0,
      };
    });

    if (isReducedMotion()) {
      simRef.current.forEach((b, i) => {
        const el = bodyElsRef.current[i];
        if (el) {
          el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
        }
      });
      return;
    }

    let rafId = 0;

    const st = ScrollTrigger.create({
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = Math.abs(self.getVelocity());
        if (v > 380) {
          const kick = Math.min(v / 1800, 0.9);
          simRef.current.forEach((b) => {
            if (b.y > stage.clientHeight - b.r - 12) {
              b.vy -= (2.5 + Math.random() * 3.5) * kick;
              b.vx += (Math.random() - 0.5) * 2.4 * kick;
            }
          });
        }
      },
    });

    const step = () => {
      const w = stage.clientWidth || 720;
      const h = stage.clientHeight || 280;
      const bodies = simRef.current;
      const gravity = zeroGRef.current ? 0 : 0.34;
      const dragIdx = dragRef.current.index;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (i === dragIdx) continue;

        // Ambient float in zero-g
        if (zeroGRef.current) {
          b.vx *= 0.996;
          b.vy *= 0.996;
          if (Math.hypot(b.vx, b.vy) < 0.35) {
            b.vx += (Math.random() - 0.5) * 0.2;
            b.vy += (Math.random() - 0.5) * 0.2;
          }
        } else {
          b.vy += gravity;
          b.vx *= 0.992;
          b.vy *= 0.995;
        }

        // Subtle pointer repulsion when hovering
        if (pointerRef.current.active && dragIdx === -1) {
          const dx = b.x - pointerRef.current.x;
          const dy = b.y - pointerRef.current.y;
          const dist = Math.hypot(dx, dy);
          const minDist = b.r + 36;
          if (dist > 0.1 && dist < minDist) {
            const push = ((minDist - dist) / minDist) * 0.65;
            b.vx += (dx / dist) * push;
            b.vy += (dy / dist) * push;
          }
        }

        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vr + b.vx * 0.35;
        b.vr *= 0.96;

        // Walls & floor bounce
        if (b.x - b.r < 6) {
          b.x = 6 + b.r;
          b.vx = Math.abs(b.vx) * 0.78;
        } else if (b.x + b.r > w - 6) {
          b.x = w - 6 - b.r;
          b.vx = -Math.abs(b.vx) * 0.78;
        }

        if (b.y - b.r < 6) {
          b.y = 6 + b.r;
          b.vy = Math.abs(b.vy) * 0.78;
        } else if (b.y + b.r > h - 6) {
          b.y = h - 6 - b.r;
          b.vy = -Math.abs(b.vy) * 0.68;
          b.vx *= 0.96;
        }
      }

      // 2D Elastic Circle-to-Circle Collisions
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const b = bodies[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.r + b.r + 4;
          if (dist > 0.01 && dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            if (i !== dragIdx) {
              a.x -= nx * overlap * 0.5;
              a.y -= ny * overlap * 0.5;
            }
            if (j !== dragIdx) {
              b.x += nx * overlap * 0.5;
              b.y += ny * overlap * 0.5;
            }

            const dvx = b.vx - a.vx;
            const dvy = b.vy - a.vy;
            const relVel = dvx * nx + dvy * ny;
            if (relVel < 0) {
              const restitution = 0.78;
              const impulse = (-(1 + restitution) * relVel) * 0.5;
              if (i !== dragIdx) {
                a.vx -= impulse * nx;
                a.vy -= impulse * ny;
              }
              if (j !== dragIdx) {
                b.vx += impulse * nx;
                b.vy += impulse * ny;
              }
            }
          }
        }
      }

      // Paint DOM nodes via compositor-only translate3d + rotate
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const el = bodyElsRef.current[i];
        if (el) {
          el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0) rotate(${b.rot.toFixed(1)}deg)`;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
    };
  }, []);

  const getRelativePoint = (e) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (index, e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const pt = getRelativePoint(e);
    dragRef.current = { index, lastX: pt.x, lastY: pt.y, vx: 0, vy: 0 };
    const b = simRef.current[index];
    if (b) {
      b.vx = 0;
      b.vy = 0;
    }
  };

  const handleStagePointerMove = (e) => {
    const pt = getRelativePoint(e);
    pointerRef.current = { x: pt.x, y: pt.y, active: true };

    const drag = dragRef.current;
    if (drag.index !== -1) {
      const b = simRef.current[drag.index];
      const w = stageRef.current?.clientWidth || 720;
      const h = stageRef.current?.clientHeight || 280;
      if (b) {
        drag.vx = (pt.x - drag.lastX) * 0.75;
        drag.vy = (pt.y - drag.lastY) * 0.75;
        b.x = Math.max(b.r + 6, Math.min(w - b.r - 6, pt.x));
        b.y = Math.max(b.r + 6, Math.min(h - b.r - 6, pt.y));
        drag.lastX = pt.x;
        drag.lastY = pt.y;
      }
    }
  };

  const handleStagePointerUp = () => {
    const drag = dragRef.current;
    if (drag.index !== -1) {
      const b = simRef.current[drag.index];
      if (b) {
        b.vx = Math.max(-18, Math.min(18, drag.vx));
        b.vy = Math.max(-18, Math.min(18, drag.vy));
      }
      dragRef.current.index = -1;
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-[var(--page-padding)] py-12">
      <div className="border border-[#141413]/20 bg-[#e8e3d8]/55">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#141413]/15 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#d9381e]" aria-hidden="true" />
            <span className="font-mono-tabular text-xs font-medium uppercase tracking-wider text-[#141413]">
              {title}
            </span>
            <span className="hidden sm:inline font-mono-tabular text-[11px] text-[#141413]/55">
              Drag, toss, or scroll fast to bounce tokens
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZeroG((z) => !z)}
              className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                zeroG
                  ? 'border-[#d9381e] bg-[#d9381e] text-[#f4f1ea]'
                  : 'border-[#141413]/25 bg-[#f4f1ea] text-[#141413] hover:bg-[#141413] hover:text-[#f4f1ea]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{zeroG ? 'Zero-G Active' : 'Zero-G'}</span>
            </button>

            <button
              type="button"
              onClick={() => impulseKick(1)}
              className="inline-flex items-center gap-1.5 border border-[#141413]/25 bg-[#f4f1ea] px-3 py-1.5 text-xs font-semibold text-[#141413] hover:bg-[#141413] hover:text-[#f4f1ea] transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Shake</span>
            </button>
          </div>
        </div>

        <div
          ref={stageRef}
          onPointerMove={handleStagePointerMove}
          onPointerUp={handleStagePointerUp}
          onPointerLeave={() => {
            pointerRef.current.active = false;
            handleStagePointerUp();
          }}
          className="relative h-[270px] sm:h-[300px] w-full overflow-hidden touch-none select-none bg-[radial-gradient(#141413_1px,transparent_1px)] [background-size:24px_24px] [background-position:0_0] bg-[#f4f1ea]/55"
        >
          {INITIAL_BODIES.map((body, idx) => (
            <div
              key={body.label}
              ref={(el) => {
                bodyElsRef.current[idx] = el;
              }}
              onPointerDown={(e) => handlePointerDown(idx, e)}
              style={{
                width: body.r * 2,
                height: body.r * 2,
                backgroundColor: body.color,
                color: body.text,
              }}
              className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-[#141413]/25 font-mono-tabular text-[11px] font-semibold shadow-md cursor-grab active:cursor-grabbing will-change-transform select-none"
            >
              {body.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
