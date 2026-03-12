import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

type Props = {
  children: ReactNode;
};

export function SiteLayout({ children }: Props) {
  return (
    <>
        <Navbar />
        <main>
            {children}
        </main>
        <Footer />
    </>
  );
}