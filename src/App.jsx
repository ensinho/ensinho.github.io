import Header from './components/Header';
import PerformanceMetrics from './components/PerformanceMetrics';
import InteractiveCodeSnippets from './components/InteractiveCodeSnippets';
import SkillsVisualization from './components/SkillsVisualization';
import ProjectsSection from './components/ProjectsSection';
import Timeline from './components/Timeline';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import { useTabFocus } from './hooks/useTabFocus';

function App() {
  useTabFocus();

  return (
    <>
      <Header />
      <main role="main">
        <SkillsVisualization />
        <ProjectsSection />
        <Timeline />
        <About />
        <Contact />
      </main>
      <Footer />
      <BackToTopButton />
      <PerformanceMetrics />
    </>
  );
}

export default App;