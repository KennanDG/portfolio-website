export const FeaturedProject = () => {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Featured Project
        </p>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Guild Masters</h2>
      </div>

      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800">
        <video controls className="aspect-video w-full object-cover">
          <source src="/videos/4.15 Final Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};