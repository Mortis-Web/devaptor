import { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, DPR;
    let animationId;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      DPR = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); // reset transform
    };

    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 150;
    const stars = [];

    const rand = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < STAR_COUNT; i++) {
      const orbitRadius = rand(10, 100);
      const centerX = rand(0, w);
      const centerY = rand(0, h);
      const angle = rand(0, Math.PI * 2);
      stars.push({
        cx: centerX,
        cy: centerY,
        r: rand(0.6, 2.5),
        orbit: orbitRadius,
        speed: rand(0.005, 0.02), // ⚡ faster orbit
        angle,
        twinklePhase: rand(0, Math.PI * 2),
      });
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.angle += s.speed;
        const x = s.cx + Math.cos(s.angle) * s.orbit;
        const y = s.cy + Math.sin(s.angle) * s.orbit;
        s.twinklePhase += 0.05;
        const alpha = 0.5 + 0.5 * Math.sin(s.twinklePhase);

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(frame);
    };

    animationId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starfield"
      className="pointer-events-none absolute inset-0 -z-10 m-auto size-full"
    />
  );
};

export default Starfield;
