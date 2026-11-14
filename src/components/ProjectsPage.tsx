import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { pageToPath } from '../lib/navigation';
import { PROJECTS } from '../lib/data/projectsData';
import ProjectsHero from './projects/ProjectsHero';
import ProjectNavigation from './projects/ProjectNavigation';
import ProjectModule from './projects/ProjectModule';
import SystemDiagram from './projects/SystemDiagram';
import ComparisonSection from './projects/ComparisonSection';
import ProjectsFinalCTA from './projects/ProjectsFinalCTA';

export default function ProjectsPage() {
  const nav = useNavigate();
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0]?.id);

  // Track scroll position to update active project
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for sticky nav

      for (const project of PROJECTS) {
        const element = document.getElementById(project.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveProjectId(project.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash on initial load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && PROJECTS.find((p) => p.id === hash)) {
      setActiveProjectId(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const handleStartProject = () => {
    nav(pageToPath('booking'));
  };

  const handleViewProcess = () => {
    nav(pageToPath('process-v12'));
  };

  return (
    <main className="bg-white">
      <ProjectsHero
        onStartClick={handleStartProject}
        onProcessClick={handleViewProcess}
      />

      <ProjectNavigation projects={PROJECTS} activeProjectId={activeProjectId} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ProjectModule
          project={PROJECTS[0]}
          onStartProject={handleStartProject}
        />
        <ProjectModule
          project={PROJECTS[1]}
          onStartProject={handleStartProject}
        />
      </div>

      <SystemDiagram />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ProjectModule
          project={PROJECTS[2]}
          onStartProject={handleStartProject}
        />
        <ProjectModule
          project={PROJECTS[3]}
          onStartProject={handleStartProject}
        />
      </div>

      <ComparisonSection />

      <ProjectsFinalCTA
        onStartProject={handleStartProject}
        onContactUs={handleStartProject}
      />
    </main>
  );
}