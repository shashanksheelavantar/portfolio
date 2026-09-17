import { useCallback } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechCloud from "../components/TechCloud";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import DSAPlayground from "../components/DSAPlayground";
import BackendArchitecture3D from "../components/BackendArchitecture3D";
import GithubSection from "../components/GithubSection";
import LeetcodeSection from "../components/LeetcodeSection";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const handleSelect = useCallback((section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero onSelect={handleSelect} />
        <TechCloud />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <DSAPlayground />
        <BackendArchitecture3D />
        <GithubSection />
        <LeetcodeSection />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
