"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import { AnimationMixer, LoopRepeat, LoopOnce } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

interface AnimatedCharacterProps {
  startAnimation?: boolean;
  onSeated?: () => void;
  isDancing?: boolean;
  onDanceReady?: () => void;
}

// ADJUST THESE VALUES to match your office model
const CHAIR_POSITION = { x: 6, y: 0, z: 4 };
const START_POSITION = { x: 8, y: 0, z: 8 };
const DANCE_POSITION = { x: 8, y: 0, z: 7 };
const CHARACTER_SCALE = 0.01;

export function AnimatedCharacter({
  startAnimation = false,
  onSeated,
  isDancing = false,
  onDanceReady
}: AnimatedCharacterProps) {
  const mixerRef = useRef<AnimationMixer | null>(null);
  const [animationPhase, setAnimationPhase] = useState<"idle" | "walking" | "sitting" | "typing" | "walkingToDance" | "dancing">("idle");
  const [position, setPosition] = useState(START_POSITION);
  const [rotation, setRotation] = useState(0);
  const hasCalledOnSeated = useRef(false);
  const hasCalledDanceReady = useRef(false);
  const prevIsDancing = useRef(false);

  // Lazy-loaded animation states
  const [sitToTypeFbx, setSitToTypeFbx] = useState<any>(null);
  const [typingFbx, setTypingFbx] = useState<any>(null);
  const [danceFbx, setDanceFbx] = useState<any>(null);

  // Load walking FBX immediately (essential for first interaction)
  const walkingFbx = useFBX("/models/Walking.fbx");

  // Lazy load other animations when needed
  useEffect(() => {
    if (animationPhase === "walking" && !sitToTypeFbx) {
      // Preload sit and type animations while walking
      const loader = new FBXLoader();
      loader.load("/models/SitToType.fbx", (fbx) => setSitToTypeFbx(fbx));
      loader.load("/models/Typing.fbx", (fbx) => setTypingFbx(fbx));
    }
  }, [animationPhase, sitToTypeFbx]);

  // Load dance animation only when dance mode is activated
  useEffect(() => {
    if (isDancing && !danceFbx) {
      const loader = new FBXLoader();
      loader.load("/models/Wave Hip Hop Dance.fbx", (fbx) => setDanceFbx(fbx));
    }
  }, [isDancing, danceFbx]);

  // Start walking when animation begins
  useEffect(() => {
    if (startAnimation && animationPhase === "idle") {
      setAnimationPhase("walking");
    }
  }, [startAnimation, animationPhase]);

  // Handle dance mode toggle
  useEffect(() => {
    if (isDancing && !prevIsDancing.current && animationPhase === "typing") {
      // Start walking to dance position
      setAnimationPhase("walkingToDance");
      hasCalledDanceReady.current = false;
    } else if (!isDancing && prevIsDancing.current && animationPhase === "dancing") {
      // Walk back to chair
      setAnimationPhase("walking");
      hasCalledOnSeated.current = false;
    }
    prevIsDancing.current = isDancing;
  }, [isDancing, animationPhase]);

  // Initialize and switch animations
  useEffect(() => {
    if (!walkingFbx) return;

    if (!mixerRef.current) {
      mixerRef.current = new AnimationMixer(walkingFbx);
    }

    const mixer = mixerRef.current;
    mixer.stopAllAction();

    let clip;
    let loop = true;

    switch (animationPhase) {
      case "walking":
      case "walkingToDance":
        clip = walkingFbx.animations[0];
        break;
      case "sitting":
        // Wait for animation to load
        if (!sitToTypeFbx?.animations?.[0]) return;
        clip = sitToTypeFbx.animations[0];
        loop = false;
        break;
      case "typing":
        // Wait for animation to load
        if (!typingFbx?.animations?.[0]) return;
        clip = typingFbx.animations[0];
        break;
      case "dancing":
        // Wait for animation to load
        if (!danceFbx?.animations?.[0]) return;
        clip = danceFbx.animations[0];
        break;
      default:
        return;
    }

    if (clip) {
      const action = mixer.clipAction(clip);
      if (loop) {
        action.setLoop(LoopRepeat, Infinity);
      } else {
        action.setLoop(LoopOnce, 1);
        action.clampWhenFinished = true;
      }
      action.play();
    }
  }, [animationPhase, walkingFbx, sitToTypeFbx, typingFbx, danceFbx]);

  // Animation frame update
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    if (animationPhase === "walking") {
      const dx = CHAIR_POSITION.x - position.x;
      const dz = CHAIR_POSITION.z - position.z;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance > 0.1) {
        const speed = 1.2 * delta;
        setPosition(prev => ({
          ...prev,
          x: prev.x + (dx / distance) * speed,
          z: prev.z + (dz / distance) * speed,
        }));
        setRotation(Math.atan2(dx, dz));
      } else {
        setPosition(CHAIR_POSITION);
        setRotation(-Math.PI / 2);
        setAnimationPhase("sitting");

        setTimeout(() => {
          setAnimationPhase("typing");
          if (!hasCalledOnSeated.current) {
            hasCalledOnSeated.current = true;
            onSeated?.();
          }
        }, 2500);
      }
    }

    if (animationPhase === "walkingToDance") {
      const dx = DANCE_POSITION.x - position.x;
      const dz = DANCE_POSITION.z - position.z;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance > 0.1) {
        const speed = 1.5 * delta;
        setPosition(prev => ({
          ...prev,
          x: prev.x + (dx / distance) * speed,
          z: prev.z + (dz / distance) * speed,
        }));
        setRotation(Math.atan2(dx, dz));
      } else {
        setPosition(DANCE_POSITION);
        setRotation(0); // Face camera
        setAnimationPhase("dancing");

        if (!hasCalledDanceReady.current) {
          hasCalledDanceReady.current = true;
          onDanceReady?.();
        }
      }
    }
  });

  if (!walkingFbx) return null;

  return (
    <primitive
      object={walkingFbx}
      scale={CHARACTER_SCALE}
      position={[position.x, position.y, position.z]}
      rotation={[0, rotation, 0]}
    />
  );
}
