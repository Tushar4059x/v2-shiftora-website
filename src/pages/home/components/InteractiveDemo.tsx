import { useState } from 'react';

export default function InteractiveDemo() {
  const [activeDemo, setActiveDemo] = useState('chatbot');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I\'m your AI assistant. How can I help you today?' },
    { type: 'user', message: 'What are your business hours?' },
    { type: 'bot', message: 'We\'re available 24/7 through our AI systems. For human support, our team is available Monday-Friday, 9 AM - 6 PM EST.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const demos = {
    chatbot: {
      title: 'AI Chatbot',
      description: 'Experience our intelligent customer service automation',
      icon: 'ri-chat-3-line',
      color: 'bg-emerald-400'
    },
    analytics: {
      title: 'Predictive Analytics',
      description: 'See how we forecast business trends and patterns',
      icon: 'ri-bar-chart-line',
      color: 'bg-purple-400'
    },
    automation: {
      title: 'Process Automation',
      description: 'Watch workflows get optimized in real-time',
      icon: 'ri-robot-line',
      color: 'bg-orange-400'
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const newMessage = { type: 'user', message: inputMessage };
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);
    setInputMessage('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setChatMessages(prev => [...prev, { type: 'bot', message: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: "I'm having trouble connecting right now. Please try our AI Requirements Form at /requirements for a detailed analysis!"
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const analyticsData = [
    { month: 'Jan', value: 65, prediction: 72 },
    { month: 'Feb', value: 78, prediction: 85 },
    { month: 'Mar', value: 82, prediction: 89 },
    { month: 'Apr', value: 91, prediction: 95 },
    { month: 'May', value: 87, prediction: 92 },
    { month: 'Jun', value: 94, prediction: 98 }
  ];

  return (
    <section id="demo" className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-2">
            Interactive <span className="bg-emerald-400 px-2 sm:px-3 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Demo</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
            Try our AI solutions right here. See how they work and imagine the possibilities for your business.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          {Object.entries(demos).map(([key, demo]) => (
            <button
              key={key}
              onClick={() => setActiveDemo(key)}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm md:text-base border-2 sm:border-4 border-black transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap cursor-pointer ${activeDemo === key
                  ? `${demo.color} translate-x-[-2px] translate-y-[-2px]`
                  : 'bg-white hover:translate-x-[-1px] hover:translate-y-[-1px]'
                }`}
            >
              <i className={`${demo.icon} text-base sm:text-lg`}></i>
              <span className="hidden sm:inline">{demo.title}</span>
              <span className="sm:hidden">{demo.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg border-2 sm:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className={`${demos[activeDemo].color} px-4 sm:px-6 py-3 sm:py-4 border-b-2 sm:border-b-4 border-black`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <i className={`${demos[activeDemo].icon} text-xl sm:text-2xl text-black`}></i>
              <div>
                <h3 className="font-black text-lg sm:text-xl md:text-2xl text-black">{demos[activeDemo].title}</h3>
                <p className="text-xs sm:text-sm text-black/80 hidden sm:block">{demos[activeDemo].description}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {activeDemo === 'chatbot' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-gray-50 rounded-lg border-2 sm:border-4 border-black p-3 sm:p-4 h-64 sm:h-80 overflow-y-auto mb-3 sm:mb-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-3 sm:mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] sm:max-w-xs px-3 sm:px-4 py-2 rounded-lg border-2 border-black ${msg.type === 'user'
                          ? 'bg-emerald-400 text-black'
                          : 'bg-white text-gray-800'
                        }`}>
                        <p className="text-xs sm:text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start mb-3 sm:mb-4">
                      <div className="bg-white border-2 border-black px-3 sm:px-4 py-2 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black rounded-lg font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-emerald-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isProcessing}
                    className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 font-bold border-2 sm:border-4 border-black hover:bg-gray-800 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-send-plane-line text-sm sm:text-base"></i>
                  </button>
                </div>
              </div>
            )}

            {activeDemo === 'analytics' && (
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="bg-gray-50 rounded-lg border-2 sm:border-4 border-black p-4 sm:p-6">
                    <h4 className="font-black text-base sm:text-lg mb-3 sm:mb-4">Revenue Prediction</h4>
                    <div className="space-y-2 sm:space-y-3">
                      {analyticsData.map((data, index) => (
                        <div key={index} className="flex items-center gap-2 sm:gap-4">
                          <span className="font-mono text-xs sm:text-sm w-6 sm:w-8">{data.month}</span>
                          <div className="flex-1 bg-white border-2 border-black rounded-full h-5 sm:h-6 overflow-hidden">
                            <div
                              className="h-full bg-emerald-400 transition-all duration-1000"
                              style={{ width: `${data.value}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-xs sm:text-sm w-10 sm:w-12">{data.value}%</span>
                          <span className="font-mono text-xs text-purple-600 w-12 sm:w-16">↗ {data.prediction}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-emerald-100 border-2 sm:border-4 border-black rounded-lg p-3 sm:p-4">
                      <h5 className="font-black text-xs sm:text-sm mb-2">Key Insights</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• 23% growth predicted for Q2</li>
                        <li>• Peak performance in April</li>
                        <li>• Seasonal trends identified</li>
                      </ul>
                    </div>

                    <div className="bg-purple-100 border-2 sm:border-4 border-black rounded-lg p-3 sm:p-4">
                      <h5 className="font-black text-xs sm:text-sm mb-2">Recommendations</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Increase inventory for April</li>
                        <li>• Focus marketing in Q1</li>
                        <li>• Prepare for summer dip</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDemo === 'automation' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-lg border-2 sm:border-4 border-black p-4 sm:p-6">
                  <h4 className="font-black text-base sm:text-lg mb-4 sm:mb-6">Workflow Automation Pipeline</h4>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <div className="bg-white border-2 sm:border-4 border-black rounded-lg p-3 sm:p-4 text-center min-w-[90px] sm:min-w-[120px]">
                      <i className="ri-mail-line text-xl sm:text-2xl text-emerald-600 mb-1 sm:mb-2 block"></i>
                      <p className="font-bold text-xs sm:text-sm">Email Received</p>
                    </div>

                    <i className="ri-arrow-right-line text-lg sm:text-2xl text-gray-400"></i>

                    <div className="bg-emerald-100 border-2 sm:border-4 border-black rounded-lg p-3 sm:p-4 text-center min-w-[90px] sm:min-w-[120px]">
                      <i className="ri-brain-line text-xl sm:text-2xl text-purple-600 mb-1 sm:mb-2 block"></i>
                      <p className="font-bold text-xs sm:text-sm">AI Analysis</p>
                    </div>

                    <i className="ri-arrow-right-line text-lg sm:text-2xl text-gray-400"></i>

                    <div className="bg-purple-100 border-2 sm:border-4 border-black rounded-lg p-3 sm:p-4 text-center min-w-[90px] sm:min-w-[120px]">
                      <i className="ri-file-list-line text-xl sm:text-2xl text-orange-600 mb-1 sm:mb-2 block"></i>
                      <p className="font-bold text-xs sm:text-sm">Categorized</p>
                    </div>

                    <i className="ri-arrow-right-line text-lg sm:text-2xl text-gray-400"></i>

                    <div className="bg-orange-100 border-2 sm:border-4 border-black rounded-lg p-3 sm:p-4 text-center min-w-[90px] sm:min-w-[120px]">
                      <i className="ri-user-line text-xl sm:text-2xl text-red-600 mb-1 sm:mb-2 block"></i>
                      <p className="font-bold text-xs sm:text-sm">Assigned</p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white border-2 border-black rounded p-2 sm:p-3 text-center">
                      <p className="font-bold text-base sm:text-lg text-emerald-600">85%</p>
                      <p className="text-xs">Time Saved</p>
                    </div>
                    <div className="bg-white border-2 border-black rounded p-2 sm:p-3 text-center">
                      <p className="font-bold text-base sm:text-lg text-purple-600">99.2%</p>
                      <p className="text-xs">Accuracy</p>
                    </div>
                    <div className="bg-white border-2 border-black rounded p-2 sm:p-3 text-center">
                      <p className="font-bold text-base sm:text-lg text-orange-600">24/7</p>
                      <p className="text-xs">Availability</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 px-2">
            Ready to implement these solutions in your business?
          </p>
          <a
            href="https://cal.com/shreshth-daga-rxfhkj/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base md:text-lg hover:bg-gray-800 transition-colors border-2 sm:border-4 border-black hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap cursor-pointer"
          >
            <i className="ri-rocket-line mr-2"></i>
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}