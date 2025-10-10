import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import useInView from '../../hooks/useInView';
import Btn from '../../utils/Btn';
import Loader from '../../utils/Loader';
import VideoPreview from '../../utils/VideoPreview';
import useLenis from './../../hooks/useLenis';
ScrollTrigger.config({ limitCallbacks: true });
gsap.registerPlugin(ScrollTrigger);
const DotLottieReact = lazy(() =>
  import('@lottiefiles/dotlottie-react').then(module => ({
    default: module.DotLottieReact,
  }))
);
const Hero = () => {
  const [ref, isInView] = useInView();
  let Lenis = useLenis();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [stopSpamClick, setStopSpamClick] = useState(false);
  const heroVideos = 4;
  const nextVideoRef = useRef(null); // hidden transition video
  const currentVideoRef = useRef(null); // background video
  const holeRef = useRef(null);
  const handleLoadedVideo = () => {
    setLoadedVideos(prev => Math.min(heroVideos, prev + 1));
  };
  const getVideoSrc = index =>
    `${import.meta.env.BASE_URL}videos/hero-${index + 1}-compressed.webm`;

  const videos = useMemo(
    () => ({
      main: getVideoSrc(currentIndex),
      next: getVideoSrc((currentIndex + 1) % heroVideos),
      mini: getVideoSrc((currentIndex + 2) % heroVideos),
    }),
    [currentIndex]
  );

  const handleMiniVideoClick = useCallback(() => {
    if (stopSpamClick) return;
    setHasClicked(true);
    setCurrentIndex(prev => (prev + 1) % heroVideos);
    setStopSpamClick(true);
    setTimeout(() => setStopSpamClick(false), 1000);
  }, [stopSpamClick]);

  useEffect(() => {
    if (loadedVideos === heroVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        // hidden transition video grows to full
        gsap.set('#next-video', {
          visibility: 'visible',
          scale: 0.25,
          transformOrigin: 'center center',
        });

        gsap.to('#next-video', {
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => {
            nextVideoRef.current.play();
          },
        });
        gsap.from('#current-video', {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      // borderRadius: '2% 2% 2% 2%',
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      // borderRadius: '0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
      onComplete: () => {},
    });
  });

  useEffect(() => {
    const hole = holeRef.current;
    if (!hole) return;

    const parent = hole.parentElement;
    if (!parent) return;
    // Create a radial gradient background that moves
    gsap.set(hole, {
      background:
        'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.6), transparent 70%)',
    });

    const moveGradient = e => {
      const rect = hole.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      gsap.to(hole, {
        background: `radial-gradient(circle at ${x}% ${y}%, rgba(59,130,246,0.6), transparent 70%)`,
        duration: 0.5,
        ease: 'power3.out',
      });
    };
    gsap.to('#gravity-hole', {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut',
    });

    parent.addEventListener('mousemove', moveGradient);
    return () => parent.removeEventListener('mousemove', moveGradient);
  }, []);

  // pause hidden videos
  useEffect(() => {
    if (nextVideoRef.current && currentVideoRef.current) {
      nextVideoRef.current.pause();
      currentVideoRef.current.play();
    }
  }, [currentIndex]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate h-dvh overflow-x-hidden"
    >
      {/* indicator glass box */}

      <div
        id="gravity-hole"
        className="pointer-events-none absolute inset-0 z-20 m-auto size-40 rounded-full backdrop-blur-[4px] sm:size-60"
      >
        <div className="black-hole" />
        {isInView && (
          <DotLottieReact
            src={`${import.meta.env.BASE_URL}lottie/click.lottie`}
            loop
            autoplay
            className={`absolute inset-0 z-10 m-0 duration-300`}
          />
        )}
      </div>
      {isLoading && <Loader />}
      <article
        id="video-frame"
        className="bg-blue-75 relative z-10 h-dvh overflow-hidden"
      >
        <figure className="flex-center h-dvh">
          {/* Mini preview → next video thumbnail */}
          <div className="z-50 size-100 scale-75 overflow-visible md:scale-100">
            <div className="absolute-center mask-clip-path relative size-80 cursor-pointer rounded-xl">
              <VideoPreview>
                <div
                  onClick={handleMiniVideoClick}
                  style={
                    stopSpamClick
                      ? { pointerEvents: 'none' }
                      : { pointerEvents: 'auto' }
                  }
                  className="origin-center scale-50 opacity-0 transition-all duration-800 ease-[cubic-bezier(0.8,-0.1,0.3,1)] hover:scale-100 hover:opacity-100"
                >
                  <video
                    src={videos.mini}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    loading="lazy"
                    id="current-video"
                    className="pointer-events-none size-80 scale-150 object-cover"
                    onLoadedData={handleLoadedVideo}
                  />
                </div>
              </VideoPreview>
            </div>
          </div>

          {/* Hidden transition video */}
          <video
            ref={nextVideoRef}
            preload="auto"
            fetchpriority="high"
            src={videos.next}
            loop
            muted
            playsInline
            id="next-video"
            className="absolute-center pointer-events-none invisible z-20 size-64 object-cover object-center"
            onLoadedData={handleLoadedVideo}
          />

          {/* current background video */}
          <div>
            <video
              ref={currentVideoRef}
              src={videos.main}
              autoPlay
              muted
              loop
              loading="eager"
              fetchpriority="high"
              preload="auto"
              id="main-video"
              playsInline
              onLoadedData={handleLoadedVideo}
              className="tilt pointer-events-none absolute top-0 left-0 size-full object-cover object-center"
            />
          </div>
        </figure>

        {/* Text */}
        <h1 className="special-font textAnimSlowest hero-heading text-blue-75 absolute right-5 bottom-5 z-40 mix-blend-difference select-none">
          c<b>o</b>ding
        </h1>

        <div className="absolute top-0 left-0 z-40 size-full">
          <div className="mt-25 px-5 sm:mt-20 sm:px-10">
            <h1 className="special-font textAnim hero-heading flex text-blue-100">
              de
              <b className="tilt-wrapper text-red-400">
                <span className="tilt inline w-fit">v</span>
              </b>
              aptor
            </h1>
            <p className="font-robert-regular textAnimSlow my-2.5 max-w-64 text-blue-100 sm:my-5">
              Enter The Meta-game Layer <br /> Unleash The Play Economy
            </p>
            <Btn
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 hover:bg-violet-50 textAnimSlowest flex-center gap-1"
            />
          </div>
        </div>
        <span
          onClick={() => Lenis?.scrollTo(`#about`)}
          className="mouse-bullet absolute right-0 bottom-3 left-0 z-100 mx-auto hidden h-15 w-10 cursor-pointer rounded-(--mouse-shape) border-3 border-white duration-300 hover:border-red-400 md:flex"
        >
          {' '}
        </span>
      </article>
      <h1 className="special-font hero-heading absolute right-5 bottom-5 text-black">
        c<b>o</b>ding
      </h1>
      {/* black title */}
      <div className="absolute top-0 left-0 size-full">
        <div className="mt-20 px-5 sm:px-10">
          <h1 className="special-font textAnim hero-heading text-black">
            de<b className="text-red-400">v</b>aptor
          </h1>
          <p className="font-robert-regular textAnimSlow my-2.5 max-w-64 text-black sm:my-5">
            Enter The Meta-game Layer <br /> Unleash The Play Economy
          </p>
          <Btn
            id="watch-trailer"
            title="Watch Trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-red-400 !z-1 hover:bg-yellow-300 textAnimSlowest flex-center gap-1"
          />
        </div>
      </div>
      <span
        onClick={() => Lenis?.scrollTo(`#about`)}
        className="mouse-bullet absolute right-0 bottom-3 left-0 mx-auto hidden h-15 w-10 cursor-pointer rounded-(--mouse-shape) border-3 border-black duration-300 hover:border-red-400 md:flex"
      >
        {' '}
      </span>
    </section>
  );
};

export default Hero;
