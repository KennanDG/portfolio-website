import { ProjectCard } from '../components/projects/ProjectCard';
import { type Project } from '../components/projects/ProjectCard';


export const projects: Project[] = [
    {
    title: 'Speech-to-Image-Classifier',
    description:
        "Speech-to-Image-Classifier is an iOS mobile application that utilizes object tracking and voice recognition technology to allow users to dynamically detect objects based on their verbal command.",
    href: 'https://github.com/KennanDG/portfolio-website',
    mediaType: 'video',
    mediaSrc: '/videos/GauthierKennan Week4 Iteration4.mp4',
    },
    {
    title: 'Guild Masters',
    description:
        "Guild Masters is an Android companion app for the MMO RPG Guild Wars 2. Users can view character stats, equipment, and backstory through asynchronous API calls.",
    href: 'https://github.com/renanlopescoder/GuildMasterApp',
    mediaType: 'video',
    mediaSrc: '/videos/4.15 Final Video.mp4',
    },
    {
    title: 'Game Of Life',
    description:
        "A Conway's Game of Life simulation built in C++ with wxWidgets, with customizable grid and cell colors and support for saving and loading universes.",
    href: 'https://github.com/FullSailGameStudies/conway-s-game-of-life-03-24-KennanDG',
    mediaType: 'video',
    mediaSrc: '/videos/game_of_life.mp4',
    autoPlay: true,
    loop: true,
    muted: true,
    },
    {
    title: 'Calculator',
    description:
        'A .NET calculator application implementing the shunting yard algorithm to convert infix notation to postfix and evaluate more complex expressions.',
    href: 'https://github.com/FullSailGameStudies/calculator-chris-KennanDG',
    mediaType: 'video',
    mediaSrc: '/videos/calculator_app.mp4',
    autoPlay: true,
    loop: true,
    muted: true,
    },
    {
    title: 'Titanic Research Project',
    description:
        'A machine learning research project predicting Titanic passenger survival using several classification models with accuracy in the 77% to 83% range.',
    href: '/files/GauthierKennan_Research_Assignment.zip',
    buttonText: 'Download Project',
    mediaType: 'image',
    mediaSrc: '/images/random_forest_confusion_matrix_optimized.png',
    mediaAlt: 'Titanic Research Project',
    },
];




export const ProjectsPage = () => {
    return (
    <section className="page projects-page">
        <h1 className="page-title">Projects</h1>

        <section className="projects-container">
        {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
        ))}
        </section>
    </section>
    );
}