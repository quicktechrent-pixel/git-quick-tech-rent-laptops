import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, cartCount, logoutUser }) => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">Quick Tech Rent</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/browse">Browse Laptops</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/support">Support</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">Admin Panel</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart {cartCount > 0 && <span className="badge bg-primary">{cartCount}</span>}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-primary btn-sm ms-2" onClick={logoutUser}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart {cartCount > 0 && <span className="badge bg-primary">{cartCount}</span>}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;