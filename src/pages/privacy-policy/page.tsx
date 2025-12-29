import { useEffect } from 'react';
import Navigation from '../home/components/Navigation';
import Footer from '../home/components/Footer';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrolled={true} />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
            <p className="text-sm font-bold text-gray-600 mb-8">Last Updated: January 2024</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                    <i className="ri-shield-check-line text-lg"></i>
                  </span>
                  Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed font-medium">
                  At Shiftora.ai, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                    <i className="ri-database-2-line text-lg"></i>
                  </span>
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 border-2 border-black p-4">
                    <h3 className="font-black mb-2">Personal Information</h3>
                    <p className="text-gray-700 font-medium">
                      We may collect personal information that you voluntarily provide to us when you contact us, including your name, email address, company name, and project details.
                    </p>
                  </div>
                  <div className="bg-gray-50 border-2 border-black p-4">
                    <h3 className="font-black mb-2">Usage Data</h3>
                    <p className="text-gray-700 font-medium">
                      We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, and browsing behavior.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                    <i className="ri-settings-3-line text-lg"></i>
                  </span>
                  How We Use Your Information
                </h2>
                <ul className="space-y-2 text-gray-700 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold mt-1">1</span>
                    <span>To respond to your inquiries and provide customer support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold mt-1">2</span>
                    <span>To improve our website and services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold mt-1">3</span>
                    <span>To send you marketing communications (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold mt-1">4</span>
                    <span>To analyze usage patterns and optimize user experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold mt-1">5</span>
                    <span>To comply with legal obligations</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                    <i className="ri-share-line text-lg"></i>
                  </span>
                  Information Sharing
                </h2>
                <p className="text-gray-700 leading-relaxed font-medium mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="space-y-2 text-gray-700 font-medium">
                  <li className="flex items-start gap-3">
                    <i className="ri-arrow-right-s-line text-xl mt-0.5"></i>
                    <span>With service providers who assist us in operating our website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-arrow-right-s-line text-xl mt-0.5"></i>
                    <span>When required by law or to protect our rights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-arrow-right-s-line text-xl mt-0.5"></i>
                    <span>In connection with a business transfer or merger</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                    <i className="ri-cookie-line text-lg"></i>
                  </span>
                  Cookies and Tracking
                </h2>
                <p className="text-gray-700 leading-relaxed font-medium">
                  We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. However, disabling cookies may limit certain features of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                    <i className="ri-lock-line text-lg"></i>
                  </span>
                  Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed font-medium">
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                    <i className="ri-user-settings-line text-lg"></i>
                  </span>
                  Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed font-medium mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 border-2 border-black p-4">
                    <h4 className="font-black mb-2">Access &amp; Correction</h4>
                    <p className="text-sm text-gray-700 font-medium">Request access to and correction of your personal data</p>
                  </div>
                  <div className="bg-emerald-50 border-2 border-black p-4">
                    <h4 className="font-black mb-2">Deletion</h4>
                    <p className="text-sm text-gray-700 font-medium">Request deletion of your personal information</p>
                  </div>
                  <div className="bg-emerald-50 border-2 border-black p-4">
                    <h4 className="font-black mb-2">Opt-Out</h4>
                    <p className="text-sm text-gray-700 font-medium">Opt-out of marketing communications</p>
                  </div>
                  <div className="bg-emerald-50 border-2 border-black p-4">
                    <h4 className="font-black mb-2">Data Portability</h4>
                    <p className="text-sm text-gray-700 font-medium">Request a copy of your data in a portable format</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                    <i className="ri-refresh-line text-lg"></i>
                  </span>
                  Changes to This Policy
                </h2>
                <p className="text-gray-700 leading-relaxed font-medium">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section className="bg-gray-900 text-white border-4 border-black p-8 -mx-4 md:-mx-8">
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-400 text-black border-2 border-black flex items-center justify-center">
                    <i className="ri-mail-line text-lg"></i>
                  </span>
                  Contact Us
                </h2>
                <p className="text-gray-300 leading-relaxed font-medium mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="space-y-2 font-bold">
                  <p className="flex items-center gap-3">
                    <i className="ri-mail-line text-emerald-400"></i>
                    <a href="mailto:Shiftora25@gmail.com" className="hover:text-emerald-400 transition-colors">Shiftora25@gmail.com</a>
                  </p>
                  <p className="flex items-center gap-3">
                    <i className="ri-whatsapp-line text-emerald-400"></i>
                    <a href="https://wa.me/971556065297" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">+971 0556065297</a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}