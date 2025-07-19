import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
	const { email } = await req.json();

	if (!email) {
		return NextResponse.json({ message: 'Email is required' }, { status: 400 });
	}

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		return NextResponse.json({ message: 'User not found' }, { status: 404 });
	}

	// Clean up existing tokens
	await prisma.forgotPasswordToken.deleteMany({
		where: {
			userId: user.id,
		},
	});

	const token = crypto.randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 mins

	await prisma.forgotPasswordToken.create({
		data: {
			token,
			userId: user.id,
			expiresAt,
		},
	});

	const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_FROM,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	await transporter.sendMail({
		from: process.env.EMAIL_FROM,
		to: email,
		subject: 'Reset your password',
		html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
	});

	return NextResponse.json({ message: 'Reset link sent if email exists.' });
}
