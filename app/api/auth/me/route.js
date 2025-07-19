import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const getJwtSecretKey = () => {
	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error('JWT_SECRET not set in .env');
	return new TextEncoder().encode(secret);
};

export async function GET(req) {
	const token = req.cookies.get('token')?.value;
	if (!token) {
		return NextResponse.json({ user: null }, { status: 401 });
	}

	try {
		const { payload } = await jwtVerify(token, getJwtSecretKey());
		return NextResponse.json({ user: payload }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ user: null }, { status: 401 });
	}
}
