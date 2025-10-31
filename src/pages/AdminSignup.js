import React from 'react';
import { Link } from 'react-router-dom';

const AdminSignup = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2>Admin Sign Up</h2>
              <p className="text-muted">
                Admin accounts can only be created by existing administrators.
                Please contact your system administrator for access.
              </p>
              <Link to="/admin/login" className="btn btn-primary">
                Go to Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;