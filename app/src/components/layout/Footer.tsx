export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Kennan deAngelo Gauthier</p>
      </div>
    </footer>
  );
}