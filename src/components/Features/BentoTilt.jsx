import { useCallback, useRef, useState } from 'react';

const BentoTilt = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  // ✅ Throttle mouse movements with requestAnimationFrame
  const rafId = useRef(null);
  const isTouchDevice = window.matchMedia(
    '(hover: none), (pointer: coarse)'
  ).matches;

  const handleMouseMove = useCallback(
    e => {
      if (isTouchDevice) return; // ✅ no tilt setup on mobile/tablet
      if (!cardRef.current) return;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const { left, top, width, height } =
          cardRef.current.getBoundingClientRect();
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 8;
        const tiltY = (relativeX - 0.5) * -8;

        setTransformStyle(
          `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.97,0.97,0.97)`
        );
      });
    },
    [isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    setTransformStyle(
      'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    );
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-transform duration-200 ease-out will-change-transform`}
      style={{ transform: transformStyle }}
    >
      {children}
    </article>
  );
};

export default BentoTilt;
