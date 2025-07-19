'use client';

import { useState } from 'react';
import {
	Dialog, DialogTitle, DialogContent, DialogActions,
	Button, TextField, Typography, CircularProgress
} from '@mui/material';

export default function ForgotPasswordModal({ open, onClose }) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const handleSubmit = async () => {
		setLoading(true);
		setSuccessMsg('');
		setErrorMsg('');

		try {
			const res = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message || 'Something went wrong');
			setSuccessMsg(data.message || 'Check your email for a reset link');
		} catch (err) {
			setErrorMsg(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Forgot Password</DialogTitle>
			<DialogContent>
				<Typography variant="body2" mb={2}>
					Enter your email to receive a password reset link.
				</Typography>
				<TextField
					fullWidth
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					margin="normal"
				/>
				{loading && <CircularProgress size={24} />}
				{successMsg && <Typography color="success.main">{successMsg}</Typography>}
				{errorMsg && <Typography color="error.main">{errorMsg}</Typography>}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" onClick={handleSubmit} disabled={loading || !email}>
					Send Link
				</Button>
			</DialogActions>
		</Dialog>
	);
}
