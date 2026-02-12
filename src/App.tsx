import { Navbar } from "./components/layout/Navbar";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { navItems, projectItems } from "./data/portfolioContent";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar brand="Kelvin" items={navItems} />

      <main>
        <HeroSection />
        <ProjectsSection projects={projectItems} />
        <AboutSection />
        <ContactSection email="hello@example.com" />
      </main>
    </div>
  );
}

export default App;
