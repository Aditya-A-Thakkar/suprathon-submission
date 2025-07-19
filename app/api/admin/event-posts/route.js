import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
	const user = await getUserFromRequest(req);
	if (!user || !(user.role === "ADMIN")) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
	}

	try {
		const posts = await prisma.eventPost.findMany({
			orderBy: { createdAt: 'desc' },
			include: {
				postedBy: { select: { name: true, email: true } },
			},
		});

		return NextResponse.json(posts);
	} catch (err) {
		console.error('[GET /admin/event-posts]', err);
		return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
	}
}
