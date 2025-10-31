import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminPanel = ({ devices, addDevice, updateDevice, deleteDevice, user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    image: '',
    processor: '',
    ram: '',
    storage: '',
    display: '',
    graphics: '',
    available: true,
    location: ''
  });

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const deviceData = {
      ...formData,
      specs: {
        processor: formData.processor,
        ram: formData.ram,
        storage: formData.storage,
        display: formData.display,
        graphics: formData.graphics
      }
    };

    addDevice(deviceData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      image: '',
      processor: '',
      ram: '',
      storage: '',
      display: '',
      graphics: '',
      available: true,
      location: ''
    });
    setShowAddForm(false);
  };

  const toggleAvailability = (device) => {
    updateDevice(device.id, { ...device, available: !device.available });
  };

  return (
    <div className="container mt-4">
      <h1>Admin Panel</h1>
      <p className="lead">Manage your laptop inventory</p>

      <div className="d-flex justify-content-between mb-4">
        <h2>Laptop Inventory</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add New Laptop
        </button>
      </div>

      {showAddForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h4>Add New Laptop</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Brand</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price per Day (₹)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Image URL</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Availability</label>
                  <div className="form-check mt-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="available"
                      checked={formData.available}
                      onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                    />
                    <label className="form-check-label">
                      Available for rental
                    </label>
                  </div>
                </div>
              </div>
              <h5 className="mt-3">Specifications</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Processor</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="processor"
                    value={formData.processor}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">RAM</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="ram"
                    value={formData.ram}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Storage</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="storage"
                    value={formData.storage}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Display</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="display"
                    value={formData.display}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Graphics</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="graphics"
                  value={formData.graphics}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Add Laptop
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price/Day</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <tr key={device.id}>
                <td>{device.name}</td>
                <td>{device.brand}</td>
                <td>₹{device.price}</td>
                <td>{device.location}</td>
                <td>
                  <span className={`badge ${device.available ? 'bg-success' : 'bg-danger'}`}>
                    {device.available ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-warning me-1"
                    onClick={() => toggleAvailability(device)}
                  >
                    {device.available ? 'Make Unavailable' : 'Make Available'}
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteDevice(device.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {devices.length === 0 && (
        <div className="text-center py-5">
          <h3>No laptops in inventory</h3>
          <p>Add your first laptop to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;