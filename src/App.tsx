import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Waitlist } from './components/Waitlist';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
