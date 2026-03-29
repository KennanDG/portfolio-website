import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Me' },
  { to: '/projects', label: 'Projects' },
  { to: '/rag-demo', label: 'RAG Demo' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 
              'nav-link active transition-transform duration-300 hover:scale-105  hover:-translate-y-1' 
              : 
              'nav-link transition-transform duration-300 hover:scale-105  hover:-translate-y-1')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}