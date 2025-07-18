'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';


export default function AdminEventPage() {
  const [eventPosts, setEventPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const USE_MOCK = true; // Toggle this

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (USE_MOCK) {
          // 🧪 MOCK event posts
          const mock = [
            {
              id: '1',
              title: 'AI Seminar',
              description: 'An insightful seminar on AI trends. lorem ipsum dolor sit amet, consectetur adipiscing elit. aaaaaaaaaaaaaaaaaaaaaa nnnnnnnnnnnnnnnnnnnn gwyhkjsfuydihlsfgucdhbkxjdhvd aufwvtguhidqvcgwidbjksbvciywgvhusba bxqsiufvwgdbhxnsgvbdwhnxbdw gvechbdwvgfybhcdnbvgfhebdjnfb',
              eventDate: new Date().toISOString(),
              contactEmail: 'ai@event.com',
              approved: false,
              userId: 'u1',
              postedBy: { name: 'Alice', email: 'alice@example.com' },
            },
            {
              id: '2',
              title: 'Math Symposium',
              description: 'Advanced topics in combinatorics.',
              eventDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
              contactEmail: 'math@event.com',
              approved: false,
              userId: 'u2',
              postedBy: { name: 'Bob', email: 'bob@example.com' },
            },
          ];
          await new Promise(r => setTimeout(r, 500));
          setEventPosts(mock);
        } else {
          const res = await fetch('/api/admin/event-posts');
          const data = await res.json();
          setEventPosts(data);
        }
      } catch (err) {
        console.error('Fetch failed', err);
        setSnackbar({ open: true, message: 'Error loading event posts', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [USE_MOCK]);

  const handleAction = async (id, action) => {
    try {
      if (USE_MOCK) {
        setEventPosts(prev => prev.filter(p => p.id !== id));
        setSnackbar({ open: true, message: `Mock ${action} successful`, severity: 'info' });
      } else {
        const res = await fetch(`/api/admin/event-posts/${action}`, {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error(`${action} failed`);
        setEventPosts(prev => prev.filter(p => p.id !== id));
        setSnackbar({ open: true, message: `Event ${action}ed`, severity: 'success' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Event Approval
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2} alignItems="center">
          {eventPosts.length === 0 ? (
            <Typography>No pending events.</Typography>
          ) : (
            eventPosts.map(post => (
              <Card key={post.id} variant="outlined" sx={{ width: "40%" }} >
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {post.title}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <PersonIcon fontSize="small" />
                        <Typography variant="body2">
                        {post.postedBy?.name || 'Unknown User'}
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <EventIcon fontSize="small" />
                        <Typography variant="body2">
                        {new Date(post.eventDate).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                        })}
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <EmailIcon fontSize="small" />
                        <Typography variant="body2">{post.contactEmail}</Typography>
                    </Stack>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {post.description}
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAction(post.id, 'approve')}
                        >
                        Approve
                        </Button>
                        <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleAction(post.id, 'delete')}
                        >
                        Delete
                        </Button>
                    </Stack>
                    </CardContent>

              </Card>
            ))
          )}
        </Stack>
      )}

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
    </Box>
  );
}
