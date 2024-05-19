import React, { useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi';
import { useParams } from 'react-router-dom';
import JobCard from '../Jobs/JobCard'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


// CompanyDetail component
// This component displays company details and a list of jobs at the company
const CompanyDetail = () => {
  const { handle } = useParams(); 
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();


  // Protect the route by checking if user is authenticated
  // If user is not authenticated, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
        console.log('companyData:', companyData);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };
    fetchCompany();
  }, [handle]);


  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <p>Number of Employees: {company.numEmployees}</p>
      <h2>Jobs at {company.name}</h2>
      {company.jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default CompanyDetail;
