import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import useLenis from './../../hooks/useLenis';
import Btn from './../../utils/Btn';
const Navbar = () => {
  const navRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY <= 100) {
      setIsNavVisible(true);
      navRef.current.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navRef.current.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navRef.current.classList.add('floating-nav');
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];
  const Lenis = useLenis();
  const audioElementRef = useRef(null);
  const toggleAudio = () => {
    setIsAudioPlaying(prev => !prev);
    setIsIndicatorActive(prev => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);
  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-4 right-0 left-0 z-1000 mx-auto h-16 w-9/10 border border-transparent transition-all duration-700 sm:inset-x-6 sm:w-auto"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <div className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            {/* <img
              src="/img/logo.png"
              loading="lazy"
              decoding="async"
              alt="logo"
              className="w-10"
            /> */}
            <div className="special-font text-5xl text-red-400">
              <b>V</b>
            </div>
            <Btn
              id="navBtn"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass={
                'bg-blue-50 md:flex hidden items-center justify-center gap-1'
              }
            />
          </div>

          <div className="flex h-full items-center">
            <ul className="hidden md:flex">
              {navItems.map(link => (
                <li key={link}>
                  <button
                    onClick={() => Lenis?.scrollTo(`#${link.toLowerCase()}`)}
                    className="nav-hover-btn"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleAudio}
              type="button"
              aria-label="Toggle Audio Button"
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                src="/audio/loop.mp3"
                ref={audioElementRef}
                className="hidden"
                loop
                title="Sound On!"
              />
              {[1, 2, 3, 4].map(bar => (
                <div
                  title="Sound On!"
                  key={bar}
                  className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
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
