import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useState } from 'react';
import AnimatedTitle from '../../utils/AnimatedTitle';
import RoundedCorners from '../../utils/RoundedCorners';
import useInView from './../../hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [ref, isInView] = useInView();

  const [tiltable, setTiltable] = useState(true);
  useGSAP(() => {
    gsap.set('.about-image', {
      clipPath: 'polygon(4% 0, 83% 21%, 100% 73%, 0% 100%)',
    });
    const clipAnim = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        toggleActions: 'play none none reverse',
        onEnter: () => {
          setTiltable(false);
        },
        onLeaveBack: () => {
          setTiltable(true);
        },
      },
    });
    clipAnim.to('.about-image', {
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)',
    });
  });
  return (
    <section ref={ref} id="about" className="min-h-screen">
      <article className="relative mt-36 mb-8 flex flex-col items-center gap-5">
        <AnimatedTitle
          title={`Welcome To de<b class="text-red-400">v</b>aptor`}
          subTitle={`disc<b>o</b>ver t<b>h</b>e w<b>o</b>rld's <br /> l<b>a</b>rgest share<b>d</b> ad<b>v</b>enture,`}
          containerClass={'mt-5 text-black text-center'}
          isInView={isInView}
        />
        <div
          className={`about-subtext ${isInView ? 'textAnimSlowest' : 'opacity-0'}`}
        >
          <p>The Game Of Games Begins-Your Life, Now An Epic MMORPG</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            eius.
          </p>
        </div>
      </article>

      <article className="relative h-dvh" id="clip">
        <figure
          className={`${tiltable ? 'tilt-wrapper textAnimSlower' : ''} xs:w-fit relative mx-auto w-9/10 [filter:url('#flt_tag')]`}
        >
          <div className={` ${tiltable ? 'tilt' : ''} about-image`}>
            <img
              src="img/about.webp"
              alt="Background"
              loading='lazy'
              decoding='async'
              className="absolute top-0 left-0 size-full object-cover"
            />
          </div>
          {tiltable && <RoundedCorners />}
        </figure>
      </article>
    </section>
  );
};

export default About;
