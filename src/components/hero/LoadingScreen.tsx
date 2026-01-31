"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onComplete?: () => void;
  assetsReady?: boolean;
  assetsProgress?: number;
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

export function LoadingScreen({ onComplete, assetsReady = false, assetsProgress = 0 }: LoadingScreenProps) {
  const [hasClicked, setHasClicked] = useState(false);
  const [bootTextComplete, setBootTextComplete] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  // Both conditions must be met: boot text animation done AND 3D assets loaded
  const isFullyReady = bootTextComplete && assetsReady;

  // Start boot sequence immediately
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, line.text]);

        // Mark boot text as complete after last message
        if (index === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setBootTextComplete(true);
          }, 500);
        }
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Complete when fully ready AND user has clicked
  useEffect(() => {
    if (isFullyReady && hasClicked) {
      onComplete?.();
    }
  }, [isFullyReady, hasClicked, onComplete]);

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

      {/* Progress bar - shows actual 3D asset loading progress */}
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
            animate={{ width: `${assetsProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div style={{ color: '#666', marginTop: '4px', fontSize: '12px' }}>
          Loading 3D Assets: {Math.round(assetsProgress)}%
          {hasClicked && !isFullyReady && (
            <span style={{ marginLeft: '15px', color: '#00aa00' }}>✓ Sound enabled</span>
          )}
        </div>
      </div>

      {/* Click to enter prompt - shown when fully ready */}
      {isFullyReady && !hasClicked && (
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

      {/* Loading indicator when boot text done but assets still loading */}
      {bootTextComplete && !assetsReady && (
        <div className="text-center mb-8">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ color: '#00aa00', fontSize: '12px' }}
          >
            Preparing 3D environment...
          </motion.span>
        </div>
      )}

      {/* Subtle hint during boot */}
      {!bootTextComplete && !hasClicked && (
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
