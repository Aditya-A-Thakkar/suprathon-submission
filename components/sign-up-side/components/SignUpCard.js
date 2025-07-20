import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/components/SnackbarProvider";

const Card = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	[theme.breakpoints.up('sm')]: {
		width: '450px',
	},
	...theme.applyStyles('dark', {
		boxShadow:
			'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
	}),
}));

export default function SignUpCard() {
	const router = useRouter();
	const showSnackbar = useSnackbar();
	const [emailError, setEmailError] = React.useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (emailError || passwordError) {
			event.preventDefault();
			return;
		}
		const data = new FormData(event.currentTarget);
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, password }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				// alert(errorData.error || 'Registration failed');
				showSnackbar(errorData.error || 'Registration failed.', 'error');
				return;
			}

			router.push('/login');
		} catch (err) {
			console.error(err);
			// alert('Something went wrong!');
			showSnackbar('Something went wrong', 'error');
		}
	};

	const validateInputs = () => {
		const email = document.getElementById('email');
		const password = document.getElementById('password');

		let isValid = true;

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true);
			setEmailErrorMessage('Please enter a valid email address.');
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage('');
		}

		if (!password.value || password.value.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage('Password must be at least 6 characters long.');
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage('');
		}

		return isValid;
	};

	return (
		<Card variant="outlined">
			<Typography
				component="h1"
				variant="h4"
				sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
			>
				Register
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
			>
				<FormControl>
					<FormLabel htmlFor="name">Name</FormLabel>
					<TextField
						id="name"
						type="text"
						name="name"
						placeholder="Name"
						autoComplete="name"
						autoFocus
						required
						fullWidth
						variant="outlined"
						color='primary'
						sx={{ '& .MuiInputBase-input::placeholder': {
							color: 'gray',
							opacity: 1,
						} }}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="email">Email</FormLabel>
					<TextField
						error={emailError}
						helperText={emailErrorMessage}
						id="email"
						type="email"
						name="email"
						placeholder="your@email.com"
						autoComplete="email"
						autoFocus
						required
						fullWidth
						variant="outlined"
						color={emailError ? 'error' : 'primary'}
						sx={{ '& .MuiInputBase-input::placeholder': {
							color: 'gray',
							opacity: 1,
						}}}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="password">Password</FormLabel>
					<TextField
						error={passwordError}
						helperText={passwordErrorMessage}
						name="password"
						placeholder="••••••"
						type="password"
						id="password"
						autoComplete="current-password"
						autoFocus
						required
						fullWidth
						variant="outlined"
						color={passwordError ? 'error' : 'primary'}
						sx={{ '& .MuiInputBase-input::placeholder': {
							color: 'gray',
							opacity: 1,
						}}}
					/>
				</FormControl>
				<Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
					Register
				</Button>
				<Typography sx={{ textAlign: 'center' }}>
					Already have an account?{' '}
					<span>
            <MuiLink
	            component={NextLink}
	            href="/login"
	            variant="body2"
	            sx={{ alignSelf: 'center' }}
            >
              Login
            </MuiLink>
          </span>
				</Typography>
			</Box>
		</Card>
	);
}