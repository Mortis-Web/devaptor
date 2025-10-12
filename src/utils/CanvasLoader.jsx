import { Html, useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

const CanvasLoader = () => {
  const { progress } = useProgress();
  const [safeProgress, setSafeProgress] = useState(0);

  // Delay updating until AFTER React finishes rendering
  useEffect(() => {
    setSafeProgress(progress);
  }, [progress]);

  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <span className="canvas-loader">
        <p
          style={{
            fontSize: 14,
            color: '#f1f1f1',
            fontWeight: 800,
            marginTop: 40,
          }}
        >
          {safeProgress > 0 ? `${safeProgress.toFixed(2)}%` : 'Loading...'}
        </p>
      </span>
    </Html>
  );
};

export default CanvasLoader;
