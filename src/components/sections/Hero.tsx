"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"

export function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#f8fafc' }}
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                    {/* Left: Name and Bio */}
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.p
                            className="text-primary font-medium mb-2 tracking-wide"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            Hello, I&apos;m
                        </motion.p>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Aakash Yadav
                        </motion.h1>

                        <motion.h2
                            className="text-xl md:text-2xl text-gray-600 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            AI Engineer &amp; Full Stack Developer
                        </motion.h2>

                        <motion.p
                            className="text-gray-500 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
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
                            <Button asChild size="lg" className="gap-2">
                                <a href="https://mail.google.com/mail/?view=cm&to=aakash27.2000@gmail.com" target="_blank" rel="noopener noreferrer">
                                    <Mail className="w-4 h-4" />
                                    Get in Touch
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="gap-2">
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
                            {/* Decorative ring */}
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-sm" />

                            {/* Image container */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                <img
                                    src="/profile.jpg"
                                    alt="Aakash Yadav"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating accent dots */}
                            <motion.div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full"
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -left-4 w-4 h-4 bg-primary/60 rounded-full"
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
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
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                    <motion.div
                        className="w-1.5 h-3 bg-gray-500 rounded-full mt-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
