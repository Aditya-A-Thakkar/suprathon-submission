import { PrismaClient } from '@prisma/client';
import { hashPassword, createJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
	const { email, password, name } = await req.json();

	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
	}

	const hashed = await hashPassword(password);
	const user = await prisma.user.create({
		data: {
			email,
			password: hashed,
			name,
		},
	});

	const token = await createJWT({ email: user.email, role: user.role });

	const res = NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
	res.cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	});

	return res;
}
