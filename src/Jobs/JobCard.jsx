import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import JoblyApi from '../JoblyApi'; 
import { useAuth } from '../AuthContext'; 

// JobCard component
// This component displays a job card with job details and an apply button
const JobCard = ({ job }) => {
  const { user } = useAuth(); 
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const isApplied = localStorage.getItem(`job_${job.id}_applied`);
    if (isApplied) {
      setApplied(true);
    }
  }, [job.id]);

  const handleApply = async () => {
    try {
      await JoblyApi.applyToJob(user.username, job.id); // Call applyToJob method from JoblyApi
      localStorage.setItem(`job_${job.id}_applied`, 'true'); // Store applied status in local storage
      setApplied(true); // Update local state to indicate job application
    } catch (error) {
      console.error('Error applying for job:', error);
     
    }
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {job.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {job.companyName}
        </Typography>
        <Typography variant="body2">Salary:{job.salary}</Typography>
        <Typography variant="body2">Equity:{job.equity}</Typography>
        {applied ? (
          <Button variant="contained" disabled>
            Applied
          </Button>
        ) : (
          <Button onClick={handleApply} variant="contained" color="primary">
            Apply
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
