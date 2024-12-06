import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const navigate = useNavigate();

  const states = ['TS', 'AP', 'KA', 'KL', 'MH', 'TN', 'PU']; // Add your states here

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'password') {
      alert('Logged in successfully!');
      // Store login status and state in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('selectedState', selectedState);

      // Redirect to HelloUser and pass the selected state
      navigate('/hello-user', { state: { selectedState } });
    } else {
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Login
      </Typography>
      {error && <Alert severity="error">Invalid credentials</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <FormControl fullWidth sx={{ mb: 2 }} required>
          <InputLabel>State</InputLabel>
          <Select
            value={selectedState}
            label="State"
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
