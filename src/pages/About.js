import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import { Speed, CameraAlt } from '@mui/icons-material';

const About = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      px: 2,
      py: 4,
    }}
  >
    <Card
      sx={{
        maxWidth: 900,
        boxShadow: 6,
        borderRadius: 4,
        overflow: 'hidden',
        background: '#ffffff',
      }}
    >
      <CardContent sx={{ px: 4, py: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: '#333' }}
        >
          About Us
        </Typography>
        <Divider
          sx={{
            width: '60px',
            height: '5px',
            backgroundColor: '#00f2fe',
            margin: '0 auto',
            borderRadius: 2,
          }}
        />
        <Typography
          variant="body1"
          align="center"
          sx={{ mt: 2, color: '#555', lineHeight: 1.8 }}
        >
         This project introduces an intuitive web-based interface for detecting speeding vehicles and extracting license plate information from uploaded video files. Users can set a speed limit, and upload video footage for processing. The system identifies vehicles exceeding the defined speed threshold and extracts license plate data for further action. It can also provide details of the registered vehicles across the country.

        </Typography>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  background: '#f1f1f1',
                  borderRadius: 2,
                  p: 3,
                  boxShadow: 2,
                }}
              >
                <Speed sx={{ fontSize: 60, color: '#4facfe' }} />
                <Typography
                  variant="h5"
                  sx={{ mt: 2, fontWeight: 600, color: '#333' }}
                >
                  Speed Detection
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: '#555', lineHeight: 1.6 }}
                >
                  Accurately identify vehicles exceeding the speed limit with high precision using
                  advanced detection algorithms.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  background: '#f1f1f1',
                  borderRadius: 2,
                  p: 3,
                  boxShadow: 2,
                }}
              >
                <CameraAlt sx={{ fontSize: 60, color: '#4facfe' }} />
                <Typography
                  variant="h5"
                  sx={{ mt: 2, fontWeight: 600, color: '#333' }}
                >
                  License Plate Recognition
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: '#555', lineHeight: 1.6 }}
                >
                  Extract license plate information from video files for seamless traffic law
                  enforcement.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Typography
          variant="body1"
          sx={{ mt: 6, textAlign: 'center', color: '#555', lineHeight: 1.8 }}
        >
         Designed with usability in mind, the interface ensures seamless interaction, making it suitable for traffic management authorities and smart city systems. This project provides an efficient tool for improving road safety and enforcing traffic laws through modern, user-friendly technology.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default About;
