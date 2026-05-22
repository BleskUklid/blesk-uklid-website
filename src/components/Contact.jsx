import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

const services = [
  'Mytí oken',
  'Pravidelný úklid',
  'Generální úklid',
  'Tepování',
  'Car detailing',
  'Jiné',
];

function FloatingLabel({ label, children }) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass = (name) =>
    `w-full px-4 py-4 rounded-xl border text-slate-900 text-sm font-medium bg-white
     placeholder-slate-400 transition-all duration-200
     ${focused === name
       ? 'border-brand-400 ring-4 ring-brand-50 shadow-[0_0_0_1px_rgba(37,99,235,0.15)]'
       : 'border-slate-200 hover:border-slate-300'}`;

  return (
    <section id="kontakt" className="py-24 lg:py-32 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div ref={ref}>
            <motion.span
              className="section-badge mb-5 inline-flex"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Kontakt
            </motion.span>
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Pojďme se{' '}
              <span className="text-gradient">domluvit</span>
            </motion.h2>
            <motion.p
              className="text-lg text-slate-500 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Vyplňte formulář a my se vám ozveme do 2 hodin s nezávaznou
              cenovou nabídkou přesně na míru vašim potřebám.
            </motion.p>

            {/* Contact cards */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { icon: Phone, label: 'Telefon', value: '+420 606 069 959', href: 'tel:+420606069959' },
                { icon: Mail, label: 'E-mail', value: 'info@bleskuklid.cz', href: 'mailto:info@bleskuklid.cz' },
                { icon: MapPin, label: 'Oblast působení', value: 'Ústecký kraj & Praha', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-sm font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold text-slate-800">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center py-12 gap-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Zpráva odeslána!</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    Děkujeme za zájem. Ozveme se vám do 2 hodin s nabídkou přesně na míru.
                  </p>
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                  className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                >
                  Odeslat další zprávu
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block uppercase tracking-wide">Jméno *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jan"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      className={inputClass('name')}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block uppercase tracking-wide">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jan@email.cz"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      className={inputClass('email')}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block uppercase tracking-wide">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+420 000 000 000"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                    className={inputClass('phone')}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block uppercase tracking-wide">Typ služby</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onFocus={() => setFocused('service')}
                    onBlur={() => setFocused('')}
                    className={`${inputClass('service')} appearance-none`}
                  >
                    <option value="">Vyberte službu...</option>
                    {services.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block uppercase tracking-wide">Zpráva *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Popište nám co potřebujete — velikost prostoru, frekvenci, termín..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    className={`${inputClass('message')} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl
                    bg-brand-700 text-white font-semibold text-base
                    hover:bg-brand-800 transition-all duration-300
                    shadow-blue hover:shadow-blue-lg hover:-translate-y-0.5 active:translate-y-0 mt-1"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Odeslat poptávku
                </button>

                <p className="text-center text-xs text-slate-400">
                  Reaguji do 2 hodin · Bez závazků · 100% diskrétní
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
