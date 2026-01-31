"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  { text: `AAKASH BIOS (C) ${new Date().getFullYear()} Aakash Yadav`, delay: 0 },
  { text: "AI PORTFOLIO SYSTEM v2.0", delay: 100 },
  { text: "", delay: 200 },
  { text: "CPU: AI Engineer Brain @ 4.0GHz", delay: 300 },
  { text: "Memory Test: 4 Years Experience... OK", delay: 500 },
  { text: "Loading Skills: LLM, NLP, ML, Cloud... OK", delay: 700 },
  { text: "", delay: 800 },
  { text: "Detecting Projects... 5 Found", delay: 900 },
  { text: "Detecting Certifications... Loaded", delay: 1000 },
  { text: "Connecting to Innovation Engine... Ready", delay: 1100 },
  { text: "", delay: 1200 },
  { text: "Loading Aakash's Portfolio...", delay: 1400 },
  { text: "", delay: 1600 },
  { text: "Starting Desktop Environment...", delay: 1800 },
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isBooting) return;

    const timers: NodeJS.Timeout[] = [];

    BOOT_MESSAGES.forEach((msg, index) => {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg.text]);
        setProgress(((index + 1) / BOOT_MESSAGES.length) * 100);

        // Auto-complete after last message
        if (index === BOOT_MESSAGES.length - 1) {
          setTimeout(() => {
            setIsBooting(false);
            onComplete();
          }, 800);
        }
      }, msg.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isBooting, onComplete]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-[100] flex flex-col bg-black p-4 font-mono text-sm text-[#aaaaaa]"
        >
          {/* BIOS-style output */}
          <div className="flex-1 overflow-hidden">
            {visibleMessages.map((msg, index) => (
              <div key={index} className="leading-relaxed">
                {msg || "\u00A0"}
              </div>
            ))}
          </div>

          {/* Progress bar at bottom */}
          <div className="mb-4">
            <div
              style={{
                width: "300px",
                height: "16px",
                backgroundColor: "#222",
                border: "1px solid #444",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  backgroundColor: "#00aa00",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="mt-1 text-xs text-[#666]">
              Loading: {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
