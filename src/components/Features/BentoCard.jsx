import { memo, useEffect, useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Btn from '../../utils/Btn';

const BentoCard = memo(
  ({ src, poster, title, description, isComingSoon, ref, isInView }) => {
    const videoRef = useRef(null);

    // 🎥 Pause/Play video when visibility changes
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (isInView) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, [isInView]);

    return (
      <div
        ref={ref}
        className="relative h-full min-h-[265px] w-full overflow-hidden"
      >
        {/* 🎬 Background Video */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loading="lazy"
          loop
          muted
          autoPlay={isInView}
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* 🪟 Overlay Content */}
        <div className="relative z-10 flex h-full flex-col justify-between bg-transparent p-5 text-blue-50">
          <div className="flex flex-1 flex-col">
            <h1
              className={`bento-title special-font transition-all duration-500 ${
                isInView ? 'textAnimSlow' : 'translate-y-3 opacity-0'
              }`}
            >
              {title}
            </h1>

            {description && (
              <p
                className={`mt-3 max-w-md text-xs text-balance text-blue-50/70 transition-all duration-700 md:text-base ${
                  isInView ? 'textAnimSlower' : 'translate-y-3 opacity-0'
                }`}
              >
                {description}
              </p>
            )}

            {isComingSoon && (
              <Btn
                id="coming-soon"
                title="Coming Soon"
                rightIcon={<TiLocationArrow />}
                containerClass={`mt-auto flex !bg-black items-center justify-center mt-4 gap-1 bg-black text-white/50 hover:text-white transition-all duration-700 ${
                  isInView ? 'textAnimSlowest' : 'opacity-0 translate-y-3'
                }`}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default BentoCard;
