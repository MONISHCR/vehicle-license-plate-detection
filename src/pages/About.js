import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4">About Us</Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      This app helps with car license plate detection and speed tracking.
    </Typography>
  </Box>
);

export default About;
