import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';
import TestimonialCards from '../../components/about/TestimonialCards';
import AnimatedTitle from '../../utils/AnimatedTitle';
import RoundedCorners from '../../utils/RoundedCorners';
import useInView from './../../hooks/useInView';
ScrollTrigger.config({ limitCallbacks: true });
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [ref, isInView] = useInView();
  const testimonialRef = useRef(null);
  const [tiltable, setTiltable] = useState(true);
  const tiltableRef = useRef(true);
  const [readyToAnimateCard, setReadyToAnimateCard] = useState(false);
  useGSAP(
    () => {
      gsap.set('.about-image', {
        clipPath: 'polygon(4% 0, 83% 21%, 100% 73%, 0% 100%)',
      });
      gsap.set(testimonialRef.current, {
        opacity: 0,
        y: 50,
        pointerEvents: 'none',
        clipPath: ' polygon(25% 0%, 100% 40%, 75% 100%, 0% 100%)',
        scale: 0.5,
      });

      const clipAnim = gsap.timeline({
        scrollTrigger: {
          trigger: '#clip',
          start: 'center center',
          end: '+=700 center',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse',

          onEnter: () => {
            if (tiltableRef.current) {
              tiltableRef.current = false;
              setTiltable(false);
            }
          },
          onLeaveBack: () => {
            if (!tiltableRef.current) {
              tiltableRef.current = true;
              setTiltable(true);
            }
            setReadyToAnimateCard(false);
          },
        },
      });

      clipAnim
        .to('.about-image', {
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)',
          onComplete: () => {
            setReadyToAnimateCard(true);
          },
          onReverseComplete: () => {
            setReadyToAnimateCard(false);
          },
        })
        .to(
          testimonialRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: 'power2.out',
            duration: 1,
            clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)',
            pointerEvents: 'auto',
          },
          '-=10%'
        );

      return () => {
        clipAnim.scrollTrigger?.kill();
        clipAnim.kill();
      };
    },
    { dependencies: [] } // only run once
  );

  return (
    <section ref={ref} id="about" className="min-h-screen overflow-hidden">
      <article className="relative mt-24 mb-8 flex flex-col items-center gap-5 lg:mt-30">
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

      <article className="relative h-screen overflow-hidden" id="clip">
        <figure
          className={`${tiltable ? 'tilt-wrapper anim' : ''} xs:w-fit relative mx-auto w-9/10 [filter:url('#flt_tag')]`}
        >
          <div className={` ${tiltable ? 'tilt' : ''} about-image`}>
            <img
              src={`${import.meta.env.BASE_URL}img/about.webp`}
              alt="Background"
              loading="lazy"
              decoding="async"
              className="absolute top-0 left-0 aspect-square size-full object-cover"
            />
          </div>
          {tiltable && <RoundedCorners />}
        </figure>
        <figure
          ref={testimonialRef}
          className="absolute inset-0 m-auto flex h-screen origin-bottom items-center justify-center overflow-hidden bg-black/75"
        >
          <TestimonialCards
            readyToAnimateCard={readyToAnimateCard}
            isInView={isInView}
          />
        </figure>
      </article>
    </section>
  );
};

export default About;
