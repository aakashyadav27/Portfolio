"use client";

import { useState, useRef, useCallback, ReactNode } from "react";
import { motion } from "motion/react";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  zIndex: number;
}

export function Window({
  title,
  children,
  isActive,
  isMinimized,
  isMaximized,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 500, height: 400 },
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  zIndex,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size] = useState(initialSize);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      onFocus();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setPosition({
          x: dragRef.current.startPosX + dx,
          y: Math.max(0, dragRef.current.startPosY + dy),
        });
      };

      const handleMouseUp = () => {
        dragRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [isMaximized, onFocus, position]
  );

  if (isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="absolute"
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100% - 40px)" : size.height,
        zIndex,
      }}
      onClick={onFocus}
    >
      <div
        className="flex h-full flex-col overflow-hidden rounded-t-lg border border-[#0054e3]"
        style={{
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          fontFamily: "'Tahoma', 'MS Sans Serif', sans-serif",
        }}
      >
        {/* XP Title Bar */}
        <div
          className="flex h-[28px] cursor-move items-center justify-between rounded-t-lg px-2"
          style={{
            background: isActive
              ? "linear-gradient(180deg, #0a246a 0%, #0b63ce 8%, #2b8dd9 40%, #0070d6 90%, #013bc3 100%)"
              : "linear-gradient(180deg, #7f9db9 0%, #a8c1da 8%, #b9cfe0 40%, #a8c1da 90%, #7f9db9 100%)",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🌐</span>
            <span className="truncate text-sm font-bold text-white" style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>
              {title}
            </span>
          </div>
          <div className="flex gap-[2px]">
            {/* Minimize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="flex h-[21px] w-[21px] items-center justify-center rounded-sm text-xs font-bold text-white"
              style={{
                background: "linear-gradient(180deg, #3c8df3 0%, #0f64d2 50%, #0953b8 100%)",
                border: "1px solid #0946a0",
              }}
            >
              <span className="mb-2">_</span>
            </button>
            {/* Maximize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              className="flex h-[21px] w-[21px] items-center justify-center rounded-sm text-xs font-bold text-white"
              style={{
                background: "linear-gradient(180deg, #3c8df3 0%, #0f64d2 50%, #0953b8 100%)",
                border: "1px solid #0946a0",
              }}
            >
              <span className="text-[11px]">{isMaximized ? "❐" : "□"}</span>
            </button>
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex h-[21px] w-[21px] items-center justify-center rounded-sm text-xs font-bold text-white"
              style={{
                background: "linear-gradient(180deg, #e89a6e 0%, #d45246 50%, #c62b1a 100%)",
                border: "1px solid #9c1006",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="flex h-[22px] items-center gap-4 bg-[#ece9d8] px-2 text-xs" style={{ borderBottom: "1px solid #adb1b8" }}>
          <span className="cursor-pointer hover:underline">File</span>
          <span className="cursor-pointer hover:underline">Edit</span>
          <span className="cursor-pointer hover:underline">View</span>
          <span className="cursor-pointer hover:underline">Help</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-white">
          {children}
        </div>

        {/* Status Bar */}
        <div className="flex h-[22px] items-center bg-[#ece9d8] px-2 text-xs" style={{ borderTop: "1px solid #adb1b8" }}>
          <div className="flex items-center gap-1 border border-[#d2d2d2] bg-[#f1efe2] px-2 py-0.5">
            <span className="text-[#000]">Ready</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
