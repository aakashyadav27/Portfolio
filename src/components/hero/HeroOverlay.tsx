"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { BorderBeam } from "@/components/ui/border-beam";

interface HeroOverlayProps {
  showDesktop: boolean;
  onEnterDesktop: () => void;
  onBackToOverview: () => void;
}

export function HeroOverlay({
  showDesktop,
  onEnterDesktop,
  onBackToOverview,
}: HeroOverlayProps) {
  return (
    <>
      {/* Particles Background - shown when not in desktop mode */}
      <AnimatePresence>
        {!showDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <Particles
              className="absolute inset-0"
              quantity={50}
              staticity={30}
              ease={50}
              color="#ffffff"
              size={0.5}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title and CTA - shown when not in desktop mode */}
      <AnimatePresence>
        {!showDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 text-center"
          >
            <h1 className="mb-4 font-mono text-4xl font-bold text-white md:text-5xl">
              Welcome to My Portfolio
            </h1>
            <p className="mb-6 font-mono text-lg text-slate-300">
              Click the monitor or press START to explore
            </p>
            <div className="relative inline-block">
              <Button
                onClick={onEnterDesktop}
                className="group relative overflow-hidden bg-[#c0c0c0] px-8 py-3 font-mono text-black shadow-[inset_-2px_-2px_0px_#808080,inset_2px_2px_0px_#ffffff] hover:bg-[#d4d4d4] active:shadow-[inset_2px_2px_0px_#808080,inset_-2px_-2px_0px_#ffffff]"
              >
                <span className="relative z-10">START</span>
              </Button>
              <BorderBeam
                size={60}
                duration={4}
                colorFrom="#00ff88"
                colorTo="#00aaff"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <AnimatePresence>
        {!showDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="absolute left-4 top-4 z-10 font-mono text-sm text-white/70"
          >
            <p>Drag to rotate • Scroll to zoom</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button - shown when in desktop mode */}
      <AnimatePresence>
        {showDesktop && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-4 top-4 z-30"
          >
            <Button
              onClick={onBackToOverview}
              variant="outline"
              className="bg-[#c0c0c0] font-mono text-black shadow-[inset_-2px_-2px_0px_#808080,inset_2px_2px_0px_#ffffff] hover:bg-[#d4d4d4]"
            >
              ← Back to Desk
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
