import { Project } from '../../lib/types/projects';

interface ProjectStoryProps {
  project: Project;
}

export default function ProjectStory({ project }: ProjectStoryProps) {
  return (
    <div className="space-y-12">
      {/* Problem */}
      <div>
        <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
          Problem
        </h3>
        <ul className="space-y-2">
          {project.problem.map((item, index) => (
            <li key={index} className="text-[#666666] flex gap-3">
              <span className="text-[#F59E0B] flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Solution */}
      <div>
        <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
          Solution
        </h3>
        <p className="text-[#666666] leading-relaxed">{project.solution}</p>
      </div>

      {/* AI Capabilities */}
      <div>
        <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
          Product Features
        </h3>
        <ul className="space-y-2">
          {project.aiCapabilities.map((capability, index) => (
            <li key={index} className="text-[#666666] flex gap-3">
              <span className="text-[#F59E0B] flex-shrink-0">→</span>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Publish measured results only when verified, never illustrative metrics. */}
      {project.results.length > 0 && <div>
        <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
          Results
        </h3>
        <ul className="space-y-2">
          {project.results.map((result, index) => (
            <li key={index} className="text-[#666666] flex gap-3">
              <span className="text-[#F59E0B] flex-shrink-0">✓</span>
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </div>}

      {/* Publish the technology stack only when there is evidence. */}
      {project.techStack.length > 0 && <div>
        <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-4">
          {project.techStack.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 border border-[#EFE9E4]"
            >
              <span className="text-lg">{tech.icon}</span>
              <span className="text-sm text-[#666666]">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}
