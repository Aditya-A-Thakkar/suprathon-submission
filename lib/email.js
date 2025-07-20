import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(to, token) {
	const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev>', // Set your verified sender
		to,
		subject: 'Reset your password',
		html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
	});
}
