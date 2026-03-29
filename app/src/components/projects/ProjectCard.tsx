export type Project = {
  title: string;
  description: string;
  href: string;
  buttonText?: string;
  mediaType: 'video' | 'image';
  mediaSrc: string;
  mediaAlt?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg transition duration-300 hover:-translate-y-1">
      <div className="overflow-hidden">
        {project.mediaType === 'video' ? (
          <video
            controls={!project.autoPlay}
            autoPlay={project.autoPlay}
            loop={project.loop}
            muted={project.muted}
            playsInline
            className="aspect-video w-full object-cover"
          >
            <source src={project.mediaSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={project.mediaSrc}
            alt={project.mediaAlt ?? project.title}
            className="aspect-video w-full object-cover"
          />
        )}
      </div>

      <div className="space-y-4 p-5">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="text-sm leading-6 text-slate-300">{project.description}</p>

        <a
          href={project.href}
          className="inline-flex items-center justify-center rounded-xl bg-teal-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
          target="_blank"
          rel="noreferrer"
        >
          {project.buttonText ?? 'View Project'}
        </a>
      </div>
    </article>
  );
};