export default function Footer() {
  const navigate = window.REACT_APP_NAVIGATE;

  return (
    <footer className="bg-emerald-400 text-black py-10 sm:py-12 md:py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-black">Shiftora.ai</span>
            </div>
            <p className="text-base sm:text-lg font-bold mb-4 sm:mb-6 max-w-md">
              Transforming businesses with intelligent AI solutions that deliver real results.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="https://www.linkedin.com/company/shiftora-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-emerald-400 rounded-full border-2 sm:border-4 border-black flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-line text-base sm:text-lg"></i>
              </a>
            </div>
          </div>

          <div className="sm:col-span-2">
            <h4 className="font-black text-base sm:text-lg md:text-xl mb-4 sm:mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-2 sm:gap-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="block font-bold text-sm sm:text-base hover:underline transition-all cursor-pointer text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block font-bold text-sm sm:text-base hover:underline transition-all cursor-pointer text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block font-bold text-sm sm:text-base hover:underline transition-all cursor-pointer text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('solutions')}
                className="block font-bold text-sm sm:text-base hover:underline transition-all cursor-pointer text-left"
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="block font-bold text-sm sm:text-base hover:underline transition-all cursor-pointer text-left"
              >
                Interactive Demo
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block font-bold text-sm sm:text-base hover:underline transition-all cursor-pointer text-left"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        <div className="border-t-2 sm:border-t-4 border-black pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-bold">
              <button 
                onClick={() => navigate('/privacy-policy')}
                className="hover:underline cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-xs sm:text-sm font-bold text-center">© 2025 Shiftora.ai. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-6 sm:top-8 right-6 sm:right-8 bg-black text-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3 hidden lg:block">
        <p className="font-mono text-xs font-bold">Build with AI ❤️</p>
      </div>
    </footer>
  );
}