"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TaskbarWindow {
  id: string;
  title: string;
  isMinimized: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  showStartMenu: boolean;
}

export function Taskbar({
  windows,
  activeWindowId,
  onWindowClick,
  onStartClick,
  showStartMenu,
}: TaskbarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50 flex h-[40px] items-center justify-between border-t-2 border-[#dfdfdf] bg-[#c0c0c0] px-1"
      style={{
        boxShadow: "inset 0 1px 0 #ffffff",
        fontFamily: "'Tahoma', 'MS Sans Serif', 'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* Left side - Start button and window buttons */}
      <div className="flex items-center gap-1">
        {/* Start Button */}
        <button
          onClick={onStartClick}
          className={`flex h-[28px] items-center gap-1 px-2 font-bold ${
            showStartMenu
              ? "border border-[#404040] border-r-[#dfdfdf] border-b-[#dfdfdf] bg-[#c0c0c0]"
              : "border border-[#dfdfdf] border-r-[#404040] border-b-[#404040] bg-[#c0c0c0] hover:bg-[#d4d4d4]"
          }`}
          style={{
            boxShadow: showStartMenu
              ? "inset 1px 1px 0px #808080"
              : "inset -1px -1px 0px #808080, inset 1px 1px 0px #ffffff",
          }}
        >
          <span className="text-lg">🪟</span>
          <span className="text-sm">Start</span>
        </button>

        {/* Divider */}
        <div className="mx-1 h-[28px] w-[2px] border-l border-[#808080] border-r-[#ffffff]" />

        {/* Window Buttons */}
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`flex h-[26px] max-w-[150px] items-center gap-1 truncate px-2 text-sm ${
              activeWindowId === window.id && !window.isMinimized
                ? "border border-[#404040] border-r-[#dfdfdf] border-b-[#dfdfdf] bg-[#c0c0c0]"
                : "border border-[#dfdfdf] border-r-[#404040] border-b-[#404040] bg-[#c0c0c0] hover:bg-[#d4d4d4]"
            }`}
            style={{
              boxShadow:
                activeWindowId === window.id && !window.isMinimized
                  ? "inset 1px 1px 0px #808080"
                  : "inset -1px -1px 0px #808080, inset 1px 1px 0px #ffffff",
            }}
          >
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* Right side - System tray */}
      <div
        className="flex h-[28px] items-center gap-2 border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] px-2"
        style={{
          boxShadow: "inset 1px 1px 0px #808080",
        }}
      >
        <span className="text-lg">🔊</span>
        <span className="text-sm">{time}</span>
      </div>
    </div>
  );
}

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (item: string) => void;
}

export function StartMenu({ isOpen, onClose, onItemClick }: StartMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { id: "about", icon: "📁", label: "About Me" },
    { id: "projects", icon: "💾", label: "Projects" },
    { id: "experience", icon: "📋", label: "Experience" },
    { id: "contact", icon: "📧", label: "Contact" },
    { divider: true },
    { id: "shutdown", icon: "🔌", label: "Shut Down..." },
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-[40px] left-0 z-50 w-[200px] border-2 border-[#dfdfdf] border-r-[#404040] border-b-[#404040] bg-[#c0c0c0]"
          style={{
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            fontFamily: "'Tahoma', 'MS Sans Serif', 'Segoe UI', Arial, sans-serif",
          }}
        >
          {/* Blue sidebar */}
          <div className="absolute bottom-0 left-0 top-0 flex w-[24px] items-end bg-gradient-to-t from-[#000080] to-[#1084d0] p-1">
            <span className="origin-bottom-left -rotate-90 whitespace-nowrap text-sm font-bold text-white">
              Aakash&apos;s Portfolio
            </span>
          </div>

          {/* Menu items */}
          <div className="ml-[24px]">
            {menuItems.map((item, index) =>
              item.divider ? (
                <div
                  key={index}
                  className="mx-1 my-1 border-t border-[#808080] border-b-[#ffffff]"
                />
              ) : (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item.id!)}
                  className="flex w-full items-center gap-2 px-2 py-1 text-left text-sm hover:bg-[#000080] hover:text-white"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
