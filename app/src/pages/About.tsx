import { Link } from 'react-router-dom';



const skills = [
  'Languages:    Python, TypeScript, JavaScript, PL/SQL, C++',
  'AI:    Scikit-learn, Pytorch, Tensorflow, NumPy, YOLO, RAG, Vector Databases, LangChain, OpenAI Gymnasium',
  'Backend:    FastAPI, Django, SQLAlchemy, Alembic, Oracle DB',
  'ERP:    Frappe, Quantum',
  'DevOps:    AWS, Terraform, Docker, CI/CD',
  'Frontend:    React, Tailwind, Node.js, Oracle APEX',
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
    imageAlt: 'Associate\'s graduation',
    description: 'Graduated with an AS in Computer Science.',
  },
  {
    year: '2025',
    imageSrc: '/images/full-sail-campus.jpg',
    imageAlt: 'Bachelor\'s graduation',
    description: 'Started an internship and graduated with my bachelor\'s degree.',
  },
  {
    year: '2026',
    imageSrc: '/images/gat_logo.png',
    imageAlt: 'Robot Arm',
    description: 'Got hired by GA Telesis full-time as a Software Developer.',
  },
];




export const AboutPage = () => {
  return (
    <section className="page-shell space-y-12">
      <header className="space-y-4 text-center">
        <h1 className="section-title">About Me</h1>
        <p className="mx-auto max-w-4xl section-copy">
          Hi! I'm Kennan deAngelo Gauthier, a Full Sail University alumni that graduated with
          a Computer Science degree with a concentration in Artificial Intelligence. 
          I have a passion for anime, video games, and robotics. I have full-stack development
          experience; and I am actively working on new projects and building software solutions. 
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-shell p-6 sm:p-8">
          <h2 className="mb-4 text-2xl text-center font-semibold text-teal-300">Skills</h2>
          <ul className="grid gap-3 text-sm text-slate-300 sm:text-base">
            {skills.map((skill) => (
              <li key={skill} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-shell p-6 sm:p-8">
          <h2 className="mb-4 text-2xl text-center font-semibold text-teal-300">Hobbies & Interests</h2>
          <img
            src="/images/boxing_pic.PNG"
            alt="Boxing"
            className="mb-4 aspect-4/3 w-full rounded-xl object-cover"
          />
          <p className="section-copy">
            When I'm not coding, I enjoy spending time with friends and family, playing video games, 
            and working out.v Before I got into computer science, I was an amateur boxer and won the 2019
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
                className="aspect-4/3 w-full object-cover"
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




