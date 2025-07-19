"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const router = useRouter();
	const pathname = usePathname();

	const fetchUser = async () => {
		const res = await fetch("/api/auth/me");
		if (res.ok) {
			const data = await res.json();
			setUser(data.user);
		} else {
			setUser(null);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [pathname]);

	const login = async (credentials) => {
		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(credentials),
		});
		if (res.ok) {
			await fetchUser();
			router.push("/");
		}
	};

	const logout = async () => {
		await fetch("/api/auth/logout", { method: "POST" });
		setUser(null);
		router.push("/");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
