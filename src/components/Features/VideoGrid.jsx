import { TiLocationArrow } from 'react-icons/ti';
import BentoCard from '../../components/features/BentoCard';
import useInView from '../../hooks/useInView';
import BentoTilt from './BentoTilt';

const VideoGrid = () => {
  const [ref, isInView] = useInView();
  return (
    <section
      ref={ref}
      className="grid min-h-[135vh] grid-cols-2 grid-rows-3 gap-7"
    >
      <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
        <BentoCard
          src="videos/feature-2-compressed.webm"
          title={
            <>
              zig<b>m</b>a
            </>
          }
          description={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni commodi odio esse omnis blanditiis, nostrum error fuga similique, repellat ea debitis ducimus voluptatibus praesentium perspiciatis beatae maiores vero quo atque?'
          }
          isComingSoon
          isInView={isInView}
        />
      </BentoTilt>

      <BentoTilt className="bento-tilt_1 xs:ms-32 row-span-1 ms-14 md:col-span-1 md:ms-0">
        <BentoCard
          src="videos/feature-3-compressed.webm"
          title={
            <>
              Ne<b>x</b>us
            </>
          }
          description={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni commodi odio esse omnis blanditiis, nostrum error fuga similique, repellat ea debitis ducimus voluptatibus praesentium perspiciatis beatae maiores vero quo atque?'
          }
          isInView={isInView}
        />
      </BentoTilt>
      <BentoTilt className="bento-tilt_1 row-span-1 me-14 md:col-span-1 md:me-0">
        <BentoCard
          src="videos/feature-4-compressed.webm"
          title={
            <>
              Az<b>u</b>l
            </>
          }
          description={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni commodi odio esse omnis blanditiis, nostrum error fuga similique, repellat ea debitis ducimus voluptatibus praesentium perspiciatis beatae maiores vero quo atque?'
          }
          isInView={isInView}
        />
      </BentoTilt>

      <BentoTilt className="bento-tilt_2 flex size-full flex-col justify-between bg-red-400 p-5">
        <h1
          className={`special-font ${isInView ? 'textAnimSlower' : ''} bento-title max-w-md text-black`}
        >
          M<b>o</b>re C<b>o</b>ming S<b>oo</b>n!
        </h1>
        <TiLocationArrow className={`m-5 scale-400 self-end md:scale-600`} />
      </BentoTilt>

      <BentoTilt className="bento-tilt_2 flex size-full flex-col justify-between">
        <video
          src="videos/feature-5-compressed.webm"
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 size-full object-cover object-center"
        />
      </BentoTilt>
    </section>
  );
};

export default VideoGrid;
