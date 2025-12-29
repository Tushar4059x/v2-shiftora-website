import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare form data for Web3Forms
      const formPayload = {
        access_key: 'a2c2ab2a-2995-4c1b-bf6b-2f7f0885d56c',
        subject: 'New Contact Form Submission from Shiftora.ai',
        from_name: 'Shiftora.ai Website',
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('Thank you! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('Something went wrong. Please try again or email us directly.');
      }
    } catch (error) {
      setSubmitStatus('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://readdy.ai/api/search-image?query=abstract%20technology%20network%20connections%20with%20glowing%20nodes%20and%20data%20streams%20in%20dark%20background%20representing%20AI%20and%20digital%20transformation&width=1920&height=1080&seq=contact-bg-001&orientation=landscape"
          alt="Technology Network Background"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 bg-emerald-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 sm:border-4 border-white font-bold text-xs sm:text-sm md:text-base">
              <i className="ri-rocket-line text-base sm:text-lg md:text-xl"></i>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">LET'S BUILD SOMETHING AMAZING</span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-2">
            Ready to <span className="bg-emerald-400 text-black px-2 sm:px-3 border-2 sm:border-4 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">Transform</span> Your Business?
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Tell us about your challenges and goals. Our AI experts will design a custom solution that drives real results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border-2 sm:border-4 border-white/20 p-6 sm:p-8">
              <h3 className="font-black text-xl sm:text-2xl mb-4 sm:mb-6">Why Choose Shiftora.ai?</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-400 rounded-full border-2 sm:border-4 border-white flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-lg sm:text-xl text-black"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Rapid Implementation</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Get your AI solution up and running in weeks, not months.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-400 rounded-full border-2 sm:border-4 border-white flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-check-line text-lg sm:text-xl text-black"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Enterprise Security</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Bank-level security with full compliance and data protection.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 rounded-full border-2 sm:border-4 border-white flex items-center justify-center flex-shrink-0">
                    <i className="ri-customer-service-2-line text-lg sm:text-xl text-black"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">24/7 Support</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Dedicated support team and continuous monitoring.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-400 rounded-full border-2 sm:border-4 border-white flex items-center justify-center flex-shrink-0">
                    <i className="ri-line-chart-line text-lg sm:text-xl text-black"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Proven ROI</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Average 300% ROI within the first year of implementation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <a 
                href="mailto:Shiftora25@gmail.com"
                className="bg-emerald-400 text-black border-2 sm:border-4 border-white rounded-lg p-4 sm:p-6 text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                <i className="ri-mail-line text-xl sm:text-2xl mb-2 block"></i>
                <h4 className="font-black text-xs sm:text-sm mb-1">Email Us</h4>
                <p className="text-xs font-mono break-all">Shiftora25@gmail.com</p>
              </a>
              
              <a 
                href="https://wa.me/9710556065297"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-400 text-black border-2 sm:border-4 border-white rounded-lg p-4 sm:p-6 text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:bg-purple-500 transition-colors cursor-pointer"
              >
                <i className="ri-whatsapp-line text-xl sm:text-2xl mb-2 block"></i>
                <h4 className="font-black text-xs sm:text-sm mb-1">WhatsApp</h4>
                <p className="text-xs font-mono">+971 0556065297</p>
              </a>
              
              <a 
                href="https://cal.com/shreshth-daga-rxfhkj/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-400 text-black border-2 sm:border-4 border-white rounded-lg p-4 sm:p-6 text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:bg-orange-500 transition-colors cursor-pointer sm:col-span-3 md:col-span-1"
              >
                <i className="ri-calendar-line text-xl sm:text-2xl mb-2 block"></i>
                <h4 className="font-black text-xs sm:text-sm mb-1">Book Call</h4>
                <p className="text-xs font-mono">Schedule Demo</p>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] p-6 sm:p-8">
            <h3 className="font-black text-xl sm:text-2xl text-black mb-4 sm:mb-6">Get Your Free AI Consultation</h3>
            
            {submitStatus ? (
              <div className="bg-emerald-100 border-2 sm:border-4 border-emerald-400 rounded-lg p-4 sm:p-6 text-center">
                <i className="ri-check-line text-2xl sm:text-3xl text-emerald-600 mb-3 sm:mb-4 block"></i>
                <p className="font-bold text-sm sm:text-base text-emerald-800">{submitStatus}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-readdy-form id="contact-form" className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block font-bold text-xs sm:text-sm text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black rounded-lg font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-emerald-400 text-black"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block font-bold text-xs sm:text-sm text-gray-900 mb-2">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black rounded-lg font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-emerald-400 text-black"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block font-bold text-xs sm:text-sm text-gray-900 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black rounded-lg font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-emerald-400 text-black"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label className="block font-bold text-xs sm:text-sm text-gray-900 mb-2">Tell us about your project *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={500}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black rounded-lg font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-emerald-400 resize-none text-black"
                    placeholder="Describe your business challenges and how AI could help..."
                  />
                  <p className="text-xs text-gray-600 mt-1">{formData.message.length}/500 characters</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-3 sm:py-4 font-bold text-sm sm:text-base md:text-lg border-2 sm:border-4 border-black hover:bg-gray-800 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 whitespace-nowrap cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line mr-2"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}