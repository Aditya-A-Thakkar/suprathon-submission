import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
	try {
		const user = await getUserFromRequest(req);
		if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const { oldPassword, newPassword } = await req.json();
		const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

		const passwordMatch = await bcrypt.compare(oldPassword, dbUser.password);
		if (!passwordMatch) {
			return NextResponse.json({ error: 'Incorrect old password' }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: { id: user.id },
			data: { password: hashedPassword },
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('[CHANGE_PASSWORD_ERROR]', err);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
