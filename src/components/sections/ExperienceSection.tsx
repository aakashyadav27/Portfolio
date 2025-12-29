"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Building2, Calendar, MapPin } from "lucide-react"

// Experience data with full descriptions
const experiences = [
    {
        id: 1,
        company: "i2e Consulting",
        role: "AI & ML Intern",
        type: "Internship",
        period: "May 2021 - Jul 2021",
        duration: "3 months",
        location: "Mumbai · Remote",
        startYear: 2021,
        endYear: 2021.25,
        highlights: [
            "Detected 50% of fraud calls in real-time by using Azure Speech-to-Text functionality and Azure LUIS (Natural Language Understanding) model",
            "Helped users with related news articles for supporting their future predictions on global events affecting drug development lifecycle by training FastText LLM on domain data and creating a Recommendation system",
            "Learned basic Data Collection (connecting endpoints and collecting data using Python and Swagger API) and Data Preprocessing using Tokenization, Lowercasing, Stopwords removal, Stemming, and Lemmatization"
        ],
        skills: ["Microsoft Azure", "Dataiku DSS", "Azure Machine Learning"]
    },
    {
        id: 2,
        company: "i2e Consulting",
        role: "Trainee-Software Developer (AI/ML)",
        type: "Full-time",
        period: "Aug 2021 - Sep 2022",
        duration: "1 year 2 months",
        location: "Mumbai",
        startYear: 2021.5,
        endYear: 2022.75,
        highlights: [
            "Created an ML-powered alert system that can help clinical sites plan clinical trials according to critical events happening all over the world so that it doesn't affect the clinical trials",
            "Saved 40% of business time by automating the manual efforts to generate Gantt charts using Selenium and UI Path",
            "Developed an integrated platform on Dataiku for analyzing project management data from tools like 'Planisware' and passing it on to visualization tools like PowerBI or Tableau"
        ],
        skills: ["Pandas", "Flask", "Back-End Web Development"]
    },
    {
        id: 3,
        company: "i2e Consulting",
        role: "AI Engineer",
        type: "Full-time",
        period: "Sep 2022 - Dec 2024",
        duration: "2 years 4 months",
        location: "Mumbai",
        startYear: 2022.75,
        endYear: 2024.92,
        highlights: [
            "Saved more than 50% of Clinical Research Pharmacist (CRP) time by creating a Chatbot based on Retrieval Augmented Generation (RAG) technology which can answer study team questions from unstructured data",
            "30% increase in protocol design success rate by the binary classification model on historical data which helps identify protocols that will have a Significant Quality Event in the future",
            "Created a Dash Dashboard to visualize the pattern in SQE historical data",
            "Coordinated with stakeholders to understand and refine business requirements and get the right data"
        ],
        skills: ["Presentations", "Generative AI", "Git", "Analytical Skills", "Amazon Web Services (AWS)", "Predictive Analytics"]
    },
    {
        id: 4,
        company: "Deloitte",
        role: "AI Consultant",
        type: "Full-time",
        period: "Dec 2024 - Present",
        duration: "1+ month",
        location: "Remote",
        startYear: 2024.92,
        endYear: 2025.5,
        highlights: [
            "Architected unified platform integrating multiple clinical data sources with real-time intelligence",
            "Engineered MCP Server infrastructure with intelligent agents for live data streaming and vector database for optimized retrieval",
            "Developed multi-source orchestrator agent providing seamless, unified data access across heterogeneous systems",
            "Deployed production FastAPI microservices on AWS with enterprise security and scalability"
        ],
        skills: ["LangGraph", "React Agent", "Multi-agent Systems", "GPT/Claude", "MCP Server"]
    }
]

const timelineYears = ["Present", 2024, 2023, 2022, 2021]
const MIN_YEAR = 2021
const MAX_YEAR = 2025.5

export function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const markerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const section = sectionRef.current
        const progress = progressRef.current
        const marker = markerRef.current

        if (!section || !progress || !marker) return

        // Create a single ScrollTrigger for the entire section
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const scrollProgress = self.progress

                // Update progress bar and marker
                gsap.set(progress, { width: `${scrollProgress * 100}%` })
                gsap.set(marker, { left: `${scrollProgress * 100}%` })

                // Calculate which experience should be active (reversed - Present to 2021)
                // scrollProgress 0 = Present (index 3), scrollProgress 1 = 2021 (index 0)
                const reversedExperiences = [...experiences].reverse()
                const activeIdx = Math.min(
                    Math.floor(scrollProgress * reversedExperiences.length),
                    reversedExperiences.length - 1
                )
                setActiveIndex(reversedExperiences.length - 1 - activeIdx)
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative bg-background"
            style={{ height: "300vh" }}
        >
            {/* Sticky container for header, timeline, and card */}
            <div className="sticky top-0 h-screen flex flex-col">
                {/* Section Header */}
                <div className="py-4 px-4 bg-background border-b border-border/30">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-1">Experience</h2>
                        <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="py-8 px-4 bg-background">
                    <div className="max-w-5xl mx-auto">
                        {/* Timeline bar */}
                        <div className="relative h-2 bg-slate-700 rounded-full overflow-visible">
                            {/* Progress fill */}
                            <div
                                ref={progressRef}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                                style={{ width: "0%" }}
                            />

                            {/* Animated robot marker */}
                            <div
                                ref={markerRef}
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-2xl drop-shadow-lg"
                                style={{ left: "0%" }}
                            >
                                🤖
                            </div>

                            {/* Year markers */}
                            {timelineYears.map((year, index) => (
                                <div
                                    key={year}
                                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                                    style={{ left: `${(index / (timelineYears.length - 1)) * 100}%` }}
                                >
                                    <div className="w-3 h-3 bg-slate-600 rounded-full border-2 border-slate-500" />
                                    <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap">
                                        {year}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Experience Card - shows active experience */}
                <div className="flex-1 px-4 py-4 overflow-auto">
                    <div className="max-w-5xl mx-auto h-full">
                        <div className="relative h-full">
                            {experiences.map((exp, index) => (
                                <div
                                    key={exp.id}
                                    className={`absolute inset-0 transition-all duration-500 ${index === activeIndex
                                        ? 'opacity-100 translate-y-0'
                                        : index < activeIndex
                                            ? 'opacity-0 -translate-y-8'
                                            : 'opacity-0 translate-y-8'
                                        }`}
                                >
                                    <ExperienceCard experience={exp} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ExperienceCard({ experience }: { experience: typeof experiences[0] }) {
    return (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl h-full overflow-auto">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Company Info */}
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-600">
                        <Building2 className="w-8 h-8 text-emerald-400" />
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{experience.role}</h3>
                        <p className="text-lg text-emerald-400 font-medium">{experience.company}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {experience.period} · {experience.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {experience.location}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-800 rounded text-xs font-medium">
                                {experience.type}
                            </span>
                        </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-3">
                        {experience.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                                <span className="text-emerald-500 mt-1 flex-shrink-0">•</span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {experience.skills.map(skill => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-slate-800 text-slate-200 rounded-full text-xs font-mono border border-slate-600"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
