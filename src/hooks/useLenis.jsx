// hooks/useLenis.js
import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';

export default function useLenis() {
  const lenis = useRef(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      duration: 1.5,
      lerp: 0.05,
      direction: 'vertical',
    });

    lenis.current = lenisInstance;

    const raf = time => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return lenis.current;
}
