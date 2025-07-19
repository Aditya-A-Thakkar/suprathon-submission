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
  Divider,
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
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Skilliton Events & Requests
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems="flex-start"
      >
        {/* Main Content Area */}
        <Box sx={{ flex: 7 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>
        </Box>

        {/* Sidebar */}
        <Box sx={{ flex: 3 }}>
          {/* Upcoming Events */}
          <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Upcoming Events
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List dense>
              {['Hackathon – Aug 5', 'Workshop – Aug 12', 'Seminar – Aug 18'].map((event, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemText primary={event} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Quick Links */}
          <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List dense>
              <ListItem disablePadding>
                <Link href="/post-requests" underline="hover" color="primary">
                  Create a Post
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/faq" underline="hover" color="primary">
                  FAQ
                </Link>
              </ListItem>
            </List>
          </Paper>

          {/* Help Box */}
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Need Help?
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2">
              Reach out at{' '}
              <Link href="mailto:shankhadeepg444@gmail.com" underline="hover">
                shankhadeepg444@gmail.com
              </Link>
            </Typography>
          </Paper>
        </Box>
      </Stack>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={6} mb={8}>
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
