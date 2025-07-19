'use client';

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  FormControl,
  FormLabel,
} from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function PostRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  const handleSubmit = async () => {
    if (!title || !date || !description || !email) return;

    try {
      const res = await fetch('/api/post-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          eventDate: date,
          description,
          contactEmail: email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 12 }}>
      {!submitted ? (
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            MAKE A POST REQUEST
          </Typography>

          <Stack spacing={4} mt={4}>
            {/* Title Field */}
            <FormControl fullWidth>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Title of Event</FormLabel>
              <TextField
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormControl>

            {/* Date Picker */}
            <FormControl fullWidth>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Event Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  minDate={today}
                  maxDate={threeMonthsLater}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>

            {/* Description */}
            <FormControl fullWidth>
                <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Event Description</FormLabel>
                <TextField id="outlined-multiline-static"
                    multiline
                    rows = {4}
                    maxRows={12}
                    inputProps={{ maxLength: 1000 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText={`${description.length}/1000 characters`}
                    required
                    sx={{
                    '& textarea': {
                        overflow: 'hidden',
                        resize: 'none',
                    },
                    }}
                />
            </FormControl>


            {/* Email */}
            <FormControl fullWidth>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Contact Email</FormLabel>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            {/* Submit Button */}
            <Box textAlign="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                //disabled={!title || !date || !description || !email}
                sx={{ px: 4, py: 1.5, textTransform: 'none', fontWeight: 'bold' }}
              >
                Request for Approval
              </Button>
            </Box>
          </Stack>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h2" color="success.main" gutterBottom>
            ✅
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Request sent to admin for approval.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You will be notified in the next 48 hours.
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
