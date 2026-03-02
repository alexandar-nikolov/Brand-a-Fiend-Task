import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ end, duration = 2, suffix = '', label }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'Roboto Slab, serif',
          fontSize: '3rem',
          fontWeight: 300,
          color: '#C8102E',
        }}
      >
        {count}
        {suffix}
      </motion.div>
      <div style={{ color: '#6B6B6B', fontSize: '0.875rem', marginTop: '0.5rem' }}>{label}</div>
    </div>
  );
}