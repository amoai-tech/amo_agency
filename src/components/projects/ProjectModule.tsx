import { Project } from '../../lib/types/projects';
import ProjectHeader from './ProjectHeader';
import ScreenshotCarousel from './ScreenshotCarousel';
import ProjectStory from './ProjectStory';
import ProjectCTA from './ProjectCTA';

interface ProjectModuleProps {
  project: Project;
}

export default function ProjectModule({ project }: ProjectModuleProps) {
  return (
    <section id={project.id} className="py-24 scroll-mt-24">
      <ProjectHeader project={project} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column - Screenshots (60%) */}
        <div className="lg:col-span-7">
          <ScreenshotCarousel screenshots={project.screenshots} />
        </div>

        {/* Right Column - Story (40%) */}
        <div className="lg:col-span-5">
          <ProjectStory project={project} />
          <ProjectCTA projectName={project.name} caseStudyUrl={project.caseStudyUrl} />
        </div>
      </div>
    </section>
  );
}
