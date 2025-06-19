import Header from './components/Header';
import TechSection from './components/TechSection';
import ProjectsSection from './components/ProjectsSection';
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
        <TechSection />
        <ProjectsSection />
        <About />
        <Contact />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default App;