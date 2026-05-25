import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { SiteLayout } from "./components/layout/SiteLayout";
import { GhostyRunner } from "./components/motion/GhostyRunner";
import { ContactSection } from "./components/sections/ContactSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { usePortfolioContent } from "./hooks/usePortfolioContent";

export default function App() {
  const { content, loading } = usePortfolioContent();

  return (
    <SiteLayout>
      <Navbar />
      <main>
        <HeroSection
          siteSettings={content?.siteSettings}
          loading={loading}
        />
        <ProjectsSection projects={content?.projects} />
        <ExperienceSection
          experience={content?.experience}
          education={content?.education}
        />
        <ContactSection />
      </main>
      <Footer copyright={content?.siteSettings.copyright} />
      <GhostyRunner />
    </SiteLayout>
  );
}
