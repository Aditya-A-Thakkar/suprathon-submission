'use client';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
	Snackbar,
	Alert,
} from '@mui/material';
import { useState } from 'react';

export default function ChangePassword({ open, onClose }) {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

	const handleClose = () => {
		setOldPassword('');
		setNewPassword('');
		onClose();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (newPassword.length < 6) {
			setSnackbar({ open: true, message: 'Password must be at least 6 characters', severity: 'error' });
			setLoading(false);
			return;
		}

		try {
			const res = await fetch('/api/auth/change-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ oldPassword, newPassword }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || 'Password update failed');

			setSnackbar({ open: true, message: 'Password updated successfully', severity: 'success' });
			handleClose();
		} catch (err) {
			setSnackbar({ open: true, message: err.message, severity: 'error' });
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Change Password</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						<TextField
							label="Old Password"
							type="password"
							fullWidth
							required
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
						/>
						<TextField
							label="New Password"
							type="password"
							fullWidth
							required
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit" variant="contained" disabled={loading}>
							{loading ? 'Updating...' : 'Update'}
						</Button>
					</DialogActions>
				</Box>
			</Dialog>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
			>
				<Alert
					severity={snackbar.severity}
					onClose={() => setSnackbar({ ...snackbar, open: false })}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
}
