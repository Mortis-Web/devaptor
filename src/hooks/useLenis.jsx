// hooks/useLenis.js
import Lenis from '@studio-freight/lenis';
import { useEffect, useState } from 'react';

export default function useLenis() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      duration: 1.5,
      lerp: 0.05,
      direction: 'vertical',
    });

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return lenis;
}
