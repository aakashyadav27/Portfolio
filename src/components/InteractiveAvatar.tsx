"use client"

import React, { useRef, useState, useEffect } from "react"

export function InteractiveAvatar() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [splitPosition, setSplitPosition] = useState(50) // Percentage

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const relativeX = e.clientX - rect.left
                const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100))
                setSplitPosition(percentage)
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener("mousemove", handleMouseMove)
            return () => container.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative w-[350px] h-[450px] md:w-[400px] md:h-[500px] overflow-hidden cursor-crosshair select-none rounded-lg shadow-2xl shadow-emerald-500/10"
            style={{ userSelect: 'none' }}
        >
            {/* Right Side: "AI/Robotic" Image - Full width, sits behind */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    backgroundImage: 'url(/profile-robotic.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Subtle glow overlay for AI side */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"></div>
            </div>

            {/* Left Side: "Human" Image - Width controlled by mouse */}
            <div
                className="absolute inset-0 z-20 overflow-hidden transition-[width] duration-75 ease-out"
                style={{
                    width: `${splitPosition}%`,
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/profile.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        // Fixed width to maintain alignment regardless of container width
                        width: '400px',
                    }}
                ></div>
            </div>

            {/* Labels */}
            <div
                className="absolute bottom-4 left-4 z-30 text-xs font-mono uppercase tracking-widest transition-opacity duration-300"
                style={{ opacity: splitPosition > 20 ? 1 : 0 }}
            >
                <span className="bg-background/70 backdrop-blur-sm px-2 py-1 rounded text-orange-300">Human</span>
            </div>
            <div
                className="absolute bottom-4 right-4 z-30 text-xs font-mono uppercase tracking-widest transition-opacity duration-300"
                style={{ opacity: splitPosition < 80 ? 1 : 0 }}
            >
                <span className="bg-background/70 backdrop-blur-sm px-2 py-1 rounded text-blue-400">AI</span>
            </div>

            {/* Instruction hint */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                Move mouse to reveal
            </div>
        </div>
    )
}
