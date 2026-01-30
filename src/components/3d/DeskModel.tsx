"use client";

import { useGLTF } from "@react-three/drei";

export function DeskModel() {
  const { scene } = useGLTF("/models/90s_retro_office_pack.glb");

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  );
}

// Preload the model
useGLTF.preload("/models/90s_retro_office_pack.glb");
