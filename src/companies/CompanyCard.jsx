import React from 'react';
import { Link } from 'react-router-dom';


// CompanyCard component
// This component displays a company card with company details
// It also includes a link to the company details page
const CompanyCard = ({ company }) => {
  return (
    <Link to={`/companies/${company.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <h3>{company.name}</h3>
        <p>{company.description}</p>
        <p>Number of Employees: {company.numEmployees}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
