import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductPage = ({ devices, addToCart, isLoading = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rentalDuration, setRentalDuration] = useState(7);
  const [device, setDevice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset states when ID changes
    setError(null);
    setDevice(null);

    if (!id) {
      setError('Invalid device ID');
      return;
    }

    if (devices && devices.length > 0) {
      // Robust device finding - handles both string and number IDs
      const foundDevice = devices.find(d => 
        d.id === id || 
        d.id === parseInt(id) || 
        String(d.id) === String(id)
      );

      if (foundDevice) {
        setDevice(foundDevice);
      } else {
        setError(`Device with ID "${id}" not found`);
      }
    }
  }, [id, devices]);

  const handleAddToCart = () => {
    if (!device || !device.available) return;
    
    const deviceWithDuration = { 
      ...device, 
      rentalDuration,
      totalPrice: device.price * rentalDuration
    };
    addToCart(deviceWithDuration);
  };

  const handleRentalDurationChange = (value) => {
    const days = parseInt(value) || 1;
    if (days >= 1 && days <= 30) {
      setRentalDuration(days);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading device details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !device) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <h4>Device Not Found</h4>
              <p className="mb-0">{error || 'The device you are looking for does not exist.'}</p>
            </div>
            <div className="mt-3">
              <button 
                onClick={() => navigate(-1)} 
                className="btn btn-outline-secondary me-2"
              >
                Go Back
              </button>
              <Link to="/browse" className="btn btn-primary me-2">
                Browse All Devices
              </Link>
              <Link to="/" className="btn btn-outline-primary">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/browse">Browse Laptops</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{device.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6">
          <img 
            src={device.image} 
            alt={device.name} 
            className="img-fluid rounded shadow-sm"
            onError={(e) => {
              e.target.src = '/images/placeholder-device.jpg';
            }}
          />
        </div>
        
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h1 className="h2">{device.name}</h1>
              <p className="text-muted mb-1">{device.brand}</p>
              <p className="text-muted small">{device.location}</p>
            </div>
            <span className={`badge ${device.available ? 'bg-success' : 'bg-danger'} fs-6`}>
              {device.available ? 'Available' : 'Not Available'}
            </span>
          </div>

          <div className="price-tag mb-4">
            <span className="h3 text-primary">₹{device.price}</span>
            <span className="text-muted">/day</span>
          </div>

          <div className="mb-4">
            <h4>Specifications</h4>
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled">
                  <li><strong>Processor:</strong> {device.specs.processor}</li>
                  <li><strong>RAM:</strong> {device.specs.ram}</li>
                  <li><strong>Storage:</strong> {device.specs.storage}</li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled">
                  <li><strong>Display:</strong> {device.specs.display}</li>
                  <li><strong>Graphics:</strong> {device.specs.graphics}</li>
                  <li><strong>Condition:</strong> {device.condition || 'Excellent'}</li>
                </ul>
              </div>
            </div>
          </div>

          {device.available ? (
            <div className="rental-options mb-4">
              <h4>Rental Options</h4>
              <div className="mb-3">
                <label htmlFor="rentalDuration" className="form-label">
                  Rental Duration: <strong>{rentalDuration} days</strong>
                </label>
                <input 
                  type="range" 
                  className="form-range" 
                  id="rentalDuration" 
                  min="1" 
                  max="30" 
                  value={rentalDuration}
                  onChange={(e) => handleRentalDurationChange(e.target.value)}
                />
                <div className="d-flex justify-content-between">
                  <small>1 day</small>
                  <small>30 days</small>
                </div>
              </div>
              
              <div className="card bg-light mb-3">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Cost</h5>
                  <p className="h4 text-primary mb-0">
                    ₹{device.price * rentalDuration}
                  </p>
                  <small className="text-muted">
                    ₹{device.price} × {rentalDuration} days
                  </small>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary btn-lg" 
                  onClick={handleAddToCart}
                  disabled={!device.available}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart - ₹{device.price * rentalDuration}
                </button>
                <Link to="/browse" className="btn btn-outline-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning">
              <i className="bi bi-info-circle me-2"></i>
              This laptop is currently not available for rental. Please check back later or browse other options.
            </div>
          )}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h3>About This Device</h3>
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                The <strong>{device.name}</strong> from {device.brand} is a {device.specs.ram.includes('16') ? 'high-performance' : 'reliable'} laptop perfect for {device.specs.ram.includes('16') ? 'demanding tasks, gaming, and professional work' : 'everyday computing, studies, and business tasks'}. 
                With its <strong>{device.specs.processor}</strong> processor and <strong>{device.specs.ram}</strong> of RAM, it handles multitasking with ease. 
                The <strong>{device.specs.storage}</strong> storage provides ample space for your files, applications, and projects.
              </p>
              <p className="card-text mb-0">
                Featuring a <strong>{device.specs.display}</strong> display{device.specs.graphics && <span> and <strong>{device.specs.graphics}</strong> graphics</span>}, 
                this laptop delivers {device.specs.display.includes('4K') ? 'stunning visual quality' : 'crisp and clear visuals'} for all your needs. 
                Whether you're working on complex projects, creative endeavors, or everyday computing tasks, 
                this laptop offers reliable performance in a portable package.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;