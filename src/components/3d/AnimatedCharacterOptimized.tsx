"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { AnimationMixer, LoopRepeat, LoopOnce, AnimationClip, Object3D } from "three";
import { SkeletonUtils } from "three-stdlib";

// Preload all optimized GLB files (97% smaller than FBX originals)
useGLTF.preload("/models/Walking_hq.glb");
useGLTF.preload("/models/SitToType_hq.glb");
useGLTF.preload("/models/Typing_hq.glb");
useGLTF.preload("/models/Wave Hip Hop Dance_hq.glb");

interface AnimatedCharacterOptimizedProps {
  startAnimation?: boolean;
  onSeated?: () => void;
  isDancing?: boolean;
  onDanceReady?: () => void;
}

const CHAIR_POSITION = { x: 6, y: 0, z: 4 };
const START_POSITION = { x: 8, y: 0, z: 8 };
const DANCE_POSITION = { x: 8, y: 0, z: 7 };
const CHARACTER_SCALE = 0.01;

export function AnimatedCharacterOptimized({
  startAnimation = false,
  onSeated,
  isDancing = false,
  onDanceReady
}: AnimatedCharacterOptimizedProps) {
  const groupRef = useRef<Object3D>(null);
  const mixerRef = useRef<AnimationMixer | null>(null);
  const [animationPhase, setAnimationPhase] = useState<"idle" | "walking" | "sitting" | "typing" | "walkingToDance" | "dancing">("idle");
  const [position, setPosition] = useState(START_POSITION);
  const [rotation, setRotation] = useState(0);
  const hasCalledOnSeated = useRef(false);
  const hasCalledDanceReady = useRef(false);
  const prevIsDancing = useRef(false);

  // Load all GLB files
  const { scene: walkingScene, animations: walkingAnims } = useGLTF("/models/Walking_hq.glb");
  const { animations: sitAnims } = useGLTF("/models/SitToType_hq.glb");
  const { animations: typingAnims } = useGLTF("/models/Typing_hq.glb");
  const { animations: danceAnims } = useGLTF("/models/Wave Hip Hop Dance_hq.glb");

  // Clone the scene properly for this instance
  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(walkingScene);
    return cloned;
  }, [walkingScene]);

  // Create animation mixer when clone is ready
  useEffect(() => {
    if (clone && !mixerRef.current) {
      mixerRef.current = new AnimationMixer(clone);
    }
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [clone]);

  // Start walking when animation begins
  useEffect(() => {
    if (startAnimation && animationPhase === "idle") {
      setAnimationPhase("walking");
    }
  }, [startAnimation, animationPhase]);

  // Handle dance mode toggle
  useEffect(() => {
    if (isDancing && !prevIsDancing.current && animationPhase === "typing") {
      setAnimationPhase("walkingToDance");
      hasCalledDanceReady.current = false;
    } else if (!isDancing && prevIsDancing.current && animationPhase === "dancing") {
      setAnimationPhase("walking");
      hasCalledOnSeated.current = false;
    }
    prevIsDancing.current = isDancing;
  }, [isDancing, animationPhase]);

  // Play animations based on phase
  useEffect(() => {
    if (!mixerRef.current || !clone) return;

    const mixer = mixerRef.current;
    mixer.stopAllAction();

    let clip: AnimationClip | undefined;
    let loop = true;

    switch (animationPhase) {
      case "idle":
      case "walking":
      case "walkingToDance":
        clip = walkingAnims[0];
        break;
      case "sitting":
        clip = sitAnims[0];
        loop = false;
        break;
      case "typing":
        clip = typingAnims[0];
        break;
      case "dancing":
        clip = danceAnims[0];
        break;
    }

    if (clip) {
      const action = mixer.clipAction(clip, clone);
      if (loop) {
        action.setLoop(LoopRepeat, Infinity);
      } else {
        action.setLoop(LoopOnce, 1);
        action.clampWhenFinished = true;
      }
      action.reset().play();
    }
  }, [animationPhase, clone, walkingAnims, sitAnims, typingAnims, danceAnims]);

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
        setRotation(0);
        setAnimationPhase("dancing");

        if (!hasCalledDanceReady.current) {
          hasCalledDanceReady.current = true;
          onDanceReady?.();
        }
      }
    }
  });

  if (!clone) return null;

  const displayScale = startAnimation ? CHARACTER_SCALE : 0;

  return (
    <primitive
      ref={groupRef}
      object={clone}
      scale={displayScale}
      position={[position.x, position.y, position.z]}
      rotation={[0, rotation, 0]}
    />
  );
}
