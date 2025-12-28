"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
]

export function SiteHeader() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
                isScrolled ? "py-4" : "py-6"
            )}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <nav
                className={cn(
                    "flex items-center gap-6 rounded-full px-6 py-2.5 transition-all duration-300",
                    isScrolled
                        ? "bg-secondary/50 backdrop-blur-md border border-border/50 shadow-lg"
                        : "bg-transparent border border-transparent"
                )}
            >
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                    Home
                </Link>
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </motion.header>
    )
}
