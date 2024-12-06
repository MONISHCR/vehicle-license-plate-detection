import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const Dashboard = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 3 }}>
      Dashboard
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">License Plate Detection</Typography>
            <Typography variant="body1">
              Detect vehicle license plates in real time.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Speed Monitoring</Typography>
            <Typography variant="body1">
              Measure vehicle speed with advanced sensors.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
