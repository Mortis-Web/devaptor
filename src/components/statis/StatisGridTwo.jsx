import BentoCard from './../features/BentoCard';
import BentoTilt from './../features/BentoTilt';

const StatisGridTwo = ({ ref, isInView }) => {
  return (
    <div className="statis-grid mb-30">
      <BentoTilt className="border-hsla group xs:h-170 relative col-span-3 mb-7 h-100 w-full overflow-hidden rounded-md duration-200 ease-out">
        <BentoCard
          src={`${import.meta.env.BASE_URL}videos/statis-4.mp4`}
          poster={`${import.meta.env.BASE_URL}img/statis-poster-3.webp`}
          title={<></>}
          description={''}
          ref={ref}
          isInView={isInView}
        />
        <span className="font-general absolute top-3 left-5 z-50 flex flex-col text-sm text-white">
          Current active users
          <h2 className="special-font xs:[transform:matrix3d(1,_-0.187193,_0,_0.0021344,_0,_0.75,_0,_0,_0,_0,_1,_0,_117.125,_-21.925,_0,_1)] xs:text-[11rem] xs:-translate-y-8 xs:max-xl:-translate-x-10 text-[6rem] text-white transition-all duration-500 group-hover:-translate-x-1 group-hover:[transform:none] xl:text-[12.5rem]">
            500K+
          </h2>{' '}
        </span>
      </BentoTilt>
      <BentoTilt className="border-hsla group xs:w-100 relative col-span-2 mb-7 h-80 w-full justify-self-end overflow-hidden rounded-md bg-black text-white duration-200 ease-out lg:w-full">
        <BentoCard
          src={`${import.meta.env.BASE_URL}videos/statis-2.webm`}
          poster={`${import.meta.env.BASE_URL}img/statis-poster-4.webp`}
          title={<></>}
          description={''}
          ref={ref}
          isInView={isInView}
          videoStyles="object-right"
        />

        <span className="font-general absolute bottom-3 left-5 z-50 text-sm text-white">
          World-Class Backers{' '}
        </span>
      </BentoTilt>
      <BentoTilt className="border-hsla xs:w-100 relative isolate col-span-3 mb-7 h-80 w-full overflow-hidden rounded-md bg-violet-50 duration-200 ease-out sm:w-140 lg:w-full">
        <div className={`${isInView ? 'textAnimSlowest' : 'opacity-0'} size-full`}>
          <span className="special-font xs:text-[9rem] xs:-bottom-7.5 absolute -bottom-2.5 left-2.5 z-50 flex text-[6rem] text-black sm:left-10 xl:text-[11rem]">
            $20M<span className="xs:hidden block">+</span>
          </span>
          <span className="special-font xs:block absolute right-7.5 bottom-5 z-50 hidden text-[9rem] text-black sm:right-40 lg:right-10 xl:bottom-0 xl:text-[11rem]">
            +
          </span>
        </div>
        <span className="font-general xs:block absolute right-7.5 bottom-7.5 z-50 hidden text-center text-sm text-black uppercase sm:right-40 lg:right-12.5">
          More to
          <br /> be added
        </span>
        <span className="font-general absolute top-3 left-5 z-50 text-sm text-black">
          Value distributed
        </span>
      </BentoTilt>
    </div>
  );
};

export default StatisGridTwo;
