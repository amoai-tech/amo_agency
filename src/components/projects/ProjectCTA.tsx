import { Link } from 'react-router';

interface ProjectCTAProps {
  projectName: string;
  caseStudyUrl?: string;
}

export default function ProjectCTA({ projectName, caseStudyUrl }: ProjectCTAProps) {
  return (
    <div className="mt-12 pt-8 border-t border-[#EFE9E4] flex flex-col sm:flex-row gap-4">
      {caseStudyUrl && (
        <a
          href={caseStudyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-[#1A1A1A] text-white font-bold hover:bg-[#333] transition-all"
        >
          View {projectName} Live
        </a>
      )}
      <Link
        to="/services"
        className="px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all"
      >
        Explore Our Services
      </Link>
    </div>
  );
}
