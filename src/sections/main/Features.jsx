import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMemo } from 'react';
import BentoCard from '../../components/Features/BentoCard';
import BentoTilt from '../../components/Features/BentoTilt';
import VideoGrid from '../../components/Features/VideoGrid';
import useInView from '../../hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const [ref, isInView] = useInView();

  const featureVideoSrc = useMemo(
    () => `${import.meta.env.BASE_URL}videos/feature-1.webm`,
    []
  );

  useGSAP(
    () => {
      // ✅ Scoped GSAP context ensures proper cleanup on unmount
      const ctx = gsap.context(() => {
        gsap.to(ref.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          backgroundColor: 'black',
          duration: 0.2,
          ease: 'none',
        });
      });

      return () => ctx.revert(); // Cleanup
    },
    [] // ✅ Runs once
  );

  return (
    <section ref={ref} id="features" className="pb-30 sm:pb-40">
      <div className="container mx-auto px-3 md:px-10">
        <div className="font-circular-web px-5 py-24">
          <p
            className={`${
              isInView ? 'textAnim' : 'opacity-0'
            } text-lg text-blue-50`}
          >
            Into The Meta-Game Layer
          </p>
          <p
            className={`${
              isInView ? 'textAnimSlow' : 'opacity-0'
            } max-w-md text-lg text-blue-50/50`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            saepe ex quis velit nihil officia minus molestiae? Nesciunt veniam
            placeat, debitis, autem maiores ipsa saepe natus ipsam dolorum vero
            quis!
          </p>
        </div>

        {/* 🎥 Video Section */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md duration-200 ease-out md:h-[65vh]">
          <BentoCard
            src={featureVideoSrc}
            title={
              <>
                radi<b>n</b>t
              </>
            }
            description={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni commodi odio esse omnis blanditiis, nostrum error fuga similique, repellat ea debitis ducimus voluptatibus praesentium perspiciatis beatae maiores vero quo atque?'
            }
            isComingSoon
            isInView={isInView}
          />
        </BentoTilt>

        <VideoGrid />
      </div>
    </section>
  );
};

export default Features;
