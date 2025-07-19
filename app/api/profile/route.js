import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
	const user = await getUserFromRequest(req);
	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const posts = await prisma.eventPost.findMany({
		where: { userId: user.id },
		orderBy: { createdAt: 'desc' },
	});

	return NextResponse.json({
		user: { name: user.name, email: user.email, role: user.role },
		posts,
	});
}
