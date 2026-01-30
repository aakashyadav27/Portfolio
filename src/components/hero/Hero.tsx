"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { LoadingScreen } from "./LoadingScreen";

// Dynamic import for 3D scene to avoid SSR issues
const Scene = dynamic(() => import("../3d/Scene").then((mod) => mod.Scene), {
  ssr: false,
});

export function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [startCharacterAnimation, setStartCharacterAnimation] = useState(false);
  const [zoomToMonitor, setZoomToMonitor] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  // Preload scene in background while loading screen shows
  useEffect(() => {
    const timer = setTimeout(() => {
      setSceneReady(true);
    }, 800);
    return () => clearTimeout(timer);
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
          <LoadingScreen onComplete={handleLoadingComplete} />
        </div>
      )}

      {/* 3D Scene */}
      <div className={`absolute inset-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {sceneReady && (
          <Scene
            startCharacterAnimation={startCharacterAnimation}
            onSeated={handleSeated}
            zoomToMonitor={zoomToMonitor}
            onZoomComplete={handleZoomComplete}
            showResetButton={showResetButton}
          />
        )}
      </div>
    </section>
  );
}
