import React from 'react';

const FilterSection = ({ filters, onFilterChange, onClearFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="filter-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="filter-title">Filters</h5>
        <button 
          className="btn btn-sm btn-outline-secondary"
          onClick={onClearFilters}
        >
          Clear All
        </button>
      </div>

      <div className="mb-3">
        <label htmlFor="priceRange" className="form-label">
          Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}
        </label>
        <div className="row">
          <div className="col-6">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Min"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Max"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="brand" className="form-label">Brand</label>
        <select 
          className="form-select form-select-sm" 
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
        >
          <option value="">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Dell">Dell</option>
          <option value="HP">HP</option>
          <option value="Lenovo">Lenovo</option>
          <option value="Asus">Asus</option>
          <option value="Acer">Acer</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="location" className="form-label">Location</label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Enter location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="ram" className="form-label">RAM</label>
        <select 
          className="form-select form-select-sm" 
          name="ram"
          value={filters.ram}
          onChange={handleFilterChange}
        >
          <option value="">All RAM</option>
          <option value="8GB">8GB</option>
          <option value="16GB">16GB</option>
          <option value="32GB">32GB</option>
          <option value="64GB">64GB</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="storage" className="form-label">Storage</label>
        <select 
          className="form-select form-select-sm" 
          name="storage"
          value={filters.storage}
          onChange={handleFilterChange}
        >
          <option value="">All Storage</option>
          <option value="256GB SSD">256GB SSD</option>
          <option value="512GB SSD">512GB SSD</option>
          <option value="1TB SSD">1TB SSD</option>
          <option value="2TB SSD">2TB SSD</option>
        </select>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="availableOnly"
          name="availableOnly"
          checked={filters.availableOnly}
          onChange={(e) => onFilterChange({
            ...filters,
            availableOnly: e.target.checked
          })}
        />
        <label className="form-check-label" htmlFor="availableOnly">
          Available Only
        </label>
      </div>
    </div>
  );
};

export default FilterSection;