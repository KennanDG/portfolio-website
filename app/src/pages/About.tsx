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
    <section className="page about-page">
      <h1 className="page-title">About Me</h1>

      <section className="introduction">
        <h2>Welcome!</h2>
        <p>
          Hi! I'm Kennan deAngelo Gauthier, a Computer Science student with a concentration
          in Artificial Intelligence. I have a passion for building innovative applications,
          robotics, and creating immersive digital experiences.
        </p>
      </section>

      <div className="skills-hobbies-container">
        <section className="skills">
          <h2>Skills</h2>
          <ul className="skills-grid">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="hobbies">
          <h2>Hobbies & Interests</h2>
          <img src="/images/boxing_pic.PNG" alt="Boxing" />
          <p>
            When I'm not coding, I enjoy 3D printing, gaming, and exploring creative DIY
            projects. Before I got into computer science, I was an amateur boxer and won
            the 2019 Florida Golden Gloves.
          </p>
        </section>
      </div>

      <section className="journey">
        <h2>My Journey</h2>
        <div className="timeline-body">
          {timeline.map((item) => (
            <div key={item.year} className="timeline-item">
              <h3>{item.year}</h3>
              <img src={item.imageSrc} alt={item.imageAlt} />
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="call-to-action">
        <h2>Let's Get In Touch</h2>
        <p>Want to collaborate or learn more about my work?</p>
        <Link to="/contact" className="btn">
          Reach out to me!
        </Link>
        <p>Don't forget to check out what I've been working on.</p>
        <Link to="/projects" className="btn">
          View Projects
        </Link>
      </section>
    </section>
  );
}