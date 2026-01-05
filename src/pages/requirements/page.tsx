import { useEffect, useState, FormEvent } from 'react';
import Navigation from '../home/components/Navigation';
import Footer from '../home/components/Footer';
import { Check, Loader2, ArrowRight, BrainCircuit } from 'lucide-react';

type Step = 'INITIAL_FORM' | 'ANALYZING_INITIAL' | 'QUESTIONS' | 'ANALYZING_FINAL' | 'RESULTS';

interface FormData {
    companyName: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    website: string;
    companySize: string;
    monthlyRevenue: string;
    techStack: string[];
    otherTech: string;
    processDescription: string;
}

interface QA {
    question: string;
    answer: string;
}

interface AnalysisResult {
    scope_title: string;
    executive_summary: string;
    current_pain_points: string[];
    transformation_vision: string;
    recommended_solution: string;
    estimated_implementation_time: string;
    estimated_cost_savings: string;
    estimated_hours_saved: string;
    quick_wins: string[];
    roi_breakdown: string;
    next_steps: string[];
}

export default function Requirements() {
    const [step, setStep] = useState<Step>('INITIAL_FORM');
    const [formData, setFormData] = useState<FormData>({
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

    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>(['', '', '']);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState('');

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

    const handleInitialSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.phone) {
            setError('Please fill in all required fields (Email and Phone)');
            return;
        }

        setStep('ANALYZING_INITIAL');

        try {
            const response = await fetch('/api/analyze-initial', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    companyName: formData.companyName,
                    industry: 'General',
                    processDescription: formData.processDescription,
                    techStack: formData.techStack.join(', ')
                })
            });

            if (!response.ok) throw new Error('Failed to analyze requirements');

            const data = await response.json();
            if (data.questions && Array.isArray(data.questions)) {
                setQuestions(data.questions);
                setStep('QUESTIONS');
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error(err);
            setError('AI Analysis failed. Checking if we can fallback to standard submission...');
            // Fallback: Submit strictly to email if AI fails? 
            // For now, let's just show error.
            setError('Something went wrong with the AI analysis. Please ensure your response describes a process.');
            setStep('INITIAL_FORM');
        }
    };

    const handleAnswersSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStep('ANALYZING_FINAL');

        const qaPairs = questions.map((q, i) => ({ question: q, answer: answers[i] }));

        try {
            const response = await fetch('/api/analyze-final', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    techStack: formData.techStack.join(', '),
                    qaPairs
                })
            });

            if (!response.ok) throw new Error('Analysis failed');

            const result = await response.json();
            setAnalysisResult(result);
            setStep('RESULTS');

            // Send the report via email using server API (Resend)
            fetch('/api/send-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientEmail: formData.email,
                    clientName: `${formData.firstName} ${formData.lastName}`.trim() || 'Client',
                    companyName: formData.companyName,
                    analysisResult: result
                })
            })
                .then(res => res.json())
                .then(data => console.log('Email sent:', data))
                .catch(err => console.error('Failed to send email:', err));

        } catch (err) {
            setError('Final analysis failed. Please try again.');
            setStep('QUESTIONS');
        }
    };

    // Render Steps
    // ...

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
                    <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8 md:p-12 relative overflow-hidden">

                        {/* Progress Indicator */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                            <div
                                className="h-full bg-emerald-400 transition-all duration-500 ease-out"
                                style={{
                                    width: step === 'INITIAL_FORM' ? '20%' :
                                        step === 'ANALYZING_INITIAL' ? '40%' :
                                            step === 'QUESTIONS' ? '60%' :
                                                step === 'ANALYZING_FINAL' ? '80%' : '100%'
                                }}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {step === 'INITIAL_FORM' && (
                            <>
                                <h1 className="text-4xl md:text-5xl font-black mb-4 mt-4">AI Automation Assessment</h1>
                                <p className="text-sm font-bold text-gray-600 mb-8">Tell us about your process, and our AI will generate a custom automation plan for you.</p>

                                <form onSubmit={handleInitialSubmit} className="space-y-8">
                                    {/* Copy existing sections 1-3 from previous code, keeping layout same */}
                                    {/* For brevity, I'm condensing the repetitive parts but strictly keeping logic */}

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
                                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Your company name" />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block font-bold mb-2">First Name</label>
                                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                                                </div>
                                                <div>
                                                    <label className="block font-bold mb-2">Last Name</label>
                                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block font-bold mb-2">Job Title</label>
                                                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                            <span className="w-8 h-8 bg-emerald-400 border-2 border-black flex items-center justify-center">
                                                <i className="ri-contacts-line text-lg"></i>
                                            </span>
                                            2. Contact Details
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block font-bold mb-2">Email *</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                                            </div>
                                            <div>
                                                <label className="block font-bold mb-2">Phone *</label>
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                                            </div>
                                            <div>
                                                <label className="block font-bold mb-2">Website</label>
                                                <input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                                            </div>
                                        </div>
                                    </section>

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
                                                            <input type="radio" name="companySize" value={option.value} checked={formData.companySize === option.value} onChange={handleInputChange} className="w-5 h-5 border-2 border-black" />
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
                                                            <input type="radio" name="monthlyRevenue" value={option.value} checked={formData.monthlyRevenue === option.value} onChange={handleInputChange} className="w-5 h-5 border-2 border-black" />
                                                            <span className="font-medium">{option.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </section>

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
                                                    <input type="checkbox" checked={formData.techStack.includes(tech)} onChange={() => handleCheckboxChange(tech)} className="w-5 h-5 border-2 border-black" />
                                                    <span className="font-medium">{tech}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </section>

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
                                            <textarea name="processDescription" value={formData.processDescription} onChange={handleInputChange} rows={6} className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="e.g., We manually copy data from emails to Excel sheets every day..." />
                                        </div>
                                    </section>

                                    <div className="bg-gray-900 text-white border-4 border-black p-8 -mx-4 md:-mx-8">
                                        <button type="submit" className="w-full bg-emerald-400 text-black border-4 border-black font-black text-lg py-4 px-8 hover:bg-emerald-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-2">
                                            ANALYZE MY BUSINESS
                                            <BrainCircuit />
                                        </button>
                                        <p className="text-gray-400 text-sm font-medium text-center mt-4">
                                            Shiftora AI will analyze your inputs and ask 3 tailored follow-up questions.
                                        </p>
                                    </div>
                                </form>
                            </>
                        )}

                        {(step === 'ANALYZING_INITIAL' || step === 'ANALYZING_FINAL') && (
                            <div className="py-20 text-center space-y-6">
                                <Loader2 className="w-16 h-16 animate-spin mx-auto text-emerald-500" />
                                <h2 className="text-3xl font-black">
                                    {step === 'ANALYZING_INITIAL' ? 'Analyzing your business model...' : 'Generating your automation report...'}
                                </h2>
                                <p className="text-xl font-bold text-gray-500">
                                    Our AI agents are identifying opportunities for efficiency.
                                </p>
                            </div>
                        )}

                        {step === 'QUESTIONS' && (
                            <div className="space-y-8 mt-6">
                                <div>
                                    <h2 className="text-3xl font-black mb-2">We found potential!</h2>
                                    <p className="text-gray-600 font-bold">To verify the scope, we have 3 quick questions about your process.</p>
                                </div>

                                <form onSubmit={handleAnswersSubmit} className="space-y-6">
                                    {questions.map((question, idx) => (
                                        <div key={idx} className="bg-gray-50 border-2 border-black p-6">
                                            <label className="block font-black text-lg mb-3">
                                                {idx + 1}. {question}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={answers[idx]}
                                                onChange={(e) => {
                                                    const newAnswers = [...answers];
                                                    newAnswers[idx] = e.target.value;
                                                    setAnswers(newAnswers);
                                                }}
                                                className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                                placeholder="Your answer..."
                                            />
                                        </div>
                                    ))}

                                    <button type="submit" className="w-full bg-emerald-400 text-black border-4 border-black font-black text-lg py-4 px-8 hover:bg-emerald-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-2">
                                        GENERATE REPORT
                                        <ArrowRight />
                                    </button>
                                </form>
                            </div>
                        )}

                        {step === 'RESULTS' && analysisResult && (
                            <div className="space-y-8 mt-6">
                                {/* Header */}
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-400 border-4 border-black rounded-full mb-6">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-black mb-2">{analysisResult.scope_title}</h2>
                                    <p className="font-bold text-gray-600 text-lg">{formData.companyName || 'Your Business'}</p>
                                </div>

                                {/* Executive Summary */}
                                <div className="bg-amber-50 border-4 border-black p-6">
                                    <p className="font-bold text-lg md:text-xl text-gray-800 leading-relaxed">{analysisResult.executive_summary}</p>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="border-4 border-black p-4 md:p-6 text-center bg-emerald-400">
                                        <p className="text-black font-bold text-xs uppercase mb-2">Potential Savings</p>
                                        <p className="text-lg md:text-xl font-black" style={{ wordBreak: 'keep-all' }}>{analysisResult.estimated_cost_savings}</p>
                                    </div>
                                    <div className="border-4 border-black p-4 md:p-6 text-center bg-sky-400">
                                        <p className="text-black font-bold text-xs uppercase mb-2">Time Freed Up</p>
                                        <p className="text-lg md:text-xl font-black" style={{ wordBreak: 'keep-all' }}>{analysisResult.estimated_hours_saved}</p>
                                    </div>
                                    <div className="border-4 border-black p-4 md:p-6 text-center bg-violet-400">
                                        <p className="text-black font-bold text-xs uppercase mb-2">Implementation</p>
                                        <p className="text-lg md:text-xl font-black" style={{ wordBreak: 'keep-all' }}>{analysisResult.estimated_implementation_time}</p>
                                    </div>
                                </div>

                                {/* ROI Breakdown */}
                                <div className="bg-gray-900 text-white border-4 border-black p-6">
                                    <p className="font-bold text-lg">{analysisResult.roi_breakdown}</p>
                                </div>

                                {/* Current Pain Points */}
                                <div className="space-y-4">
                                    <h4 className="font-black text-xl border-b-4 border-rose-500 pb-2 inline-block">
                                        What's Costing You Right Now
                                    </h4>
                                    <div className="space-y-3">
                                        {analysisResult.current_pain_points?.map((point, idx) => (
                                            <div key={idx} className="border-l-4 border-rose-500 pl-4 py-2 bg-rose-50">
                                                <p className="font-medium text-gray-800">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Transformation Vision */}
                                <div className="space-y-4">
                                    <h4 className="font-black text-xl border-b-4 border-emerald-500 pb-2 inline-block">
                                        Your Business After Automation
                                    </h4>
                                    <div className="bg-emerald-400 border-4 border-black p-6">
                                        <p className="font-medium text-lg leading-relaxed">{analysisResult.transformation_vision}</p>
                                    </div>
                                </div>

                                {/* Quick Wins */}
                                <div className="space-y-4">
                                    <h4 className="font-black text-xl border-b-4 border-amber-400 pb-2 inline-block">
                                        Quick Wins We Can Deliver
                                    </h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {analysisResult.quick_wins?.map((win, idx) => (
                                            <div key={idx} className="border-4 border-black p-4 bg-amber-100 hover:bg-amber-200 transition-colors">
                                                <p className="font-bold"><span className="text-emerald-600 mr-2">✓</span>{win}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommended Solution */}
                                <div className="space-y-4">
                                    <h4 className="font-black text-xl border-b-4 border-sky-500 pb-2 inline-block">Our Recommendation</h4>
                                    <div className="bg-sky-50 border-4 border-black p-6">
                                        <p className="text-lg leading-relaxed">{analysisResult.recommended_solution}</p>
                                    </div>
                                </div>

                                {/* Next Steps */}
                                <div className="bg-gray-900 text-white border-4 border-black p-6 space-y-4">
                                    <h4 className="font-black text-xl">Next Steps</h4>
                                    <div className="space-y-3">
                                        {analysisResult.next_steps?.map((stepItem, idx) => (
                                            <p key={idx} className="font-medium flex items-start gap-3">
                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-400 text-black rounded-full text-sm font-black shrink-0">{idx + 1}</span>
                                                {stepItem}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="text-center pt-6 pb-4 space-y-6">
                                    <div>
                                        <p className="text-xl font-black text-gray-800">
                                            Ready to transform your business?
                                        </p>
                                        <p className="text-gray-500 mt-2">
                                            Let's discuss how we can automate your workflows and save you time.
                                        </p>
                                    </div>
                                    <a
                                        href="https://cal.com/shreshth-daga-rxfhkj/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-black text-white px-8 py-4 font-bold text-lg border-4 border-black hover:bg-gray-800 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer"
                                    >
                                        <i className="ri-calendar-check-line mr-2"></i>
                                        Book Your Free Strategy Call →
                                    </a>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
