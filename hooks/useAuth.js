import { useState, useEffect } from 'react';

export function useAuth() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// This is a placeholder: replace with actual logic to fetch user from cookie/localStorage or API
		const userData = JSON.parse(localStorage.getItem('user'));
		if (userData) setUser(userData);
	}, []);

	return { user, setUser };
}
