import { Resend } from 'resend';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const {
            clientEmail,
            clientName,
            companyName,
            analysisResult
        } = await request.json();

        if (!clientEmail || !analysisResult) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
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
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
                <td style="background: #10b981; padding: 15px; text-align: center; border: 2px solid black; width: 33%;">
                    <p style="margin: 0; font-size: 12px; text-transform: uppercase;">Potential Savings</p>
                    <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${analysisResult.estimated_cost_savings}</p>
                </td>
                <td style="background: #38bdf8; padding: 15px; text-align: center; border: 2px solid black; width: 33%;">
                    <p style="margin: 0; font-size: 12px; text-transform: uppercase;">Time Freed Up</p>
                    <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${analysisResult.estimated_hours_saved}</p>
                </td>
                <td style="background: #a78bfa; padding: 15px; text-align: center; border: 2px solid black; width: 33%;">
                    <p style="margin: 0; font-size: 12px; text-transform: uppercase;">Implementation</p>
                    <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${analysisResult.estimated_implementation_time}</p>
                </td>
            </tr>
        </table>
        
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

        // Send email using Resend with verified domain
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

        // 2. Send report to client
        const clientResult = await resend.emails.send({
            from: 'Shiftora AI <hello@shiftora.ai>',
            to: [clientEmail],
            replyTo: 'shiftora25@gmail.com',
            subject: `Your AI Automation Analysis: ${analysisResult.scope_title}`,
            html: reportHtml
        });

        if (businessResult.error || clientResult.error) {
            console.error('Resend error:', businessResult.error || clientResult.error);
            return new Response(JSON.stringify({ error: 'Failed to send email', details: businessResult.error || clientResult.error }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, message: 'Report sent to you and the client!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
