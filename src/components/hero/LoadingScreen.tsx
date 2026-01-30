"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const BOOT_LINES = [
  { text: "AAKASH PORTFOLIO BIOS v2.0", delay: 0 },
  { text: "Copyright (C) 2024 Aakash Yadav", delay: 200 },
  { text: "", delay: 300 },
  { text: "Initializing AI Systems...", delay: 400 },
  { text: "Loading Neural Networks... OK", delay: 700 },
  { text: "Calibrating LLM Models... OK", delay: 1000 },
  { text: "Connecting to Cloud Services... OK", delay: 1300 },
  { text: "", delay: 1400 },
  { text: "Starting Portfolio Environment...", delay: 1600 },
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [hasClicked, setHasClicked] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // Start boot sequence immediately
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, line.text]);
        setProgress(((index + 1) / BOOT_LINES.length) * 100);

        // Mark boot as complete after last message
        if (index === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setBootComplete(true);
          }, 500);
        }
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Complete when boot is done - if user already clicked, proceed immediately
  // Otherwise wait for click
  useEffect(() => {
    if (bootComplete) {
      if (hasClicked) {
        onComplete?.();
      }
    }
  }, [bootComplete, hasClicked, onComplete]);

  // If user clicks after boot is complete, proceed immediately
  useEffect(() => {
    if (hasClicked && bootComplete) {
      onComplete?.();
    }
  }, [hasClicked, bootComplete, onComplete]);

  const handleClick = () => {
    setHasClicked(true);
  };

  return (
    <div
      className="flex h-full w-full cursor-pointer flex-col bg-black p-6 font-mono text-sm"
      onClick={handleClick}
    >
      {/* Boot text */}
      <div className="flex-1">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="leading-relaxed"
            style={{ color: index === 0 ? '#00ff00' : '#aaaaaa' }}
          >
            {line || "\u00A0"}
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div
          style={{
            width: '300px',
            height: '20px',
            backgroundColor: '#333',
            border: '2px solid #666',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              backgroundColor: '#00aa00',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div style={{ color: '#666', marginTop: '4px', fontSize: '12px' }}>
          Loading: {Math.round(progress)}%
          {hasClicked && !bootComplete && (
            <span style={{ marginLeft: '15px', color: '#00aa00' }}>✓ Sound enabled</span>
          )}
        </div>
      </div>

      {/* Click to enter prompt - shown prominently when boot is complete */}
      {bootComplete && !hasClicked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              backgroundColor: '#00aa00',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            CLICK ANYWHERE TO ENTER
          </motion.div>
        </motion.div>
      )}

      {/* Subtle hint during boot */}
      {!bootComplete && !hasClicked && (
        <div className="text-center mb-8">
          <motion.span
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: '#555', fontSize: '11px' }}
          >
            Click anywhere to enable sound
          </motion.span>
        </div>
      )}
    </div>
  );
}
