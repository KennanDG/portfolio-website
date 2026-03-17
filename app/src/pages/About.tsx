import { Link } from 'react-router-dom';



const skills = [
  'Programming Languages: Python, JavaScript, Kotlin, C++',
  'Frameworks & Tools: Pandas, MySQL, Scikit-learn',
  'Web Development: HTML, CSS, Node.js',
  'IDE: Visual Studio, VS Code, IntelliJ',
  'Soft Skills: Problem-Solving, Team Collaboration, Project Management',
];

const timeline = [
  {
    year: '2023',
    imageSrc: '/images/full-sail-campus.jpg',
    imageAlt: 'Full Sail University',
    description: 'Started my coding journey by enrolling at Full Sail University studying Computer Science.',
  },
  {
    year: '2024',
    imageSrc: '/images/graduation_pic.JPG',
    imageAlt: 'Graduation',
    description: 'Graduated with an AS in Computer Science from Full Sail University.',
  },
  {
    year: '2025',
    imageSrc: '/images/robot_arm.jpg',
    imageAlt: 'Robot Arm',
    description: 'Currently studying Deep Learning and exploring advanced robotics concepts.',
  },
];




export const AboutPage = () => {
  return (
    <section className="page-shell space-y-12">
      <header className="space-y-4 text-center">
        <h1 className="section-title">About Me</h1>
        <p className="mx-auto max-w-3xl section-copy">
          Hi! I'm Kennan deAngelo Gauthier, a Computer Science student with a concentration
          in Artificial Intelligence. I enjoy building innovative applications, robotics,
          and immersive digital experiences.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-shell p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-semibold text-teal-300">Skills</h2>
          <ul className="grid gap-3 text-sm text-slate-300 sm:text-base">
            {skills.map((skill) => (
              <li key={skill} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-shell p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-semibold text-teal-300">Hobbies & Interests</h2>
          <img
            src="/images/boxing_pic.PNG"
            alt="Boxing"
            className="mb-4 aspect-[4/3] w-full rounded-xl object-cover"
          />
          <p className="section-copy">
            When I'm not coding, I enjoy 3D printing, gaming, and creative DIY projects.
            Before I got into computer science, I was an amateur boxer and won the 2019
            Florida Golden Gloves.
          </p>
        </section>
      </div>

      <section className="space-y-6">
        <h2 className="text-center text-2xl font-semibold text-teal-300 sm:text-3xl">
          My Journey
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {timeline.map((item) => (
            <article key={item.year} className="card-shell overflow-hidden">
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="space-y-3 p-5">
                <h3 className="text-xl font-bold text-cyan-300">{item.year}</h3>
                <p className="text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card-shell space-y-4 p-6 text-center sm:p-8">
        <h2 className="text-2xl font-semibold text-teal-300">Let&apos;s Get In Touch</h2>
        <p className="section-copy">Want to collaborate or learn more about my work?</p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/contact" className="button-primary">
            Reach out to me
          </Link>
          <Link to="/projects" className="button-secondary">
            View Projects
          </Link>
        </div>
      </section>
    </section>
  );
};




