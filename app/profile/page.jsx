'use client';
import React, { useState } from 'react';
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
  Divider,
} from '@mui/material';

export default function ProfileLayout() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const mockUser = {
    name: 'Infectia Z',
    email: 'infectia@example.com',
    role: 'PROVIDER',
  };

  const mockPosts = [
    { id: 1, title: 'Pending Event', status: 'pending' },
    { id: 2, title: 'Approved Event', status: 'approved' },
    { id: 3, title: 'Denied Event', status: 'denied' },
  ];

  const filteredPosts = mockPosts.filter((post) => {
    if (tabIndex === 0) return post.status === 'pending';
    if (tabIndex === 1) return post.status === 'approved';
    return post.status === 'denied';
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {mockUser.name}
          </Typography>
          <Typography color="text.secondary">{mockUser.email}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Role: {mockUser.role}
          </Typography>
        </CardContent>
      </Card>

      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Pending" />
        <Tab label="Accepted" />
        <Tab label="Denied" />
      </Tabs>

      <Stack spacing={2}>
        {filteredPosts.map((post) => (
          <Card key={post.id} variant="outlined">
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              {post.status === 'denied' && (
                <Button color="error" sx={{ mt: 1 }}>
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
    </Container>
  );
}
