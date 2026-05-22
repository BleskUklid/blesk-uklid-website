import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Jana Kovářová',
    location: 'Praha – Žižkov',
    service: 'Generální úklid',
    rating: 5,
    text: 'Absolutně spokojená! Tým přišel přesně na čas, byl milý a profesionální. Byt vypadal lépe než po nastěhování. Žádná skrytá cena, přesně to co slíbili. Rozhodně budu volat znovu.',
    initials: 'JK',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Martin Novák',
    location: 'Ústí nad Labem',
    service: 'Pravidelné úklidy',
    rating: 5,
    text: 'Používáme Blesk Úklid na pravidelný týdenní úklid kanceláře. Vždy perfektní, vždy spolehliví. Za rok jsme neměli jediný problém. Skvělá komunikace, rychlá reakce. Doporučuji všem.',
    initials: 'MN',
    color: 'from-brand-500 to-brand-700',
  },
  {
    name: 'Petra Svobodová',
    location: 'Teplice',
    service: 'Car detailing',
    rating: 5,
    text: 'Car detailing byl naprosto fantastický. Moje auto po 5 letech vypadá jako nové. Pánové byli velmi pečliví, dostali se do každého koutu. Výsledek předčil moje očekávání. Cena odpovídá kvalitě.',
    initials: 'PS',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Roman Horák',
    location: 'Praha – Dejvice',
    service: 'Mytí oken',
    rating: 5,
    text: 'Konečně okna bez šmouh! Bydlím ve 4. patře a vždy jsem se bál mytí oken zvenku. Blesk Úklid to zvládl naprosto bezpečně a profesionálně. Výsledek byl úžasný, světlo teď krásně proniká dovnitř.',
    initials: 'RH',
    color: 'from-emerald-500 to-teal-600',
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const navigate = (next) => {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  };

  const prev = () => navigate((current - 1 + reviews.length) % reviews.length);
  const next = () => navigate((current + 1) % reviews.length);

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <section id="reference" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            className="section-badge mb-5 inline-flex"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Reference
          </motion.span>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Co říkají naši{' '}
            <span className="text-gradient">klienti</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-500"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stovky spokojených klientů po celém Ústeckém kraji a Praze.
          </motion.p>
        </div>

        {/* All cards — desktop grid */}
        <div className="hidden lg:grid grid-cols-2 gap-5 mb-10">
          {reviews.map(({ name, location, service, rating, text, initials, color }, i) => (
            <motion.div
              key={name}
              className="group p-7 rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-1 bg-white"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{name}</div>
                    <div className="text-xs text-slate-500">{location}</div>
                  </div>
                </div>
                <Quote className="w-5 h-5 text-slate-200 flex-shrink-0" />
              </div>

              <Stars count={rating} />

              <p className="mt-4 text-slate-600 text-sm leading-relaxed">{text}</p>

              <div className="mt-5 pt-5 border-t border-slate-50">
                <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  {service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-7 border border-slate-100 rounded-3xl bg-white"
              >
                {(() => {
                  const { name, location, service, rating, text, initials, color } = reviews[current];
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold`}>
                          {initials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{name}</div>
                          <div className="text-xs text-slate-500">{location}</div>
                        </div>
                      </div>
                      <Stars count={rating} />
                      <p className="mt-4 text-slate-600 text-sm leading-relaxed">{text}</p>
                      <div className="mt-5 pt-5 border-t border-slate-50">
                        <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{service}</span>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => navigate(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-brand-600' : 'w-1.5 bg-slate-300'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Rating summary */}
        <motion.div
          className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-brand-700">5.0</div>
            <div>
              <Stars count={5} />
              <div className="text-sm text-slate-600 mt-1 font-medium">Průměrné hodnocení klientů</div>
            </div>
          </div>
          <button
            onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-xl bg-brand-700 text-white font-semibold text-sm hover:bg-brand-800 transition-colors shadow-blue whitespace-nowrap"
          >
            Přidejte se k nim
          </button>
        </motion.div>
      </div>
    </section>
  );
}
