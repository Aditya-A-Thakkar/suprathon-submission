import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const { title, eventDate, description, contactEmail } = await req.json();

		if (!title || !eventDate || !description || !contactEmail) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Get user ID from token
		const user = await getUserFromToken();
		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const post = await prisma.eventPost.create({
			data: {
				title,
				eventDate: new Date(eventDate),
				description,
				contactEmail,
				userId: user.id,
			},
		});

		return NextResponse.json({ success: true, post });
	} catch (error) {
		console.error('[POST_REQUEST_ERROR]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
