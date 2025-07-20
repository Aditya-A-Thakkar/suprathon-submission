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
  MenuItem,
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useSnackbar } from "@/components/SnackbarProvider";

export default function PostRequestPage() {
  const showSnackbar = useSnackbar();
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Workshop');
  const [where, setWhere] = useState('');
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const descriptionRef = useRef(null);

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  const handleSubmit = async () => {
    if (!title || !tag || !where || !startDateTime || !endDateTime || !description || !email) return;

    try {
      const res = await fetch('/api/post-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          tag,
          where,
          startDateTime,
          endDateTime,
          description,
          contactEmail: email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        // alert(data.error || 'Submission failed');
        showSnackbar(data.error || 'Submission failed', 'error');
      }
    } catch (err) {
      console.error(err);
      // alert('Something went wrong.');
      showSnackbar(`Something went wrong`, 'error');
    }
  };

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 300) + 'px';
    }
  }, [description]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 12 }}>
      {!submitted ? (
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1800AD' }}
          >
            MAKE A POST REQUEST
          </Typography>

          <Stack spacing={4} mt={4}>
            {/* Title */}
            <FormControl fullWidth>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Title of Event</FormLabel>
              <TextField
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ backgroundColor: 'white' }}
              />
            </FormControl>

            {/* Type */}
            <FormControl fullWidth>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Type of Event</FormLabel>
              <TextField
                select
                variant="outlined"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
                sx={{ backgroundColor: 'white' }}
              >
                {['Workshop', 'Seminar', 'Webinar', 'Conference', 'Course', 'Other'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            {/* Where */}
            <FormControl fullWidth>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Where</FormLabel>
              <TextField
                variant="outlined"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                placeholder="Please specify the location or platform"
                required
                sx={{ backgroundColor: 'white', '& .MuiInputBase-input::placeholder': {
                  color: 'gray',
                  opacity: 1,
                } }}
              />
            </FormControl>

            {/* Start & End DateTime */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl fullWidth>
                <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Start Date & Time</FormLabel>
                <DateTimePicker
                  value={startDateTime}
                  onChange={(newValue) => setStartDateTime(newValue)}
                  minDate={today}
                  maxDate={threeMonthsLater}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                      sx: { backgroundColor: 'white' },
                    },
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel sx={{ fontWeight: 600, mb: 1 }}>End Date & Time</FormLabel>
                <DateTimePicker
                  value={endDateTime}
                  onChange={(newValue) => setEndDateTime(newValue)}
                  minDate={startDateTime || today}
                  maxDate={threeMonthsLater}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                      sx: { backgroundColor: 'white' },
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>

            {/* Description */}
            <FormControl fullWidth>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Event Description</FormLabel>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  p: 1.5,
                  bgcolor: 'white',
                }}
              >
                <textarea
                  ref={descriptionRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description of the event..."
                  maxLength={1000}
                  rows={5}
                  style={{
                    width: '100%',
                    border: 'none',
                    resize: 'none',
                    overflowY: 'auto',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    lineHeight: 1.6,
                    backgroundColor: 'transparent',
                    outline: 'none',
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, display: 'block', textAlign: 'right', color: 'text.secondary' }}
                >
                  {description.length}/1000 characters
                </Typography>
              </Box>
            </FormControl>

            {/* Email */}
            <FormControl fullWidth>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Contact Email</FormLabel>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ backgroundColor: 'white' }}
              />
            </FormControl>

            {/* Submit */}
            <Box textAlign="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
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
