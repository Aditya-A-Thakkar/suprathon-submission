import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

const prisma = new PrismaClient();

// GET all approved posts
export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const page = parseInt(searchParams.get('page') || '10');
	const limit = parseInt(searchParams.get('limit') || '4');
	const sortBy = parseInt(searchParams.get('sort') || '0');

	const posts = await prisma.eventPost.findMany({
		where: { approved: true },
		orderBy: sortBy === 1 ? { startDateTime: 'asc' } : { createdAt: 'desc' },
		skip: (page - 1) * limit,
		take: limit,
		include: {
			postedBy: {
				select: { name: true, email: true },
			},
		},
	});
	const totalCount = await prisma.eventPost.count({ where: { approved: true } });

	return NextResponse.json({ posts, totalCount });
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

export async function DELETE(req) {
	const token = req.cookies.get('token')?.value;
	if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { email } = await verifyJWT(token);
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user)
		return NextResponse.json({ error: 'User not found' }, { status: 404 });

	const { id } = await req.json();

	// Verify post belongs to the user
	const post = await prisma.eventPost.findUnique({ where: { id } });

	if (!post || post.userId !== user.id) {
		return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
	}

	await prisma.eventPost.delete({ where: { id } });

	return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
}
