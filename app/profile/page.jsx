'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import ChangePassword from "@/components/ChangePassword";

export default function ProfileLayout() {
  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        setUser(data.user);
        setPosts(data.posts);
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (tabIndex === 0) return post.approved === false;
    return post.approved === true;
  });

  if (loading) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
          <CircularProgress />
        </Box>
    );
  }

    const handleDelete = async (id) => {
        try {
            const res = await fetch('/api/posts', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Delete failed');
            setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
            setSnackbar({ open: true, message: 'Event deleted', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: err.message, severity: 'error' });
        }
    };

  return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        {user && (
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography color="text.secondary">{user.email}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Role: {user.role}
                </Typography>
              </CardContent>
            </Card>
        )}

        <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 2 }}>
          <Tab label="Pending" />
          <Tab label="Accepted" />
          {/*<Tab label="Denied" />*/}
        </Tabs>

        <Stack spacing={2}>
          {filteredPosts.map((post) => (
              <Card key={post.id} variant="outlined">
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {post.description}
                  </Typography>
                  {post.approved === false && (
                      <Button color="error" onClick={() => handleDelete(post.id)} sx={{ mt: 1 }}>
                        Delete
                      </Button>
                  )}
                </CardContent>
              </Card>
          ))}

          {filteredPosts.length === 0 && (
              <Typography variant="body2" color="text.secondary" align="center">
                No {['pending', 'accepted', 'denied'][tabIndex]} requests.
              </Typography>
          )}
        </Stack>

        <Button variant="outlined" onClick={() => setChangePasswordOpen(true)} sx={{ mt: 3, mb: 1 }}>
          Change Password
        </Button>
        <ChangePassword open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} />

        <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
              severity={snackbar.severity}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
  );
}
