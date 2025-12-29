export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-2">
            What makes us <span className="bg-emerald-400 px-2 sm:px-3 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">different</span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
            We don't just build AI tools. We craft intelligent solutions that understand your business, 
            adapt to your needs, and grow with your ambitions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-10 sm:mb-12 md:mb-16">
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-400 rounded-full border-2 sm:border-4 border-black flex items-center justify-center flex-shrink-0">
                  <i className="ri-brain-line text-xl sm:text-2xl text-black"></i>
                </div>
                <div>
                  <h3 className="font-black text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">AI That Actually Works</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    No buzzwords, no empty promises. Our AI solutions are built to solve real problems 
                    and deliver measurable results from day one.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-400 rounded-full border-2 sm:border-4 border-black flex items-center justify-center flex-shrink-0">
                  <i className="ri-team-line text-xl sm:text-2xl text-black"></i>
                </div>
                <div>
                  <h3 className="font-black text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">Human-Centered Design</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Technology should enhance human capabilities, not replace them. Our solutions 
                    empower your team to focus on what they do best.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-400 rounded-full border-2 sm:border-4 border-black flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-xl sm:text-2xl text-black"></i>
                </div>
                <div>
                  <h3 className="font-black text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">Enterprise-Grade Security</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Your data stays yours. Built with privacy-first architecture and 
                    enterprise-level security standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 transform rotate-2 hover:rotate-0 transition-transform">
              <img 
                src="https://readdy.ai/api/search-image?query=modern%20office%20workspace%20with%20AI%20technology%20interfaces%20holographic%20displays%20and%20data%20visualization%20screens%20showing%20business%20analytics%20and%20automation%20workflows%20in%20a%20clean%20futuristic%20environment&width=600&height=400&seq=about-img-001&orientation=landscape"
                alt="AI Technology Workspace"
                className="w-full h-60 sm:h-80 object-cover object-top rounded-xl sm:rounded-2xl border-2 sm:border-4 border-black"
              />
              
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-yellow-300 border-2 sm:border-4 border-black rounded-lg p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-12">
                <p className="font-black text-xs sm:text-sm">500+ Projects</p>
                <p className="text-xs font-mono">Delivered</p>
              </div>

              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-emerald-300 border-2 sm:border-4 border-black rounded-lg p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-12">
                <p className="font-black text-xs sm:text-sm">99.9% Uptime</p>
                <p className="text-xs font-mono">Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-purple-100 border-2 sm:border-4 border-black rounded-lg p-6 sm:p-8 md:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">Our Mission</h3>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 max-w-4xl mx-auto leading-relaxed px-2">
            To redefine how businesses operate by delivering tailored agentic AI systems that automate intelligently, adapt continuously, and scale with ambition.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <span className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 border-2 sm:border-4 border-black font-bold text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">Design</span>
            <span className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 border-2 sm:border-4 border-black font-bold text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">Deploy</span>
            <span className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 border-2 sm:border-4 border-black font-bold text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">Dominate</span>
          </div>
        </div>
      </div>
    </section>
  );
}