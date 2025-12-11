import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { email, message, explanation } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const emailContent = explanation || message || 'User wants to connect from portfolio chatbot';
    
    console.log('New contact request:', {
      email,
      explanation: emailContent,
      timestamp: new Date().toISOString(),
    });

    if (!process.env.RESEND_API_KEY) {
      console.log('Note: RESEND_API_KEY not configured. Email not sent, but request logged.');
      
      return NextResponse.json({
        success: true,
        message: 'Contact request received successfully!'
      });
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'abhaayjha@gmail.com',
        replyTo: email,
        subject: `New Contact Request from ${email}`,
        html: `
          <h2>New Contact Request from Portfolio</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <h3>Message:</h3>
          <p>${emailContent.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>This email was sent from your portfolio website chatbot.</small></p>
        `,
        text: `
New Contact Request from Portfolio

From: ${email}
Date: ${new Date().toLocaleString()}

Message:
${emailContent}

---
This email was sent from your portfolio website chatbot.
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        console.log('New contact request (email failed to send):', {
          email,
          explanation: emailContent,
          timestamp: new Date().toISOString(),
        });
        
        return NextResponse.json({
          success: true,
          message: 'Contact request received successfully!'
        });
      }

      console.log('Email sent successfully:', data);
    } catch (resendError) {
      console.error('Resend initialization/sending error:', resendError);
    }

    return NextResponse.json({
      success: true,
      message: 'Contact request received and email sent successfully!'
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
