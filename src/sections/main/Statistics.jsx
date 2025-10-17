import useInView from '../../hooks/useInView';
import AnimatedTitle from '../../utils/AnimatedTitle';
import StatisGridOne from './../../components/statis/StatisGridOne';
import StatisGridTwo from './../../components/statis/StatisGridTwo';

const Statistics = () => {
  const [ref, isInView] = useInView();
  return (
    <section
      ref={ref}
      className="bg-black text-white max-2xl:min-h-screen 2xl:pb-30"
    >
      <AnimatedTitle
        title={'OUR KEY METRICS'}
        subTitle={`De<b>V</b>aptor St<b>a</b>ts <br /> <b>A</b>t <b>A</b> Gl<b>a</b>nce`}
        containerClass={
          'pointer-events-none mix-blend-difference relative z-10 '
        }
        isInView={isInView}
      />
      <div className="mx-auto grid max-w-[1140px] gap-7 px-3 md:px-10 lg:grid-cols-2 lg:py-20">
        {/* 🎥 Video Section */}

        <StatisGridOne ref={ref} isInView={isInView} />
        <StatisGridTwo ref={ref} isInView={isInView} />

        {/* <VideoGrid /> */}
      </div>
    </section>
  );
};

export default Statistics;
