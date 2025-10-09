import { useEffect, useRef, useState } from 'react';

const useInView = (options = {}) => {
  const {
    threshold = 0.2,
    root = null,
    rootMargin = '0px',
    once = false,
  } = options;

  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(entry.target); // unobserve after first view
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, once]);

  return [ref, isInView];
};

export default useInView;
