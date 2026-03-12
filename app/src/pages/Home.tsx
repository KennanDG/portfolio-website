import { HomePreviewCards } from '../components/home/HomePreviewCards';
import { FeaturedProject } from '../components/home/FeaturedProject';

export const HomePage = () => {
  return (
    <section className="page home-page">
      <div className="page-title-wrap">
        <h1 className="page-title">The Greatest Site Ever</h1>
      </div>

      <HomePreviewCards />
      <FeaturedProject />
    </section>
  );
}