"use client";

import { useState } from "react";

const RETRO_FONT = "'Tahoma', 'MS Sans Serif', 'Segoe UI', Arial, sans-serif";
const DECORATIVE_FONT = "var(--font-decorative), 'Times New Roman', 'Georgia', serif";

export function IEHomeContent() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const navItems = [
    { id: "about", label: "ABOUT" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomeSection onNavigate={setCurrentPage} />;
      case "about":
        return <AboutSection />;
      case "experience":
        return <ExperienceSection />;
      case "projects":
        return <ProjectsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection onNavigate={setCurrentPage} />;
    }
  };

  // Home page has a different layout - full width centered
  if (currentPage === "home") {
    return (
      <div
        className="relative flex h-full flex-col bg-[#c5d5c0]"
        style={{ fontFamily: RETRO_FONT }}
      >
        {/* IE Toolbar */}
        <div className="relative z-10 flex items-center gap-1 border-b border-[#808080] bg-[#ece9d8] px-2 py-1">
          <button className="flex items-center gap-1 border border-[#808080] bg-[#e0e0e0] px-2 py-0.5 text-xs hover:bg-[#d0d0d0]">
            ← Back
          </button>
          <button className="flex items-center gap-1 border border-[#808080] bg-[#e0e0e0] px-2 py-0.5 text-xs hover:bg-[#d0d0d0]">
            Forward →
          </button>
          <div className="flex-1 border border-[#808080] bg-white px-2 py-0.5 text-xs text-[#333]">
            https://aakashyadav.dev/
          </div>
          <button className="border border-[#808080] bg-[#e0e0e0] px-2 py-0.5 text-xs hover:bg-[#d0d0d0]">
            🔄
          </button>
        </div>

        {/* Centered Home Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#c5d5c0]">
          {/* Name - Large decorative font */}
          <h1
            className="mb-2 text-center text-3xl sm:text-5xl font-bold text-[#1a1a1a] px-4"
            style={{
              fontFamily: DECORATIVE_FONT,
              letterSpacing: "0.02em",
              textShadow: "1px 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            Aakash Yadav
          </h1>

          {/* Subtitle */}
          <p
            className="mb-6 sm:mb-8 text-center text-base sm:text-lg tracking-wide text-[#333]"
            style={{ fontFamily: DECORATIVE_FONT }}
          >
            AI Engineer
          </p>

          {/* Navigation Links - responsive wrap */}
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 px-4">
            {navItems.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2 sm:gap-6">
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className="text-xs sm:text-sm tracking-wider text-[#000080] underline decoration-1 underline-offset-2 transition-colors hover:text-[#0000cc]"
                  style={{ fontFamily: DECORATIVE_FONT }}
                >
                  {item.label}
                </button>
                {index < navItems.length - 1 && (
                  <span className="text-[#808080] hidden sm:inline">|</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-[#a0a0a0] bg-[#c5d5c0] px-4 py-2 text-center text-xs text-[#666]">
          © Copyright {new Date().getFullYear()} Aakash Yadav
        </div>
      </div>
    );
  }

  // Other pages have sidebar layout
  return (
    <div
      className="relative flex h-full flex-col bg-[#c5d5c0]"
      style={{ fontFamily: RETRO_FONT }}
    >
      {/* IE Toolbar */}
      <div className="relative z-10 flex items-center gap-1 border-b border-[#808080] bg-[#ece9d8] px-2 py-1">
        <button
          onClick={() => setCurrentPage("home")}
          className="flex items-center gap-1 border border-[#808080] bg-[#e0e0e0] px-2 py-0.5 text-xs hover:bg-[#d0d0d0]"
        >
          ← Back
        </button>
        <button className="flex items-center gap-1 border border-[#808080] bg-[#e0e0e0] px-2 py-0.5 text-xs hover:bg-[#d0d0d0]">
          Forward →
        </button>
        <div className="flex-1 border border-[#808080] bg-white px-2 py-0.5 text-xs text-[#333]">
          https://aakashyadav.dev/{currentPage}
        </div>
        <button className="border border-[#808080] bg-[#e0e0e0] px-2 py-0.5 text-xs hover:bg-[#d0d0d0]">
          🔄
        </button>
      </div>

      {/* Main Content with Sidebar */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden sm:block w-[140px] border-r border-[#a0a0a0] bg-[#b8c8b3] p-4 shrink-0">
          <div className="mb-4">
            <h2
              className="text-lg font-bold text-[#1a1a1a]"
              style={{ fontFamily: DECORATIVE_FONT }}
            >
              Aakash
            </h2>
            <h2
              className="text-lg font-bold text-[#1a1a1a]"
              style={{ fontFamily: DECORATIVE_FONT }}
            >
              Yadav
            </h2>
            <p className="mt-1 text-xs text-[#555]">Portfolio &apos;24</p>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setCurrentPage("home")}
              className={`text-left text-sm ${
                currentPage === "home"
                  ? "font-bold text-[#000080]"
                  : "text-[#000080] hover:underline"
              }`}
            >
              {currentPage === "home" && "○ "}HOME
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-left text-sm ${
                  currentPage === item.id
                    ? "font-bold text-[#000080]"
                    : "text-[#000080] hover:underline"
                }`}
              >
                {currentPage === item.id && "○ "}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-[#d0e0cc] p-3 sm:p-6">
          {/* Mobile nav - shown only on mobile */}
          <div className="sm:hidden flex flex-wrap gap-2 mb-4 pb-2 border-b border-[#a0a0a0]">
            <button
              onClick={() => setCurrentPage("home")}
              className={`text-xs px-2 py-1 rounded ${
                currentPage === "home"
                  ? "bg-[#000080] text-white"
                  : "bg-[#b8c8b3] text-[#000080]"
              }`}
            >
              HOME
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-xs px-2 py-1 rounded ${
                  currentPage === item.id
                    ? "bg-[#000080] text-white"
                    : "bg-[#b8c8b3] text-[#000080]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {renderContent()}
        </div>
      </div>

      {/* Footer / Status Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-[#808080] bg-[#ece9d8] px-2 py-0.5 text-xs text-[#000]">
        <span>Done</span>
        <span className="text-[#808080]">© {new Date().getFullYear()} Aakash Yadav</span>
      </div>
    </div>
  );
}

interface HomeSectionProps {
  onNavigate: (page: string) => void;
}

function HomeSection({ onNavigate }: HomeSectionProps) {
  // This component is not used when currentPage is "home"
  // since the home page now has its own centered layout in IEHomeContent
  // But we keep it for the sidebar layout fallback
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-[#1a1a1a]">
        Welcome
      </h1>
      <h2 className="mb-4 text-lg text-[#333]">
        I&apos;m Aakash Yadav
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-[#333]" style={{ textAlign: "justify" }}>
        I&apos;m an AI Engineer currently working at Deloitte. I have around 4 years of experience
        in developing and deploying machine learning models, particularly in natural language
        processing and large language models (LLMs).
      </p>
      <p className="mb-6 text-sm leading-relaxed text-[#333]" style={{ textAlign: "justify" }}>
        Thank you for taking the time to check out my portfolio. I really hope you enjoy
        exploring it as much as I enjoyed building it. If you have any questions or comments,
        feel free to contact me using the contact section.
      </p>

      <hr className="my-4 border-[#a0a0a0]" />

      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">📄</span>
        <div>
          <p className="font-bold">Looking for my resume?</p>
          <a href="#" className="text-sm text-[#000080] underline">
            Click here to download it!
          </a>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div>
      <h1
        className="mb-2 text-3xl font-bold text-[#1a1a1a]"
        style={{ fontFamily: "var(--font-decorative), 'Times New Roman', serif" }}
      >
        Welcome
      </h1>
      <h2 className="mb-4 text-lg text-[#333]">I&apos;m Aakash Yadav</h2>

      <p className="mb-4 text-sm leading-relaxed text-[#333]" style={{ textAlign: "justify" }}>
        I&apos;m an AI Engineer currently working at Deloitte. I have around 4 years of experience
        in developing and deploying machine learning models, particularly in natural language
        processing and large language models (LLMs).
      </p>

      <p className="mb-4 text-sm leading-relaxed text-[#333]" style={{ textAlign: "justify" }}>
        Thank you for taking the time to check out my portfolio. I really hope you enjoy
        exploring it as much as I enjoyed building it. If you have any questions or comments,
        feel free to shoot me an email at{" "}
        <a href="mailto:aakash27.2000@gmail.com" className="text-[#000080] underline">
          aakash27.2000@gmail.com
        </a>
      </p>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-2xl">📄</span>
        <div>
          <p className="font-bold">Looking for my resume?</p>
          <a href="#" className="text-sm text-[#000080] underline">
            Click here to download it!
          </a>
        </div>
      </div>

      <hr className="my-4 border-[#a0a0a0]" />

      <h2
        className="mb-4 text-xl font-bold text-[#1a1a1a]"
        style={{ fontFamily: "var(--font-decorative), 'Times New Roman', serif" }}
      >
        About Me
      </h2>

      <p className="mb-4 text-sm leading-relaxed text-[#333]" style={{ textAlign: "justify" }}>
        I never imagined I would end up in software development. Growing up, I was the kid who
        genuinely enjoyed solving math problems - not because I had to, but because there was
        something deeply satisfying about finding elegant solutions to complex puzzles. While
        my classmates dreaded algebra, I found joy in the logical patterns and the &quot;aha!&quot;
        moments that came with cracking a difficult problem.
      </p>

      <p className="mb-4 text-sm leading-relaxed text-[#333]" style={{ textAlign: "justify" }}>
        It wasn&apos;t until later that I discovered the world of computer science - and more
        importantly, that people who love problem-solving often thrive in this field. The
        realization was like finding the missing piece of a puzzle. Here was a discipline that
        rewarded the same analytical thinking I had always enjoyed, but with the added
        satisfaction of building things that actually worked.
      </p>

      {/* Photo */}
      <div className="my-6 flex justify-center">
        <div className="border-2 border-[#808080] bg-white p-1">
          <img
            src="/models/self.jpg"
            alt="Aakash Yadav"
            className="h-auto w-[400px]"
            style={{ imageRendering: "auto" }}
          />
          <p className="mt-1 text-center text-xs text-[#666]">
            <span className="font-bold">Figure 1:</span> Me, 2024
          </p>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-[#333]" style={{ textAlign: "justify" }}>
        When it came time to choose a specialization, AI was the natural choice. The field
        sits at the beautiful intersection of mathematics, statistics, and computer science -
        it&apos;s essentially applied mathematics with the power to create intelligent systems.
        The linear algebra, probability theory, and optimization problems that form the
        backbone of machine learning felt like a homecoming for someone who had always loved math.
      </p>

      <p className="mb-4 text-sm leading-relaxed text-[#333]" style={{ textAlign: "justify" }}>
        Today, I get to work on some of the most exciting challenges in technology - from
        building RAG-powered chatbots to designing LLM-based agents. Every project is a new
        puzzle to solve, and I couldn&apos;t be happier that my childhood love of mathematics
        led me here.
      </p>

      <hr className="my-4 border-[#a0a0a0]" />

      <h3 className="mb-2 font-bold">Skills</h3>
      <ul className="mb-4 ml-4 list-disc text-sm">
        <li>LLM Models: Claude 3.5, GPT-4, LLAMA 2, Mistral, FLAN-T5</li>
        <li>NLP: LangChain, LangGraph, Hugging Face, RAG, Prompt Engineering</li>
        <li>Cloud: AWS (SageMaker, Kendra, Lambda), Azure OpenAI</li>
        <li>ML/DL: PyTorch, Scikit-learn, Pandas, NumPy</li>
        <li>Tools: Docker, FastAPI, Flask, Git, Claude Code, Cursor</li>
      </ul>

      <h3 className="mb-2 font-bold">Education</h3>
      <ul className="mb-4 ml-4 list-disc text-sm">
        <li>Master of Science in Data Science and AI - Mumbai University</li>
        <li>Bachelor of Mathematics - Mumbai University</li>
      </ul>

      <p className="mt-6 text-sm text-[#666]">
        Thanks for reading about me! I hope you enjoy exploring the rest of my portfolio.
      </p>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-[#1a1a1a]">
        Experience
      </h1>

      <div className="mb-6">
        <h3 className="font-bold">AI Consultant @ Deloitte US</h3>
        <p className="text-xs text-[#666]">Dec 2024 - Present | Client: Pfizer</p>
        <ul className="mt-2 ml-4 list-disc text-sm">
          <li>Knowledge Mining Platform - Built MCP Server and Agent for clinical data delivery</li>
          <li>ACCT Text-to-SQL Chatbot - Converting natural language to SQL queries</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-bold">AI & ML Engineer @ i2e Consulting</h3>
        <p className="text-xs text-[#666]">Feb 2021 - Dec 2024 | Client: Pfizer, Alexion</p>
        <ul className="mt-2 ml-4 list-disc text-sm">
          <li>Clinical Trials Chatbot - RAG-powered chatbot on AWS</li>
          <li>Support Chatbot - AI Architect for knowledge base system</li>
          <li>Predictive Quality Model - 30% increase in protocol success rates</li>
        </ul>
      </div>

      <h3 className="mb-2 font-bold">Awards</h3>
      <ul className="ml-4 list-disc text-sm">
        <li>Employee of the Month - July 2021</li>
        <li>Employee of the Month - Nov 2022</li>
      </ul>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    { name: "Knowledge Mining Platform", tech: "LangGraph, React Agent, OpenAI, AWS" },
    { name: "Clinical Trials Chatbot", tech: "AWS Kendra, SageMaker, FLAN-T5, LLAMA 2" },
    { name: "ACCT Text-to-SQL Chatbot", tech: "LangGraph, MCP Server, OpenAI, Anthropic" },
    { name: "Support Chatbot", tech: "LangChain, Vector DB, Claude 3, GPT-4" },
    { name: "Predictive Quality Model", tech: "Python, Scikit-learn, Pandas" },
  ];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-[#1a1a1a]">
        Projects
      </h1>

      {projects.map((project, index) => (
        <div key={index} className="mb-4 border-l-2 border-[#000080] pl-3">
          <h3 className="font-bold">{project.name}</h3>
          <p className="text-xs text-[#666]">{project.tech}</p>
        </div>
      ))}
    </div>
  );
}

function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Create mailto link with form data
    const mailtoLink = `mailto:aakash27.2000@gmail.com?subject=${encodeURIComponent(
      subject || "Portfolio Contact"
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <div>
      <h1
        className="mb-2 text-2xl font-bold text-[#1a1a1a]"
        style={{ fontFamily: "var(--font-decorative), 'Times New Roman', serif" }}
      >
        Contact Me
      </h1>

      <p className="mb-4 text-sm text-[#333]">
        Have a question or want to work together? Fill out the form below and I&apos;ll get back to you!
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <div>
          <label className="mb-1 block text-sm font-bold text-[#333]">Name *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border-2 border-[#808080] border-r-[#fff] border-b-[#fff] bg-white px-2 py-1 text-sm focus:outline-none"
            style={{ boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)" }}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-[#333]">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border-2 border-[#808080] border-r-[#fff] border-b-[#fff] bg-white px-2 py-1 text-sm focus:outline-none"
            style={{ boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)" }}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-[#333]">Subject</label>
          <input
            type="text"
            name="subject"
            className="w-full border-2 border-[#808080] border-r-[#fff] border-b-[#fff] bg-white px-2 py-1 text-sm focus:outline-none"
            style={{ boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)" }}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-[#333]">Message *</label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full border-2 border-[#808080] border-r-[#fff] border-b-[#fff] bg-white px-2 py-1 text-sm focus:outline-none"
            style={{ boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)", resize: "none" }}
          />
        </div>

        <button
          type="submit"
          className="border-2 border-[#dfdfdf] border-r-[#404040] border-b-[#404040] bg-[#c0c0c0] px-6 py-1 text-sm font-bold hover:bg-[#d4d4d4] active:border-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf]"
          style={{ boxShadow: "inset -1px -1px 0 #808080, inset 1px 1px 0 #fff" }}
        >
          Send Message
        </button>
      </form>

      <hr className="my-4 border-[#a0a0a0]" />

      <h3 className="mb-3 font-bold">Other Ways to Reach Me</h3>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-bold">Email:</span>{" "}
          <a href="mailto:aakash27.2000@gmail.com" className="text-[#000080] underline">
            aakash27.2000@gmail.com
          </a>
        </p>
        <p>
          <span className="font-bold">Phone:</span> +91 7506444919
        </p>
        <p>
          <span className="font-bold">Location:</span> Mumbai, India
        </p>
        <p>
          <span className="font-bold">LinkedIn:</span>{" "}
          <a href="https://linkedin.com" className="text-[#000080] underline">
            LinkedIn Profile
          </a>
        </p>
        <p>
          <span className="font-bold">GitHub:</span>{" "}
          <a href="https://github.com" className="text-[#000080] underline">
            GitHub Profile
          </a>
        </p>
      </div>

      <p className="mt-6 text-sm text-[#666]">
        I&apos;m always open to discussing AI projects and opportunities!
      </p>
    </div>
  );
}

export function AboutContent() {
  return (
    <div className="p-4 font-['MS_Sans_Serif',_sans-serif] text-sm">
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-[64px] w-[64px] items-center justify-center bg-[#c0c0c0] text-4xl">
          👤
        </div>
        <div>
          <h2 className="text-xl font-bold">Aakash Yadav</h2>
          <p className="text-[#808080]">AI Engineer | Mumbai</p>
        </div>
      </div>

      <hr className="my-4 border-[#808080]" />

      <p className="mb-4 leading-relaxed">
        Innovative and results-driven AI Engineer with around 4 years of experience in developing
        and deploying machine learning models, particularly in natural language processing and
        large language models (LLMs). Proven track record of improving operational efficiency
        and predictive accuracy through advanced AI solutions.
      </p>

      <div className="mb-4 border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-[#ffffff] p-3">
        <h3 className="mb-2 font-bold">Skills:</h3>
        <ul className="ml-4 list-disc space-y-1">
          <li>LLM Models: Claude 3.5, GPT-4, LLAMA 2, Mistral, FLAN-T5</li>
          <li>NLP: LangChain, LangGraph, Hugging Face, RAG, Prompt Engineering</li>
          <li>Cloud: AWS (SageMaker, Kendra, Lambda), Azure OpenAI</li>
          <li>ML/DL: PyTorch, Scikit-learn, Pandas, NumPy</li>
          <li>Tools: Docker, FastAPI, Flask, Git, Claude Code, Cursor</li>
        </ul>
      </div>

      <p className="text-[#808080]">
        Double-click on other icons to learn more about my work!
      </p>
    </div>
  );
}

export function ProjectsContent() {
  const projects = [
    {
      name: "Knowledge Mining Platform",
      description: "Unified platform with MCP Server and Agent for clinical data delivery with vector database",
      tech: "LangGraph, React Agent, OpenAI, Anthropic, FastAPI, AWS",
      icon: "🧠",
    },
    {
      name: "Clinical Trials Chatbot",
      description: "End-to-end chatbot for clinical researchers using RAG technique powered by AWS",
      tech: "AWS Kendra, SageMaker, FLAN-T5, LLAMA 2, Terraform",
      icon: "🏥",
    },
    {
      name: "ACCT Text-to-SQL Chatbot",
      description: "Converts natural language to SQL queries for AACT clinical trials database",
      tech: "LangGraph, MCP Server, OpenAI, Anthropic",
      icon: "🗄️",
    },
    {
      name: "Support Chatbot",
      description: "AI chatbot with knowledge base for infrastructure data access without DB expertise",
      tech: "LangChain, Vector DB, Claude 3, GPT-4, Flask",
      icon: "💬",
    },
    {
      name: "Predictive Quality Model",
      description: "Binary classification model to identify protocols likely to encounter quality events",
      tech: "Python, Scikit-learn, Pandas, NumPy",
      icon: "📊",
    },
  ];

  return (
    <div className="h-full overflow-auto p-2 font-['MS_Sans_Serif',_sans-serif] text-sm">
      {/* Toolbar */}
      <div className="mb-2 flex items-center gap-2 text-xs text-[#808080]">
        <span>📁 My Projects</span>
        <span>|</span>
        <span>{projects.length} object(s)</span>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-2 gap-2">
        {projects.map((project) => (
          <div
            key={project.name}
            className="cursor-pointer border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-[#ffffff] p-3 transition-colors hover:bg-[#e8e8e8]"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">{project.icon}</span>
              <h3 className="font-bold">{project.name}</h3>
            </div>
            <p className="mb-2 text-xs text-[#404040]">{project.description}</p>
            <p className="text-xs text-[#808080]">Tech: {project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceContent() {
  const experiences = [
    {
      role: "AI Consultant",
      company: "Deloitte US",
      client: "Pfizer",
      period: "Dec 2024 - Present",
      projects: [
        {
          name: "Knowledge Mining Platform",
          details: "Designed and developed a unified platform to deliver data from multiple clinical data sources. Built an MCP Server and Agent to consume live data streams and implemented a vector database for efficient retrieval. Deployed as FastAPI service on AWS.",
          tech: "LangGraph Workflow, React Agent, OpenAI, Anthropic"
        },
        {
          name: "ACCT Chatbot (Text-to-SQL)",
          details: "Designed Text-to-SQL chatbot converting natural language queries into SQL for AACT clinical trials database. Built MCP Server and Agent for secure, real-time database connectivity.",
          tech: "LangGraph Workflow, React Agent, MCP Server, OpenAI, Anthropic"
        }
      ]
    },
    {
      role: "AI & ML Engineer",
      company: "i2e Consulting",
      client: "Pfizer, Alexion",
      period: "Feb 2021 - Dec 2024",
      projects: [
        {
          name: "Clinical Trials Chatbot",
          details: "Designed end-to-end chatbot to assist clinical researchers using RAG technique powered by AWS. Implemented CI/CD pipeline using Terraform scripts.",
          tech: "AWS Kendra, Textract, SageMaker, FastAPI, Flan T5 XL, Llama 2"
        },
        {
          name: "Support Chatbot",
          details: "Served as AI Architect designing chatbot's technical architecture. Created knowledge base for seamless infrastructure data access.",
          tech: "LangChain, Vector DB, Flask, Claude 3 Sonnet, GPT-4"
        },
        {
          name: "Predictive Quality Event Model",
          details: "Developed predictive binary classification model achieving 30% increase in protocol design success rates. Built ML-powered alert system for clinical trials.",
          tech: "Python, Scikit-learn, Pandas, NumPy"
        }
      ]
    },
  ];

  const education = [
    {
      degree: "Master of Science in Data Science and Artificial Intelligence",
      institution: "Mumbai University",
    },
    {
      degree: "Bachelor of Mathematics",
      institution: "Mumbai University",
    },
  ];

  const awards = [
    "Employee of the Month - July 2021",
    "Employee of the Month - Nov 2022",
  ];

  return (
    <div className="h-full overflow-auto p-4 font-['MS_Sans_Serif',_sans-serif] text-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <span>📋</span> Work Experience
      </h2>

      <div className="mb-4 space-y-3">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-[#f0f0f0] p-3"
          >
            <div className="mb-1 flex items-start justify-between">
              <h3 className="font-bold">{exp.role}</h3>
              <span className="text-xs text-[#808080]">{exp.period}</span>
            </div>
            <p className="text-[#000080]">{exp.company}</p>
            <p className="mb-2 text-xs text-[#808080]">Client: {exp.client}</p>

            {/* Projects */}
            <div className="mt-2 space-y-2">
              {exp.projects.map((project, pIndex) => (
                <div key={pIndex} className="border-l-2 border-[#000080] pl-2">
                  <p className="text-xs font-bold text-[#000080]">{project.name}</p>
                  <p className="text-xs text-[#404040]">{project.details}</p>
                  <p className="text-xs text-[#808080]">Tech: {project.tech}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-2 flex items-center gap-2 font-bold">
        <span>🎓</span> Education
      </h2>
      <div className="mb-4 border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-[#f0f0f0] p-3">
        {education.map((edu, index) => (
          <div key={index} className="mb-1">
            <span className="font-bold">{edu.degree}</span>
            <span className="text-[#808080]"> - {edu.institution}</span>
          </div>
        ))}
      </div>

      <h2 className="mb-2 flex items-center gap-2 font-bold">
        <span>🏆</span> Awards
      </h2>
      <div className="border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-[#f0f0f0] p-3">
        {awards.map((award, index) => (
          <div key={index} className="text-xs">• {award}</div>
        ))}
      </div>
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="p-4 font-['MS_Sans_Serif',_sans-serif] text-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <span>📧</span> Contact Me
      </h2>

      <div className="mb-4 border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] bg-[#ffffff] p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">📧</span>
            <div>
              <p className="text-xs text-[#808080]">Email</p>
              <a href="mailto:aakash27.2000@gmail.com" className="text-[#000080] underline">
                aakash27.2000@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">📱</span>
            <div>
              <p className="text-xs text-[#808080]">Phone</p>
              <span className="text-[#000080]">+91 7506444919</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="text-xs text-[#808080]">Location</p>
              <span className="text-[#000080]">Mumbai, India</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">💼</span>
            <div>
              <p className="text-xs text-[#808080]">LinkedIn</p>
              <a href="https://linkedin.com" className="text-[#000080] underline">
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">🐙</span>
            <div>
              <p className="text-xs text-[#808080]">GitHub</p>
              <a href="https://github.com" className="text-[#000080] underline">
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[#808080]">
        Feel free to reach out! I&apos;m always open to discussing AI projects and opportunities.
      </p>
    </div>
  );
}
