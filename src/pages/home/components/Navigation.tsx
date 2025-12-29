import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  scrolled?: boolean;
}

export default function Navigation({ scrolled: forcedScrolled }: NavigationProps) {
  const [scrolled, setScrolled] = useState(forcedScrolled || false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (forcedScrolled) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forcedScrolled]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Already on homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const goToHome = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white border-b-2 sm:border-b-4 border-black shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={goToHome}
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-400 border-2 sm:border-4 border-black flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-xl sm:text-2xl font-black">S</span>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-black">
              Shiftora.ai
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="font-bold text-sm lg:text-base text-black hover:text-emerald-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="font-bold text-sm lg:text-base text-black hover:text-emerald-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('solutions')}
              className="font-bold text-sm lg:text-base text-black hover:text-emerald-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="font-bold text-sm lg:text-base text-black hover:text-emerald-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-bold text-sm lg:text-base text-black hover:text-emerald-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Contact
            </button>
            <a
              href="https://cal.com/shreshth-daga-rxfhkj/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base bg-emerald-400 border-2 lg:border-4 border-black font-black hover:bg-emerald-300 transform hover:translate-x-1 hover:translate-y-1 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none cursor-pointer whitespace-nowrap"
            >
              Book Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center border-2 border-black ${
              scrolled ? 'bg-white' : 'bg-emerald-400'
            } cursor-pointer`}
          >
            <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl sm:text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white border-2 sm:border-4 border-black p-4 sm:p-6 space-y-3 sm:space-y-4">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left font-bold text-sm sm:text-base hover:text-emerald-400 transition-colors cursor-pointer py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left font-bold text-sm sm:text-base hover:text-emerald-400 transition-colors cursor-pointer py-2"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('solutions')}
              className="block w-full text-left font-bold text-sm sm:text-base hover:text-emerald-400 transition-colors cursor-pointer py-2"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="block w-full text-left font-bold text-sm sm:text-base hover:text-emerald-400 transition-colors cursor-pointer py-2"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left font-bold text-sm sm:text-base hover:text-emerald-400 transition-colors cursor-pointer py-2"
            >
              Contact
            </button>
            <a
              href="https://cal.com/shreshth-daga-rxfhkj/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 sm:px-6 py-3 text-sm sm:text-base bg-emerald-400 border-2 sm:border-4 border-black font-black text-center hover:bg-emerald-300 cursor-pointer"
            >
              Book Call
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}