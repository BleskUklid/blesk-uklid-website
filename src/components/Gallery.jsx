import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const examples = [
  {
    title: 'Okenní tabule',
    desc: 'Profesionální mytí oken bez šmouh a zbytků',
    before: {
      style: {
        background: `
          repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(0,0,0,0.06) 48px, rgba(0,0,0,0.06) 49px),
          repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0,0,0,0.06) 48px, rgba(0,0,0,0.06) 49px),
          linear-gradient(135deg, #b8a898 0%, #c4b4a0 40%, #a89880 100%)
        `,
      },
      label: 'Před mytím',
      detail: 'Šmouhy, prach, zbytky',
    },
    after: {
      style: {
        background: `
          repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(100,160,255,0.04) 48px, rgba(100,160,255,0.04) 49px),
          repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(100,160,255,0.04) 48px, rgba(100,160,255,0.04) 49px),
          linear-gradient(135deg, #e8f4ff 0%, #c8e4ff 30%, #daeeff 60%, #f0f9ff 100%)
        `,
      },
      label: 'Po mytí',
      detail: 'Krystalicky čisté',
    },
  },
  {
    title: 'Koberec — tepování',
    desc: 'Hloubkové čištění a tepování koberců',
    before: {
      style: {
        background: `
          repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 8px),
          linear-gradient(160deg, #7a5e48 0%, #8b6a50 30%, #6e5240 60%, #7c6048 100%)
        `,
      },
      label: 'Před tepováním',
      detail: 'Skvrny, nečistoty',
    },
    after: {
      style: {
        background: `
          repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(200,200,200,0.04) 4px, rgba(200,200,200,0.04) 8px),
          linear-gradient(160deg, #f2ece4 0%, #ede5d8 30%, #e8dfd0 60%, #f0e8dc 100%)
        `,
      },
      label: 'Po tepování',
      detail: 'Svěží a čistý',
    },
  },
  {
    title: 'Car detailing',
    desc: 'Kompletní detailing interiéru vozidla',
    before: {
      style: {
        background: `
          linear-gradient(135deg, #1a1820 0%, #25222e 35%, #1e1c28 65%, #16141e 100%)
        `,
      },
      label: 'Před detailingem',
      detail: 'Prach, skvrny, špína',
      dark: true,
    },
    after: {
      style: {
        background: `
          radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 50%),
          linear-gradient(135deg, #0f1420 0%, #1a2035 35%, #151b30 65%, #0c1018 100%)
        `,
      },
      label: 'Po detailingu',
      detail: 'Zářivě čistý',
      dark: true,
    },
  },
];

function BeforeAfterSlider({ example }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  }, [dragging, updatePosition]);

  const onTouchMove = useCallback((e) => {
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', () => setDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', () => setDragging(false));
    };
  }, [dragging, onMouseMove]);

  const { before, after } = example;

  return (
    <div
      ref={containerRef}
      className="relative h-[340px] lg:h-[420px] rounded-3xl overflow-hidden select-none cursor-col-resize group"
      onMouseDown={(e) => { setDragging(true); updatePosition(e.clientX); }}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      onTouchMove={onTouchMove}
    >
      {/* Before layer */}
      <div className="absolute inset-0" style={before.style} />
      <div className="absolute bottom-5 left-5 flex flex-col gap-1">
        <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${before.dark ? 'bg-white/15 text-white' : 'bg-black/20 text-white'}`}>
          {before.label}
        </span>
        <span className={`text-xs font-medium ${before.dark ? 'text-white/60' : 'text-white/70'}`}>{before.detail}</span>
      </div>

      {/* After layer (clip) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, ...after.style }}
      />
      <div className="absolute bottom-5 flex flex-col items-end gap-1" style={{ right: `${Math.max(6, 100 - position - 2)}%` }}>
        <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${after.dark ? 'bg-brand-600/80 text-white' : 'bg-brand-600/90 text-white'}`}>
          {after.label}
        </span>
        <span className="text-xs font-medium text-white/70">{after.detail}</span>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="flex items-center gap-0.5">
            <ChevronLeft className="w-3 h-3 text-slate-600" />
            <ChevronRight className="w-3 h-3 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Overlay hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="glass rounded-full px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg">
          Táhněte pro porovnání
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState(0);

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.span
            className="section-badge mb-5 inline-flex"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Galerie
          </motion.span>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Naše práce{' '}
            <span className="text-gradient">mluví za vás</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-500 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Posuňte jezdec a přesvědčte se sami o rozdílu, který uděláme.
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center gap-2 mb-8 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {examples.map((ex, i) => (
            <button
              key={ex.title}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? 'bg-brand-700 text-white shadow-blue'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </motion.div>

        {/* Slider */}
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <BeforeAfterSlider example={examples[active]} />
        </motion.div>

        <motion.p
          className="text-center text-sm text-slate-400 mt-5 font-medium"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {examples[active].desc}
        </motion.p>
      </div>
    </section>
  );
}
