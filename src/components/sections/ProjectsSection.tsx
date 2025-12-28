"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Bot } from "lucide-react"
import Link from "next/link"

export function ProjectsSection() {
    return (
        <section id="work" className="py-24 px-4 container mx-auto">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-2">Selected Work</h2>
                    <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden group hover:border-emerald-500/50 transition-colors duration-300">
                        <div className="grid md:grid-cols-[1.5fr,1fr] gap-6">
                            <div className="p-6 md:p-8 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                        <Bot className="w-5 h-5" />
                                        <span className="text-xs font-mono uppercase tracking-wider">Featured Project</span>
                                    </div>
                                    <CardTitle className="text-2xl md:text-3xl">AI Code Review Automation</CardTitle>
                                    <CardDescription className="text-base md:text-lg leading-relaxed">
                                        A machine learning-powered tool that automatically analyzes pull requests, provides intelligent feedback,
                                        and highlights potential bugs, enhancing code quality and developer productivity.
                                    </CardDescription>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {["Python", "OpenAI API", "GitHub Actions", "LangChain", "Docker"].map(tag => (
                                        <Badge key={tag} variant="secondary" className="font-mono text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="pt-4 flex items-center gap-4">
                                    <Link href="https://github.com/aakashyadav27/ai-code-review-automation" target="_blank" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-emerald-400 transition-colors">
                                        <Github className="w-4 h-4" />
                                        View Source
                                    </Link>
                                    {/* Add live demo link if available */}
                                    {/* <Link href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-emerald-400 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                       </Link> */}
                                </div>
                            </div>

                            {/* Decorative / Code Area */}
                            <div className="bg-muted/30 min-h-[200px] md:min-h-full border-t md:border-t-0 md:border-l border-border/50 relative overflow-hidden flex flex-col p-4 group-hover:bg-muted/50 transition-colors duration-300 font-mono text-xs">
                                <div className="flex items-center gap-2 mb-4 opacity-50">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>

                                <div className="space-y-2 opacity-80">
                                    <p className="text-emerald-400"># AI Review Analysis:</p>
                                    <p className="text-muted-foreground"><span className="text-blue-400">def</span> <span className="text-yellow-400">optimize_model</span>(model):</p>
                                    <p className="pl-4 text-muted-foreground">start_time = time.time()</p>
                                    <p className="pl-4 text-muted-foreground">prediction = model.predict(data)</p>

                                    <p className="text-emerald-400 pt-2">{">"} Finding inefficiencies...</p>
                                    <div className="bg-emerald-950/30 border border-emerald-500/20 p-2 rounded text-emerald-300">
                                        <span className="text-red-400">-</span> redundant tensor allocation detected<br />
                                        <span className="text-green-400">+</span> suggested: use batch processing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
