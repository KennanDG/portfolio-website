import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

type Props = {
  children: ReactNode;
};

export function SiteLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
        <main className="flex-1">
          {children}
        </main>
      <Footer />
    </div>
  );
}