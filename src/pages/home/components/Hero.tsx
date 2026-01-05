import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const texts = ['Automates', 'Optimizes', 'Transforms', 'Accelerates'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-24 pb-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/10"></div>

      <div className="absolute inset-0 opacity-5">
        <img
          src="https://readdy.ai/api/search-image?query=abstract%20geometric%20patterns%20with%20flowing%20lines%20and%20nodes%20representing%20artificial%20intelligence%20and%20technology%20networks%20in%20a%20minimalist%20style%20with%20soft%20gradients%20and%20clean%20modern%20aesthetic&width=1920&height=1080&seq=hero-bg-001&orientation=landscape"
          alt="AI Technology Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="inline-block mb-4">
          <span className="text-xs sm:text-sm font-mono bg-emerald-400 text-black px-3 sm:px-4 py-1.5 sm:py-2 rotate-[-2deg] inline-block border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            status: revolutionizing_business
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-6 px-2">
          <span className="block">AI That</span>
          <span className="bg-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 inline-block border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            {texts[currentText]}
          </span>
          <span className="block mt-2">Your Business</span>
        </h1>

        <div className="max-w-3xl mx-auto mb-8 px-2">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3">
            <span className="block">Shiftora.ai transforms traditional workflows into</span>
            <span className="block">
              <span className="bg-orange-400 px-2 mx-1 sm:mx-2 border-2 border-black">intelligent systems</span>
              that drive growth.
            </span>
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            From strategy to deployment, we build custom agentic AI systems tailored to your business workflows.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 px-4">
          <div className="bg-white p-2 sm:p-3 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Link
              to="/requirements"
              className="bg-black text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base md:text-lg border-2 sm:border-4 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] whitespace-nowrap cursor-pointer inline-block"
            >
              <i className="ri-file-text-line mr-2"></i>
              Send Requirements
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-2">
          <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-5 transform rotate-1 hover:rotate-0 transition-transform">
            <div className="w-10 h-10 bg-emerald-400 rounded-full border-2 sm:border-4 border-black flex items-center justify-center mb-3 mx-auto">
              <i className="ri-robot-line text-lg text-black"></i>
            </div>
            <h3 className="font-black text-sm sm:text-base mb-2">Smart Automation</h3>
            <p className="text-xs sm:text-sm text-gray-700">Automate complex workflows with intelligent decision-making capabilities.</p>
          </div>

          <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-5 transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="w-10 h-10 bg-purple-400 rounded-full border-2 sm:border-4 border-black flex items-center justify-center mb-3 mx-auto">
              <i className="ri-bar-chart-line text-lg text-black"></i>
            </div>
            <h3 className="font-black text-sm sm:text-base mb-2">Data Intelligence</h3>
            <p className="text-xs sm:text-sm text-gray-700">Transform raw data into actionable insights with advanced analytics.</p>
          </div>

          <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-5 transform rotate-1 hover:rotate-0 transition-transform sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 bg-orange-400 rounded-full border-2 sm:border-4 border-black flex items-center justify-center mb-3 mx-auto">
              <i className="ri-rocket-line text-lg text-black"></i>
            </div>
            <h3 className="font-black text-sm sm:text-base mb-2">Rapid Deployment</h3>
            <p className="text-xs sm:text-sm text-gray-700">Get AI solutions up and running in weeks, not months.</p>
          </div>
        </div>
      </div>
    </section>
  );
}