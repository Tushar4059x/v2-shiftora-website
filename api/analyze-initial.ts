import OpenAI from 'openai';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { companyName, industry, processDescription, techStack } = await request.json();

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'OpenAI API Key not configured' }), { status: 500 });
        }

        const openai = new OpenAI({ apiKey });

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

        return new Response(JSON.stringify(parsed), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error in analyze-initial:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate questions' }), { status: 500 });
    }
}
