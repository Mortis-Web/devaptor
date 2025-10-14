import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CanvasLoader from '../../utils/CanvasLoader';

const BlackHoleModel = lazy(() => import('./BlackHoleModel'));
gsap.registerPlugin(ScrollTrigger);

const useResponsiveScale = isInView => {
  const getScale = useCallback(() => {
    if (window.matchMedia('(max-width: 640px)').matches)
      return isInView ? 0.75 : 0.6;
    if (window.matchMedia('(max-width: 1024px)').matches)
      return isInView ? 0.85 : 0.75;
    return isInView ? 1.35 : 1;
  }, [isInView]);

  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const handleResize = () => setScale(getScale());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getScale]);

  return scale;
};

const Scene = ({ isInView, sectionRef }) => {
  const { camera } = useThree();
  const modelRef = useRef();
  const baseScale = useResponsiveScale(isInView);

  const modelProps = useMemo(
    () => ({
      scale: baseScale,
      rotation: [Math.PI / 90, -Math.PI / 3, Math.PI / 18],
      position: [0, 0, 0],
    }),
    [baseScale]
  );

  // --- 📦 Scroll-based animation (like before)
  useEffect(() => {
    if (!isInView || !sectionRef.current || !modelRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    });

    tl.to(camera.position, {
      z: 3,
      y: 0.5,
      duration: 2,
      ease: 'power3.inOut',
    });

    tl.to(
      modelRef.current.rotation,
      { y: `+=${Math.PI / 1.5}`, duration: 2.5, ease: 'power3.inOut' },
      '<'
    );
  }, [camera, isInView, sectionRef]);

  // --- 🌍 Continuous rotation effect (Earth-like)
  useEffect(() => {
    if (!modelRef.current) return;

    let rotationTween;

    if (isInView) {
      // start slow rotation loop
      rotationTween = gsap.to(modelRef.current.rotation, {
        y: `+=${Math.PI * 2}`, // full spin
        duration: 30, // smooth, slow rotation
        ease: 'none',
        repeat: -1,
      });
    }

    // cleanup: stop animation when not in view
    return () => {
      if (rotationTween) rotationTween.kill();
    };
  }, [isInView]);

  return (
    <>
      {/* 💡 Light optimized for low-cost render */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.8} />

      <Suspense fallback={<CanvasLoader />}>
        <BlackHoleModel ref={modelRef} {...modelProps} />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </>
  );
};

const StatisCanvas = ({ isInView }) => {
  const sectionRef = useRef();

  return (
    <section
      ref={sectionRef}
      id="blackhole-section"
      className="relative h-[60vh] w-full overflow-hidden md:h-screen"
    >
      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        shadows={false}
        frameloop={isInView ? 'always' : 'never'}
        dpr={[1, 1.5]} // ✅ lower pixel density
        gl={{
          antialias: false,
          preserveDrawingBuffer: false,
          powerPreference: 'low-power', // ✅ prevents WebGL drop
        }}
        onCreated={({ gl }) => {
          gl.getContext().canvas.addEventListener('webglcontextlost', e => {
            e.preventDefault();
            console.warn('⚠️ WebGL context lost');
          });
        }}
      >
        <Scene isInView={isInView} sectionRef={sectionRef} />
      </Canvas>
    </section>
  );
};

export default StatisCanvas;
