import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Solutions from './components/Solutions';
import InteractiveDemo from './components/InteractiveDemo';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrolled={scrolled} />
      <main>
        <Hero />
        <About />
        <Features />
        <Solutions />
        <InteractiveDemo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}