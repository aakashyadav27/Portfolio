"use client";

import { ReactNode } from "react";

interface CRTEffectProps {
  children: ReactNode;
  enabled?: boolean;
}

export function CRTEffect({ children, enabled = true }: CRTEffectProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className="crt-container relative h-full w-full overflow-hidden">
      {/* Main content with subtle blur for phosphor glow effect */}
      <div className="crt-content h-full w-full" style={{ filter: "blur(0.3px)" }}>
        {children}
      </div>

      {/* Scanlines overlay */}
      <div
        className="crt-scanlines pointer-events-none absolute inset-0 z-[100]"
        style={{
          background: `linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          )`,
          backgroundSize: "100% 2px",
        }}
      />

      {/* RGB color separation / subpixel effect */}
      <div
        className="crt-rgb pointer-events-none absolute inset-0 z-[101]"
        style={{
          background: `linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.03),
            rgba(0, 255, 0, 0.02),
            rgba(0, 0, 255, 0.03)
          )`,
          backgroundSize: "3px 100%",
        }}
      />

      {/* Vignette effect - darkened corners */}
      <div
        className="crt-vignette pointer-events-none absolute inset-0 z-[102]"
        style={{
          boxShadow: "inset 0 0 150px rgba(0, 0, 0, 0.4)",
        }}
      />

      {/* Subtle screen glow */}
      <div
        className="crt-glow pointer-events-none absolute inset-0 z-[103]"
        style={{
          boxShadow: "inset 0 0 80px rgba(255, 255, 255, 0.03)",
        }}
      />

      {/* Flicker animation overlay */}
      <div className="crt-flicker pointer-events-none absolute inset-0 z-[104]" />

      {/* Screen curvature effect (subtle) */}
      <div
        className="crt-curve pointer-events-none absolute inset-0 z-[105]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 70%, rgba(0, 0, 0, 0.15) 100%)",
        }}
      />
    </div>
  );
}
