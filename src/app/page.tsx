import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsShuffleSection } from "@/components/sections/ProjectsShuffleSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <ProjectsShuffleSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
