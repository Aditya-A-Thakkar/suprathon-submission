import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	const now = new Date();

	const deleted = await prisma.eventPost.deleteMany({
		where: {
			eventDate: { lt: now },
		},
	});

	console.log(`[CRON] Deleted ${deleted.count} expired events at ${now}`);
	return NextResponse.json({
		message: `Deleted ${deleted.count} expired event(s).`,
	});
}
