"use client";

import { useGLTF } from "@react-three/drei";

export function DeskModelOptimized() {
  const { scene } = useGLTF("/models/90s_retro_office_pack_compressed.glb");

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  );
}

// Preload the optimized model (86% smaller than original)
useGLTF.preload("/models/90s_retro_office_pack_compressed.glb");
