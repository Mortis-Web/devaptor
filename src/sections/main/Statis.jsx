// Statis.jsx
import { Suspense } from 'react';
import useInView from '../../hooks/useInView';
import StatisCanvas from './../../components/statis/StatisCanvas';
import AnimatedTitle from './../../utils/AnimatedTitle';
import Loader from './../../utils/Loader';

const Statis = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="min-h-[70vh] md:min-h-screen bg-black">
      <AnimatedTitle
        title={`Our Vission`}
        subTitle={`Di<b>v</b>e in<b>t</b>o o<b>u</b>r f<b>u</b>t<b>u</b>re <br /> vi<b>e</b>ws a<b>n</b>d <b>m</b>issi<b>o</b>ns`}
        containerClass={'text-center'}
        isInView={isInView}
      />{' '}
      <figure ref={ref} className="h-[70vh] overflow-hidden pb-10 md:h-screen">
        <Suspense fallback={<Loader containerClass="bg-black" />}>
          {isInView && <StatisCanvas isInView={isInView} />}
        </Suspense>
      </figure>
    </section>
  );
};

export default Statis;
