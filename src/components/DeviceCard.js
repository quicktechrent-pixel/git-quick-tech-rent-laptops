import React from 'react';
import { Link } from 'react-router-dom';

const DeviceCard = ({ device, addToCart }) => {
  // Safe data access with fallbacks
  if (!device) {
    return (
      <div className="col-md-4 mb-4">
        <div className="card device-card">
          <div className="card-body text-center">
            <p>Device not available</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    id,
    name = 'Unknown Device',
    brand = 'Unknown Brand',
    price = 0,
    image = 'https://via.placeholder.com/300x200/6c757d/ffffff?text=No+Image',
    specs = {},
    available = false,
    // location = 'Unknown Location'
  } = device;

  const {
    processor = 'Not specified',
    ram = 'Not specified',
    storage = 'Not specified',
    // display = 'Not specified',
    // graphics = 'Not specified'
  } = specs;

  return (
    <div className="col-md-4 mb-4">
      <div className="card device-card h-100">
        <div className="position-relative">
          <img 
            src={image} 
            className="card-img-top device-image" 
            alt={name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200/6c757d/ffffff?text=No+Image';
            }}
          />
          <span className={`badge ${available ? 'bg-success' : 'bg-danger'} availability-badge`}>
            {available ? 'Available' : 'Not Available'}
          </span>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text text-muted">{brand}</p>
          <div className="specs mb-2">
            <small className="text-muted">
              {processor} • {ram} • {storage}
            </small>
          </div>
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <div className="price-tag">₹{price}/day</div>
              <div>
                <Link to={`/product/${id}`} className="btn btn-outline-primary btn-sm me-2">
                  Details
                </Link>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => addToCart(device)}
                  disabled={!available}
                >
                  {available ? 'Add to Cart' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;