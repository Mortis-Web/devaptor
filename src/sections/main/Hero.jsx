import { useGSAP } from '@gsap/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Btn from '../../utils/Btn';
import useLenis from './../../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  let Lenis = useLenis();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [stopSpamClick, setStopSpamClick] = useState(false);
  const [hideClickIndicator, setHideClickIndicator] = useState(false);
  const heroVideos = 4;
  const nextVideoRef = useRef(null); // hidden transition video
  const currentVideoRef = useRef(null); // background video

  const handleLoadedVideo = () => {
    setLoadedVideos(prev => Math.min(4, prev + 1));
  };

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(prev => (prev + 1) % heroVideos);
    setStopSpamClick(true);
    setTimeout(() => {
      setStopSpamClick(false);
    }, 1000);
  };

  const getVideoSrc = index => `videos/hero-${index + 1}.webm`;

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
        scrub: 'true',
      },
      onComplete: () => {},
    });
  });
  useEffect(() => {
    const hole = document.getElementById('gravity-hole');

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

    hole.parentElement.addEventListener('mousemove', moveGradient);

    return () => {
      hole.parentElement.removeEventListener('mousemove', moveGradient);
    };
  }, []);

  return (
    <section id="home" className="relative isolate h-dvh overflow-x-hidden">
      {/* indicator glass box */}

      <div
        onMouseEnter={() => {
          setHideClickIndicator(true);
        }}
        onMouseLeave={() => {
          setHideClickIndicator(false);
        }}
        id="gravity-hole"
        className="pointer-events-none absolute inset-0 z-20 m-auto size-40 rounded-full backdrop-blur-[4px] sm:size-60"
      >
        <div className="black-hole" />
        <DotLottieReact
          src="lottie/click.lottie"
          loop
          autoplay
          className={`absolute inset-0 z-10 m-0 ${hideClickIndicator ? 'opacity-0' : ''} duration-300`}
        />
      </div>
      {isLoading && (
        <div className="flex-center absolute z-100 h-dvh w-full overflow-hidden bg-violet-50">
          <div className="three-body">
            <span className="three-body__dot"></span>
            <span className="three-body__dot"></span>
            <span className="three-body__dot"></span>
          </div>
        </div>
      )}
      <article
        id="video-frame"
        className="bg-blue-75 relative z-10 h-dvh overflow-hidden"
      >
        <figure className="flex-center h-dvh">
          {/* Mini preview → next video thumbnail */}
          <div className="tilt-wrapper z-50 h-72 w-80 scale-75 md:scale-100">
            <div className="tilt absolute-center mask-clip-path relative size-full cursor-pointer overflow-hidden rounded-xl">
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
                  src={getVideoSrc((currentIndex + 2) % heroVideos)}
                  loop
                  muted
                  id="current-video"
                  className="h-72 w-80 scale-150 object-cover"
                  onLoadedData={handleLoadedVideo}
                />
              </div>
            </div>
          </div>

          {/* Hidden transition video */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc((currentIndex + 1) % heroVideos)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover object-center"
            onLoadedData={handleLoadedVideo}
          />

          {/* current background video */}
          <div>
            <video
              ref={currentVideoRef}
              src={getVideoSrc(currentIndex)}
              autoPlay
              muted
              loop
              id="main-video"
              onLoadedData={handleLoadedVideo}
              className="tilt absolute top-0 left-0 size-full object-cover object-center"
            />
          </div>
        </figure>

        {/* Text */}
        <h1 className="special-font textAnimSlowest hero-heading text-blue-75 absolute right-5 bottom-5 z-40">
          c<b>o</b>ding
        </h1>

        <div className="absolute top-0 left-0 z-40 size-full">
          <div className="mt-25 px-5 sm:mt-20 sm:px-10">
            <h1 className="special-font textAnim hero-heading text-blue-100">
              de<b className="text-red-400">v</b>aptor
            </h1>
            <p className="font-robert-regular textAnimSlow mb-5 max-w-64 text-blue-100">
              Enter The Meta-game Layer <br /> Unleash The Play Economy
            </p>
            <Btn
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 textAnimSlowest flex-center gap-1"
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
          <p className="font-robert-regular textAnimSlow mb-5 max-w-64 text-black">
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
