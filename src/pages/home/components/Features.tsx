import { useState } from 'react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: 'ri-robot-2-line',
      title: 'Intelligent Automation',
      description: 'Automate complex business processes with AI that learns and adapts to your workflow patterns.',
      details: 'Our automation engine uses machine learning to understand your business logic and continuously optimize processes for maximum efficiency.',
      color: 'bg-emerald-400'
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'Predictive Analytics',
      description: 'Forecast trends and make data-driven decisions with advanced machine learning models.',
      details: 'Leverage historical data and real-time inputs to predict market trends, customer behavior, and operational needs.',
      color: 'bg-purple-400'
    },
    {
      icon: 'ri-chat-3-line',
      title: 'Natural Language Processing',
      description: 'Extract insights from unstructured data and enable natural language interactions.',
      details: 'Process documents, emails, and conversations to extract meaningful insights and automate responses.',
      color: 'bg-orange-400'
    },
    {
      icon: 'ri-eye-line',
      title: 'Computer Vision',
      description: 'Analyze images and videos to automate visual inspection and quality control processes.',
      details: 'Detect defects, classify objects, and monitor processes using state-of-the-art computer vision algorithms.',
      color: 'bg-pink-400'
    },
    {
      icon: 'ri-links-line',
      title: 'Seamless Integration',
      description: 'Connect with your existing tools and systems without disrupting current workflows.',
      details: 'API-first architecture ensures smooth integration with CRM, ERP, and other business-critical systems.',
      color: 'bg-yellow-400'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and compliance with industry standards.',
      details: 'SOC 2 compliant infrastructure with advanced threat detection and data protection protocols.',
      color: 'bg-red-400'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50 relative">
      <div className="absolute top-6 sm:top-10 right-6 sm:right-10 text-xs sm:text-sm font-mono text-gray-400 rotate-6 hidden lg:block">
        <span>// powered by AI</span>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-2">
            Powerful <span className="bg-purple-400 px-2 sm:px-3 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Features</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
            Everything you need to transform your business with AI-powered automation and intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          <div className="space-y-3 sm:space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`bg-white rounded-lg border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 cursor-pointer transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                  activeFeature === index ? 'ring-2 sm:ring-4 ring-emerald-400' : ''
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.color} rounded-full border-2 sm:border-4 border-black flex items-center justify-center flex-shrink-0`}>
                    <i className={`${feature.icon} text-lg sm:text-xl text-black`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <i className={`ri-arrow-${activeFeature === index ? 'down' : 'right'}-s-line text-lg sm:text-xl text-gray-400`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className={`${features[activeFeature].color} px-4 sm:px-6 py-3 sm:py-4 border-b-2 sm:border-b-4 border-black`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <i className={`${features[activeFeature].icon} text-xl sm:text-2xl text-black`}></i>
                  <h3 className="font-black text-lg sm:text-xl md:text-2xl text-black">{features[activeFeature].title}</h3>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 md:p-8">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  {features[activeFeature].details}
                </p>
                
                <div className="bg-gray-50 rounded-lg border-2 sm:border-4 border-black p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
                  <img 
                    src={`https://readdy.ai/api/search-image?query=$%7Bfeatures%5BactiveFeature%5D.title.toLowerCase%28%29%7D%20AI%20technology%20interface%20dashboard%20with%20modern%20data%20visualization%20charts%20graphs%20and%20analytics%20displays%20in%20a%20clean%20professional%20business%20environment&width=500&height=300&seq=feature-${activeFeature}&orientation=landscape`}
                    alt={`${features[activeFeature].title} Interface`}
                    className="w-full h-36 sm:h-48 object-cover object-top rounded border-2 border-black"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-800 px-2 sm:px-3 py-1 text-xs font-mono rounded border-2 border-black">Machine Learning</span>
                  <span className="bg-gray-200 text-gray-800 px-2 sm:px-3 py-1 text-xs font-mono rounded border-2 border-black">Real-time</span>
                  <span className="bg-gray-200 text-gray-800 px-2 sm:px-3 py-1 text-xs font-mono rounded border-2 border-black">Scalable</span>
                  <span className="bg-gray-200 text-gray-800 px-2 sm:px-3 py-1 text-xs font-mono rounded border-2 border-black">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}