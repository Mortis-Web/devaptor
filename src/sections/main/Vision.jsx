import { Suspense } from 'react';
import Starfield from '../../components/vision/Starfield';
import VisionCanvas from '../../components/vision/VisionCanvas';
import useInView from '../../hooks/useInView';
import AnimatedTitle from '../../utils/AnimatedTitle';
import Loader from '../../utils/Loader';

const Vision = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="min-h-[60vh] bg-black md:min-h-screen">
      {isInView && <Starfield />}
      <AnimatedTitle
        title={`Our Vision`}
        subTitle={`Di<b>v</b>e in<b>t</b>o o<b>u</b>r f<b>u</b>t<b>u</b>re <br /> vi<b>e</b>ws a<b>n</b>d <b>m</b>issi<b>o</b>ns`}
        containerClass={'text-center'}
        isInView={isInView}
      />{' '}
      <figure ref={ref} className="h-[60vh] overflow-hidden pb-10 md:h-screen">
        <Suspense fallback={<Loader containerClass="bg-black" />}>
          <VisionCanvas isInView={isInView} />
        </Suspense>
      </figure>
    </section>
  );
};

export default Vision;
