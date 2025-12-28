"use client"

import { motion } from "framer-motion"
import { InteractiveAvatar } from "@/components/InteractiveAvatar"

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4">
            {/* Faint Background Code */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03]" aria-hidden="true">
                <pre className="font-mono text-xs md:text-sm leading-relaxed text-foreground">
                    {`
// Initialize Neural Network
const network = new NeuralNetwork({
  layers: [
    { type: 'input', neurons: 1024 },
    { type: 'dense', neurons: 512, activation: 'relu' },
    { type: 'dropout', rate: 0.2 },
    { type: 'output', neurons: 10, activation: 'softmax' }
  ],
  optimizer: 'adam',
  loss: 'categorical_crossentropy'
});

async function train(data, labels) {
  // Optimization loop
  for (let epoch = 0; epoch < epochs; epoch++) {
       const loss = await network.trainStep(data, labels);
       if (epoch % 10 === 0) console.log(\`Epoch \${epoch}: Loss \${loss}\`);
  }
}
            `.repeat(10)}
                </pre>
            </div>

            <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text */}
                <div className="text-center md:text-left space-y-6 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="font-mono text-primary text-sm tracking-wider uppercase mb-2 block">
                            System Online
                        </span>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-foreground">
                            Aakash Yadav
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xl md:text-3xl font-mono text-muted-foreground">
                            <span className="text-emerald-400">AI Engineer</span> & Problem Solver
                        </h2>
                        <p className="max-w-2xl text-base md:text-lg text-muted-foreground/80 leading-relaxed md:mx-0 mx-auto">
                            Building intelligent systems and automating complex workflows.
                            Specializing in Natural Language Processing, Computer Vision, and Generative AI.
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="pt-8 flex gap-4 justify-center md:justify-start"
                    >
                        <a href="#work" className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity">
                            View Work
                        </a>
                        <a href="#contact" className="px-8 py-3 border border-border rounded-full font-medium hover:bg-secondary transition-colors">
                            Contact Me
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Interactive Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="order-1 md:order-2 flex justify-center"
                >
                    <InteractiveAvatar />
                </motion.div>
            </div>
        </section>
    )
}
