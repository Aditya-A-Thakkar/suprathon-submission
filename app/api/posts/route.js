import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

const prisma = new PrismaClient();

// GET all approved posts
export async function GET() {
	const posts = await prisma.eventPost.findMany({
		where: { approved: true },
		orderBy: { startDateTime: 'desc' },
		include: {
			postedBy: {
				select: { name: true, email: true },
			},
		},
	});

	return NextResponse.json(posts);
}

// POST a new event post
export async function POST(req) {
	const token = req.cookies.get('token')?.value;
	if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { email } = await verifyJWT(token);
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user)
		return NextResponse.json({ error: 'User not found' }, { status: 404 });

	const {
		title,
		description,
		tag,
		where: location,
		startDateTime,
		endDateTime,
		contactEmail,
	} = await req.json();

	const post = await prisma.eventPost.create({
		data: {
			title,
			description,
			tag,
			where: location,
			startDateTime: new Date(startDateTime),
			endDateTime: new Date(endDateTime),
			contactEmail,
			postedBy: { connect: { id: user.id } },
		},
	});

	return NextResponse.json(post);
}
