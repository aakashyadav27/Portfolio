"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { Icon, DESKTOP_ICONS } from "./Icon";
import { Window } from "./Window";
import { Taskbar, StartMenu } from "./Taskbar";
import { CRTEffect } from "./CRTEffect";
import {
  AboutContent,
  ProjectsContent,
  ExperienceContent,
  ContactContent,
  IEHomeContent,
} from "./WindowContent";

interface WindowState {
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const getWindowConfigs = (
  screenWidth: number,
  screenHeight: number
): Record<
  string,
  {
    title: string;
    content: React.ReactNode;
    size: { width: number; height: number };
  }
> => {
  // Calculate dynamic size for IE window (85% of viewport)
  const ieWidth = Math.floor(screenWidth * 0.85);
  const ieHeight = Math.floor((screenHeight - 40) * 0.85); // -40 for taskbar

  return {
    ie: {
      title: "Aakash Yadav - Portfolio",
      content: <IEHomeContent />,
      size: { width: ieWidth, height: ieHeight },
    },
    about: {
      title: "About Me",
      content: <AboutContent />,
      size: { width: 450, height: 400 },
    },
    projects: {
      title: "My Projects",
      content: <ProjectsContent />,
      size: { width: 550, height: 450 },
    },
    experience: {
      title: "Work Experience",
      content: <ExperienceContent />,
      size: { width: 500, height: 420 },
    },
    contact: {
      title: "Contact",
      content: <ContactContent />,
      size: { width: 400, height: 380 },
    },
  };
};

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(1);
  const hasOpenedIERef = useRef(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isScreenReady, setIsScreenReady] = useState(false);

  // Track screen size for dynamic window sizing
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      setIsScreenReady(true);
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const openWindow = useCallback(
    (id: string) => {
      // Check if window already exists
      const existingWindow = windows.find((w) => w.id === id);
      if (existingWindow) {
        // Bring to front and unminimize
        setWindows((prev) =>
          prev.map((w) =>
            w.id === id
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        );
        setActiveWindowId(id);
        setNextZIndex((prev) => prev + 1);
        return;
      }

      const configs = getWindowConfigs(screenSize.width, screenSize.height);
      const config = configs[id];
      if (!config) return;

      // Calculate position - always center IE window, offset others
      let position = { x: 50, y: 30 };
      if (id === "ie") {
        // Center the IE window perfectly
        const availableHeight = screenSize.height - 40; // subtract taskbar
        position = {
          x: Math.round((screenSize.width - config.size.width) / 2),
          y: Math.round((availableHeight - config.size.height) / 2),
        };
      } else {
        const offset = (windows.length % 5) * 30;
        position = { x: 50 + offset, y: 30 + offset };
      }

      const newWindow: WindowState = {
        id,
        title: config.title,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZIndex,
        content: config.content,
        position,
        size: config.size,
      };

      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(id);
      setNextZIndex((prev) => prev + 1);
      setShowStartMenu(false);
    },
    [windows, nextZIndex, screenSize]
  );

  // Auto-open IE window on mount (after screen size is detected)
  useEffect(() => {
    if (!hasOpenedIERef.current && isScreenReady) {
      hasOpenedIERef.current = true;
      openWindow("ie");
    }
  }, [isScreenReady, openWindow]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId(null);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindowId(null);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
      );
      setActiveWindowId(id);
      setNextZIndex((prev) => prev + 1);
    },
    [nextZIndex]
  );

  const handleTaskbarWindowClick = useCallback(
    (id: string) => {
      const window = windows.find((w) => w.id === id);
      if (!window) return;

      if (window.isMinimized) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === id
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          )
        );
        setActiveWindowId(id);
        setNextZIndex((prev) => prev + 1);
      } else if (activeWindowId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [windows, activeWindowId, nextZIndex, minimizeWindow, focusWindow]
  );

  const handleStartClick = useCallback(() => {
    setShowStartMenu((prev) => !prev);
  }, []);

  const handleStartMenuItemClick = useCallback(
    (item: string) => {
      if (item === "shutdown") {
        // Could trigger a fun shutdown animation
        setShowStartMenu(false);
        return;
      }
      openWindow(item);
    },
    [openWindow]
  );

  return (
    <CRTEffect enabled={true}>
      <div
        className="retro-font relative h-full w-full overflow-hidden"
        style={{
          backgroundImage: "url('/models/windows-xp-desktop-background-wallpaper-bliss-800x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Desktop Icons - hidden on mobile since window takes up most of screen */}
        <div className="absolute left-2 top-2 hidden sm:flex flex-col gap-2">
          <Icon
            label={DESKTOP_ICONS.computer.label}
            icon={DESKTOP_ICONS.computer.icon}
            onDoubleClick={() => openWindow("about")}
          />
          <Icon
            label={DESKTOP_ICONS.about.label}
            icon={DESKTOP_ICONS.about.icon}
            onDoubleClick={() => openWindow("about")}
          />
          <Icon
            label={DESKTOP_ICONS.projects.label}
            icon={DESKTOP_ICONS.projects.icon}
            onDoubleClick={() => openWindow("projects")}
          />
          <Icon
            label={DESKTOP_ICONS.experience.label}
            icon={DESKTOP_ICONS.experience.icon}
            onDoubleClick={() => openWindow("experience")}
          />
          <Icon
            label={DESKTOP_ICONS.contact.label}
            icon={DESKTOP_ICONS.contact.icon}
            onDoubleClick={() => openWindow("contact")}
          />
        </div>

        {/* Recycle Bin - bottom right, hidden on mobile */}
        <div className="absolute bottom-[50px] right-2 hidden sm:block">
          <Icon
            label={DESKTOP_ICONS.recycle.label}
            icon={DESKTOP_ICONS.recycle.icon}
            onDoubleClick={() => {}}
          />
        </div>

        {/* Windows */}
        <AnimatePresence>
          {windows.map((window) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              isActive={activeWindowId === window.id}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
              initialPosition={window.position}
              initialSize={window.size}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onFocus={() => focusWindow(window.id)}
              zIndex={window.zIndex}
            >
              {window.content}
            </Window>
          ))}
        </AnimatePresence>

        {/* Start Menu */}
        <StartMenu
          isOpen={showStartMenu}
          onClose={() => setShowStartMenu(false)}
          onItemClick={handleStartMenuItemClick}
        />

        {/* Taskbar */}
        <Taskbar
          windows={windows.map((w) => ({
            id: w.id,
            title: w.title,
            isMinimized: w.isMinimized,
          }))}
          activeWindowId={activeWindowId}
          onWindowClick={handleTaskbarWindowClick}
          onStartClick={handleStartClick}
          showStartMenu={showStartMenu}
        />
      </div>
    </CRTEffect>
  );
}
