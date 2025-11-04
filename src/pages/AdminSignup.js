import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usersService } from '../services/supabase';

const AdminSignup = ({ loginUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    adminCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Admin secret code (in production, this would be validated server-side)
  const ADMIN_SECRET_CODE = 'ADMIN2024TECH';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Verify admin code
    if (formData.adminCode !== ADMIN_SECRET_CODE) {
      setError('Invalid admin code. Please contact system administrator.');
      setLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await usersService.getByEmail(formData.email);
      if (existingUser) {
        setError('User with this email already exists');
        setLoading(false);
        return;
      }

      // Create new admin user
      const newAdmin = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: 'admin'
      };

      const admin = await usersService.create(newAdmin);
      loginUser(admin);
      navigate('/admin');
      
    } catch (error) {
      console.error('Admin signup error:', error);
      setError('Failed to create admin account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Admin Sign Up</h2>
              
              <div className="alert alert-info mb-4">
                <strong>Admin Code Required:</strong> You need a valid admin code to create an admin account.
                <br />
                <small className="text-muted">For demo: Use code <strong>ADMIN2024TECH</strong></small>
              </div>

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Admin Code</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="adminCode"
                    value={formData.adminCode}
                    onChange={handleChange}
                    placeholder="Enter admin secret code"
                    required 
                  />
                  <small className="form-text text-muted">
                    Contact your system administrator for the admin code
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Admin Account...
                    </>
                  ) : (
                    'Create Admin Account'
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="mb-2">Already have an admin account? <Link to="/admin/login">Login here</Link></p>
                <p className="mb-0"><Link to="/signup">Sign up as regular user</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;