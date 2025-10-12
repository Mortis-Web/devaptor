// components/BlackHoleModel.jsx
import { useAnimations, useGLTF } from '@react-three/drei';
import { memo, useEffect, useRef } from 'react';

const BlackHoleModel = memo(({ play = true, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(
    `${import.meta.env.BASE_URL}models/blackholeDETAILED.glb`
  );
  const { actions } = useAnimations(animations, group);

  // 🎞️ Play animation only if play=true and available
  useEffect(() => {
    if (!play || !animations.length) return;
    const firstAction = Object.values(actions)[0];
    if (firstAction) {
      firstAction.reset().fadeIn(0.5).play();
    }

    // 🧹 Clean up on unmount
    return () => firstAction?.fadeOut(0.5);
  }, [play, animations, actions]);

  return <primitive ref={group} object={scene} {...props} dispose={null} />;
});

// 💤 Lazy-load wrapper

// 🧠 Preload only when needed
// (don’t preload automatically unless you're sure the model is used early)
useGLTF.preload(`${import.meta.env.BASE_URL}models/blackholeDETAILED.glb`);

export default BlackHoleModel;
