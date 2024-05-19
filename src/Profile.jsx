import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import JoblyApi from './JoblyApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { user, setUserFromToken } = useAuth();
  const [formData, setFormData] = useState(null); // Use null initially
  const [updateMessage, setUpdateMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await JoblyApi.getUser(user?.username);
        setFormData({
          username: fetchedUser.username || '',
          firstName: fetchedUser.firstName || '',
          lastName: fetchedUser.lastName || '',
          email: fetchedUser.email || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      setUserFromToken(token);
      fetchUserData();
    } else {
      navigate('/login');
    }
  }, [setUserFromToken, navigate, user?.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData) return; // Return if formData is null or not yet initialized
      await JoblyApi.updateUser(user.username, formData);
      setUpdateMessage('Update successful');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (!formData) {
    return null; // Render nothing until user data is fetched
  }

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
              disabled
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
