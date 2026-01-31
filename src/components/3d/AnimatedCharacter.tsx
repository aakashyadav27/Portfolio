"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useFBX, useGLTF } from "@react-three/drei";
import { AnimationMixer, LoopRepeat, LoopOnce } from "three";

// Preload all FBX files so they're ready before animation starts
useFBX.preload("/models/Walking.fbx");
useFBX.preload("/models/SitToType.fbx");
useFBX.preload("/models/Typing.fbx");
useFBX.preload("/models/Wave Hip Hop Dance.fbx");

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

  // Load all FBX files
  const walkingFbx = useFBX("/models/Walking.fbx");
  const sitToTypeFbx = useFBX("/models/SitToType.fbx");
  const typingFbx = useFBX("/models/Typing.fbx");
  const danceFbx = useFBX("/models/Wave Hip Hop Dance.fbx");

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
      case "idle":
      case "walking":
      case "walkingToDance":
        clip = walkingFbx.animations[0];
        break;
      case "sitting":
        clip = sitToTypeFbx.animations[0];
        loop = false;
        break;
      case "typing":
        clip = typingFbx.animations[0];
        break;
      case "dancing":
        clip = danceFbx.animations[0];
        break;
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

  // Hide character until animation starts (scale 0), then show at normal scale
  const displayScale = startAnimation ? CHARACTER_SCALE : 0;

  return (
    <primitive
      object={walkingFbx}
      scale={displayScale}
      position={[position.x, position.y, position.z]}
      rotation={[0, rotation, 0]}
    />
  );
}
