import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct way to import jwt-decode

// Create the context
export const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provide the context to your component tree
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // function to decode token and set user
  const setUserFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    setUser({ username: decodedToken.username });
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post('https://jobly-backend-6ucl.onrender.com/auth/token', {
        username,
        password,
      });
      const token = response.data.token;
      // Save token to localStorage or sessionStorage
      localStorage.setItem('token', token);
      // Set the user state
      setUserFromToken(token);
    } catch (error) {
      throw new Error('Error logging in');
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage or sessionStorage
    localStorage.removeItem('token');
    // Clear user state
    setUser(null);
    // Navigate after state has been updated
    navigate('/login');
  };

  // Value object to be provided by the context
  const value = {
    user,
    setUserFromToken, // Include setUserFromToken in the context value
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
