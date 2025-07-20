import { PrismaClient } from '@prisma/client';
import { verifyPassword, createJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const { email, password, rememberMe } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
		}

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const valid = await verifyPassword(password, user.password);
		if (!valid) {
			return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const token = await createJWT({ id: user.id, email: user.email, role: user.role }, rememberMe);

		const res = NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
		res.cookies.set('token', token, {
			httpOnly: true,
			path: '/',
			maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60,
		});

		return res;
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 400 });
	}
}
