"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"

export function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                    {/* Left: Name and Bio */}
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.p
                            className="text-emerald-400 font-medium mb-2 tracking-wide"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            Hello, I&apos;m
                        </motion.p>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 0.8,
                                delay: 0.4,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                        >
                            <span className="gradient-text">Aakash Yadav</span>
                        </motion.h1>

                        <motion.h2
                            className="text-xl md:text-2xl text-muted-foreground mb-6"
                            initial={{ opacity: 0, x: -20, letterSpacing: "0.5em" }}
                            animate={{ opacity: 1, x: 0, letterSpacing: "0em" }}
                            transition={{
                                duration: 0.7,
                                delay: 0.6,
                                ease: "easeOut"
                            }}
                        >
                            AI &amp; GenAI Consultant
                        </motion.h2>

                        <motion.p
                            className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            Passionate about building intelligent systems and elegant web applications.
                            I specialize in machine learning, automation, and creating impactful digital experiences.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <Button asChild size="lg" className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald">
                                <a href="https://mail.google.com/mail/?view=cm&to=aakash27.2000@gmail.com" target="_blank" rel="noopener noreferrer">
                                    <Mail className="w-4 h-4" />
                                    Get in Touch
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="gap-2 border-slate-600 hover:bg-slate-800 hover:border-emerald-500/50">
                                <a href="/resume.pdf" download>
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right: Profile Image */}
                    <motion.div
                        className="flex-shrink-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="relative">
                            {/* Gradient ring */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 blur-sm opacity-75" />

                            {/* Glass ring */}
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-emerald-500/20 via-transparent to-purple-500/20 blur-xl" />

                            {/* Image container */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-white/10">
                                <img
                                    src="/profile.jpg"
                                    alt="Aakash Yadav"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating accent dots */}
                            <motion.div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -left-4 w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute top-1/2 -right-6 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"
                                animate={{ x: [-3, 3, -3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
                    <motion.div
                        className="w-1.5 h-3 bg-emerald-500 rounded-full mt-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
