import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CanvasLoader from '../../utils/CanvasLoader';
import BlackHoleModel from './BlackHoleModel';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });

// 🧩 Responsive + InView scale hook
const useResponsiveScale = isInView => {
  const getScale = useCallback(() => {
    if (window.matchMedia('(max-width: 640px)').matches)
      return isInView ? 0.6 : 0.5;
    if (window.matchMedia('(max-width: 1024px)').matches)
      return isInView ? 0.85 : 0.75;
    return isInView ? 1.35 : 1;
  }, [isInView]);

  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const handleResize = () => setScale(getScale());
    window.addEventListener('resize', handleResize);
    setScale(getScale());
    return () => window.removeEventListener('resize', handleResize);
  }, [getScale]);

  return scale;
};

const Scene = ({ isInView, sectionRef }) => {
  const { camera } = useThree();
  const baseScale = useResponsiveScale(isInView);
  const modelRef = useRef(null);

  // 🎛️ Model props
  const modelProps = useMemo(
    () => ({
      scale: baseScale,
      rotation: [0, Math.PI / 2, 0],
      position: [0, 0, 0],
    }),
    [baseScale]
  );

  // 🎥 ScrollTrigger parallax effect
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const interval = setInterval(() => {
        if (modelRef.current) {
          clearInterval(interval); // wait until model loads

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center center',
              end: '+=700 center',
              scrub: 1.5,
              pin: true,
              anticipatePin: 1,
            },
          });

          // Move camera slightly for parallax
          tl.to(camera.position, {
            z: 2.5,
            y: 0.5,
            ease: 'power2.inOut',
          });

          // Rotate the black hole model
          tl.to(
            modelRef.current.rotation,
            {
              y: `+=${Math.PI / 1.5}`,
              ease: 'power2.inOut',
            },
            0
          );
        }
      }, 100); // check every 100ms

      return () => clearInterval(interval);
    });

    return () => ctx.revert();
  }, [camera, sectionRef]);

  return (
    <>
      {/* 💡 Lighting & Environment */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Environment preset="city" />

      {/* 🌀 Model */}
      <Suspense fallback={<CanvasLoader />}>
        <BlackHoleModel ref={modelRef} {...modelProps} />
      </Suspense>

      {/* 🖱️ Orbit controls (disabled zoom) */}
      <OrbitControls enableZoom={false} />
    </>
  );
};

const StatisCanvas = ({ isInView }) => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="blackhole-section"
      className="relative h-[130vh] w-full"
    >
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 50 }} dpr={[1, 2]}>
        <Scene isInView={isInView} sectionRef={sectionRef} />
      </Canvas>
    </section>
  );
};

export default StatisCanvas;
