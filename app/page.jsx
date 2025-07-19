'use client';

import { useState, useEffect } from 'react';
import { Container, CircularProgress } from '@mui/material';
import PostCard from "@/components/postcard";

export default function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('/api/posts')
        .then((res) => res.json())
        .then(setPosts)
        .catch((err) => console.error('Error loading posts:', err));
  }, []);

  if (!posts) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Container>
      {posts.map((post) => (
          <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
}
