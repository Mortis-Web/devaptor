import AnimatedTitle from '../../utils/AnimatedTitle';
import Btn from '../../utils/Btn';
import RoundedCorners from '../../utils/RoundedCorners';
import useInView from './../../hooks/useInView';

const Story = () => {
  const [ref, isInView] = useInView();
  return (
    <section id="story" ref={ref} className="min-h-dvh bg-black text-blue-50">
      <article className="flex size-full flex-col items-center pb-10">
        <div className="relative size-full">
          <AnimatedTitle
            title={'The Multi-Versal Ip World'}
            subTitle={`T<b>h</b>e St<b>o</b>ry <b>O</b>f<br /><b>A</b> Hi<b>d</b><b>d</b>en Real<b>M</b>`}
            containerClass={
              'pointer-events-none mix-blend-difference relative z-10 '
            }
            isInView={isInView}
          />

          <figure
            className={`story-img-container ${isInView ? 'textAnimSlower' : ''} `}
          >
            <div className="story-img-mask">
              <span className="story-img-content tilt-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}img/entrance.webp`}
                  alt="story entrance image"
                  className="tilt object-cover will-change-transform"
                  decoding="async"
                  loading="lazy"
                />
              </span>
            </div>
            <RoundedCorners />
          </figure>
        </div>
      </article>

      <article
        className={`-mt-80 ${isInView ? 'textAnimSlowest' : 'opacity-0'} flex w-full justify-center md:me-44 md:-mt-64 md:justify-end`}
      >
        <div className="mb-10 flex h-full w-fit flex-col items-center md:mr-10 md:items-start">
          <p className="font-circular-web mt-3 max-w-sm text-center text-violet-50 md:text-start">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            molestiae quas nostrum omnis, totam debitis quaerat maxime
            consequuntur minus neque.
          </p>
          <Btn
            id="realm-button"
            title="discover prologue"
            containerClass="mt-5  bg-violet-50"
          />
        </div>
      </article>
    </section>
  );
};

export default Story;
