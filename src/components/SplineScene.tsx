
import { Suspense, useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
}

const SplineScene = ({ scene, className = "", fallback }: SplineSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load(scene);

      return () => {
        // Cleanup if needed
        app.dispose?.();
      };
    }
  }, [scene]);

  const defaultFallback = (
    <div className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-purple-900 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading 3D Scene...</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <div className={className}>
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </Suspense>
  );
};

export default SplineScene;
