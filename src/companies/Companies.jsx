import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from '../JoblyApi';
import CompanyCard from './CompanyCard';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const CompanyList = () => {
  const { user, setUserFromToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      if (!user) { // Check if user is already authenticated
        const token = localStorage.getItem('token');
        if (token) {
          setUserFromToken(token); // Set user from token only if token exists
        } else {
          navigate('/login'); // Redirect to login if token doesn't exist
        }
      }
    };
    authenticateUser();
  }, [user, setUserFromToken, navigate]); // Include user, setUserFromToken, and navigate in dependency array

  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await JoblyApi.getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []); // Make sure this effect runs only once by passing an empty dependency array

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = async () => {
    try {
      const companiesData = await JoblyApi.getCompanies({ name: searchTerm });
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error searching companies:', error);
    }
  };

  return (
    <div>
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {filteredCompanies.map(company => (
        <CompanyCard key={company.handle} company={company} />
      ))}
    </div>
  );
}

export default CompanyList;
