'use client';
import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarContext = createContext((message, severity) => {});

export function useSnackbar() {
	return useContext(SnackbarContext);
}

export const SnackbarProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

	const showSnackbar = (msg, sev = 'info') => {
		setMessage(msg);
		setSeverity(sev);
		setOpen(true);
	};

	return (
		<SnackbarContext.Provider value={showSnackbar}>
			{children}
			<Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
				<MuiAlert severity={severity} onClose={() => setOpen(false)} sx={{ width: '100%' }} elevation={6} variant="filled">
					{message}
				</MuiAlert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};
