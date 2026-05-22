import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Award, CheckCircle2, Phone } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stats = [
  { icon: Users, value: '500+', label: 'spokojených klientů' },
  { icon: Star, value: '5.0★', label: 'průměrné hodnocení' },
  { icon: Award, value: '3 roky', label: 'na trhu' },
];

export default function Hero() {
  const scrollToContact = () =>
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToServices = () =>
    document.querySelector('#sluzby')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-bg opacity-60" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/80 via-white/40 to-white" />
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-50/60 to-transparent" />

      {/* Decorative rings */}
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div
          className="w-[520px] h-[520px] rounded-full border border-brand-200/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-8 rounded-full border border-brand-300/30 animate-pulse-slow" />
        <div className="absolute inset-16 rounded-full border border-brand-400/20" />
        <div className="absolute inset-24 rounded-full bg-gradient-to-br from-brand-100/60 to-brand-200/40 blur-sm" />
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-brand-600/90 to-brand-800 shadow-blue-lg flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl font-bold">⚡</div>
            <div className="text-xs font-semibold tracking-widest mt-1 opacity-80">BLESK</div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <motion.div
        className="absolute top-[22%] right-[26%] hidden xl:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="glass rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-semibold text-slate-700">Dnes dostupní</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] right-[22%] hidden xl:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="glass rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
            ))}
          </div>
          <p className="text-xs font-medium text-slate-600">Jana K., Praha</p>
          <p className="text-xs text-slate-500 mt-0.5">"Naprosto perfektní práce!"</p>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="section-badge mb-6 inline-flex">
              <span className="text-brand-700">⚡</span>
              Profesionální úklidové služby
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-6"
            variants={fadeUp} initial="hidden" animate="show" custom={1}
          >
            Váš prostor,{' '}
            <br />
            <span className="text-gradient">dokonale</span>
            <br />
            čistý.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl"
            variants={fadeUp} initial="hidden" animate="show" custom={2}
          >
            Profesionální úklid v{' '}
            <span className="font-semibold text-slate-700">Ústeckém kraji</span> a{' '}
            <span className="font-semibold text-slate-700">Praze</span>. Spolehlivost,
            rychlost a bezchybná čistota — každý den.
          </motion.p>

          {/* Checks */}
          <motion.div
            className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
            variants={fadeUp} initial="hidden" animate="show" custom={3}
          >
            {['Bezplatná konzultace', 'Pojištěná firma', 'Garance kvality'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                {item}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            variants={fadeUp} initial="hidden" animate="show" custom={4}
          >
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-brand-700 text-white font-semibold text-base hover:bg-brand-800 transition-all duration-300 shadow-blue hover:shadow-blue-lg hover:-translate-y-1 active:translate-y-0"
            >
              Nezávazná poptávka
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToServices}
              className="flex items-center gap-2.5 px-7 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold text-base hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50 transition-all duration-300"
            >
              Naše služby
            </button>
          </motion.div>

          {/* Phone quick call */}
          <motion.a
            href="tel:+420606069959"
            className="inline-flex items-center gap-2 mt-6 text-sm text-slate-500 hover:text-brand-700 transition-colors"
            variants={fadeUp} initial="hidden" animate="show" custom={5}
          >
            <Phone className="w-3.5 h-3.5" />
            Volejte ihned: <span className="font-semibold text-slate-700">+420 606 069 959</span>
          </motion.a>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-16 lg:mt-20 grid grid-cols-3 gap-4 max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="glass rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <Icon className="w-5 h-5 text-brand-600 mb-2" />
              <div className="text-2xl font-bold text-slate-900">{value}</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5 leading-snug">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">Scrollovat</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-slate-300 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
