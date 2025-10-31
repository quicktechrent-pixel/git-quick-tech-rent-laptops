import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersService } from '../services/supabase';

const UserDashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (user && user.id) {
        try {
          console.log('Loading orders for user:', user.id);
          const userOrders = await ordersService.getByUserId(user.id);
          console.log('Orders loaded:', userOrders);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error loading orders:', error);
          // Fallback to localStorage
          const savedOrders = localStorage.getItem('orders');
          if (savedOrders) {
            const parsedOrders = JSON.parse(savedOrders);
            // Filter orders for current user
            const userOrders = parsedOrders.filter(order => order.user_id === user.id);
            setOrders(userOrders);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  // Calculate statistics
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((total, order) => total + parseFloat(order.total || 0), 0);
  const completedRentals = orders.filter(order => order.status === 'completed' || order.status === 'delivered').length;

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <h4>Please log in to view your dashboard</h4>
          <Link to="/login" className="btn btn-primary mt-3">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1>User Dashboard</h1>
          <p className="lead">Welcome back, {user.name}!</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center bg-primary text-white">
            <div className="card-body">
              <h3>{totalOrders}</h3>
              <p>Total Orders</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center bg-success text-white">
            <div className="card-body">
              <h3>₹{totalSpent.toFixed(2)}</h3>
              <p>Total Spent</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center bg-info text-white">
            <div className="card-body">
              <h3>{completedRentals}</h3>
              <p>Completed Rentals</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center bg-warning">
            <div className="card-body">
              <Link to="/browse" className="btn btn-dark">
                Rent New Laptop
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Your Orders</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading your orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Devices</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Return Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>
                            <strong>#{order.id.slice(-8).toUpperCase()}</strong>
                          </td>
                          <td>
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td>
                            {order.order_items && order.order_items.length > 0 ? (
                              <div>
                                {order.order_items.map((item, index) => (
                                  <div key={index} className="small">
                                    {item.devices?.name || 'Device'} 
                                    ({item.rental_duration} days)
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted">No items</span>
                            )}
                          </td>
                          <td>
                            <strong>₹{parseFloat(order.total || 0).toFixed(2)}</strong>
                          </td>
                          <td>
                            <span className={`badge ${
                              order.status === 'completed' ? 'bg-success' :
                              order.status === 'delivered' ? 'bg-info' :
                              order.status === 'pending' ? 'bg-warning' :
                              order.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                            }`}>
                              {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                            </span>
                          </td>
                          <td>
                            {order.return_date ? (
                              new Date(order.return_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            ) : (
                              <span className="text-muted">Not set</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-shopping-cart fa-3x text-muted"></i>
                  </div>
                  <h4>No orders yet</h4>
                  <p className="text-muted mb-4">Start browsing our laptops to make your first rental!</p>
                  <Link to="/browse" className="btn btn-primary btn-lg">
                    Browse Laptops
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <Link to="/browse" className="btn btn-outline-primary w-100">
                    <i className="fas fa-laptop me-2"></i>
                    Rent New Laptop
                  </Link>
                </div>
                <div className="col-md-4 text-center">
                  <Link to="/support" className="btn btn-outline-secondary w-100">
                    <i className="fas fa-headset me-2"></i>
                    Get Support
                  </Link>
                </div>
                <div className="col-md-4 text-center">
                  <Link to="/about" className="btn btn-outline-info w-100">
                    <i className="fas fa-user me-2"></i>
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;