import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { sendResetEmail } from '@/lib/email'; // implement this later

export async function POST(req) {
	const { email } = await req.json();

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		return NextResponse.json({ message: 'If account exists, email sent.' });
	}

	const token = uuidv4();
	const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 mins

	await prisma.forgotPasswordToken.create({
		data: {
			token,
			userId: user.id,
			expiresAt,
		},
	});

	await sendResetEmail(user.email, token); // implement this

	return NextResponse.json({ message: 'If account exists, email sent.' });
}
