import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900" />
      <div className="absolute inset-0 dot-bg opacity-[0.07]" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />

      <div ref={ref} className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-gold-300 bg-white/10 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            Začněte dnes
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Připraveni na{' '}
          <br className="hidden sm:block" />
          <span className="text-gold-300">dokonalou čistotu?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-blue-200 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Kontaktujte nás ještě dnes a získejte nezávaznou cenovou nabídku.
          Reagujeme do 2 hodin.
        </motion.p>

        {/* Contact options */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="tel:+420606069959"
            className="group flex items-center gap-3 px-7 py-4 rounded-2xl bg-white text-brand-800 font-bold text-base hover:bg-gold-300 hover:text-brand-900 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full sm:w-auto justify-center"
          >
            <Phone className="w-5 h-5" />
            +420 606 069 959
          </a>

          <button
            onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 px-7 py-4 rounded-2xl bg-white/10 text-white font-semibold text-base
              hover:bg-white/20 border border-white/20 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            Napsat zprávu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Email */}
        <motion.a
          href="mailto:info@bleskuklid.cz"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Mail className="w-4 h-4" />
          info@bleskuklid.cz
        </motion.a>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-12 pt-10 border-t border-white/10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {['Bez závazků', 'Reakce do 2 hodin', 'Pojištěná firma', 'Garance kvality'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-sm text-blue-200">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
