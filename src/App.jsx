import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-brand-600 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

function FloatingCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="tel:+420606069959"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl
            bg-brand-700 text-white font-semibold text-sm shadow-blue-lg
            hover:bg-brand-800 hover:-translate-y-0.5 transition-all duration-300"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <Phone className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="hidden sm:block">+420 606 069 959</span>
          <span className="sm:hidden">Zavolat</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      {/* Custom cursor — only on non-touch devices */}
      <CustomCursor />

      {/* Scroll progress line */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main page */}
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <CTASection />
        <Contact />
      </main>

      <Footer />

      {/* Floating CTA */}
      <FloatingCallButton />
    </>
  );
}
