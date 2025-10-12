import { useCallback, useMemo, useRef, useState } from 'react';

const TestimonialCards = ({ readyToAnimateCard, isInView }) => {
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(1);

  const cards = useMemo(
    () => [
      {
        cover: `${import.meta.env.BASE_URL}img/gallery-5.webp`,
        title: `${import.meta.env.BASE_URL}img/dark_rider-title.webp`,
        char: `${import.meta.env.BASE_URL}img/gallery-1.webp`,
      },
      {
        cover: `${import.meta.env.BASE_URL}img/gallery-3.webp`,
        title: `${import.meta.env.BASE_URL}img/dark_rider-title.webp`,
        char: `${import.meta.env.BASE_URL}img/dark_rider-character.webp`,
      },
      {
        cover: `${import.meta.env.BASE_URL}img/gallery-2.webp`,
        title: `${import.meta.env.BASE_URL}img/force_mage-title.webp`,
        char: `${import.meta.env.BASE_URL}img/force_mage-character.webp`,
      },
    ],
    []
  );

  const setCardRef = useCallback((el, index) => {
    cardsRef.current[index] = el;
  }, []);

  const animClass = readyToAnimateCard ? 'anim' : 'opacity-0';

  return (
    <section className="pointer-events-none absolute inset-0 mx-auto flex h-screen w-full max-w-[1536px] items-center justify-center gap-6 overflow-hidden">
      {isInView && (
        <>
          {cards.map((card, index) => (
            <div
              key={index}
              ref={el => setCardRef(el, index)}
              className={`card ${animClass} ${activeIndex === index ? 'active' : ''} will-change-opacity pointer-events-auto will-change-transform`}
              style={{ animationDelay: `${(index + 1) * 0.25}s` }}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(null)}
            >
              <div className="wrapper">
                <img
                  src={card.cover}
                  className="cover-image aspect-[4/3]"
                  alt="cover"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </div>
              <img
                src={card.title}
                className="title"
                alt="title"
                loading="lazy"
                decoding="async"
              />
              <img
                src={card.char}
                className="character"
                alt="character"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default TestimonialCards;
