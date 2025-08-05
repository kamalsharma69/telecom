import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Smartphone, 
  Eye, 
  CreditCard, 
  Sim, 
  LogOut, 
  Activity,
  Plus,
  Wifi,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CustomerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');

  // Mock data for customer
  const activeSIMs = [
    { id: '1', number: '+1 (555) 123-4567', plan: 'Premium 5G', status: 'Active', dataUsed: '8.5 GB', dataLimit: '15 GB' },
    { id: '2', number: '+1 (555) 987-6543', plan: 'Basic 4G', status: 'Active', dataUsed: '2.1 GB', dataLimit: '5 GB' }
  ];

  const availablePlans = [
    { id: '1', name: 'Basic 4G', price: '$25/month', data: '5 GB', calls: 'Unlimited', texts: 'Unlimited' },
    { id: '2', name: 'Premium 5G', price: '$45/month', data: '15 GB', calls: 'Unlimited', texts: 'Unlimited' },
    { id: '3', name: 'Ultimate 5G', price: '$65/month', data: '50 GB', calls: 'Unlimited', texts: 'Unlimited' }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Activity, path: '#' },
    { id: 'activate-sim', label: 'Activate SIM', icon: Sim, path: '#' },
    { id: 'view-plans', label: 'View Plans', icon: Eye, path: '#' },
    { id: 'my-bills', label: 'My Bills', icon: CreditCard, path: '/billing' },
    { id: 'my-sims', label: 'My SIMs', icon: Smartphone, path: '#' }
  ];

  const handleSectionChange = (sectionId: string, path?: string) => {
    if (path && path !== '#') {
      return; // Let Link handle navigation
    }
    setActiveSection(sectionId);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'activate-sim':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Activate New SIM</h2>
            </div>
            <form className="auth-form" style={{ maxWidth: '500px' }}>
              <div className="form-group">
                <label className="form-label">SIM Card Number</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter 20-digit SIM number"
                  maxLength={20}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Choose Plan</label>
                <select className="form-select">
                  <option value="">Select a plan</option>
                  {availablePlans.map(plan => (
                    <option key={plan.id} value={plan.id}>{plan.name} - {plan.price}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-primary">
                <Sim size={16} style={{ marginRight: '0.5rem' }} />
                Activate SIM
              </button>
            </form>
          </div>
        );

      case 'view-plans':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Available Plans</h2>
            </div>
            <div className="stats-grid">
              {availablePlans.map(plan => (
                <div key={plan.id} className="stat-card">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    {plan.name}
                  </h3>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6', marginBottom: '1rem' }}>
                    {plan.price}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center' }}>
                      <Wifi size={16} style={{ marginRight: '0.5rem', color: '#6b7280' }} />
                      {plan.data} Data
                    </li>
                    <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
                      📞 {plan.calls} Calls
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                      💬 {plan.texts} Texts
                    </li>
                  </ul>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    <Plus size={16} style={{ marginRight: '0.5rem' }} />
                    Subscribe
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'my-sims':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">My SIM Cards</h2>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Phone Number</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Data Usage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeSIMs.map(sim => (
                  <tr key={sim.id}>
                    <td>{sim.number}</td>
                    <td>{sim.plan}</td>
                    <td>
                      <span className="status-badge status-active">
                        {sim.status}
                      </span>
                    </td>
                    <td>{sim.dataUsed} / {sim.dataLimit}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-secondary">Manage</button>
                        <button className="btn-danger">Suspend</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <>
            <div className="welcome-message">
              <h2 className="welcome-title">Welcome back, {user?.fullName}!</h2>
              <p className="welcome-text">
                Here's an overview of your telecom services and account activity.
              </p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <h3 className="stat-title">Active SIMs</h3>
                <div className="stat-value">{activeSIMs.length}</div>
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Total Data Used</h3>
                <div className="stat-value">10.6 GB</div>
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Monthly Bill</h3>
                <div className="stat-value">$70</div>
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Account Status</h3>
                <div className="stat-value" style={{ fontSize: '1.5rem', color: '#10b981' }}>Active</div>
              </div>
            </div>

            <div className="content-section">
              <div className="section-header">
                <h2 className="section-title">Quick Actions</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <button 
                  className="btn-primary" 
                  style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => setActiveSection('view-plans')}
                >
                  <Plus size={20} />
                  Buy New Plan
                </button>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => setActiveSection('activate-sim')}
                >
                  <Sim size={20} />
                  Activate SIM
                </button>
              </div>
            </div>

            <div className="content-section">
              <div className="section-header">
                <h2 className="section-title">Recent Activity</h2>
              </div>
              <div style={{ padding: '1rem 0' }}>
                <div style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Calendar size={16} color="#6b7280" />
                  <span>Premium 5G plan activated - January 15, 2024</span>
                </div>
                <div style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <CreditCard size={16} color="#6b7280" />
                  <span>Monthly bill paid - January 1, 2024</span>
                </div>
                <div style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Smartphone size={16} color="#6b7280" />
                  <span>New SIM card requested - December 20, 2023</span>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Smartphone size={32} />
          <span className="sidebar-title">Customer Portal</span>
        </div>
        
        <nav>
          <ul className="sidebar-nav">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              if (item.path && item.path !== '#') {
                return (
                  <li key={item.id} className="sidebar-nav-item">
                    <Link 
                      to={item.path}
                      className={`sidebar-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </Link>
                  </li>
                );
              }
              
              return (
                <li key={item.id} className="sidebar-nav-item">
                  <button
                    onClick={() => handleSectionChange(item.id, item.path)}
                    className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      width: '100%', 
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon size={20} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <button onClick={logout} className="logout-button">
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Customer Dashboard</h1>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default CustomerDashboard;
