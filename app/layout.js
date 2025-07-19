import ResponsiveAppBar from "@/components/navbar";
import AppTheme from "@/components/shared-theme/AppTheme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/hooks/useAuth";
import Footer from "@/components/Footer";

export const metadata = {
	title: "Eventory",
	description: "Post your events and stay in touch with the most upcoming events",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<AppRouterCacheProvider options={{ enableCssLayer: true }}>
						<AppTheme>
							<CssBaseline />
							<ResponsiveAppBar />
							{children}
							<Footer />
						</AppTheme>
					</AppRouterCacheProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
