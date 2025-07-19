import { Container, Paper, Typography, Box, Link } from '@mui/material';

export default function PostCard({ post }) {
	const { title, description, contactEmail, postedBy, eventDate } = post;

	return (
		<Container sx={{ maxWidth: '1000px', mt: 10, mb: 12 }}>
			<Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
				<Typography variant="h4" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
					{title}
				</Typography>

				<Typography variant="h6" align="center" gutterBottom sx={{ color: 'text.secondary', mb: 5 }}>
					Author –{' '}
					<Box component="span" sx={{ color: 'primary.dark', fontWeight: 700 }}>
						{postedBy?.name ?? 'Unknown'}
					</Box>
				</Typography>

				<Box sx={{ borderLeft: 4, borderColor: 'primary.light', pl: 3, my: 4 }}>
					<Typography variant="body1" sx={{ fontSize: '1.15rem', lineHeight: 1.8 }}>
						{description}
					</Typography>
				</Box>

				<Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
					Contact: <Link href={`mailto:${contactEmail}`} underline="hover">{contactEmail}</Link><br/>
					Event Date: {new Date(eventDate).toLocaleDateString()}
				</Typography>
			</Paper>
		</Container>
	);
}
