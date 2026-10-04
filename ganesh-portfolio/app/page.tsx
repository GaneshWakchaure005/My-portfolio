import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020814] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Interactive Neural Network Hero Section */}
        <Hero />

        {/* Section 01: Architectural Bio & System Telemetry */}
        <About />

        {/* Section 02: Specialized Engineering Capabilities & Toolsets */}
        <Skills />

        {/* Section 03: Production Systems & Featured Projects */}
        <Projects />

        {/* Section 04: Career Telemetry & Experience Timeline */}
        <Experience />

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
