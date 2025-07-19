"use client";

import React from "react";
import Link from "next/link";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const navButtonStyles = {
	my: 2,
	color: 'white',
	display: 'block',
	margin: '0 2%',
	position: 'relative',
	textTransform: 'none',
	fontSize: '1rem',
	fontWeight: 500,
	fontFamily: 'inherit',
	'&:after': {
		content: '""',
		position: 'absolute',
		width: 0,
		height: '2px',
		bottom: 0,
		left: 0,
		backgroundColor: 'white',
		transition: 'width 0.3s',
	},
	'&:hover': {
		backgroundColor: 'transparent',
	},
	'&:hover:after': {
		width: '100%',
	},
};


const settings = [
	{ label: 'Profile', path: '/profile' },
	{ label: 'Account', path: '/account' },
	{ label: 'Dashboard', path: '/dashboard' },
	{ label: 'Logout', action: 'logout' }
];

function ResponsiveAppBar() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};


	return (
		<AppBar position="static">
			<Container maxWidth="xl" sx={{ backgroundColor: '#1800AD' }}>
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component={Link}
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', sm: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						EVENTORY
					</Typography>

					{user ? <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
							disableScrollLock
						>
							<MenuItem key="post-request" onClick={handleCloseNavMenu}>
								<Typography component={Link} href="/post-requests" sx={{ textAlign: 'center', textDecoration: 'none', color: 'black' }}>Request to Post</Typography>
							</MenuItem>
							{user?.role === "ADMIN" ? (<MenuItem key="admin" onClick={handleCloseNavMenu}>
								<Typography component={Link} href="/admin" sx={{ textAlign: 'center', textDecoration: 'none', color: 'black' }}>Admin Panel</Typography>
							</MenuItem>) : null}
						</Menu>
					</Box> : null}
					<AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1, ml: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component={Link}
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'flex', sm: 'none' },
							visibility: 'hidden',
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '1.5rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Eventory
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
						{user ? (<Button
							key="post-requests"
							onClick={handleCloseNavMenu}
							sx={{
								my: 2,
								color: 'white',
								display: 'block',
								margin: '0 2%',
								position: 'relative',
								fontSize: { sm: '.9rem', md: '1.05rem' },
								fontWeight: 500,
								fontFamily: 'inherit',
								alignContent: 'center',
								'&:after': {
									content: '""',
									position: 'absolute',
									width: 0,
									height: '2px',
									bottom: 0,
									left: 0,
									backgroundColor: 'white',
									transition: 'width 0.3s',
								},
								'&:hover': {
									backgroundColor: 'transparent',
								},
								'&:hover:after': {
									width: '100%',
								},
							}}
							component={Link}
							href="/post-requests"
						>
							Post Requests
						</Button>) : null}
						{user?.role === "ADMIN" ? (<Button
							key="admin"
							onClick={handleCloseNavMenu}
							sx={{
								my: 2,
								color: 'white',
								display: 'block',
								margin: '0 2%',
								position: 'relative',
								fontSize: { sm: '.9rem', md: '1.05rem' },
								fontWeight: 500,
								fontFamily: 'inherit',
								alignContent: 'center',
								'&:after': {
									content: '""',
									position: 'absolute',
									width: 0,
									height: '2px',
									bottom: 0,
									left: 0,
									backgroundColor: 'white',
									transition: 'width 0.3s',
								},
								'&:hover': {
									backgroundColor: 'transparent',
								},
								'&:hover:after': {
									width: '100%',
								},
							}}
							component={Link}
							href="/admin"
						>
							Admin Panel
						</Button>) : null}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						{user ? (
							<>
								<Box sx={{ display: 'flex', gap: 2 }}>
								<Button
									component={Link}
									href="/profile"
									sx={{ color: 'white', 
										textTransform: 'none',
										fontSize: { sm: '.9rem', md: '1.05rem' },
										fontWeight: 500,
										alignContent: 'center',
										'&:after': {
											content: '""',
											position: 'absolute',
											width: 0,
											height: '2px',
											bottom: 0,
											left: 0,
											backgroundColor: 'white',
											transition: 'width 0.3s',
										},
										'&:hover': {
											backgroundColor: 'transparent',
										},
										'&:hover:after': {
											width: '100%',
										} 
									}}
								>
									Profile
								</Button>
								<Button
									onClick={logout}
									sx={{ color: 'white', 
										textTransform: 'none',
										fontSize: { sm: '.9rem', md: '1.05rem' },
										fontWeight: 500,
										alignContent: 'center',
										'&:after': {
											content: '""',
											position: 'absolute',
											width: 0,
											height: '2px',
											bottom: 0,
											left: 0,
											backgroundColor: 'white',
											transition: 'width 0.3s',
										},
										'&:hover': {
											backgroundColor: 'transparent',
										},
										'&:hover:after': {
											width: '100%',
										},
									}}
								>
									Logout
								</Button>
								</Box>
							</>
						) : (
							<>
								<Button
									component={Link}
									href="/login"
									sx={{ color: 'white', 
										textTransform: 'none',
										fontSize: '1.05rem',
										fontWeight: 500,
										'&:after': {
											content: '""',
											position: 'absolute',
											width: 0,
											height: '2px',
											bottom: 0,
											left: 0,
											backgroundColor: 'white',
											transition: 'width 0.3s',
										},
										'&:hover': {
											backgroundColor: 'transparent',
										},
										'&:hover:after': {
											width: '100%',
										},
									}}
								>
									Are you a provider? Click here to login
								</Button>
							</>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
