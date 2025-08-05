import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Smartphone,
  Eye,
  CreditCard,
  LogOut,
  Activity,
  Plus,
  Wifi,
  BarChart3,
  Signal,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CustomerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for customer
  const activeSIMs = [
    { 
      id: '1', 
      number: '+1 (555) 123-4567', 
      plan: 'Premium 5G', 
      status: 'Active', 
      dataUsed: 8.5, 
      dataLimit: 15,
      networkType: '5G',
      signalStrength: 95
    },
    { 
      id: '2', 
      number: '+1 (555) 987-6543', 
      plan: 'Basic 4G', 
      status: 'Active', 
      dataUsed: 2.1, 
      dataLimit: 5,
      networkType: '4G',
      signalStrength: 78
    }
  ];

  const availablePlans = [
    { 
      id: '1', 
      name: 'Basic 4G', 
      price: 25, 
      data: '5 GB', 
      calls: 'Unlimited', 
      texts: 'Unlimited',
      speed: '50 Mbps',
      popular: false
    },
    { 
      id: '2', 
      name: 'Premium 5G', 
      price: 45, 
      data: '15 GB', 
      calls: 'Unlimited', 
      texts: 'Unlimited',
      speed: '200 Mbps',
      popular: true
    },
    { 
      id: '3', 
      name: 'Ultimate 5G', 
      price: 65, 
      data: '50 GB', 
      calls: 'Unlimited', 
      texts: 'Unlimited',
      speed: '500 Mbps',
      popular: false
    }
  ];

  const recentActivities = [
    { id: '1', type: 'payment', desc: 'Monthly bill paid', date: '2 days ago', amount: '$70' },
    { id: '2', type: 'data', desc: 'Data limit reached (75%)', date: '5 days ago', amount: null },
    { id: '3', type: 'plan', desc: 'Plan upgraded to Premium 5G', date: '1 week ago', amount: null },
    { id: '4', type: 'sim', desc: 'New SIM activated', date: '2 weeks ago', amount: null },
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Activity, badge: null },
    { id: 'activate-sim', label: 'Activate SIM', icon: Smartphone, badge: null },
    { id: 'view-plans', label: 'View Plans', icon: Eye, badge: '3 new' },
    { id: 'my-bills', label: 'My Bills', icon: CreditCard, badge: null, path: '/billing' },
    { id: 'my-sims', label: 'My SIMs', icon: Smartphone, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const handleSectionChange = (sectionId: string, path?: string) => {
    if (path && path !== '#') {
      return; // Let Link handle navigation
    }
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm flex items-center mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-4 bg-${color}-50 rounded-xl`}>
          <Icon className={`w-8 h-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'activate-sim':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-xl mr-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Activate New SIM</h2>
                  <p className="text-gray-600">Enter your SIM details to get started</p>
                </div>
              </div>
              
              <form className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SIM Card Number
                  </label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter 20-digit SIM number"
                    maxLength={20}
                  />
                  <p className="text-xs text-gray-500 mt-1">Found on your SIM card packaging</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Choose Plan
                  </label>
                  <select className="input-field">
                    <option value="">Select a plan</option>
                    {availablePlans.map(plan => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - ${plan.price}/month
                      </option>
                    ))}
                  </select>
                </div>
                
                <button type="submit" className="btn-primary flex items-center space-x-2">
                  <Smartphone className="w-5 h-5" />
                  <span>Activate SIM</span>
                </button>
              </form>
            </div>
          </div>
        );

      case 'view-plans':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Perfect Plan</h2>
              <p className="text-gray-600 text-lg">Upgrade or change your plan anytime</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {availablePlans.map(plan => (
                <div 
                  key={plan.id} 
                  className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${plan.popular ? 'border-blue-500 transform scale-105' : 'border-gray-100'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-1">
                      ${plan.price}
                      <span className="text-lg text-gray-500 font-normal">/month</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <Wifi className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{plan.data} High-Speed Data</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 text-yellow-500 mr-3" />
                      <span className="text-gray-700">Up to {plan.speed}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-3">📞</span>
                      <span className="text-gray-700">{plan.calls} Calls</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-3">💬</span>
                      <span className="text-gray-700">{plan.texts} Texts</span>
                    </div>
                  </div>
                  
                  <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${plan.popular ? 'btn-primary' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
                    {plan.popular ? 'Upgrade Now' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'my-sims':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">My SIM Cards</h2>
                <p className="text-gray-600">Manage your active SIM cards</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Data Usage</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Signal</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {activeSIMs.map(sim => (
                      <tr key={sim.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Smartphone className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="font-medium text-gray-900">{sim.number}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{sim.plan}</div>
                            <div className="text-sm text-gray-500">{sim.networkType} Network</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="status-badge status-active">
                            {sim.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(sim.dataUsed / sim.dataLimit) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{sim.dataUsed} GB / {sim.dataLimit} GB</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Signal className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-600">{sim.signalStrength}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="btn-secondary text-sm">Manage</button>
                            <button className="btn-danger text-sm">Suspend</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="input-field" value={user?.fullName || ''} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" className="input-field" value={user?.email || ''} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <span className="ml-3 text-gray-700">Email notifications for billing</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <span className="ml-3 text-gray-700">SMS alerts for data usage</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span className="ml-3 text-gray-700">Marketing communications</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName}!</h2>
                  <p className="text-blue-100 text-lg">Here's your telecom dashboard overview</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Active SIMs" 
                value={activeSIMs.length} 
                change="+1 this month"
                icon={Smartphone}
                color="blue"
              />
              <StatCard 
                title="Data Used" 
                value="10.6 GB" 
                change="+2.3 GB"
                icon={BarChart3}
                color="green"
              />
              <StatCard 
                title="Monthly Bill" 
                value="$70" 
                change="-$5 saved"
                icon={CreditCard}
                color="purple"
              />
              <StatCard 
                title="Network Quality" 
                value="95%" 
                change="+3%"
                icon={Signal}
                color="indigo"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveSection('view-plans')}
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
                >
                  <div className="p-3 bg-blue-600 text-white rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Buy Plan</h4>
                    <p className="text-sm text-gray-600">Upgrade your service</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>

                <button 
                  onClick={() => setActiveSection('activate-sim')}
                  className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
                >
                  <div className="p-3 bg-green-600 text-white rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Activate SIM</h4>
                    <p className="text-sm text-gray-600">Get started quickly</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>

                <Link to="/billing" className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group">
                  <div className="p-3 bg-purple-600 text-white rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">View Bills</h4>
                    <p className="text-sm text-gray-600">Download invoices</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-4 ${
                        activity.type === 'payment' ? 'bg-green-100' :
                        activity.type === 'data' ? 'bg-yellow-100' :
                        activity.type === 'plan' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'payment' && <CreditCard className="w-5 h-5 text-green-600" />}
                        {activity.type === 'data' && <BarChart3 className="w-5 h-5 text-yellow-600" />}
                        {activity.type === 'plan' && <Eye className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'sim' && <Smartphone className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.desc}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      {activity.amount && (
                        <span className="font-semibold text-green-600">{activity.amount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-gray-900">
                  {activeSection === 'overview' ? 'Dashboard' : 
                   activeSection === 'activate-sim' ? 'Activate SIM' :
                   activeSection === 'view-plans' ? 'Plans' :
                   activeSection === 'my-sims' ? 'My SIMs' :
                   activeSection === 'settings' ? 'Settings' : 'Dashboard'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );

  function SidebarContent() {
    return (
      <div className="flex flex-col h-full sidebar-gradient">
        {/* Logo */}
        <div className="flex items-center px-6 py-6">
          <div className="flex items-center">
            <div className="p-2 bg-white/20 rounded-lg mr-3">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Telecom</h2>
              <p className="text-sm text-gray-300">Customer Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            if (item.path) {
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            }
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white font-semibold mr-3">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">{user?.fullName}</p>
              <p className="text-gray-300 text-sm">{user?.email}</p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-red-600/20 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    );
  }
};

export default CustomerDashboard;
