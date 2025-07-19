import ResponsiveAppBar from "@/components/navbar";
import AppTheme from "@/components/shared-theme/AppTheme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/hooks/useAuth";
import Footer from "@/components/Footer";
import "./globals.css";
import { Box } from '@mui/material';

export const metadata = {
	title: "Eventory",
	description: "Post your events and stay in touch with the most upcoming events",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" style={{ colorScheme: "light only" }}>
			<head>
				<meta name="color-scheme" content="light only"/>
			</head>
			<body>
				<AuthProvider>
					<AppRouterCacheProvider options={{ enableCssLayer: true }}>
						<AppTheme>
							<CssBaseline />
							<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
								<ResponsiveAppBar />
								<Box component="main" sx={{ flex: 1 }}>
									{children}
								</Box>
								<Footer />
							</Box>
						</AppTheme>
					</AppRouterCacheProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
