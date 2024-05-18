import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import JoblyApi from './JoblyApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { user, setUserFromToken } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [updateMessage, setUpdateMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setUserFromToken(token);
        // Fetch user data after authentication
        try {
          const fetchedUser = await JoblyApi.getUser(user?.username);
          setFormData({
            username: fetchedUser.username || '',
            password: fetchedUser.password || '',
            firstName: fetchedUser.firstName || '',
            lastName: fetchedUser.lastName || '',
            email: fetchedUser.email || '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        navigate('/login');
      }
    };
    authenticateUser();
  }, [setUserFromToken, navigate, user]);

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
      const { username, ...userData } = formData;
      await JoblyApi.updateUser(user.username, userData);
      setUpdateMessage('Update successful');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Profile
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
              disabled
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
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Update Profile
        </Button>
        {updateMessage && <Typography variant="body1" style={{ marginTop: '10px', textAlign: 'center', color: 'green' }}>{updateMessage}</Typography>}
      </form>
    </Paper>
  );
};

export default Profile;
