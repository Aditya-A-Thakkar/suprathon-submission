import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
	const posts = await prisma.eventPost.findMany({
		where: { approved: true },
		orderBy: { startDateTime: 'desc' },
		include: { postedBy: { select: { name: true, email: true } } },
	});

	return NextResponse.json(posts);
}

export async function POST(req) {
	const token = req.cookies.get('token')?.value;
	if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { email } = await verifyJWT(token);
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user)
		return NextResponse.json({ error: 'User not found' }, { status: 404 });

	const { title, description, eventDate, contactEmail } = await req.json();

	const post = await prisma.eventPost.create({
		data: {
			title,
			description,
			eventDate: new Date(eventDate),
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
