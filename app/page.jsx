'use client';

import { Box, Container, Typography, Paper, Link, Stack } from '@mui/material';

export default function Home() {
  return (
    <Container sx={{ maxWidth: '1000px', mt: 10, mb: 12 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
        {/* Title */}
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ color: 'primary.main', fontWeight: 'bold' }}
        >
          Understanding Segment Trees – A Beginner’s Guide
        </Typography>

        {/* Authors */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: 'text.secondary', mb: 5 }}
        >
          Authors –{' '}
          <Box component="span" sx={{ color: 'primary.dark', fontWeight: 700 }}>
            XYz
          </Box>{' '}
          ,{' '}
          <Box component="span" sx={{ color: 'primary.dark', fontWeight: 700 }}>
            rgsr
          </Box>
        </Typography>

        {/* Description with left border */}
        <Box
          sx={{
            borderLeft: 4,
            borderColor: 'primary.light',
            pl: 3,
            my: 4,
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontSize: '1.15rem', lineHeight: 1.8 }}
          >
            Segment Trees are powerful data structures used to perform range queries and updates efficiently. 
            This guide introduces the basics of how segment trees work, how they are implemented, and where 
            they are used in competitive programming. You'll learn the standard construction, query, and update 
            techniques along with simple code snippets.
          </Typography>
        </Box>

        {/* Contact */}
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem'}}>
          For any queries, contact{' '}
          <Link
            href="mailto:shankhadeepg444@gmail.com"
            sx={{ fontStyle: 'italic', fontWeight: 600, color: 'primary.dark' }}
            underline="hover"
          >
            shankhadeepg444@gmail.com
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
