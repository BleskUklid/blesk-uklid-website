import { Zap, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const navLinks = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'Proč my', href: '#proc-my' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Reference', href: '#reference' },
  { label: 'Kontakt', href: '#kontakt' },
];

const services = [
  'Mytí oken',
  'Pravidelné úklidy',
  'Generální úklidy',
  'Tepování',
  'Car detailing',
];

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gold-400 fill-gold-400" />
              </div>
              <div className="leading-none">
                <span className="block text-[17px] font-bold text-white tracking-tight">Blesk</span>
                <span className="block text-[11px] font-semibold text-brand-400 tracking-widest uppercase">Úklid</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Profesionální úklidové služby v Ústeckém kraji a Praze. Čistota, na které záleží.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Navigace</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNav(href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Služby</h4>
            <ul className="flex flex-col gap-2">
              {services.map(s => (
                <li key={s}>
                  <button
                    onClick={() => handleNav('#sluzby')}
                    className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Kontakt</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+420606069959"
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" />
                <span className="font-medium">+420 606 069 959</span>
              </a>
              <a href="mailto:info@bleskuklid.cz"
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" />
                <span className="font-medium">info@bleskuklid.cz</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" />
                <span className="font-medium">Ústecký kraj<br />Praha a okolí</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 font-medium">
            © {new Date().getFullYear()} Blesk Úklid. Všechna práva vyhrazena.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Ochrana soukromí</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Podmínky</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
