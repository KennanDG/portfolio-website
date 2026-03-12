import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'About Me',
    description: 'Learn more about my past, present, and future.',
    imageSrc: '/images/about_me_card.jpg',
    to: '/about',
    buttonText: 'Learn More',
    type: 'image' as const,
  },
  {
    title: 'Projects',
    description: "Check out what I've been working on.",
    videoSrc: '/videos/game_of_life.mp4',
    to: '/projects',
    buttonText: 'View Projects',
    type: 'video' as const,
  },
  {
    title: 'Contact',
    description: "Looking for help? Reach out to me and you won't regret it!",
    imageSrc: '/images/contact_me_card.jpg',
    to: '/contact',
    buttonText: 'Contact Me',
    type: 'image' as const,
  },
];

export const HomePreviewCards = () => {
  return (
    <section className="home-preview-cards">
      {cards.map((card) => (
        <article key={card.title} className="home-card">
          {card.type === 'image' ? (
            <img src={card.imageSrc} alt={card.title} />
          ) : (
            <div className="home-video-container">
              <video autoPlay loop muted playsInline>
                <source src={card.videoSrc} type="video/mp4" />
              </video>
            </div>
          )}

          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <Link to={card.to} className="btn">
            {card.buttonText}
          </Link>
        </article>
      ))}
    </section>
  );
}