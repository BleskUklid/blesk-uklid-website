import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'Proč my', href: '#proc-my' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Reference', href: '#reference' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_#e2e8f0]'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center shadow-blue">
                <Zap className="w-5 h-5 text-gold-400 fill-gold-400" />
              </div>
              <div className="leading-none">
                <span className="block text-[17px] font-bold text-slate-900 tracking-tight">Blesk</span>
                <span className="block text-[11px] font-semibold text-brand-600 tracking-widest uppercase">Úklid</span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${scrolled ? 'text-slate-600 hover:text-brand-700 hover:bg-brand-50' : 'text-slate-700 hover:text-brand-700 hover:bg-white/60'}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+420606069959"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-700 transition-colors">
                <Phone className="w-4 h-4" />
                +420 606 069 959
              </a>
              <button
                onClick={() => handleNav('#kontakt')}
                className="px-5 py-2.5 rounded-xl bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800 transition-all duration-200 shadow-blue hover:shadow-blue-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Nezávazná poptávka
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="p-6 pt-24 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <a href="tel:+420606069959"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-600">
                    <Phone className="w-4 h-4" />
                    +420 606 069 959
                  </a>
                  <button
                    onClick={() => handleNav('#kontakt')}
                    className="px-5 py-3 rounded-xl bg-brand-700 text-white text-sm font-semibold text-center"
                  >
                    Nezávazná poptávka
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
