import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
	const user = await getUserFromRequest(req);
	if (!user || !(user.role === "ADMIN")) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
	}

	const { id } = await req.json();

	try {
		await prisma.eventPost.delete({
			where: { id },
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('[POST /admin/delete]', err);
		return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
	}
}
