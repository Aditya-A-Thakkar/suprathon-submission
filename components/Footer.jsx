"use client";
import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				mt: 'auto',
				py: 4,
				backgroundColor: "#f5f5f5",
				borderTop: "1px solid rgba(0, 0, 0, 0.1)", // subtle top border
			}}
		>
			<Container maxWidth="md">
				<Typography
					variant="h6"
					align="center"
					gutterBottom
					sx={{ fontWeight: 600 }}
				>
					Feel free to reach out for any queries.
				</Typography>
				<Typography variant="body1" align="center">
					Contact us at{" "}
					<Link
						href="mailto:shankhadeepg444@gmail.com"
						sx={{ fontStyle: "italic", color: "#1800AD" }}
					>
						shankhadeepg444@gmail.com
					</Link>
				</Typography>
			</Container>
		</Box>
	);
}
