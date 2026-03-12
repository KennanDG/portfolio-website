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
    <article className="projects-card">
      {project.mediaType === 'video' ? (
        <video
          controls={!project.autoPlay}
          autoPlay={project.autoPlay}
          loop={project.loop}
          muted={project.muted}
          playsInline
        >
          <source src={project.mediaSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={project.mediaSrc} alt={project.mediaAlt ?? project.title} />
      )}

      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <a href={project.href} className="btn" target="_blank" rel="noreferrer">
        {project.buttonText ?? 'View Project'}
      </a>
    </article>
  );
}