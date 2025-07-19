import { useColorScheme } from '@mui/material/styles';
import { useEffect } from "react";

export default function ColorModeSelect(props) {
	const { mode, setMode } = useColorScheme();
	useEffect(() => setMode('light'), [mode, setMode]);
	return null;
}