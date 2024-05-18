import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call login function from AuthContext
      await login(formData.username, formData.password);
      // Redirect to home page or any other desired route
      navigate('/companies');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error
    }
    // Reset the form fields after submission
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
