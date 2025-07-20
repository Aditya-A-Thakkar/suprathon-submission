'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Alert,
	CircularProgress,
} from '@mui/material';

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get('token');

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!token) {
			setError('Missing token');
		}
	}, [token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords don't match");
			return;
		}
		setSubmitting(true);
		setError('');
		setSuccess('');

		try {
			const res = await fetch('/api/auth/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, password }),
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Something went wrong');
			}

			setSuccess('Password reset successful! Redirecting to login...');
			setTimeout(() => router.push('/login'), 2500);
		} catch (err) {
			setError(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	if (!token) {
		return (
			<Container maxWidth="sm" sx={{ mt: 8 }}>
				<Alert severity="error">Missing or invalid token.</Alert>
			</Container>
		);
	}

	return (
		<Container maxWidth="sm" sx={{ mt: 8 }}>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
			>
				<Typography variant="h4" fontWeight={600}>
					Reset your password
				</Typography>

				{error && <Alert severity="error">{error}</Alert>}
				{success && <Alert severity="success">{success}</Alert>}

				<TextField
					label="New Password"
					type="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<TextField
					label="Confirm New Password"
					type="password"
					required
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				<Button type="submit" variant="contained" disabled={submitting}>
					{submitting ? <CircularProgress size={24} /> : 'Reset Password'}
				</Button>
			</Box>
		</Container>
	);
}
