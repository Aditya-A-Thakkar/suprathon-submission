import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/login', '/register', '/'];

const getJwtSecretKey = () => {
	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error('JWT_SECRET not set in .env');
	return new TextEncoder().encode(secret);
};

export async function middleware(req) {
	const { pathname } = req.nextUrl;

	// Skip public routes
	if (PUBLIC_ROUTES.includes(pathname)) {
		return NextResponse.next();
	}

	const token = req.cookies.get('token')?.value;

	if (!token) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	try {
		const { payload } = await jwtVerify(token, getJwtSecretKey());

		const role = payload.role.toLowerCase();

		// Only admin can access /admin
		if (pathname.startsWith('/admin') && role !== 'admin') {
			return NextResponse.redirect(new URL('/', req.url));
		}

		// Only admin or provider can access /post-requests
		if (pathname.startsWith('/post-requests') && !['admin', 'provider'].includes(role)) {
			return NextResponse.redirect(new URL('/', req.url));
		}

		return NextResponse.next();
	} catch (err) {
		console.error('JWT verification failed:', err);
		return NextResponse.redirect(new URL('/login', req.url));
	}
}

export const config = {
	matcher: ['/post-requests', '/admin'],
};
