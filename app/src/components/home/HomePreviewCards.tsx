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
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.title}
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg transition duration-300 hover:-translate-y-1"
        >
          <div className="overflow-hidden">
            {card.type === 'image' ? (
              <img
                src={card.imageSrc}
                alt={card.title}
                className="aspect-4/5 w-full object-cover transition duration-500 hover:scale-105"
              />
            ) : (
              <div className="aspect-4/5 w-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                >
                  <source src={card.videoSrc} type="video/mp4" />
                </video>
              </div>
            )}
          </div>

          <div className="space-y-3 p-5">
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{card.description}</p>
            <Link
              to={card.to}
              className="inline-flex items-center justify-center rounded-xl bg-teal-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
            >
              {card.buttonText}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
};