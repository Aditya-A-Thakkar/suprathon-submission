import { useEffect, useState } from 'react';

export function useAuth() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch('/api/auth/me');
				if (res.ok) {
					const data = await res.json();
					setUser(data.user);
				}
			} catch (err) {
				console.error('Auth check failed', err);
			}
		};

		fetchUser();
	}, []);

	return { user, setUser };
}
