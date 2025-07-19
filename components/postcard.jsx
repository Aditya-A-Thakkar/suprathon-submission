import { Box, Paper, Typography, Link, Divider } from '@mui/material';

export default function PostCard({ post }) {
  const { title, description, contactEmail, postedBy, startDateTime, updatedAt } = post;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        variant="outlined"
        sx={{
          px: 3,
          py: 2,
          borderRadius: 2,
          borderColor: 'grey.300',
          bgcolor: '#fcfcfc',
          boxShadow: 1,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            mb: 1,
              flexDirection: {xs: 'column', sm: 'row'},
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: '#000', fontSize: '1.2rem' }}
          >
            {title}
          </Typography>

          <Typography variant="body2">
            Posted by: <Typography variant="strong" color="#1800AD" sx={{ fontWeight: "bold" }}>{postedBy?.name ?? 'Unknown'}</Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            fontSize: '1rem',
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
            mb: 2,
          }}
        >
          {description}
        </Typography>

        <Divider sx={{ my: 1 }} />

        {/* Footer Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2">
            Event:{' '}
	          <strong>{new Date(startDateTime).toLocaleString()}</strong>
          </Typography>
          <Typography variant="body2">
            Contact:{' '}
            <Link href={`mailto:${contactEmail}`} underline="hover" sx={{ fontStyle: "italic", color: "#1800AD" }}>
              {contactEmail}
            </Link>
          </Typography>
            <Typography variant="body2">
            Posted on:{' '}
                {new Date(updatedAt).toLocaleString()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
