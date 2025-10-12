import useInView from '../../hooks/useInView';
import StatisCanvas from './../../components/statis/StatisCanvas';
const Statis = () => {
  const [ref, isInView] = useInView();
  return (
    <section ref={ref} className="h-screen bg-black pb-10">
      <StatisCanvas isInView={isInView} />
    </section>
  );
};

export default Statis;
