import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound = () => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <Typography variant="h4">404 - Not Found</Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      The page you are looking for does not exist.
    </Typography>
  </Box>
);

export default NotFound;
