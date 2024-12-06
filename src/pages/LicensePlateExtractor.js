import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button, 
  CircularProgress, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Snackbar, 
  Alert, 
  CardMedia, 
  Box, 
  IconButton 
} from '@mui/material';
import { DriveEta } from '@mui/icons-material'; // Car icon for UI
import { motion } from 'framer-motion'; // For animations

function LicensePlateExtractor() {
  const [licensePlate, setLicensePlate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // File validation
    if (!file) {
      setError('No file selected');
      setSnackbarOpen(true);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      setSnackbarOpen(true);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the maximum limit of 10MB');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/extract_license_plate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.license_plate) {
        setLicensePlate(response.data.license_plate);
        setError('');
        setSnackbarOpen(true);
      } else {
        setLicensePlate('');
        setError(response.data.error || 'Failed to extract license plate');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Error during API request:', err);
      setError('An error occurred while processing the image. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" spacing={3} sx={{ height: '100vh', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Grid item xs={12} sm={8} md={6}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card sx={{ padding: 3, borderRadius: 3, boxShadow: 3, backgroundColor: '#ffffff' }}>
            <CardMedia sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
              <IconButton color="primary" size="large">
                <DriveEta fontSize="large" />
              </IconButton>
            </CardMedia>
            <CardContent>
              <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
                License Plate Extractor
              </Typography>

              <Box
                component="label"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '2px dashed #1976d2',
                  borderRadius: 2,
                  padding: 3,
                  marginBottom: 3,
                  backgroundColor: '#e3f2fd',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <Typography variant="body1" color="primary">
                  Click to Upload an Image
                </Typography>
              </Box>

              {loading && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {licensePlate && !loading && (
                  <Typography variant="h6" color="green" sx={{ marginTop: 2, textAlign: 'center' }}>
                    License Plate: {licensePlate}
                  </Typography>
                )}
                {error && !loading && (
                  <Typography variant="h6" color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
                    {error}
                  </Typography>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error || 'License Plate Extracted Successfully!'}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default LicensePlateExtractor;
