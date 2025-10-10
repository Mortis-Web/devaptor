import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
ScrollTrigger.config({ limitCallbacks: true });
const AnimatedTitle = ({ title, subTitle, containerClass = '', isInView }) => {
  const smallTitle = parse(title);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnim = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '200 bottom',
          end: 'end bottom',
          toggleActions: 'play none none reverse',
        },
      });
      titleAnim.to('.animated-word', {
        opacity: 1,
        transform:
          'translate3d(0,0,0) rotateY(0deg) rotateX(0deg) rotateZ(0deg)',
        ease: 'power2.inOut',
        stagger: 0.02,
        duration: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`${containerClass} animated-title`}>
      {/* Small title */}
      <h2
        className={`font-general ${isInView ? 'textAnim' : ''} mx-auto w-fit text-sm uppercase opacity-0 duration-300 md:text-[1.5rem]`}
      >
        {smallTitle}
      </h2>

      {/* Big animated title */}
      <div className="special-font mt-5 text-center text-4xl leading-[0.8] uppercase md:text-[6rem]">
        {subTitle.split('<br />').map((line, index) => (
          <div
            key={index}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          >
            {line.split(' ').map((word, i) => (
              <span
                key={i}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTitle;
