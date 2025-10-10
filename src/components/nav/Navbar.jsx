import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import useLenis from './../../hooks/useLenis';
import Btn from './../../utils/Btn';

const Navbar = () => {
  const navRef = useRef(null);
  const audioRef = useRef(null);
  const Lenis = useLenis();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const { y: currentScrollY } = useWindowScroll();

  /** ------------------------------
   *  🧭 Scroll-based Nav Visibility
   * ------------------------------ */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (currentScrollY <= 100) {
      setIsNavVisible(true);
      nav.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      nav.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      nav.classList.add('floating-nav');
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  /** ------------------------------
   *  🎞️ Smooth GSAP Transition
   * ------------------------------ */
  useEffect(() => {
    gsap.to(navRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,
      ease: 'power2.out',
    });
  }, [isNavVisible]);

  /** ------------------------------
   *  🔊 Audio Toggle
   * ------------------------------ */
  const toggleAudio = useCallback(() => {
    setIsAudioPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch(() => {}); // prevent unhandled promise rejection
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  /** ------------------------------
   *  📜 Navbar Items
   * ------------------------------ */
  const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-4 z-1000 mx-auto h-16 w-9/10 border border-transparent transition-all duration-700 sm:inset-x-6 sm:w-auto"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <div className="flex size-full items-center justify-between p-4">
          {/* --- Left Side --- */}
          <div className="flex items-center gap-7">
            <div className="special-font text-5xl text-red-400">
              <b className="tilt-wrapper">
                <span className="tilt">V</span>
              </b>
            </div>

            <Btn
              id="navBtn"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* --- Right Side --- */}
          <div className="flex h-full items-center">
            <ul className="hidden md:flex">
              {navItems.map(link => (
                <li key={link}>
                  <button
                    type="button"
                    aria-label={`scroll to ${link} section`}
                    title={`scroll to ${link} section`}
                    onClick={() => Lenis?.scrollTo(`#${link.toLowerCase()}`)}
                    className="nav-hover-btn [text-shadow:_1px_0_black,_-1px_0_black,_0_1px_black,_0_-1px_black]"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>

            {/* --- Audio Toggle --- */}
            <button
              onClick={toggleAudio}
              type="button"
              aria-label="Toggle Background Sound"
              title="Toggle Background Sound"
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioRef}
                className="hidden"
                loop={isAudioPlaying}
                preload="none"
                playsInline
                controlsList="nodownload noplaybackrate"
              >
                <source
                  src={`${import.meta.env.BASE_URL}audio/loop.mp3`}
                  type="audio/mpeg"
                />
              </audio>

              {[1, 2, 3, 4].map(bar => (
                <div
                  key={bar}
                  className={`indicator-line ${isAudioPlaying ? 'active' : ''} [box-shadow:_1px_0_black,_-1px_0_black,_0_1px_black,_0_-1px_black]`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
