import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER, // Your Gmail email address
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // Your App Password from Gmail
    },
});

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, message } = data;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        const mailOptions = {
            from: email, // sender's email (from form input)
            to: process.env.NEXT_PUBLIC_EMAIL_USER, // your email address
            subject: `Message from ${name}`,
            text: message,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            message:
                "Message Sent. We've received your message and will get back to you soon!",
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
