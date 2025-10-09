import ImageClipBox from '../../components/contact/ImageClipBox';
import useInView from './../../hooks/useInView';
import AnimatedTitle from './../../utils/AnimatedTitle';
import Btn from './../../utils/Btn';

const Contact = () => {
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} id="contact" className="xs:px-10 my-20 min-h-96 px-4">
      <div className="relative rounded-lg bg-black pt-24 pb-10 text-blue-50 sm:overflow-hidden sm:pb-24">
        {/* Left-side clipped images */}
        <figure className="absolute top-0 -left-20 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src={`${import.meta.env.BASE_URL}img/contact-1.webp`}
            clipClass={`contact-clip-path-1 ${isInView ? 'textAnim' : 'opacity-0'}`}
          />
          <ImageClipBox
            src={`${import.meta.env.BASE_URL}img/contact-2.webp`}
            clipClass={`contact-clip-path-2 translate-y-7/10 lg:translate-y-40 ${isInView ? 'textAnimSlow' : 'opacity-0'} md:translate-y-60 `}
          />
        </figure>

        {/* Swordman center/right images */}
        <figure
          className={`absolute -top-42 right-0 left-0 mx-auto w-60 sm:top-1/2 sm:left-[initial] md:right-10 md:left-auto lg:top-20 lg:w-80 ${isInView ? 'textAnimSlower' : 'opacity-0'}`}
        >
          <ImageClipBox
            src={`${import.meta.env.BASE_URL}img/swordman-partial.webp`}
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src={`${import.meta.env.BASE_URL}img/swordman.webp`}
            clipClass="md:scale-125 sword-man-clip-path"
          />
        </figure>

        {/* Text + Button */}
        <article className="pointer-events-none -mb-10 flex flex-col items-center text-center sm:mb-0">
          <AnimatedTitle
            title={`Work With Us`}
            subTitle={`Le<b>t</b>'s <b>B</b>uild T<b>h</b>e <br /> <b>N</b>ew <b>E</b>ra <b>O</b>f <br /> Pr<b>o</b>gra<b>mm</b>ing T<b>o</b>gether`}
            containerClass="special-font mt-10 w-full text-5xl leading-[0.9] mix-blend-difference md:text-[6rem]"
            isInView={isInView}
          />
        </article>

        <Btn
          title="Contact Us"
          containerClass={`mt-15 sm:mt-8  ${
            isInView ? 'textAnimSlowest' : ''
          } mx-auto  block bg-violet-50`}
        />
      </div>
    </section>
  );
};

export default Contact;
