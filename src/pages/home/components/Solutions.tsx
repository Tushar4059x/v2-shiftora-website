export default function Solutions() {
  const solutions = [
    {
      title: 'Customer Service Automation',
      description: 'AI-powered chatbots and support systems that handle 80% of customer inquiries automatically.',
      icon: 'ri-customer-service-2-line',
      color: 'bg-emerald-400',
      benefits: ['24/7 Support', 'Instant Responses', 'Multi-language', 'Cost Reduction']
    },
    {
      title: 'Supply Chain Optimization',
      description: 'Predict demand, optimize inventory, and streamline logistics with intelligent forecasting.',
      icon: 'ri-truck-line',
      color: 'bg-purple-400',
      benefits: ['Demand Forecasting', 'Inventory Optimization', 'Route Planning', 'Cost Savings']
    },
    {
      title: 'Financial Risk Assessment',
      description: 'Advanced algorithms that analyze patterns and predict financial risks in real-time.',
      icon: 'ri-line-chart-line',
      color: 'bg-orange-400',
      benefits: ['Risk Prediction', 'Fraud Detection', 'Compliance', 'Real-time Alerts']
    },
    {
      title: 'Quality Control Automation',
      description: 'Computer vision systems that detect defects and ensure product quality at scale.',
      icon: 'ri-search-eye-line',
      color: 'bg-pink-400',
      benefits: ['Defect Detection', 'Quality Assurance', 'Process Optimization', 'Consistency']
    },
    {
      title: 'Document Processing',
      description: 'Extract, classify, and process documents automatically with intelligent OCR and NLP.',
      icon: 'ri-file-text-line',
      color: 'bg-yellow-400',
      benefits: ['OCR Technology', 'Data Extraction', 'Classification', 'Workflow Integration']
    },
    {
      title: 'Predictive Maintenance',
      description: 'Monitor equipment health and predict failures before they happen to minimize downtime.',
      icon: 'ri-tools-line',
      color: 'bg-red-400',
      benefits: ['Failure Prediction', 'Downtime Reduction', 'Cost Optimization', 'Equipment Health']
    }
  ];

  return (
    <section id="solutions" className="py-12 sm:py-16 md:py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-2">
            Industry <span className="bg-orange-400 px-2 sm:px-3 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Solutions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
            Tailored AI solutions for specific business challenges across different industries.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden group"
            >
              <div className={`${solution.color} px-4 sm:px-6 py-6 sm:py-8 border-b-2 sm:border-b-4 border-black`}>
                <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center">
                    <i className={`${solution.icon} text-2xl sm:text-3xl text-white`}></i>
                  </div>
                  <h3 className="font-black text-base sm:text-lg md:text-xl text-black">{solution.title}</h3>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 text-center">
                  {solution.description}
                </p>

                <div className="space-y-3">
                  <p className="font-bold text-xs sm:text-sm text-gray-900 text-center mb-3 sm:mb-4">Key Benefits</p>
                  <div className="space-y-2">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-2 sm:p-3 border-2 border-black">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full border-2 border-black flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm font-bold text-gray-800">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 bg-gradient-to-r from-emerald-100 to-purple-100 border-2 sm:border-4 border-black rounded-lg p-6 sm:p-8 md:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">Custom Solutions</h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Don't see your industry? We build custom AI solutions tailored to your specific business needs and challenges.
          </p>
          <a
            href="https://cal.com/shreshth-daga-rxfhkj/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base md:text-lg hover:bg-gray-800 transition-colors border-2 sm:border-4 border-black hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap cursor-pointer"
          >
            <i className="ri-message-3-line mr-2"></i>
            Discuss Your Needs
          </a>
        </div>
      </div>
    </section>
  );
}