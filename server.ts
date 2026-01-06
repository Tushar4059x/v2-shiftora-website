import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

const BUSINESS_EMAIL = 'Shiftora25@gmail.com';

// Analyze Initial - Generate 3 follow-up questions
app.post('/api/analyze-initial', async (req, res) => {
    try {
        const { companyName, industry, processDescription, techStack } = req.body;

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: 'OpenAI API Key not configured' });
        }

        const systemPrompt = `You are a friendly AI automation consultant helping small business owners discover hidden inefficiencies. Your clients are NOT tech-savvy - they don't know what Zapier, Make, or n8n are. They just know their work feels repetitive and exhausting.

Your job is to ask 3 simple, conversational questions that help uncover:
1. What repetitive tasks eat up their time daily/weekly
2. Where information gets "stuck" or requires manual copying between systems
3. What frustrates them most about their current workflow

Make questions feel like a friendly conversation, not a technical interview. Use everyday language. Focus on PAIN POINTS and TIME WASTERS.

Return ONLY a JSON object with a "questions" array containing exactly 3 strings. No markdown.`;

        const userPrompt = `
Business: ${companyName || 'A small business'}
What they currently use: ${techStack || 'Basic tools like email, spreadsheets'}
What they described: ${processDescription || 'Looking to save time on daily tasks'}

Generate 3 simple, friendly questions to understand their daily frustrations and time-wasters.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        const parsed = JSON.parse(content || '{"questions": []}');

        res.json(parsed);
    } catch (error) {
        console.error('Error in analyze-initial:', error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
});

// Analyze Final - Generate full report
app.post('/api/analyze-final', async (req, res) => {
    try {
        const {
            companyName,
            processDescription,
            techStack,
            jobTitle,
            companySize,
            monthlyRevenue,
            qaPairs
        } = req.body;

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: 'OpenAI API Key not configured' });
        }

        const systemPrompt = `You are a persuasive AI Solutions Consultant writing a discovery report that will make business owners excited about automation. Your goal is to:

1. Make them realize how much time and money they're LOSING right now
2. Paint a vivid picture of what their business could look like with automation
3. Create urgency and curiosity to take the next step

Write in a conversational, exciting tone. Use SPECIFIC numbers (even estimates). Compare their current state to a transformed future.

Return a JSON object with this structure:
{
  "scope_title": "An exciting, benefit-focused headline (e.g., 'Reclaim 15 Hours Every Week')",
  "executive_summary": "2-3 punchy sentences that make them feel the pain AND the possibility. Use numbers.",
  "current_pain_points": [
    "Specific frustration #1 with time/money impact",
    "Specific frustration #2 with time/money impact",
    "Specific frustration #3 with time/money impact"
  ],
  "transformation_vision": "A compelling 3-4 sentence description of what their workday looks like AFTER automation. Make it tangible and desirable.",
  "recommended_solution": "Plain-English description of what we'd automate. No jargon. Focus on outcomes.",
  "estimated_implementation_time": "e.g., '2-3 weeks'",
  "estimated_cost_savings": "Specific annual figure based on their revenue/size (e.g., '₹4,50,000/year')",
  "estimated_hours_saved": "Weekly hours freed up (e.g., '15-20 hours/week')",
  "quick_wins": ["First easy automation win", "Second quick win", "Third quick win"],
  "roi_breakdown": "A sentence explaining the math: 'If you save X hours at ₹Y/hour, that's ₹Z per month'",
  "next_steps": ["Clear action step 1", "Clear action step 2"]
}

Be realistic but paint an exciting picture. Use Indian Rupees (₹) for Indian businesses.

IMPORTANT: The Monthly Revenue provided is per MONTH, not per year. Use this to estimate appropriate savings:
- Just Starting (< ₹5L/month) = Small operations, suggest savings ₹50K-2L/year
- Early Stage (₹5-20L/month) = Growing business, suggest savings ₹2-5L/year  
- Growing (₹20-50L/month) = Medium business, suggest savings ₹5-10L/year
- Established (₹50L-2Cr/month) = Large business, suggest savings ₹10-25L/year
- Scaled (₹2Cr+/month) = Enterprise, suggest savings ₹25L-1Cr/year`;

        const userPrompt = `
## Business Profile
- Company: ${companyName || 'Their Business'}
- Team Size: ${companySize || 'Small team'}
- Monthly Revenue (per month): ${monthlyRevenue || 'Growing business'}
- Role: ${jobTitle || 'Business Owner'}
- Current Tools: ${techStack || 'Basic tools'}

## What They're Struggling With
${processDescription || 'Manual, repetitive tasks'}

## Their Answers to Our Discovery Questions
${qaPairs.map((qa: any) => `**Q:** ${qa.question}\n**A:** ${qa.answer}`).join('\n\n')}

Create an exciting, persuasive analysis that makes them eager to automate their business. Remember to scale the estimated savings appropriately based on their MONTHLY revenue.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        const parsed = JSON.parse(content || '{}');

        res.json(parsed);
    } catch (error) {
        console.error('Error in analyze-final:', error);
        res.status(500).json({ error: 'Failed to generate analysis' });
    }
});

// Send Report Email
app.post('/api/send-report', async (req, res) => {
    try {
        const {
            clientEmail,
            clientName,
            companyName,
            analysisResult
        } = req.body;

        if (!clientEmail || !analysisResult) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Format the report as HTML
        const reportHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #10b981; padding: 20px; text-align: center;">
        <h1 style="color: black; margin: 0;">Shiftora.ai</h1>
        <p style="color: black; margin: 5px 0 0 0;">AI Automation Analysis Report</p>
    </div>
    
    <div style="padding: 30px; background: #f9fafb;">
        <h2 style="color: #111; margin-top: 0;">${analysisResult.scope_title}</h2>
        <p style="font-size: 16px; color: #374151;">${analysisResult.executive_summary}</p>
        
        <div style="display: flex; gap: 10px; margin: 20px 0;">
            <div style="flex: 1; background: #10b981; padding: 15px; text-align: center; border: 2px solid black;">
                <p style="margin: 0; font-size: 12px; text-transform: uppercase;">Potential Savings</p>
                <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: bold;">${analysisResult.estimated_cost_savings}</p>
            </div>
            <div style="flex: 1; background: #38bdf8; padding: 15px; text-align: center; border: 2px solid black;">
                <p style="margin: 0; font-size: 12px; text-transform: uppercase;">Time Freed Up</p>
                <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: bold;">${analysisResult.estimated_hours_saved}</p>
            </div>
            <div style="flex: 1; background: #a78bfa; padding: 15px; text-align: center; border: 2px solid black;">
                <p style="margin: 0; font-size: 12px; text-transform: uppercase;">Implementation</p>
                <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: bold;">${analysisResult.estimated_implementation_time}</p>
            </div>
        </div>
        
        <div style="background: #111827; color: white; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">${analysisResult.roi_breakdown}</p>
        </div>
        
        <h3 style="color: #111; border-bottom: 3px solid #f43f5e; padding-bottom: 5px;">What's Costing You Right Now</h3>
        ${analysisResult.current_pain_points?.map((point: string) => `
            <div style="border-left: 4px solid #f43f5e; padding: 10px; margin: 10px 0; background: #fef2f2;">
                <p style="margin: 0; color: #374151;">${point}</p>
            </div>
        `).join('') || ''}
        
        <h3 style="color: #111; border-bottom: 3px solid #10b981; padding-bottom: 5px;">Your Business After Automation</h3>
        <div style="background: #10b981; padding: 20px; border: 2px solid black;">
            <p style="margin: 0; font-size: 16px;">${analysisResult.transformation_vision}</p>
        </div>
        
        <h3 style="color: #111; border-bottom: 3px solid #fbbf24; padding-bottom: 5px;">Quick Wins We Can Deliver</h3>
        ${analysisResult.quick_wins?.map((win: string) => `
            <div style="background: #fef3c7; padding: 10px; margin: 10px 0; border: 2px solid black;">
                <p style="margin: 0;"><strong>✓</strong> ${win}</p>
            </div>
        `).join('') || ''}
        
        <h3 style="color: #111; border-bottom: 3px solid #38bdf8; padding-bottom: 5px;">Our Recommendation</h3>
        <div style="background: #f0f9ff; padding: 20px; border: 2px solid black;">
            <p style="margin: 0; font-size: 16px;">${analysisResult.recommended_solution}</p>
        </div>
        
        <div style="background: #111827; color: white; padding: 20px; margin-top: 30px;">
            <h3 style="margin-top: 0; color: white;">Next Steps</h3>
            ${analysisResult.next_steps?.map((step: string, idx: number) => `
                <p style="margin: 10px 0;">
                    <span style="display: inline-block; width: 24px; height: 24px; background: #10b981; color: black; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; margin-right: 10px;">${idx + 1}</span>
                    ${step}
                </p>
            `).join('') || ''}
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px;">
            <p style="font-size: 18px; font-weight: bold; color: #111;">Ready to transform your business?</p>
            <p style="color: #6b7280;">Reply to this email or book a call at <a href="https://cal.com/shreshth-daga-rxfhkj/30min">cal.com/shreshth-daga-rxfhkj/30min</a></p>
        </div>
    </div>
    
    <div style="background: #111827; color: white; padding: 15px; text-align: center;">
        <p style="margin: 0; font-size: 12px;">© 2024 Shiftora.ai | AI Automation Solutions</p>
    </div>
</div>
`;

        // Send email using Resend
        console.log('Sending emails via Resend...');

        // 1. Send lead notification to business
        const businessResult = await resend.emails.send({
            from: 'Shiftora AI <hello@shiftora.ai>',
            to: ['shiftora25@gmail.com'],
            subject: `[New Lead] ${companyName}: ${analysisResult.scope_title}`,
            html: `
                <h2>New AI Automation Analysis Request</h2>
                <p><strong>Client Name:</strong> ${clientName}</p>
                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Client Email:</strong> ${clientEmail}</p>
                <hr/>
                ${reportHtml}
            `
        });

        console.log('Business email result:', businessResult);

        // 2. Send report to client
        const clientResult = await resend.emails.send({
            from: 'Shiftora AI <hello@shiftora.ai>',
            to: [clientEmail],
            replyTo: 'shiftora25@gmail.com',
            subject: `Your AI Automation Analysis: ${analysisResult.scope_title}`,
            html: reportHtml
        });

        console.log('Client email result:', clientResult);

        if (businessResult.error || clientResult.error) {
            console.error('Resend error:', businessResult.error || clientResult.error);
            res.status(500).json({ error: 'Failed to send email', details: businessResult.error || clientResult.error });
        } else {
            res.json({ success: true, message: 'Report sent to you and the client successfully!' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Chat API for demo chatbot
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        const systemPrompt = `You are Shiftora's AI assistant, an expert in business process automation and AI solutions.

IMPORTANT RESTRICTION: You ONLY answer questions related to:
- AI and automation
- Business process optimization
- Shiftora's services and capabilities
- How technology can help businesses save time and money

If a user asks about ANYTHING ELSE (general knowledge, coding help, personal advice, other topics), politely decline and redirect:
"I'm specifically designed to help with AI automation and Shiftora's services. For other questions, please check out general AI assistants! Is there anything about automation I can help you with?"

Your role when questions ARE relevant:
1. Answer questions about automation, AI, and how technology can help businesses
2. Explain how Shiftora can help automate repetitive tasks, customer service, data processing, etc.
3. Be friendly, concise, and helpful
4. Always relate answers back to how Shiftora's services could benefit them
5. If asked about pricing, mention that pricing depends on the scope and invite them to book a free consultation
6. Encourage users to try the AI Requirements Form at /requirements or book a call

Shiftora's key services:
- AI-powered customer service chatbots
- Process automation (emails, data entry, reporting)
- Predictive analytics and business intelligence
- WhatsApp/CRM automation
- Custom AI solutions for Indian businesses

Keep responses short (2-3 sentences max) unless more detail is specifically requested.
Use Indian Rupees (₹) when discussing costs or savings.
Be enthusiastic about automation possibilities!`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system' as const, content: systemPrompt },
                ...messages.map((msg: { type: string; message: string }) => ({
                    role: (msg.type === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
                    content: msg.message
                }))
            ],
            max_tokens: 150,
            temperature: 0.7
        });

        const response = completion.choices[0].message.content;
        res.json({ message: response });
    } catch (error) {
        console.error('Error in chat:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
});
