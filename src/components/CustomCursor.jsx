import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const sparkleCounter = useRef(0);
  const lastSparkleTime = useRef(0);
  const lastPos = useRef({ x: -100, y: -100 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const addSparkle = useCallback((x, y) => {
    const now = Date.now();
    if (now - lastSparkleTime.current < 90) return;
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    if (speed < 4) return;
    lastSparkleTime.current = now;
    lastPos.current = { x, y };

    const id = sparkleCounter.current++;
    const angle = Math.random() * 360;
    const dist = 12 + Math.random() * 16;
    setSparkles(prev => [...prev.slice(-6), { id, x, y, angle, dist }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 550);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      addSparkle(e.clientX, e.clientY);
    };

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]');
      setIsHovering(!!interactive);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [mouseX, mouseY, addSparkle, isVisible]);

  return (
    <div className="cursor-wrapper" aria-hidden="true">
      {/* Sparkle trail */}
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-brand-400"
          style={{ left: s.x, top: s.y, width: 3, height: 3 }}
          initial={{ opacity: 0.7, scale: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: 0,
            x: Math.cos((s.angle * Math.PI) / 180) * s.dist,
            y: Math.sin((s.angle * Math.PI) / 180) * s.dist,
          }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ left: s.x - 1.5, top: s.y - 1.5, position: 'absolute', width: 3, height: 3 }}
        />
      ))}

      {/* Dot */}
      <motion.div
        className="absolute rounded-full bg-brand-700"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 7,
          height: 7,
        }}
        animate={{
          scale: isClicking ? 0.4 : isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring */}
      <motion.div
        className="absolute rounded-full border-brand-600"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderStyle: 'solid',
        }}
        animate={{
          width: isHovering ? 50 : isClicking ? 26 : 34,
          height: isHovering ? 50 : isClicking ? 26 : 34,
          borderWidth: isHovering ? 1.5 : 1.5,
          borderColor: isHovering
            ? 'rgba(29, 78, 216, 0.9)'
            : 'rgba(37, 99, 235, 0.45)',
          backgroundColor: isHovering
            ? 'rgba(29, 78, 216, 0.06)'
            : 'transparent',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </div>
  );
}
