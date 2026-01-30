"use client";

import { useState } from "react";
import Image from "next/image";

interface IconProps {
  label: string;
  icon: string;
  onDoubleClick: () => void;
}

export function Icon({ label, icon, onDoubleClick }: IconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const isImageIcon = icon.startsWith("/");

  return (
    <div
      className="flex w-[70px] cursor-pointer flex-col items-center gap-1 p-1"
      style={{ fontFamily: "'Tahoma', 'MS Sans Serif', 'Segoe UI', Arial, sans-serif" }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
    >
      {/* Icon */}
      <div
        className={`flex h-[48px] w-[48px] items-center justify-center ${
          isSelected ? "bg-[#000080]/30" : ""
        }`}
      >
        {isImageIcon ? (
          <Image src={icon} alt={label} width={40} height={40} />
        ) : (
          <span className="text-3xl">{icon}</span>
        )}
      </div>
      {/* Label */}
      <span
        className={`max-w-full break-words text-center text-xs ${
          isSelected ? "bg-[#000080] text-white" : "text-white"
        }`}
        style={{
          textShadow: isSelected ? "none" : "1px 1px 1px #000",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Desktop icons with image paths from Windows XP icons
// Available 48x48: 1009, 103, 1481, 52
// Available 32x32: 415, 86
export const DESKTOP_ICONS = {
  about: {
    icon: "/models/computer_icons/103.png",
    label: "About Me",
  },
  projects: {
    icon: "/models/computer_icons/projects-folder.png",
    label: "Projects",
  },
  experience: {
    icon: "/models/computer_icons/52.png",
    label: "Experience",
  },
  contact: {
    icon: "/models/computer_icons/contact-email.png",
    label: "Contact",
  },
  recycle: {
    icon: "/models/computer_icons/86.png",
    label: "Recycle Bin",
  },
  computer: {
    icon: "/models/computer_icons/1009.png",
    label: "My Computer",
  },
};
