import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import '../index.css';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function mountPage(node: ReactNode) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{node}</StrictMode>);
}
