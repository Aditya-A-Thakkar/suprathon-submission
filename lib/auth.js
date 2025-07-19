import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
	return await bcrypt.compare(password, hash);
}

export async function createJWT(payload) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(secret);
}

export async function verifyJWT(token) {
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload;
	} catch (e) {
		throw new Error('Invalid token');
	}
}

export async function getUserFromToken() {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('token')?.value;
		if (!token) return null;
		const decoded = await verifyJWT(token);
		return decoded;
	} catch {
		return null;
	}
}

export async function getUserFromRequest(req) {
	try {
		const cookieHeader = req.headers.get('cookie') || '';
		const token = cookieHeader
			.split(';')
			.map(c => c.trim())
			.find(c => c.startsWith('token='))
			?.split('=')[1];

		if (!token) return null;
		const decoded = await verifyJWT(token);
		return decoded;
	} catch {
		return null;
	}
}
