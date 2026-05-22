import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Droplets, RefreshCw, Home, Wind, Car } from 'lucide-react';

const services = [
  {
    icon: Droplets,
    title: 'Mytí oken',
    desc: 'Krystalicky čistá okna bez šmouh. Používáme profesionální techniku a přípravky pro dokonalý výsledek na jakékoliv výšce.',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
    tag: 'Nejoblíbenější',
  },
  {
    icon: RefreshCw,
    title: 'Pravidelné úklidy',
    desc: 'Pravidelná péče o váš domov nebo kancelář. Flexibilní frekvence — týdenně, čtrnáctidenně nebo měsíčně.',
    color: 'from-brand-500 to-brand-700',
    bg: 'bg-brand-50',
    tag: null,
  },
  {
    icon: Home,
    title: 'Generální úklidy',
    desc: 'Kompletní hloubkový úklid každého koutu. Ideální pro stěhování, jarní úklid nebo přípravu nemovitosti k prodeji.',
    color: 'from-violet-500 to-purple-700',
    bg: 'bg-violet-50',
    tag: null,
  },
  {
    icon: Wind,
    title: 'Tepování',
    desc: 'Profesionální čištění koberců, čalouněného nábytku a matrací. Odstraníme skvrny, prach a alergeny.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    tag: null,
  },
  {
    icon: Car,
    title: 'Car detailing',
    desc: 'Precizní čištění interiéru i exteriéru vašeho vozidla. Váš vůz bude zářit jako z autosalonu.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    tag: 'Novinka',
  },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { icon: Icon, title, desc, color, bg, tag } = service;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-3xl p-7 border border-slate-100
        hover:border-slate-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl`} />

      {/* Tag */}
      {tag && (
        <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gold-400/15 text-amber-700">
          {tag}
        </span>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-5`}>
        <div className={`bg-gradient-to-br ${color} rounded-xl p-2`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-2.5 transition-all duration-300">
        Zjistit více
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="sluzby" className="py-24 lg:py-32 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-badge mb-5">Naše služby</span>
          </motion.div>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Co pro vás{' '}
            <span className="text-gradient">uděláme</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-500 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Komplexní řada profesionálních úklidových služeb přizpůsobených přesně vašim potřebám.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-slate-500 mb-4">
            Potřebujete jinou službu nebo na míru šitý plán?
          </p>
          <button
            onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-xl border-2 border-brand-200 text-brand-700 font-semibold text-sm
              hover:bg-brand-700 hover:text-white hover:border-brand-700 transition-all duration-300"
          >
            Domluvme se na míru
          </button>
        </motion.div>
      </div>
    </section>
  );
}
