import { ContactForm } from '../components/contact/ContactForm';

export const ContactPage = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 shadow-2xl backdrop-blur">
            <div className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center bg-linear-to-br from-slate-900 via-slate-800 to-teal-950 p-8 sm:p-10 lg:p-12">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                        Contact
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Let&apos;s work together
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                        Looking to hire? Need help on your next project? Fill out the form
                        or connect with me on LinkedIn and I&apos;ll get back to you as soon as I can.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="https://github.com/KennanDG/portfolio-website"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/in/kennan-gauthier-021643186"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="bg-slate-950 p-8 sm:p-10 lg:p-12">
                    <ContactForm />
                </div>
            </div>
        </div>
    </section>
  );
};