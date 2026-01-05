import OpenAI from 'openai';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Messages are required' }), { status: 400 });
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

        return new Response(JSON.stringify({ message: response }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error in chat:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate response' }), { status: 500 });
    }
}
