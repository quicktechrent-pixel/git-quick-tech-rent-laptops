import React, { useState, useEffect } from 'react';
import DeviceCard from '../components/DeviceCard';
import FilterSection from '../components/FilterSection';

const BrowseDevices = ({ devices, addToCart }) => {
  const [filteredDevices, setFilteredDevices] = useState(devices);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000,
    brand: '',
    location: '',
    ram: '',
    storage: ''
  });

  useEffect(() => {
    let result = devices;

    // Filter by price
    result = result.filter(device => 
      device.price >= filters.minPrice && device.price <= filters.maxPrice
    );

    // Filter by brand
    if (filters.brand) {
      result = result.filter(device => 
        device.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Filter by location
    if (filters.location) {
      result = result.filter(device => 
        device.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by RAM
    if (filters.ram) {
      result = result.filter(device => 
        device.specs.ram === filters.ram
      );
    }

    // Filter by storage
    if (filters.storage) {
      result = result.filter(device => 
        device.specs.storage === filters.storage
      );
    }

    setFilteredDevices(result);
  }, [devices, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 2000,
      brand: '',
      location: '',
      ram: '',
      storage: ''
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1>Browse Laptops</h1>
          <p className="lead">Find the perfect laptop for your needs</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <FilterSection 
            filters={filters} 
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="text-muted">
                Showing {filteredDevices.length} of {devices.length} laptops
              </span>
            </div>
            <div>
              <select className="form-select form-select-sm">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {filteredDevices.length > 0 ? (
            <div className="row">
              {filteredDevices.map(device => (
                <DeviceCard key={device.id} device={device} addToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h3>No laptops found</h3>
              <p>Try adjusting your filters to see more results.</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseDevices;