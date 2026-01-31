"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { LoadingScreen } from "./LoadingScreen";

// Dynamic import for 3D scene to avoid SSR issues
const Scene = dynamic(() => import("../3d/Scene").then((mod) => mod.Scene), {
  ssr: false,
});

export function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);
  const [assetsProgress, setAssetsProgress] = useState(0);
  const [startCharacterAnimation, setStartCharacterAnimation] = useState(false);
  const [zoomToMonitor, setZoomToMonitor] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  // Called by Scene when 3D assets are fully loaded
  const handleAssetsReady = useCallback(() => {
    setAssetsReady(true);
  }, []);

  // Called by Scene with loading progress updates
  const handleAssetsProgress = useCallback((progress: number) => {
    setAssetsProgress(progress);
  }, []);

  // When loading completes, start the experience
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Start character walking animation
    setTimeout(() => {
      setStartCharacterAnimation(true);
    }, 300);
  }, []);

  // When character is seated, trigger camera zoom
  const handleSeated = useCallback(() => {
    setZoomToMonitor(true);
  }, []);

  // When zoom completes, show reset button
  const handleZoomComplete = useCallback(() => {
    console.log("Camera zoom complete - ready for boot sequence");
    setShowResetButton(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-50">
          <LoadingScreen
            onComplete={handleLoadingComplete}
            assetsReady={assetsReady}
            assetsProgress={assetsProgress}
          />
        </div>
      )}

      {/* 3D Scene - always mounted to allow preloading, just hidden during loading */}
      <div className={`absolute inset-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Scene
          startCharacterAnimation={startCharacterAnimation}
          onSeated={handleSeated}
          zoomToMonitor={zoomToMonitor}
          onZoomComplete={handleZoomComplete}
          showResetButton={showResetButton}
          onAssetsReady={handleAssetsReady}
          onAssetsProgress={handleAssetsProgress}
        />
      </div>
    </section>
  );
}
