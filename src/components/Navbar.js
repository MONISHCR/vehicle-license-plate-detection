import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Car Detection App
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/about')}>
            About
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate('/extract-info')}>
            Extract Info
          </Button>
          <Button color="inherit" onClick={() => navigate('/license-plate-extractor')}>
            License Plate Extractor
          </Button>
          <Button color="inherit" onClick={() => navigate('/default')}>
            Default Page
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
