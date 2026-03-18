import { HomePreviewCards } from '../components/home/HomePreviewCards';
import { FeaturedProject } from '../components/home/FeaturedProject';

export const HomePage = () => {
  return (
    <section className="page-shell space-y-12 sm:space-y-16">
      <div className="space-y-4 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-400">
          Software Engineer • AI • Robotics
        </p>
        <h1 className="section-title">
          The Greatest Site Ever
        </h1>
      </div>

      <HomePreviewCards />
      <FeaturedProject />
    </section>
  );
};

