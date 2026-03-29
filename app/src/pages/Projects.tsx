import { ProjectCard } from '../components/projects/ProjectCard';
import { type Project } from '../components/projects/ProjectCard';


export const projects: Project[] = [
    {
    title: 'RAG API Demo',
    description:
    'A chatbot-style frontend connected to my retrieval-augmented generation pipeline, using a secure Vercel proxy and markdown-rendered responses.',
    href: '/rag-demo',
    buttonText: 'Open Demo',
    mediaType: 'image',
    mediaSrc: '/images/robot_arm.jpg',
    mediaAlt: 'RAG API Demo',
    },
    {
    title: 'Speech-to-Image-Classifier',
    description: "Speech-to-Image-Classifier is an iOS mobile application that utilizes object tracking and voice recognition technology to allow users to dynamically detect objects based on their verbal command.",
    href: 'https://github.com/KennanDG/portfolio-website',
    mediaType: 'video',
    mediaSrc: '/videos/speech_to_image_classifier.mp4',
    },
    {
    title: 'Spidey AR Overlay',
    description: "A fun mini-project showcasing my computer vision skills and love for the web-head.",
    href: 'https://github.com/KennanDG/aruco-marker-project',
    mediaType: 'video',
    mediaSrc: '/videos/aruco_marker_demo.mp4',
    },
    {
    title: 'BrightStep',
    description: "My college capstone group project. BrightStep is an intuitive AI tutor web application leveraging RAG technology to ground an AI model's reasoning based on the student's homework.",
    href: 'https://github.com/KennanDG/brightstep_frontend',
    mediaType: 'video',
    mediaSrc: '/videos/brightstep_demo.mp4',
    },
    {
    title: 'Guild Masters',
    description: "Guild Masters is an Android companion app for the MMO RPG Guild Wars 2. Users can view character stats, equipment, and backstory through asynchronous API calls.",
    href: 'https://github.com/renanlopescoder/GuildMasterApp',
    mediaType: 'video',
    mediaSrc: '/videos/guild_masters_demo.mp4',
    },
    {
    title: 'Game Of Life',
    description: "A Conway's Game of Life simulation built in C++ with wxWidgets, with customizable grid and cell colors and support for saving and loading universes.",
    href: 'https://github.com/FullSailGameStudies/conway-s-game-of-life-03-24-KennanDG',
    mediaType: 'video',
    mediaSrc: '/videos/game_of_life.mp4',
    autoPlay: true,
    loop: true,
    muted: true,
    },
    {
    title: 'Calculator',
    description: 'A .NET calculator application implementing the shunting yard algorithm to convert infix notation to postfix and evaluate more complex expressions.',
    href: 'https://github.com/FullSailGameStudies/calculator-chris-KennanDG',
    mediaType: 'video',
    mediaSrc: '/videos/calculator_app.mp4',
    autoPlay: true,
    loop: true,
    muted: true,
    },
    {
    title: 'Titanic Research Project',
    description: 'A machine learning research project predicting Titanic passenger survival using several classification models with accuracy in the 77% to 83% range.',
    href: '/files/GauthierKennan_Research_Assignment.zip',
    buttonText: 'Download Project',
    mediaType: 'image',
    mediaSrc: '/images/random_forest_confusion_matrix_optimized.png',
    mediaAlt: 'Titanic Research Project',
    },
];




export const ProjectsPage = () => {
  return (
    <section className="page-shell space-y-8">
        <div className="text-center">
            <h1 className="section-title">Projects</h1>
            <p className="mx-auto mt-3 max-w-2xl section-copy">
                A selection of projects spanning AI, mobile development, simulation, and software engineering.
            </p>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
            ))}
        </section>
    </section>
  );
};