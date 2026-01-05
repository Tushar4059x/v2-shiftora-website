import OpenAI from 'openai';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const {
            companyName,
            processDescription,
            techStack,
            jobTitle,
            companySize,
            monthlyRevenue,
            qaPairs
        } = await request.json();

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'OpenAI API Key not configured' }), { status: 500 });
        }

        const openai = new OpenAI({ apiKey });

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

        return new Response(JSON.stringify(parsed), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error in analyze-final:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate specific analysis' }), { status: 500 });
    }
}
