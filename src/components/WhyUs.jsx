import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Leaf, Clock, Sparkles, ThumbsUp, BadgeCheck } from 'lucide-react';

const stats = [
  { value: 500, suffix: '+', label: 'Spokojených klientů' },
  { value: 5.0, suffix: '★', label: 'Průměrné hodnocení' },
  { value: 3, suffix: '+', label: 'Roky zkušeností' },
  { value: 100, suffix: '%', label: 'Garance spokojenosti' },
];

const features = [
  {
    icon: BadgeCheck,
    title: 'Certifikovaní odborníci',
    desc: 'Proškolený tým s certifikátem profesionálního úklidu. Víme přesně, jak na každý povrch.',
  },
  {
    icon: Sparkles,
    title: 'Prémiové přípravky',
    desc: 'Používáme pouze profesionální čisticí prostředky s vysokou účinností a šetrností k povrchům.',
  },
  {
    icon: ShieldCheck,
    title: 'Pojištění a záruka',
    desc: 'Jsme plně pojištěni. Pokud nejste spokojeni, vrátíme se a napravíme to — zdarma.',
  },
  {
    icon: Clock,
    title: 'Flexibilní termíny',
    desc: 'Přizpůsobíme se vašemu rozvrhu. Víkendy, svátky, brzká rána — jsme tu, kdy potřebujete.',
  },
  {
    icon: Leaf,
    title: 'Ekologický přístup',
    desc: 'Kdykoli je to možné, volíme ekologické alternativy. Čisto doma i pro planetu.',
  },
  {
    icon: ThumbsUp,
    title: 'Rychlá odezva',
    desc: 'Odpovíme do 2 hodin. Urgentní úklid? Jsme schopni reagovat do 24 hodin od objednávky.',
  },
];

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  const isFloat = target % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(target, current + increment);
      setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, isFloat]);

  return (
    <span>
      {isFloat ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section id="proc-my" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="max-w-2xl mb-16 lg:mb-20">
          <motion.span
            className="section-badge mb-5 inline-flex"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Proč Blesk Úklid?
          </motion.span>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Čistota na úrovni,
            <br />
            <span className="text-gradient">na které záleží</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nejsme jen další úklidová firma. Jsme tým lidí, kteří se o svou práci
            skutečně starají — a výsledky jsou vždy vidět.
          </motion.p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              className="relative p-6 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 text-white overflow-hidden"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/5" />
              <div className="absolute -bottom-6 -left-4 w-20 h-20 rounded-full bg-white/5" />
              <div className="relative">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  <CountUp target={value} suffix={suffix} inView={statsInView} />
                </div>
                <div className="text-sm font-medium text-blue-200">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="group flex gap-5 p-6 rounded-2xl hover:bg-slate-50 transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors duration-300">
                <Icon className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
