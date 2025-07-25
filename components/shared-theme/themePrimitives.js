import { createTheme, alpha } from '@mui/material/styles';

const defaultTheme = createTheme();

const customShadows = [...defaultTheme.shadows];

export const brand = {
  50: '#e6e6ff',     // Very light tint
  100: '#b3b3ff',    // Soft tint
  200: '#8080ff',    // Light Indigo
  300: '#4d4dff',    // Indigo Tint
  400: '#1800ad',    // Vivid Indigo (Base color)
  500: '#14009a',    // Slightly deeper
  600: '#100088',    // Deeper, hover state
  700: '#0c0075',    // Even darker
  800: '#080062',    // Very dark
  900: '#04004f',    // Near-black indigo
};

export const gray = {
	50: '#e6e6ff',     // Very light tint
  100: '#b3b3ff',    // Soft tint
  200: '#8080ff',    // Light Indigo
  300: '#4d4dff',    // Indigo Tint
  400: '#1800ad',    // Vivid Indigo (Base color)
  500: '#14009a',    // Slightly deeper
  600: '#100088',    // Deeper, hover state
  700: '#0c0075',    // Even darker
  800: '#080062',    // Very dark
  900: '#04004f',    // Near-black indigo
};

export const green = {
	50: 'hsl(120, 80%, 98%)',
	100: 'hsl(120, 75%, 94%)',
	200: 'hsl(120, 75%, 87%)',
	300: 'hsl(120, 61%, 77%)',
	400: 'hsl(120, 44%, 53%)',
	500: 'hsl(120, 59%, 30%)',
	600: 'hsl(120, 70%, 25%)',
	700: 'hsl(120, 75%, 16%)',
	800: 'hsl(120, 84%, 10%)',
	900: 'hsl(120, 87%, 6%)',
};

export const orange = {
	50: 'hsl(45, 100%, 97%)',
	100: 'hsl(45, 92%, 90%)',
	200: 'hsl(45, 94%, 80%)',
	300: 'hsl(45, 90%, 65%)',
	400: 'hsl(45, 90%, 40%)',
	500: 'hsl(45, 90%, 35%)',
	600: 'hsl(45, 91%, 25%)',
	700: 'hsl(45, 94%, 20%)',
	800: 'hsl(45, 95%, 16%)',
	900: 'hsl(45, 93%, 12%)',
};

export const red = {
	50: 'hsl(0, 100%, 97%)',
	100: 'hsl(0, 92%, 90%)',
	200: 'hsl(0, 94%, 80%)',
	300: 'hsl(0, 90%, 65%)',
	400: 'hsl(0, 90%, 40%)',
	500: 'hsl(0, 90%, 30%)',
	600: 'hsl(0, 91%, 25%)',
	700: 'hsl(0, 94%, 18%)',
	800: 'hsl(0, 95%, 12%)',
	900: 'hsl(0, 93%, 6%)',
};

export const getDesignTokens = (mode) => {
	customShadows[1] =
		mode === 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px';

	return {
		palette: {
			mode,
			primary: {
				light: brand[200],
				main: brand[400],
				dark: brand[700],
				contrastText: brand[50],
			},
			info: {
				light: brand[100],
				main: brand[300],
				dark: brand[600],
				contrastText: gray[50],
			},
			warning: {
				light: orange[300],
				main: orange[400],
				dark: orange[800],
			},
			error: {
				light: red[300],
				main: red[400],
				dark: red[800],
			},
			success: {
				light: green[300],
				main: green[400],
				dark: green[800],
			},
			grey: {
				...gray,
			},
			divider: mode === alpha(gray[300], 0.4),
			background: {
				default: 'hsl(0, 0%, 99%)',
				paper: 'hsl(220, 35%, 97%)',
			},
			text: {
				primary: gray[800],
				secondary: gray[600],
				warning: orange[400],
			},
			action: {
				hover: alpha(gray[200], 0.2),
				selected: `${alpha(gray[200], 0.3)}`,
			},
		},
		typography: {
			fontFamily: 'Inter, sans-serif',
			h1: {
				fontSize: defaultTheme.typography.pxToRem(48),
				fontWeight: 600,
				lineHeight: 1.2,
				letterSpacing: -0.5,
			},
			h2: {
				fontSize: defaultTheme.typography.pxToRem(36),
				fontWeight: 600,
				lineHeight: 1.2,
			},
			h3: {
				fontSize: defaultTheme.typography.pxToRem(30),
				lineHeight: 1.2,
			},
			h4: {
				fontSize: defaultTheme.typography.pxToRem(24),
				fontWeight: 600,
				lineHeight: 1.5,
			},
			h5: {
				fontSize: defaultTheme.typography.pxToRem(20),
				fontWeight: 600,
			},
			h6: {
				fontSize: defaultTheme.typography.pxToRem(18),
				fontWeight: 600,
			},
			subtitle1: {
				fontSize: defaultTheme.typography.pxToRem(18),
			},
			subtitle2: {
				fontSize: defaultTheme.typography.pxToRem(14),
				fontWeight: 500,
			},
			body1: {
				fontSize: defaultTheme.typography.pxToRem(14),
			},
			body2: {
				fontSize: defaultTheme.typography.pxToRem(14),
				fontWeight: 400,
			},
			caption: {
				fontSize: defaultTheme.typography.pxToRem(12),
				fontWeight: 400,
			},
		},
		shape: {
			borderRadius: 8,
		},
		shadows: customShadows,
	};
};

export const colorSchemes = {
	light: {
		palette: {
			primary: {
				light: brand[500],
				main: brand[700],
				// dark: brand[900],
				contrastText: '#ffffff',
			},
			info: {
				light: brand[100],
				main: brand[300],
				// dark: brand[600],
				contrastText: gray[50],
			},
			warning: {
				light: orange[300],
				main: orange[400],
				// dark: orange[800],
			},
			error: {
				light: red[300],
				main: red[400],
				// dark: red[800],
			},
			success: {
				light: green[300],
				main: green[400],
				// dark: green[800],
			},
			grey: {
				...gray,
			},
			divider: alpha(gray[300], 0.4),
			background: {
				default: 'hsl(0, 0%, 99%)',
				paper: 'hsl(220, 35%, 97%)',
			},
			text: {
				primary: brand[900],
				secondary: brand[600],
				warning: orange[400],
			},
			action: {
				hover: alpha(gray[200], 0.2),
				selected: `${alpha(gray[200], 0.3)}`,
			},
			baseShadow:
				'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
		},
	},
};

export const typography = {
	fontFamily: 'Inter, sans-serif',
	h1: {
		fontSize: defaultTheme.typography.pxToRem(48),
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: -0.5,
	},
	h2: {
		fontSize: defaultTheme.typography.pxToRem(36),
		fontWeight: 600,
		lineHeight: 1.2,
	},
	h3: {
		fontSize: defaultTheme.typography.pxToRem(30),
		lineHeight: 1.2,
	},
	h4: {
		fontSize: defaultTheme.typography.pxToRem(24),
		fontWeight: 600,
		lineHeight: 1.5,
	},
	h5: {
		fontSize: defaultTheme.typography.pxToRem(20),
		fontWeight: 600,
	},
	h6: {
		fontSize: defaultTheme.typography.pxToRem(18),
		fontWeight: 600,
	},
	subtitle1: {
		fontSize: defaultTheme.typography.pxToRem(18),
	},
	subtitle2: {
		fontSize: defaultTheme.typography.pxToRem(14),
		fontWeight: 500,
	},
	body1: {
		fontSize: defaultTheme.typography.pxToRem(14),
	},
	body2: {
		fontSize: defaultTheme.typography.pxToRem(14),
		fontWeight: 400,
	},
	caption: {
		fontSize: defaultTheme.typography.pxToRem(12),
		fontWeight: 400,
	},
};

export const shape = {
	borderRadius: 8,
};

const defaultShadows = [
	'none',
	'var(--template-palette-baseShadow)',
	...defaultTheme.shadows.slice(2),
];

export const shadows = defaultShadows;