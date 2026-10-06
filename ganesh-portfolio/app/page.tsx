import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
// import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#020814] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Skip to Main Content Link for Screen Readers and Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-mono focus:text-xs focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        {/* Interactive Digital Aurora & Developer Portrait Hero Section */}
        <Hero />

        {/* Section 01: Architectural Bio & System Telemetry */}
        <About />

        {/* Section: Services & Freelance Expertise */}
        <Services />

        {/* Section 02: Specialized Engineering Capabilities & Toolsets */}
        <Skills />

        {/* Section 03: Production Systems & Featured Projects */}
        <Projects />


        {/* Section 05: Honors, Hackathons & Verifiable Credentials */}
        <Achievements />

        {/* Section 06: Encrypted Transmission & Direct Inquiries */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
