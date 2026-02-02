"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { LoadingScreen } from "./LoadingScreen";

// =============================================================================
// PERFORMANCE TEST TOGGLE
// Set to true to use optimized 3D assets (96% smaller, faster loading)
// Set to false to use original assets (for comparison)
// =============================================================================
const USE_OPTIMIZED_ASSETS = true;

// Dynamic import for 3D scene to avoid SSR issues
const Scene = dynamic(
  () => USE_OPTIMIZED_ASSETS
    ? import("../3d/SceneOptimized").then((mod) => mod.SceneOptimized)
    : import("../3d/Scene").then((mod) => mod.Scene),
  { ssr: false }
);

export function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);
  const [assetsProgress, setAssetsProgress] = useState(0);
  const [startCharacterAnimation, setStartCharacterAnimation] = useState(false);
  const [zoomToMonitor, setZoomToMonitor] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for warning message
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
            isMobile={isMobile}
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
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}
