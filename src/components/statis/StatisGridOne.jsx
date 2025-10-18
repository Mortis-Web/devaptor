import BentoCard from './../features/BentoCard';
import BentoTilt from './../features/BentoTilt';

const StatisGridOne = ({ ref, isInView }) => {
  return (
    <div className="statis-grid mt-30 [direction:rtl]">
      <BentoTilt className="border-hsla xs:w-100 relative isolate col-span-2 mb-7 h-80 w-full overflow-hidden rounded-md duration-200 ease-out before:absolute before:z-10 before:h-full before:w-full before:bg-gradient-to-r before:from-violet-300/60 before:to-violet-300/5 before:content-[''] sm:w-140 lg:col-span-3 lg:w-full">
        <BentoCard
          src={`${import.meta.env.BASE_URL}videos/statis-1.mp4`}
          poster={`${import.meta.env.BASE_URL}img/statis-poster-1.webp`}
          title={<></>}
          description={''}
          ref={ref}
          isInView={isInView}
          videoStyles=" sm:scale-160 xl:!object-[-50%]"
        />
        <span
          className={`${isInView ? 'textAnimSlow' : 'opacity-0'} special-font absolute -bottom-7.5 left-5 z-50 text-[8rem] text-white`}
        >
          24B+
        </span>
        <span className="font-general absolute top-3 left-5 z-50 text-sm text-black">
          Special zAI Parameters
        </span>
      </BentoTilt>
      <BentoTilt className="border-hsla group xs:w-100 relative col-span-2 mb-7 h-80 w-full justify-self-end overflow-hidden rounded-md bg-white text-black duration-200 ease-out lg:w-full">
        <h2
          className={`special-font xs:text-[6rem] xs:translate-x-26 xs:[transform:matrix3d(_0.99998,_-0.100886,_0,_0.0027625,_0,_0.821044,_0,_0,_0,_0,_1,_0,_49.1319,_-6.53523,_0,_1)] -mt-4 scale-90 text-[6rem] text-black transition-all duration-500 group-hover:translate-x-4 group-hover:scale-100 group-hover:[transform:none] lg:translate-x-10 xl:text-[7rem]`}
        >
          970GB+
        </h2>
        <span className="font-general absolute bottom-3 left-5 z-50 text-sm text-black">
          Data Process for AI-ready{' '}
        </span>
      </BentoTilt>
      <BentoTilt className="border-hsla xs:h-170 relative isolate col-span-3 mb-7 h-100 w-full overflow-hidden rounded-md bg-violet-300 duration-200 ease-out">
        <BentoCard
          src={`${import.meta.env.BASE_URL}videos/statis-3.webm`}
          poster={`${import.meta.env.BASE_URL}img/statis-poster-2.webp`}
          title={<></>}
          description={''}
          ref={ref}
          isInView={isInView}
          videoStyles={
            'w-full lg:!h-1/2 absolute inset-0 m-auto mix-blend-screen '
          }
        />
        <span className="font-general absolute bottom-3 left-5 z-50 text-sm text-black">
          Data Process for AI-ready{' '}
        </span>
        <span className="font-general absolute top-3 left-5 z-50 flex flex-col text-sm text-black">
          Treasury
          <span
            className={`${isInView ? 'textAnimSlow' : 'opacity-0'} special-font xs:text-[7rem] text-[5rem]`}
          >
            100M+
          </span>
        </span>
        <span
          className={`${isInView ? 'textAnimSlower' : 'opacity-0'} special-font xs:pt-20 xs:text-[7rem] absolute inset-0 m-auto h-fit w-fit pt-12 text-[5rem] text-black`}
        >
          <b>V</b>
        </span>
      </BentoTilt>
    </div>
  );
};

export default StatisGridOne;
