import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const {
			title,
			eventDate,
			startTime,
			endTime,
			description,
			contactEmail,
			type,
			where
		} = await req.json();

		if (
			!title ||
			!eventDate ||
			!startTime ||
			!endTime ||
			!description ||
			!contactEmail ||
			!type ||
			!where
		) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Combine eventDate with time fields into full ISO strings
		const startDateTime = new Date(`${eventDate}T${startTime}`);
		const endDateTime = new Date(`${eventDate}T${endTime}`);

		// Get user ID from token
		const user = await getUserFromToken();
		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const post = await prisma.eventPost.create({
			data: {
				title,
				description,
				contactEmail,
				type,
				where,
				startDateTime,
				endDateTime,
				userId: user.id,
			},
		});

		return NextResponse.json({ success: true, post });
	} catch (error) {
		console.error('[POST_REQUEST_ERROR]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
