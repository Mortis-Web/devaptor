import { useEffect, useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import BentoCard from '../../components/features/BentoCard';
import useInView from '../../hooks/useInView';
import BentoTilt from './BentoTilt';

const VideoGrid = () => {
  const [ref, isInView] = useInView();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="grid min-h-screen grid-cols-2 grid-rows-3 gap-7 xl:min-h-[135vh] 2xl:min-h-fit"
    >
      <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
        <BentoCard
          src={`${import.meta.env.BASE_URL}videos/feature-2-compressed.webm`}
          poster={`${import.meta.env.BASE_URL}img/feature-poster-4.webp`}
          title={
            <>
              zig<b>m</b>a
            </>
          }
          description={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni commodi odio esse omnis blanditiis, nostrum error fuga similique, repellat ea debitis ducimus voluptatibus praesentium perspiciatis beatae maiores vero quo atque?'
          }
          isComingSoon
          ref={ref}
          isInView={isInView}
        />
      </BentoTilt>

      <BentoTilt className="bento-tilt_1 xs:ms-32 xs:ms-14 row-span-1 md:col-span-1 md:ms-0">
        <BentoCard
          src={`${import.meta.env.BASE_URL}videos/feature-3-compressed.webm`}
          poster={`${import.meta.env.BASE_URL}img/feature-poster-3.webp`}
          title={
            <>
              Ne<b>x</b>us
            </>
          }
          description={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni commodi odio esse omnis blanditiis, nostrum error fuga similique, repellat ea debitis ducimus voluptatibus praesentium perspiciatis beatae maiores vero quo atque?'
          }
          ref={ref}
          isInView={isInView}
        />
      </BentoTilt>
      <BentoTilt className="bento-tilt_1 xs:me-14 row-span-1 md:col-span-1 md:me-0">
        <BentoCard
          src={`${import.meta.env.BASE_URL}videos/feature-4-compressed.webm`}
          poster={`${import.meta.env.BASE_URL}img/feature-poster-2.webp`}
          title={
            <>
              Az<b>u</b>l
            </>
          }
          description={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni commodi odio esse omnis blanditiis, nostrum error fuga similique, repellat ea debitis ducimus voluptatibus praesentium perspiciatis beatae maiores vero quo atque?'
          }
          ref={ref}
          isInView={isInView}
        />
      </BentoTilt>

      <BentoTilt className="bento-tilt_2 xs:max-md:w-100 flex size-full flex-col justify-between justify-self-end bg-violet-50 p-5">
        <h1
          className={`special-font ${isInView ? 'textAnimSlower' : ''} bento-title max-w-md text-black`}
        >
          M<b>o</b>re C<b>o</b>ming S<b>oo</b>n!
        </h1>
        <TiLocationArrow className={`m-5 scale-400 self-end md:scale-600`} />
      </BentoTilt>

      <BentoTilt className="bento-tilt_2 flex size-full flex-col justify-between">
        <div>
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}videos/feature-5-compressed.webm`}
            poster={`${import.meta.env.BASE_URL}img/feature-poster-1.webp`}
            loop
            muted
            autoPlay={isInView}
            playsInline
            loading="lazy"
            preload={isInView ? 'metadata' : 'none'}
            className="absolute top-0 left-0 size-full object-cover object-center"
          />
        </div>
      </BentoTilt>
    </section>
  );
};

export default VideoGrid;
