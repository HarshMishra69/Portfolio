import { EnhancedMouseTrail } from "@/components/enhanced-mouse-trail"
import { FireGlobe } from "@/components/fire-globe"
import { FloatingElements } from "@/components/floating-elements"
import { InteractiveGrid } from "@/components/interactive-grid"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { StatsSection } from "@/components/stats-section"
import { DataScienceGlobe } from "@/components/data-science-globe"
import { ProjectsSection } from "@/components/projects-section"
import { ResearchSection } from "@/components/research-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="relative">
      {/* Interactive background elements */}
      <InteractiveGrid />
      <FireGlobe />
      <FloatingElements />
      <EnhancedMouseTrail />

      {/* Main content sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <StatsSection />

      {/* Enhanced Data Science Journey */}
      <DataScienceGlobe />

      <ProjectsSection />
      <ResearchSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}
