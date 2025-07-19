export async function sendResetEmail(to, token) {
	const resetUrl = `https://your-site.vercel.app/reset-password?token=${token}`;

	// Replace this with your actual email API
	console.log(`Send reset link to ${to}: ${resetUrl}`);
}
