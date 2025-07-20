import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ForgotPassword({ open, handleClose }) {
	const [email, setEmail] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const res = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || 'Something went wrong');

			setSnackbar({ open: true, message: 'Reset link sent if email exists.', severity: 'success' });
			handleClose();
			setEmail('');
		} catch (err) {
			setSnackbar({ open: true, message: err.message, severity: 'error' });
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: handleSubmit,
						sx: { backgroundImage: 'none' },
					},
				}}
			>
				<DialogTitle>Reset password</DialogTitle>
				<DialogContent
					sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
				>
					<DialogContentText>
						Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
					</DialogContentText>
					<OutlinedInput
						autoFocus
						required
						margin="dense"
						id="email"
						name="email"
						placeholder="Email address"
						type="email"
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</DialogContent>
				<DialogActions sx={{ pb: 3, px: 3 }}>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant="contained" type="submit" disabled={loading}>
						{loading ? 'Sending...' : 'Continue'}
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={5000}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
			>
				<Alert severity={snackbar.severity} sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
}

ForgotPassword.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default ForgotPassword;