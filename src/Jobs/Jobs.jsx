import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from '../JoblyApi';
import JobCard from './JobCard';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const { user, setUserFromToken } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setUserFromToken(token); 
        navigate('/login'); 
      }
    };
    authenticateUser();
  }, [setUserFromToken, navigate]); 


  // Fetch jobs from the API
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await JoblyApi.getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []); 

  return (
    <div>
      <h1>Jobs Page</h1>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default Jobs;
