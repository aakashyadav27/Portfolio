"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, FileText } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
    return (
        <section id="contact" className="py-24 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto space-y-8"
            >
                <h2 className="text-3xl font-bold">Get In Touch</h2>
                <p className="text-muted-foreground">
                    I am currently open to new opportunities and collaborations.
                    If you have a project in mind or just want to say hi, feel free to reach out.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <a
                        href="https://mail.google.com/mail/?view=cm&to=aakash27.2000@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-emerald-500 hover:text-white transition-all duration-300"
                    >
                        <Mail className="w-5 h-5" />
                        <span>Email Me</span>
                    </a>
                    <Link
                        href="https://github.com/aakashyadav27"
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-emerald-500 hover:text-white transition-all duration-300"
                    >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/"
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-emerald-500 hover:text-white transition-all duration-300"
                    >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                    </Link>
                    <a
                        href="/resume.pdf"
                        download
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-emerald-500 hover:text-white transition-all duration-300"
                    >
                        <FileText className="w-5 h-5" />
                        <span>Resume</span>
                    </a>
                </div>

                <div className="pt-24 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Aakash Yadav. Built with Next.js & Tailwind.</p>
                </div>
            </motion.div>
        </section>
    )
}
