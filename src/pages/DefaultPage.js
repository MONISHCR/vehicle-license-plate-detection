import React from 'react';
import { Box, Typography } from '@mui/material';

const DefaultPage = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4">Default Page</Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      This is the default placeholder page.
    </Typography>
  </Box>
);

export default DefaultPage;
