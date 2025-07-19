import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
	const { token, newPassword } = await req.json();

	const tokenRecord = await prisma.forgotPasswordToken.findUnique({ where: { token } });

	if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
		return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
	}

	const hashedPassword = await hash(newPassword, 10);

	await prisma.user.update({
		where: { id: tokenRecord.userId },
		data: { password: hashedPassword },
	});

	await prisma.forgotPasswordToken.delete({ where: { token } });

	return NextResponse.json({ message: 'Password updated successfully' });
}
