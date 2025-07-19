import { Container, Paper, Typography, Box, Link } from '@mui/material';

export default function PostCard({ post }) {
	const { title, description, contactEmail, postedBy, startDateTime } = post;

	return (
		<Box sx={{ mt: 5, mb: 5, width: '100%' }}>
			<Paper elevation={3} sx={{ p: 5, borderRadius: 4, maxWidth: '100%'}}>
				<Typography variant="h4" align="center" gutterBottom sx={{ color: '#1800AD', fontWeight: 'bold' }}>
					{title}
				</Typography>

				<Typography variant="h6" align="center" gutterBottom sx={{ color: 'text.secondary', mb: 5 }}>
					Author –{' '}
					<Box component="span" sx={{ color: '#1800AD', fontWeight: 700 }}>
						{postedBy?.name ?? 'Unknown'}
					</Box>
				</Typography>

				<Box sx={{ borderLeft: 4, borderColor: '#1800AD', pl: 3, my: 4 }}>
					<Typography variant="body1" sx={{ fontSize: '1.15rem', lineHeight: 1.8 }}>
						{description}
					</Typography>
				</Box>

				<Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
					Contact: <Link href={`mailto:${contactEmail}`} underline="hover" sx ={{color: "primary.main", fontStyle: "italic"}}>{contactEmail}</Link><br/>
					Event Date: <Box component="span" sx={{ fontWeight: 'bold' }}>{new Date(startDateTime).toLocaleString()}</Box>
				</Typography>
			</Paper>
		</Box>
	);
}
