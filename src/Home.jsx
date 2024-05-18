import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => (
  <div className="container mt-5 text-center">
    <h1>Jobly</h1>
    <p>Search and apply to Jobs</p>
    <div className="d-flex justify-content-center">
      <Link className="btn btn-primary me-2" to="/login">Login</Link>
      <Link className="btn btn-primary" to="/signup">Sign Up</Link>
    </div>
  </div>
);

export default Home;
