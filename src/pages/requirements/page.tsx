import { useEffect, useState, FormEvent } from 'react';
import Navigation from '../home/components/Navigation';
import Footer from '../home/components/Footer';

export default function Requirements() {
    const [formData, setFormData] = useState({
        companyName: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        email: '',
        phone: '',
        website: '',
        companySize: '',
        monthlyRevenue: '',
        techStack: [] as string[],
        otherTech: '',
        processDescription: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (tech: string) => {
        setFormData(prev => ({
            ...prev,
            techStack: prev.techStack.includes(tech)
                ? prev.techStack.filter(t => t !== tech)
                : [...prev.techStack, tech]
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Validate required fields
        if (!formData.email || !formData.phone) {
            setError('Please fill in all required fields (Email and Phone)');
            setIsSubmitting(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            setIsSubmitting(false);
            return;
        }

        try {
            // Format the tech stack for email
            const techStackString = formData.techStack.length > 0
                ? formData.techStack.join(', ') + (formData.techStack.includes('Other') && formData.otherTech ? ` (${formData.otherTech})` : '')
                : 'None selected';

            // Prepare form data for Web3Forms
            const formPayload = {
                access_key: 'a2c2ab2a-2995-4c1b-bf6b-2f7f0885d56c',
                subject: 'New AI Automation Requirements Submission from Shiftora.ai',
                from_name: 'Shiftora.ai Requirements Form',
                company_name: formData.companyName || 'Not provided',
                first_name: formData.firstName || 'Not provided',
                last_name: formData.lastName || 'Not provided',
                job_title: formData.jobTitle || 'Not provided',
                email: formData.email,
                phone: formData.phone,
                website: formData.website || 'Not provided',
                company_size: formData.companySize || 'Not specified',
                monthly_revenue: formData.monthlyRevenue || 'Not specified',
                tech_stack: techStackString,
                process_description: formData.processDescription || 'Not provided'
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
                setSubmitted(true);
                setFormData({
                    companyName: '',
                    firstName: '',
                    lastName: '',
                    jobTitle: '',
                    email: '',
                    phone: '',
                    website: '',
                    companySize: '',
                    monthlyRevenue: '',
                    techStack: [],
                    otherTech: '',
                    processDescription: '',
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setSubmitted(false);
                }, 5000);
            } else {
                setError('Something went wrong. Please try again or contact us directly at Shiftora25@gmail.com');
            }
        } catch (error) {
            setError('Failed to submit form. Please try again or contact us directly at Shiftora25@gmail.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    const techStackOptions = [
        'CRM (Salesforce, HubSpot, etc.)',
        'Email Marketing (Mailchimp, etc.)',
        'WhatsApp Business',
        'Google Sheets/Excel',
        'Zapier/Make',
        'None - Manual Process',
        'Other'
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navigation scrolled={true} />
            <main className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8 md:p-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">AI Automation Requirements</h1>
                        <p className="text-sm font-bold text-gray-600 mb-8">Help us understand your automation needs</p>

                        {submitted && (
                            <div className="bg-emerald-400 border-4 border-black p-6 mb-8">
                                <p className="font-black text-lg flex items-center gap-3">
                                    <i className="ri-check-line text-2xl"></i>
                                    Thank you! We'll review your requirements and get back to you within 24 hours.
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-400 border-4 border-black p-6 mb-8">
                                <p className="font-black text-lg flex items-center gap-3">
                                    <i className="ri-error-warning-line text-2xl"></i>
                                    {error}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Business Information */}
                            <section>
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                                        <i className="ri-building-line text-lg"></i>
                                    </span>
                                    1. Business Information
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-bold mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                            placeholder="Your company name"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-bold mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                                placeholder="First name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-bold mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-2">Job Title</label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleInputChange}
                                            className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                            placeholder="Your job title"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Contact Details */}
                            <section>
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                                        <i className="ri-contacts-line text-lg"></i>
                                    </span>
                                    2. Contact Details
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-bold mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                            placeholder="your.email@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-2">
                                            Phone <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                            placeholder="+91 1234567890"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-2">Website</label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                            placeholder="https://yourwebsite.com"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Business Details */}
                            <section>
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                                        <i className="ri-bar-chart-line text-lg"></i>
                                    </span>
                                    3. Business Details
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block font-bold mb-3">Company Size:</label>
                                        <div className="space-y-2">
                                            {[
                                                { value: 'solo', label: 'Solo/Freelancer (1 person)' },
                                                { value: 'small', label: 'Small Team (2-10)' },
                                                { value: 'growing', label: 'Growing Business (11-50)' },
                                                { value: 'midsize', label: 'Mid-size (51-200)' },
                                                { value: 'enterprise', label: 'Enterprise (200+)' }
                                            ].map(option => (
                                                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="companySize"
                                                        value={option.value}
                                                        checked={formData.companySize === option.value}
                                                        onChange={handleInputChange}
                                                        className="w-5 h-5 border-2 border-black"
                                                    />
                                                    <span className="font-medium">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-bold mb-3">Monthly Revenue:</label>
                                        <div className="space-y-2">
                                            {[
                                                { value: 'starting', label: 'Just Starting (< ₹5L)' },
                                                { value: 'early', label: 'Early Stage (₹5-20L)' },
                                                { value: 'growing', label: 'Growing (₹20-50L)' },
                                                { value: 'established', label: 'Established (₹50L-2Cr)' },
                                                { value: 'scaled', label: 'Scaled (₹2Cr+)' }
                                            ].map(option => (
                                                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="monthlyRevenue"
                                                        value={option.value}
                                                        checked={formData.monthlyRevenue === option.value}
                                                        onChange={handleInputChange}
                                                        className="w-5 h-5 border-2 border-black"
                                                    />
                                                    <span className="font-medium">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Current Tech Stack */}
                            <section>
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                                        <i className="ri-stack-line text-lg"></i>
                                    </span>
                                    4. Current Tech Stack
                                </h2>
                                <div className="space-y-2">
                                    {techStackOptions.map(tech => (
                                        <label key={tech} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.techStack.includes(tech)}
                                                onChange={() => handleCheckboxChange(tech)}
                                                className="w-5 h-5 border-2 border-black"
                                            />
                                            <span className="font-medium">{tech}</span>
                                        </label>
                                    ))}
                                </div>
                                {formData.techStack.includes('Other') && (
                                    <div className="mt-4">
                                        <label className="block font-bold mb-2">Please specify:</label>
                                        <input
                                            type="text"
                                            name="otherTech"
                                            value={formData.otherTech}
                                            onChange={handleInputChange}
                                            className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                            placeholder="Other tech stack..."
                                        />
                                    </div>
                                )}
                            </section>

                            {/* Process Description */}
                            <section>
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                                        <i className="ri-file-text-line text-lg"></i>
                                    </span>
                                    5. Automation Needs
                                </h2>
                                <div>
                                    <label className="block font-bold mb-2">
                                        Describe any process you'd like to automate. If nothing specific, share the most repetitive task consuming your team's time today.
                                    </label>
                                    <textarea
                                        name="processDescription"
                                        value={formData.processDescription}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                        placeholder="Tell us about the processes or tasks you'd like to automate..."
                                    />
                                </div>
                            </section>

                            {/* Submit Button */}
                            <div className="bg-gray-900 text-white border-4 border-black p-8 -mx-4 md:-mx-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-emerald-400 text-black border-4 border-black font-black text-lg py-4 px-8 hover:bg-emerald-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <i className="ri-loader-4-line animate-spin mr-2"></i>
                                            Sending...
                                        </>
                                    ) : (
                                        'SUBMIT REQUIREMENTS'
                                    )}
                                </button>
                                <p className="text-gray-400 text-sm font-medium text-center mt-4">
                                    We'll review your requirements and get back to you within 24 hours
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
