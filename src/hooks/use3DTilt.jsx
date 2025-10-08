import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const use3DTilt = (selector = '.tilt-wrapper') => {
  const location = useLocation();

  useEffect(() => {
    const wrappers = document.querySelectorAll(selector);
    const listeners = [];

    wrappers.forEach(wrapper => {
      const card = wrapper.querySelector('.tilt');
      if (!card) return;

      // perspective required for deep 3D effect

      const MouseMove = e => {
        const { left, top, width, height } = wrapper.getBoundingClientRect();

        const x = e.clientX - left;
        const y = e.clientY - top;

        const centeredX = x / width - 0.5;
        const centeredY = y / height - 0.5;

        // 🚀 Aggressive tilt ranges
        const rotateX = Math.max(Math.min(centeredY * -45, 45), -45); // tilt up/down
        const rotateY = Math.max(Math.min(centeredX * 60, 60), -60); // tilt left/right

        // 🚀 Push into screen depending on mouse
        const translateZ = -50; // always "inside" screen
        const translateX = centeredX * 30; // side shift
        const translateY = centeredY * 30; // top/bottom shift

        const innerOverlay = card.querySelector('video, img');
        if (innerOverlay) {
          // shift object-position between 40% and 60% instead of always center
          const posX = 50 + centeredX * 40; // 30 → 70 range
          const posY = 50 + centeredY * 40; // 30 → 70 range
          innerOverlay.style.objectPosition = `${posX}% ${posY}%`;
          innerOverlay.style.willChange = 'object-position';
        }
        card.style.transform = `
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateX(${translateX}px)
          translateY(${translateY}px)
          translateZ(${translateZ}px)
        `;
      };

      const MouseLeave = () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) translateX(0) translateY(0) translateZ(0)`;
        card.style.transition = `transform 1s cubic-bezier(0.19, 1, 0.22, 1)`;
      };

      wrapper.addEventListener('mousemove', MouseMove);
      wrapper.addEventListener('mouseleave', MouseLeave);
      listeners.push({ wrapper, MouseMove, MouseLeave });
    });

    return () => {
      listeners.forEach(({ wrapper, MouseMove, MouseLeave }) => {
        wrapper.removeEventListener('mousemove', MouseMove);
        wrapper.removeEventListener('mouseleave', MouseLeave);
      });
    };
  }, [selector, location.pathname]);
};

export default use3DTilt;
