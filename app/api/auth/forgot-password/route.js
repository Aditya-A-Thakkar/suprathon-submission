import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
	const { email, token } = await req.json();

	const resetUrl = `https://eventory-x-dbd.vercel.app/reset-password?token=${token}`;

	try {
		await resend.emails.send({
			from: 'Your Name <onboarding@resend.dev>', // Or a verified domain
			to: [email],
			subject: 'Reset your password',
			html: `<p>Click the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
		});
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ message: 'Failed to send email' }), { status: 500 });
	}
}
