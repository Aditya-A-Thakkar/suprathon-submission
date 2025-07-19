'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Link,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Stack,
} from '@mui/material';
import PostCard from '@/components/postcard';

export default function PostRequestPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error loading posts:', err));
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);
  const handlePageChange = (_, value) => setPage(value);

  if (!posts.length) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      {/* Main layout */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="flex-start"
        spacing={4}
        sx={{ width: '100%' }}
      >
        {/* Posts section - 70% */}
        <Box sx={{ flex: 7 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 4,
            }}
          >
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>
        </Box>

        {/* Sidebar section - 30% */}
        <Box sx={{ flex: 3 }}>
          {/* Help */}
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Help
            </Typography>
            <Typography variant="body1">
              Reach out at{' '}
              <Link href="mailto:shankhadeepg444@gmail.com">
                shankhadeepg444@gmail.com
              </Link>
            </Typography>
          </Paper>

          {/* Events */}
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List dense>
              {['Hackathon – Aug 5', 'Workshop – Aug 12', 'Seminar – Aug 18'].map((event, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemText primary={event} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Quick Links */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <Link href="post-requests" underline="hover">Create a Post</Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/faq" underline="hover">FAQ</Link>
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Stack>

      {/* Pagination below all */}
      <Box display="flex" justifyContent="center" mt={6}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="large"
        />
      </Box>
    </Container>
  );
}
