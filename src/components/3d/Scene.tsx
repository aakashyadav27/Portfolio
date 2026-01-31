"use client";

import { Suspense, useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, useProgress } from "@react-three/drei";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { DeskModel } from "./DeskModel";
import { Lighting } from "./Lighting";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { Desktop } from "../os/Desktop";

interface SceneProps {
  startCharacterAnimation?: boolean;
  onSeated?: () => void;
  zoomToMonitor?: boolean;
  onZoomComplete?: () => void;
  showResetButton?: boolean;
  onAssetsReady?: () => void;
  onAssetsProgress?: (progress: number) => void;
}

// Camera positions
const OVERVIEW_POSITION = new Vector3(12, 4, 11);
const OVERVIEW_TARGET = new Vector3(5, 0.5, 5);

// Closer position while person approaches chair
const APPROACH_POSITION = new Vector3(8, 2.5, 8);
const APPROACH_TARGET = new Vector3(5, 1, 5);

// After sitting - camera behind person looking at computer screen
const MONITOR_POSITION = new Vector3(5.82, 1.15, 4.1);
const MONITOR_TARGET = new Vector3(4, 1.05, 4.1);

// Dance camera position - watching the dancer
const DANCE_POSITION = new Vector3(10, 2, 10);
const DANCE_TARGET = new Vector3(8, 1, 7);

function CameraController({
  zoomToMonitor,
  onZoomComplete,
  resetTrigger,
  isDancing,
  onDanceCameraReady,
  isApproaching
}: {
  zoomToMonitor: boolean;
  onZoomComplete?: () => void;
  resetTrigger: number;
  isDancing: boolean;
  onDanceCameraReady?: () => void;
  isApproaching?: boolean;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const progressRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const hasApproachedRef = useRef(false);
  const startPosRef = useRef(new Vector3());
  const startTargetRef = useRef(new Vector3());
  const targetPosRef = useRef(MONITOR_POSITION.clone());
  const targetLookRef = useRef(MONITOR_TARGET.clone());
  const animationSpeedRef = useRef(0.02);

  // Handle approach animation (slow zoom while person walks)
  useEffect(() => {
    if (isApproaching && !hasApproachedRef.current && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      hasApproachedRef.current = true;
      progressRef.current = 0;
      animationSpeedRef.current = 0.004; // Slower animation for approach
      startPosRef.current.copy(camera.position);
      targetPosRef.current.copy(APPROACH_POSITION);
      targetLookRef.current.copy(APPROACH_TARGET);
      if (controlsRef.current) {
        startTargetRef.current.copy(controlsRef.current.target);
      }
    }
  }, [isApproaching, camera]);

  useEffect(() => {
    if (zoomToMonitor && !hasCompletedRef.current) {
      // Override any current animation (like approach) for final zoom
      isAnimatingRef.current = true;
      progressRef.current = 0;
      animationSpeedRef.current = 0.02; // Normal speed for final zoom
      startPosRef.current.copy(camera.position);
      targetPosRef.current.copy(MONITOR_POSITION);
      targetLookRef.current.copy(MONITOR_TARGET);
      if (controlsRef.current) {
        startTargetRef.current.copy(controlsRef.current.target);
      }
    }
  }, [zoomToMonitor, camera]);

  // Handle dance camera
  useEffect(() => {
    if (isDancing && hasCompletedRef.current) {
      isAnimatingRef.current = true;
      progressRef.current = 0;
      startPosRef.current.copy(camera.position);
      targetPosRef.current.copy(DANCE_POSITION);
      targetLookRef.current.copy(DANCE_TARGET);
      if (controlsRef.current) {
        startTargetRef.current.copy(controlsRef.current.target);
      }
    } else if (!isDancing && hasCompletedRef.current) {
      isAnimatingRef.current = true;
      progressRef.current = 0;
      startPosRef.current.copy(camera.position);
      targetPosRef.current.copy(MONITOR_POSITION);
      targetLookRef.current.copy(MONITOR_TARGET);
      if (controlsRef.current) {
        startTargetRef.current.copy(controlsRef.current.target);
      }
    }
  }, [isDancing, camera]);

  // Reset camera when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0 && hasCompletedRef.current) {
      isAnimatingRef.current = true;
      progressRef.current = 0;
      startPosRef.current.copy(camera.position);
      targetPosRef.current.copy(MONITOR_POSITION);
      targetLookRef.current.copy(MONITOR_TARGET);
      if (controlsRef.current) {
        startTargetRef.current.copy(controlsRef.current.target);
      }
    }
  }, [resetTrigger, camera]);

  useFrame(() => {
    if (!isAnimatingRef.current || !controlsRef.current) return;

    progressRef.current += animationSpeedRef.current;

    if (progressRef.current >= 1) {
      progressRef.current = 1;
      isAnimatingRef.current = false;
      camera.position.copy(targetPosRef.current);
      controlsRef.current.target.copy(targetLookRef.current);
      controlsRef.current.update();

      // Only mark as completed for monitor zoom, not approach
      if (targetPosRef.current.equals(MONITOR_POSITION)) {
        hasCompletedRef.current = true;
        onZoomComplete?.();
      } else if (targetPosRef.current.equals(DANCE_POSITION)) {
        onDanceCameraReady?.();
      }
      // For approach animation, just stop - don't mark as completed
      return;
    }

    const t = 1 - Math.pow(1 - progressRef.current, 3);
    camera.position.lerpVectors(startPosRef.current, targetPosRef.current, t);
    controlsRef.current.target.lerpVectors(startTargetRef.current, targetLookRef.current, t);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      minDistance={0.5}
      maxDistance={20}
      enabled={!isAnimatingRef.current}
    />
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333333" wireframe />
    </mesh>
  );
}

// Loading overlay that shows progress while 3D assets load
function LoadingOverlay() {
  const { progress, active } = useProgress();

  if (!active && progress === 100) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        fontFamily: "monospace",
      }}
    >
      <div style={{ color: "#00ff00", fontSize: "18px", marginBottom: "20px" }}>
        AAKASH PORTFOLIO BIOS v2.0
      </div>
      <div style={{ color: "#aaa", fontSize: "14px", marginBottom: "10px" }}>
        Loading 3D Assets...
      </div>
      <div
        style={{
          width: "300px",
          height: "20px",
          backgroundColor: "#333",
          border: "2px solid #666",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#00aa00",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div style={{ color: "#666", fontSize: "12px", marginTop: "8px" }}>
        {Math.round(progress)}% Complete
      </div>
    </div>
  );
}

// Name and time overlay component
function NameOverlay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "30px",
        left: "30px",
        zIndex: 100,
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "8px 16px",
          marginBottom: "4px",
        }}
      >
        <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold" }}>
          Aakash Yadav
        </span>
      </div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "8px 16px",
          marginBottom: "4px",
        }}
      >
        <span style={{ color: "#ffffff", fontSize: "14px" }}>
          AI Engineer
        </span>
      </div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ color: "#ffffff", fontSize: "14px" }}>
          {time}
        </span>
        <span style={{ color: "#888", fontSize: "12px" }}>◀</span>
        <span style={{ color: "#888", fontSize: "12px" }}>▶</span>
      </div>
    </div>
  );
}

const RetroButton = ({ onClick, children, style = {} }: { onClick: () => void; children: React.ReactNode; style?: React.CSSProperties }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 20px",
      backgroundColor: "#c0c0c0",
      color: "#000000",
      border: "none",
      borderRadius: "0px",
      cursor: "pointer",
      fontSize: "14px",
      fontFamily: "'MS Sans Serif', Arial, sans-serif",
      fontWeight: "bold",
      boxShadow: "inset -1px -1px 0px #0a0a0a, inset 1px 1px 0px #ffffff, inset -2px -2px 0px #808080, inset 2px 2px 0px #dfdfdf, 4px 4px 10px rgba(0,0,0,0.5)",
      outline: "2px solid #0a0a0a",
      ...style,
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.boxShadow = "inset 1px 1px 0px #0a0a0a, inset -1px -1px 0px #ffffff, inset 2px 2px 0px #808080, inset -2px -2px 0px #dfdfdf";
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.boxShadow = "inset -1px -1px 0px #0a0a0a, inset 1px 1px 0px #ffffff, inset -2px -2px 0px #808080, inset 2px 2px 0px #dfdfdf, 4px 4px 10px rgba(0,0,0,0.5)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "inset -1px -1px 0px #0a0a0a, inset 1px 1px 0px #ffffff, inset -2px -2px 0px #808080, inset 2px 2px 0px #dfdfdf, 4px 4px 10px rgba(0,0,0,0.5)";
    }}
  >
    {children}
  </button>
);

// Component to track loading progress and notify parent
function AssetsLoadingTracker({
  onAssetsReady,
  onAssetsProgress,
}: {
  onAssetsReady?: () => void;
  onAssetsProgress?: (progress: number) => void;
}) {
  const { progress, active } = useProgress();
  const hasNotifiedReady = useRef(false);

  useEffect(() => {
    // Defer to avoid setState during render of other components
    const timer = setTimeout(() => {
      onAssetsProgress?.(progress);
    }, 0);
    return () => clearTimeout(timer);
  }, [progress, onAssetsProgress]);

  useEffect(() => {
    // Assets are ready when loading is complete and no longer active
    if (!active && progress === 100 && !hasNotifiedReady.current) {
      hasNotifiedReady.current = true;
      // Small delay to ensure shaders are compiled
      setTimeout(() => {
        onAssetsReady?.();
      }, 100);
    }
  }, [active, progress, onAssetsReady]);

  return null;
}

export function Scene({
  startCharacterAnimation = false,
  onSeated,
  zoomToMonitor = false,
  onZoomComplete,
  showResetButton = false,
  onAssetsReady,
  onAssetsProgress,
}: SceneProps) {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isDancing, setIsDancing] = useState(false);
  const [showDanceButton, setShowDanceButton] = useState(false);
  const [showOS, setShowOS] = useState(false);
  const [showBootGif, setShowBootGif] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const officeAudioRef = useRef<HTMLAudioElement | null>(null);
  const xpAudioRef = useRef<HTMLAudioElement | null>(null);

  // Start office ambient music when character enters and preload XP audio
  useEffect(() => {
    if (startCharacterAnimation && !officeAudioRef.current) {
      officeAudioRef.current = new Audio("/models/busy-office-no-people-loop-6719.mp3");
      officeAudioRef.current.loop = true;
      officeAudioRef.current.volume = 0.5;
      officeAudioRef.current.play().catch(() => {
        // Autoplay might be blocked, that's ok
      });

      // Preload XP audio so it's ready when needed
      xpAudioRef.current = new Audio("/microsoft-windows-xp-shutdown-sound-effect-443256.mp3");
      xpAudioRef.current.preload = "auto";
      xpAudioRef.current.volume = 1.0;
      xpAudioRef.current.load();
    }
  }, [startCharacterAnimation]);

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  const handleZoomComplete = () => {
    // Stop office ambient music when zoomed to monitor
    if (officeAudioRef.current) {
      officeAudioRef.current.pause();
      officeAudioRef.current.currentTime = 0;
      officeAudioRef.current = null;
    }

    // Play XP sound using the preloaded audio ref
    if (xpAudioRef.current) {
      xpAudioRef.current.currentTime = 0;
      xpAudioRef.current.volume = 1.0;
      xpAudioRef.current.play().catch(e => console.error("Play error:", e));
    }

    setShowDanceButton(true);
    setShowOS(true);
    onZoomComplete?.();
  };

  // Transition from boot GIF to desktop after 2 seconds, then go fullscreen
  useEffect(() => {
    if (showOS && showBootGif) {
      const timer = setTimeout(() => {
        setShowBootGif(false);
        // Stop XP audio when boot ends
        if (xpAudioRef.current) {
          xpAudioRef.current.pause();
        }
        // Small delay then expand to fullscreen
        setTimeout(() => {
          setIsFullScreen(true);
        }, 100);
      }, 2000); // 2 seconds for XP intro

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showOS, showBootGif]);

  const handleDanceBreak = () => {
    setIsDancing(true);
    // Start music
    audioRef.current = new Audio("/mixkit-like-a-loop-machine-876.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;
    audioRef.current.play();
  };

  const handleBackToWork = () => {
    setIsDancing(false);
    // Stop music
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (officeAudioRef.current) {
        officeAudioRef.current.pause();
        officeAudioRef.current = null;
      }
      if (xpAudioRef.current) {
        xpAudioRef.current.pause();
        xpAudioRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Name and time overlay - shown during 3D scene, hidden after zoom */}
      {!showOS && <NameOverlay />}

      {/* Retro OS Overlay - shown after zoom completes, expands to fullscreen after boot */}
      {showOS && (
        <div
          style={{
            position: "absolute",
            top: isFullScreen ? "0" : "50%",
            left: isFullScreen ? "0" : "50%",
            transform: isFullScreen ? "none" : "translate(-50%, -50%)",
            width: isFullScreen ? "100%" : "min(72vw, 780px)",
            height: isFullScreen ? "100%" : "min(62vh, 560px)",
            zIndex: 200,
            borderRadius: isFullScreen ? "0" : "8px",
            overflow: "hidden",
            boxShadow: isFullScreen ? "none" : `
              0 0 0 8px #2a2a2a,
              0 0 0 12px #1a1a1a,
              0 0 40px rgba(0, 0, 0, 0.8),
              inset 0 0 30px rgba(0, 0, 0, 0.3)
            `,
            background: "#000",
            transition: "all 0.5s ease-in-out",
          }}
        >
          {/* CRT screen curvature effect - hide in fullscreen */}
          {!isFullScreen && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.15) 100%)",
                pointerEvents: "none",
                zIndex: 10,
              }}
            />
          )}
          {/* Scanline effect - hide in fullscreen */}
          {!isFullScreen && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
                pointerEvents: "none",
                zIndex: 10,
              }}
            />
          )}
          {/* OS content */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {showBootGif ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Boot GIF with blur effect to match CRT */}
                <img
                  src="/windows_xp_boot_screen_animation_in_hd_by_lukeinatordude_db6dw1k.gif"
                  alt="Loading..."
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    filter: "blur(0.3px)",
                  }}
                />
                {/* Scanlines overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
                    backgroundSize: "100% 2px",
                    pointerEvents: "none",
                  }}
                />
                {/* RGB color separation */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.03))",
                    backgroundSize: "3px 100%",
                    pointerEvents: "none",
                  }}
                />
                {/* Vignette effect */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 0 150px rgba(0, 0, 0, 0.4)",
                    pointerEvents: "none",
                  }}
                />
                {/* Screen glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 0 80px rgba(255, 255, 255, 0.03)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ) : (
              <Desktop />
            )}
          </div>
        </div>
      )}

      {/* Buttons container */}
      {showResetButton && !showOS && (
        <div style={{ position: "absolute", bottom: "30px", right: "30px", zIndex: 100, display: "flex", gap: "10px", flexDirection: "column", alignItems: "flex-end" }}>
          {!isDancing ? (
            <>
              <RetroButton onClick={handleReset}>
                👀 Boss is Watching
              </RetroButton>
              {showDanceButton && (
                <RetroButton onClick={handleDanceBreak} style={{ backgroundColor: "#ff69b4" }}>
                  💃 Dance Break!
                </RetroButton>
              )}
            </>
          ) : (
            <RetroButton onClick={handleBackToWork} style={{ backgroundColor: "#98fb98" }}>
              💼 Back to Work
            </RetroButton>
          )}
        </div>
      )}

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera
          makeDefault
          position={OVERVIEW_POSITION.toArray()}
          fov={50}
        />

        <CameraController
          zoomToMonitor={zoomToMonitor}
          onZoomComplete={handleZoomComplete}
          resetTrigger={resetTrigger}
          isDancing={isDancing}
          isApproaching={startCharacterAnimation}
        />

        {/* Track asset loading progress */}
        <AssetsLoadingTracker
          onAssetsReady={onAssetsReady}
          onAssetsProgress={onAssetsProgress}
        />

        <Suspense fallback={<LoadingFallback />}>
          <Lighting />
          <DeskModel />
          <AnimatedCharacter
            startAnimation={startCharacterAnimation}
            onSeated={onSeated}
            isDancing={isDancing}
          />
          <Environment preset="apartment" />
        </Suspense>

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Fog for depth */}
        <fog attach="fog" args={["#1a1a2e", 10, 30]} />
      </Canvas>
    </div>
  );
}
