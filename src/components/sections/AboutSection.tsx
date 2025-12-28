"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
    return (
        <section id="about" className="py-24 px-4 bg-muted/20">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-2">About Me</h2>
                    <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="grid md:grid-cols-[2fr,1fr] gap-8">
                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            <p>
                                I am an Artificial Intelligence Engineer specializing in data-driven solutions for the life sciences industry.
                                Armed with a Master of Science degree in Data Science and Artificial Intelligence, I possess a robust understanding
                                of machine learning, natural language processing, computer vision, and deep learning.
                            </p>
                            <p>
                                Proficient in tools like Dataiku DSS, Python, and various machine learning frameworks, I am dedicated to
                                leveraging AI for innovative projects that enhance the efficiency and quality of clinical research.
                            </p>
                            <p>
                                My contributions include the creation of a chatbot that significantly reduced clinical research pharmacist
                                time, boosting protocol design success rates, and constructing dashboards for visualizing historical data patterns.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-mono text-sm text-foreground uppercase tracking-wider">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "Generative AI", "MLOps", "Next.js", "React"].map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-mono border border-border/50">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
