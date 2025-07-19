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
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

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
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component={Link}
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
						>
							{user ? (<MenuItem key="post-request" onClick={handleCloseNavMenu}>
								<Typography sx={{ textAlign: 'center' }}>Request to Post</Typography>
							</MenuItem>) : null}
							{user?.role === "ADMIN" ? (<MenuItem key="admin" onClick={handleCloseNavMenu}>
								<Typography sx={{ textAlign: 'center' }}>Admin Panel</Typography>
							</MenuItem>) : null}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component={Link}
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{user ? (<Button
							key="post-requests"
							onClick={handleCloseNavMenu}
							sx={{
								my: 2,
								color: 'white',
								display: 'block',
								margin: '0 2%',
								position: 'relative',
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
							Request to Post
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
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt="Remy Sharp" src="/public/images/avatar/2.jpg" />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem
											key={setting.label}
											onClick={async () => {
												handleCloseUserMenu();
												if (setting.action === 'logout') {
													await logout();
												} else if (setting.path) {
													router.push(setting.path);
												}
											}}
										>
											<Typography textAlign="center">{setting.label}</Typography>
										</MenuItem>
									))}
								</Menu>
							</>
						) : (
							<>
								<Button
									component={Link}
									href="/login"
									sx={{ color: 'white', textTransform: 'none', mr: 1 }}
								>
									Login
								</Button>
								<Button
									component={Link}
									href="/register"
									variant="outlined"
									sx={{ color: 'white', borderColor: 'white', textTransform: 'none' }}
								>
									Register
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
