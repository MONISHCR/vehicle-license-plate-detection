import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Welcome, {user?.username || 'User'}!
      </Typography>
    </Box>
  );
};

export default Profile;
