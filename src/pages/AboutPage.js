import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || ''
  });

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    const updatedUser = { ...user, ...userDetails };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <h4>Please log in to view your profile</h4>
          <Link to="/login" className="btn btn-primary mt-3">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1>My Profile</h1>
          <p className="lead">Manage your account information and preferences</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-3">
                <img
                  src={user.photo || "https://via.placeholder.com/150x150?text=User+Photo"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <h4>{user.name}</h4>
              <p className="text-muted">{user.email}</p>
              {!editMode && (
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5>Account Statistics</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Member Since:</strong><br />
                {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
              </div>
              <div className="mb-3">
                <strong>Account Type:</strong><br />
                <span className="badge bg-info">{user.role || 'Customer'}</span>
              </div>
              <div>
                <strong>Status:</strong><br />
                <span className="badge bg-success">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Personal Information</h5>
              {editMode && (
                <div>
                  <button 
                    className="btn btn-primary btn-sm me-2"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setEditMode(false);
                      setUserDetails({
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        address: user.address || '',
                        bio: user.bio || ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={userDetails.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">{user.name}</p>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={userDetails.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">{user.email}</p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={userDetails.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">{user.phone || 'Not provided'}</p>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Address</label>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={userDetails.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">{user.address || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Bio</label>
                {editMode ? (
                  <textarea
                    className="form-control"
                    name="bio"
                    rows="4"
                    value={userDetails.bio}
                    onChange={handleChange}
                    placeholder="Tell us a little about yourself..."
                  />
                ) : (
                  <p className="form-control-plaintext">
                    {user.bio || 'No bio provided'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5>Preferences</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailNotifications"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="emailNotifications">
                  Email notifications for new laptop arrivals
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="promotionalEmails"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="promotionalEmails">
                  Promotional emails and special offers
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="smsNotifications"
                />
                <label className="form-check-label" htmlFor="smsNotifications">
                  SMS notifications for order updates
                </label>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5>Security</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-warning">
                  Change Password
                </button>
                <button className="btn btn-outline-danger">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;