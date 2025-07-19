'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Stack,
  Divider,
} from '@mui/material';
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import PostCard from '@/components/postcard';

export default function PostRequestPage() {
  const [posts, setPosts] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    // Main paginated posts
    fetch(`/api/posts?page=${page}&limit=${postsPerPage}`)
        .then(res => res.json())
        .then(data => {
          setPosts(data.posts);
          setTotalPosts(data.totalCount);
        });

    // Sidebar: upcoming events (max 10)
    fetch(`/api/posts?page=1&limit=10&sort=1`)
        .then(res => res.json())
        .then(data => setUpcoming(data.posts));
  }, [page]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const handlePageChange = (_, value) => setPage(value);

  if (!posts.length) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Eventory Events
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems="flex-start"
      >
        {/* Main Content Area */}
        <Box sx={{ flex: 7 }} width={{xs: "100%", md: "50%"}}>
          <Box display="flex" flexDirection="column" gap={2}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>
        </Box>

        {/* Sidebar */}
        <Box display={{ xs: 'none', md: 'flex' }} flexDirection="column">
          {/* Upcoming Events */}
          <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Upcoming Events
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List dense>
              {upcoming.map((event, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemText
                        primary={`${event.title} – ${new Date(event.startDateTime).toLocaleDateString()}`}
                    />
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
                <MuiLink component={NextLink} href="/post-requests" underline="hover" color="primary">
                  Create a Post
                </MuiLink>
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
              <MuiLink component={NextLink} href="mailto:shankhadeepg444@gmail.com" underline="hover" fontStyle="italic" color="#1800AD">
                shankhadeepg444@gmail.com
              </MuiLink>
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
