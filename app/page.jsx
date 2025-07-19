'use client';

import { useState, useEffect } from 'react';
import { Container,
          Grid,
          CircularProgress,
          Paper,
          Typography,
          Box,
          Link,
          List,
          ListItem,
          ListItemText } from '@mui/material';
import PostCard from "@/components/postcard";

export default function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('/api/posts')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        })
        .catch((err) => console.error('Error loading posts:', err));
  }, []);

  if (!posts) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
			<Grid container spacing={4} alignItems="flex-start">
				{/* Left Section: Posts */}
				<Grid item xs={12} md={9}>
					{posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</Grid>

				{/* Right Section: Help and Upcoming Events */}
				<Grid item xs={12} md={3}>
					{/* Help Box */}
					<Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
						<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
							Help
						</Typography>
						<Typography variant="body1">
							Reach out at{' '}
							<Link
								href="mailto:shankhadeepg444@gmail.com"
								sx={{ fontStyle: 'italic', color: 'primary.main' }}
							>
								shankhadeepg444@gmail.com
							</Link>
						</Typography>
					</Paper>

					{/* Upcoming Events Box */}
					<Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
						<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
							Upcoming Events
						</Typography>
						<List dense>
							{["Hackathon - Aug 5", "Workshop - Aug 12", "Seminar - Aug 18"].map((event, idx) => (
								<ListItem key={idx} disablePadding>
									<ListItemText primary={event} />
								</ListItem>
							))}
						</List>
					</Paper>
				</Grid>
			</Grid>
		</Container>
  );
}
