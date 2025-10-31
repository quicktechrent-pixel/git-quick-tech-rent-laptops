import React from 'react';
import { Link } from 'react-router-dom';
import DeviceCard from '../components/DeviceCard';

const Homepage = ({ devices }) => {
  const featuredDevices = devices.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Rent High-Quality Laptops</h1>
          <p>Get the latest laptops for work, gaming, or creative projects. Flexible rental periods and competitive prices.</p>
          <Link to="/browse" className="btn btn-light btn-lg">Browse Laptops</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-md-12">
              <h2>Why Choose Quick Tech Rent?</h2>
              <p className="lead">We make laptop rental simple and affordable</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="mb-3">
                <i className="fas fa-laptop fa-3x text-primary"></i>
              </div>
              <h4>Latest Models</h4>
              <p>Access the newest laptop models from top brands like Apple, Dell, HP, and more.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="mb-3">
                <i className="fas fa-shipping-fast fa-3x text-primary"></i>
              </div>
              <h4>Fast Delivery</h4>
              <p>Get your laptop delivered to your doorstep within 24 hours in most locations.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="mb-3">
                <i className="fas fa-headset fa-3x text-primary"></i>
              </div>
              <h4>24/7 Support</h4>
              <p>Our support team is available round the clock to assist you with any issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Laptops */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <h2 className="text-center">Featured Laptops</h2>
              <p className="text-center lead">Check out our most popular rental options</p>
            </div>
          </div>
          <div className="row">
            {featuredDevices.map(device => (
              <DeviceCard key={device.id} device={device} addToCart={() => {}} />
            ))}
          </div>
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <Link to="/browse" className="btn btn-primary btn-lg">View All Laptops</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2>How It Works</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div className="step-number mb-3">
                <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>1</span>
              </div>
              <h4>Browse & Select</h4>
              <p>Choose from our wide selection of laptops based on your needs and budget.</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="step-number mb-3">
                <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>2</span>
              </div>
              <h4>Add to Cart</h4>
              <p>Select your rental duration and add the laptop to your cart.</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="step-number mb-3">
                <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>3</span>
              </div>
              <h4>Checkout</h4>
              <p>Provide your delivery address and complete your order.</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="step-number mb-3">
                <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>4</span>
              </div>
              <h4>Enjoy</h4>
              <p>Receive your laptop and use it for your project or work.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;