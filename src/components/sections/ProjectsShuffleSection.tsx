"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Bot, FileText, BarChart3 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Project data
const projects = [
    {
        id: 1,
        icon: Bot,
        label: "Featured Project",
        title: "AI Code Review Automation",
        description: "A machine learning-powered tool that automatically analyzes pull requests, provides intelligent feedback, and highlights potential bugs, enhancing code quality and developer productivity.",
        tags: ["Python", "OpenAI API", "GitHub Actions", "LangChain", "Docker"],
        github: "https://github.com/aakashyadav27/ai-code-review-automation",
        live: null,
        image: "/project-ai-code-review.png",
    },
    {
        id: 2,
        icon: FileText,
        label: "AI/ML Project",
        title: "Intelligent Document Parser",
        description: "An NLP-powered document extraction system that automatically identifies, classifies, and extracts key information from unstructured documents using transformer models and custom entity recognition.",
        tags: ["Python", "Transformers", "spaCy", "FastAPI", "AWS Lambda"],
        github: "https://github.com/aakashyadav27",
        live: null,
        image: null,
    },
    {
        id: 3,
        icon: BarChart3,
        label: "Data Science",
        title: "Predictive Analytics Dashboard",
        description: "A real-time analytics platform that uses machine learning models to forecast trends, detect anomalies, and provide actionable insights through interactive visualizations and automated reporting.",
        tags: ["Python", "TensorFlow", "Plotly", "Streamlit", "PostgreSQL"],
        github: "https://github.com/aakashyadav27",
        live: null,
        image: null,
    }
]

export function ProjectsShuffleSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        // Register GSAP plugin (must be done client-side only)
        gsap.registerPlugin(ScrollTrigger)

        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        // Sync Lenis with ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update)
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        // Create ScrollTrigger animation
        const section = sectionRef.current
        const container = containerRef.current
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

        if (!section || !container || cards.length === 0) return

        // Create timeline for each card except the last
        cards.slice(0, -1).forEach((card, index) => {
            const direction = index % 2 === 0 ? -1 : 1 // Alternate left/right

            gsap.to(card, {
                rotateY: direction * 15,
                rotateZ: direction * 5,
                x: direction * window.innerWidth * 0.8,
                opacity: 0,
                scale: 0.8,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: section,
                    start: `${index * 33}% top`,
                    end: `${(index + 1) * 33}% top`,
                    scrub: 1,
                }
            })
        })

        // Pin the container
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: container,
            pinSpacing: false,
        })

        return () => {
            lenis.destroy()
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            id="work"
            className="relative bg-background"
            style={{ height: `${projects.length * 100}vh` }}
        >
            {/* Sticky Section Header - stays at top while scrolling */}
            <div className="sticky top-0 z-20 py-4 px-4 bg-background/90 backdrop-blur-md border-b border-border/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-1">Selected Work</h2>
                    <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                </div>
            </div>

            {/* Sticky container for cards */}
            <div
                ref={containerRef}
                className="sticky top-20 flex items-start justify-center px-4 pt-4"
                style={{ perspective: "1500px", height: "calc(100vh - 5rem)" }}
            >
                <div className="relative w-full max-w-4xl h-[450px]">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => { cardsRef.current[index] = el }}
                            className="absolute inset-0 will-change-transform"
                            style={{
                                zIndex: projects.length - index,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Individual Project Card Component
function ProjectCard({ project }: { project: typeof projects[0] }) {
    const Icon = project.icon

    return (
        <div className="h-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl hover:border-emerald-500/50 transition-colors duration-300">
            <div className="grid md:grid-cols-[1.5fr,1fr] gap-0 h-full">
                {/* Content Side */}
                <div className="p-6 md:p-8 space-y-6 flex flex-col justify-center bg-slate-900">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-emerald-400 mb-2">
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-mono uppercase tracking-wider">{project.label}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                        <p className="text-base md:text-lg leading-relaxed text-slate-300">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="font-mono text-xs bg-slate-800 text-slate-200 border-slate-600">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                        <Link
                            href={project.github}
                            target="_blank"
                            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            View Source
                        </Link>
                        {project.live && (
                            <Link
                                href={project.live}
                                target="_blank"
                                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                            </Link>
                        )}
                    </div>
                </div>

                {/* Image/Visual Side */}
                <div className="min-h-[200px] md:min-h-full border-t md:border-t-0 md:border-l border-slate-700 relative overflow-hidden bg-slate-800">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        // Fallback code snippet decoration
                        <div className="p-4 font-mono text-xs h-full flex flex-col">
                            {/* Terminal dots */}
                            <div className="flex items-center gap-2 mb-4 opacity-50">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>

                            {/* Code snippet */}
                            <div className="space-y-2">
                                <p className="text-emerald-400"># {project.title}</p>
                                <p className="text-slate-400">
                                    <span className="text-blue-400">class</span>{" "}
                                    <span className="text-yellow-400">{project.title.replace(/\s/g, '')}</span>:
                                </p>
                                <p className="text-slate-400 pl-4">def __init__(self):</p>
                                <p className="text-slate-400 pl-8">self.active = True</p>
                                <p className="text-emerald-400 pt-2">&gt; Processing...</p>
                                <div className="bg-emerald-950/50 border border-emerald-500/30 p-2 rounded text-emerald-300 mt-2">
                                    <span className="text-green-400">✓</span> Ready to deploy
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
