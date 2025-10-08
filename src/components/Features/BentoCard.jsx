import { TiLocationArrow } from 'react-icons/ti';
import Btn from './../../utils/Btn';
const BentoCard = ({ src, title, description, isComingSoon, isInView }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        preload="none"
        className="absolute top-0 left-0 size-full object-cover object-center"
      />
      <dialog className="relative z-10 flex size-full flex-col justify-between bg-transparent p-5 text-blue-50">
        <div className="flex h-full flex-col">
          <h1
            className={`bento-title special-font ${isInView ? 'textAnimSlow' : 'opacity-0'}`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`mt-3 max-w-md ${isInView ? 'textAnimSlower' : 'opacity-0'} text-xs text-balance md:text-base`}
            >
              {description}
            </p>
          )}
          {isComingSoon && (
            <Btn
              id="coming-soon"
              title="Coming Soon"
              rightIcon={<TiLocationArrow />}
              containerClass={`bg-black ${isInView ? 'textAnimSlowest' : 'opacity-0'} mt-auto flex items-center hover:text-white justify-center gap-1 text-white/50`}
            />
          )}
        </div>
      </dialog>
    </div>
  );
};

export default BentoCard;
