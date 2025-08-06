import React, { useState, useEffect } from 'react';
import { PlanService, SimService } from '../services/api';
import { 
  Users, 
  Settings, 
  LogOut, 
  Activity,
  BarChart3,
  Shield,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Eye,
  Smartphone,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [managePlansData, setManagePlansData] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingRequests(true);
        const requests = await SimService.getSimRequests();
        setPendingRequests(requests.filter(req => req.status === 'Pending'));
      } catch (error) {
        console.error('Error loading SIM requests:', error);
      } finally {
        setLoadingRequests(false);
      }

      try {
        setLoadingPlans(true);
        const plans = await PlanService.getPlans();
        const formattedPlans = plans.map((plan: any) => ({
          id: plan.id.toString(),
          name: plan.name,
          price: plan.price,
          data: plan.data,
          speed: plan.data === '5GB' ? '50 Mbps' : plan.data === '15GB' ? '200 Mbps' : '500 Mbps',
          subscribers: Math.floor(Math.random() * 3000) + 500,
          revenue: `$${(plan.price * (Math.floor(Math.random() * 3000) + 500)).toLocaleString()}`,
          status: 'active'
        }));
        setManagePlansData(formattedPlans);
      } catch (error) {
        console.error('Error loading plans:', error);
      } finally {
        setLoadingPlans(false);
      }
    };

    loadData();
  }, []);

  const recentActivities = [
    { id: '1', action: 'Plan approved', user: 'John Doe', time: '2 minutes ago', type: 'approval' },
    { id: '2', action: 'New plan created', user: 'Admin', time: '1 hour ago', type: 'creation' },
    { id: '3', action: 'SIM request rejected', user: 'Jane Smith', time: '3 hours ago', type: 'rejection' },
    { id: '4', action: 'Plan updated', user: 'Admin', time: '5 hours ago', type: 'update' },
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'manage-plans', label: 'Manage Plans', icon: Settings },
    { id: 'approve-requests', label: 'SIM Requests', icon: Users, badge: pendingRequests.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'System Settings', icon: Shield }
  ];

  const [planForm, setPlanForm] = useState({
    name: '',
    price: '',
    data: '',
    speed: '',
    description: ''
  });

  const [editingPlan, setEditingPlan] = useState<string | null>(null);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      await SimService.approveSimRequest(parseInt(requestId));
      setPendingRequests(prev => prev.filter(req => req.id !== parseInt(requestId)));
      alert('SIM request approved successfully!');
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request. Please try again.');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await SimService.rejectSimRequest(parseInt(requestId));
      setPendingRequests(prev => prev.filter(req => req.id !== parseInt(requestId)));
      alert('SIM request rejected.');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request. Please try again.');
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPlan = await PlanService.createPlan({
        name: planForm.name,
        price: parseFloat(planForm.price),
        data: planForm.data,
        description: planForm.description
      });

      const formattedPlan = {
        id: newPlan.id.toString(),
        name: newPlan.name,
        price: newPlan.price,
        data: newPlan.data,
        speed: planForm.speed,
        subscribers: 0,
        revenue: '$0',
        status: 'active'
      };

      if (editingPlan === 'new') {
        setManagePlansData(prev => [...prev, formattedPlan]);
      } else {
        setManagePlansData(prev => prev.map(plan =>
          plan.id === editingPlan ? formattedPlan : plan
        ));
      }

      setPlanForm({ name: '', price: '', data: '', speed: '', description: '' });
      setEditingPlan(null);
      alert('Plan saved successfully!');
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan. Please try again.');
    }
  };

  const handleEditPlan = (planId: string) => {
    setEditingPlan(planId);
    const plan = managePlansData.find(p => p.id === planId);
    if (plan) {
      setPlanForm({
        name: plan.name,
        price: plan.price.toString(),
        data: plan.data,
        speed: plan.speed,
        description: ''
      });
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      try {
        await PlanService.deletePlan(parseInt(planId));
        setManagePlansData(prev => prev.filter(plan => plan.id !== planId));
        alert('Plan deleted successfully!');
      } catch (error) {
        console.error('Error deleting plan:', error);
        alert('Failed to delete plan. Please try again.');
      }
    }
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
      case 'approve-requests':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">SIM Activation Requests</h2>
                <p className="text-gray-600">Review and approve customer SIM requests</p>
              </div>
              <div className="flex space-x-3">
                <button className="btn-secondary flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">SIM Number</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan Requested</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Request Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loadingRequests ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-3"></div>
                            <span className="text-gray-600">Loading requests...</span>
                          </div>
                        </td>
                      </tr>
                    ) : pendingRequests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          No pending requests
                        </td>
                      </tr>
                    ) : (
                      pendingRequests.map(request => (
                        <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{request.customerName}</div>
                              <div className="text-sm text-gray-500">{request.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                              {request.phoneNumber}
                            </code>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {request.planName}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {request.requestDate}
                          </td>
                          <td className="px-6 py-4">
                            <span className="status-badge status-pending flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApproveRequest(request.id.toString())}
                                className="btn-success text-sm flex items-center space-x-1"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleRejectRequest(request.id.toString())}
                                className="btn-danger text-sm flex items-center space-x-1"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Reject</span>
                              </button>
                              <button className="btn-secondary text-sm">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'manage-plans':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Plans</h2>
                <p className="text-gray-600">Create, edit, and manage telecom plans</p>
              </div>
              <button 
                onClick={() => setEditingPlan('new')}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Plan</span>
              </button>
            </div>

            {editingPlan && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {editingPlan === 'new' ? 'Create New Plan' : 'Edit Plan'}
                </h3>
                <form onSubmit={handleCreatePlan} className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Name</label>
                    <input 
                      type="text" 
                      value={planForm.name}
                      onChange={(e) => setPlanForm({...planForm, name: e.target.value})}
                      className="input-field" 
                      placeholder="e.g., Premium 5G" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price (USD)</label>
                    <input 
                      type="number" 
                      value={planForm.price}
                      onChange={(e) => setPlanForm({...planForm, price: e.target.value})}
                      className="input-field" 
                      placeholder="45" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Data Allowance</label>
                    <input 
                      type="text" 
                      value={planForm.data}
                      onChange={(e) => setPlanForm({...planForm, data: e.target.value})}
                      className="input-field" 
                      placeholder="15 GB" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Max Speed</label>
                    <input 
                      type="text" 
                      value={planForm.speed}
                      onChange={(e) => setPlanForm({...planForm, speed: e.target.value})}
                      className="input-field" 
                      placeholder="200 Mbps" 
                      required 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                      value={planForm.description}
                      onChange={(e) => setPlanForm({...planForm, description: e.target.value})}
                      className="input-field" 
                      rows={3}
                      placeholder="Plan description and features..."
                    />
                  </div>
                  <div className="md:col-span-2 flex space-x-3">
                    <button type="submit" className="btn-primary">
                      {editingPlan === 'new' ? 'Create Plan' : 'Update Plan'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setEditingPlan(null)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Data</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Speed</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subscribers</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loadingPlans ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-3"></div>
                            <span className="text-gray-600">Loading plans...</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      managePlansData.map(plan => (
                        <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{plan.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900">${plan.price}/mo</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{plan.data}</td>
                          <td className="px-6 py-4 text-gray-600">{plan.speed}</td>
                          <td className="px-6 py-4">
                            <div className="text-gray-900 font-medium">{plan.subscribers.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-green-600">{plan.revenue}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`status-badge ${plan.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                              {plan.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditPlan(plan.id)}
                                className="btn-secondary text-sm"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePlan(plan.id)}
                                className="btn-danger text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">Monitor business metrics and performance</p>
            </div>

            {/* Analytics Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Revenue" 
                value="$190,750" 
                change="+12.5%"
                icon={CreditCard}
                color="green"
              />
              <StatCard 
                title="Active Customers" 
                value="4,850" 
                change="+8.2%"
                icon={Users}
                color="blue"
              />
              <StatCard 
                title="SIM Activations" 
                value="156" 
                change="+15.3%"
                icon={Smartphone}
                color="purple"
              />
              <StatCard 
                title="Avg. Revenue per User" 
                value="$39.32" 
                change="+3.1%"
                icon={BarChart3}
                color="indigo"
              />
            </div>

            {/* Charts placeholder */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Plan Distribution</h3>
                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h2>
              <p className="text-gray-600">Manage system configuration and preferences</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                      <input type="text" className="input-field" value="Telecom Portal" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Support Email</label>
                      <input type="email" className="input-field" value="support@telecom.com" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <span className="ml-3 text-gray-700">Email alerts for new SIM requests</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <span className="ml-3 text-gray-700">Daily revenue reports</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span className="ml-3 text-gray-700">Weekly analytics summary</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="btn-primary">Save Settings</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
                  <p className="text-indigo-100 text-lg">Welcome back, {user?.fullName}! Here's your system overview</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Pending Requests" 
                value={pendingRequests.length} 
                change="+2 today"
                icon={Clock}
                color="yellow"
              />
              <StatCard 
                title="Active Plans" 
                value={managePlansData.filter(p => p.status === 'active').length} 
                change="No change"
                icon={Settings}
                color="blue"
              />
              <StatCard 
                title="Total Customers" 
                value="4,850" 
                change="+125 this month"
                icon={Users}
                color="green"
              />
              <StatCard 
                title="Monthly Revenue" 
                value="$190,750" 
                change="+12.5%"
                icon={BarChart3}
                color="purple"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveSection('approve-requests')}
                  className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all duration-200 group"
                >
                  <div className="p-3 bg-yellow-600 text-white rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Review Requests</h4>
                    <p className="text-sm text-gray-600">{pendingRequests.length} pending approvals</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>

                <button 
                  onClick={() => setActiveSection('manage-plans')}
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
                >
                  <div className="p-3 bg-blue-600 text-white rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Manage Plans</h4>
                    <p className="text-sm text-gray-600">Create and edit plans</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>

                <button 
                  onClick={() => setActiveSection('analytics')}
                  className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
                >
                  <div className="p-3 bg-green-600 text-white rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">View Analytics</h4>
                    <p className="text-sm text-gray-600">Business insights</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
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
                        activity.type === 'approval' ? 'bg-green-100' :
                        activity.type === 'creation' ? 'bg-blue-100' :
                        activity.type === 'rejection' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        {activity.type === 'approval' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {activity.type === 'creation' && <Plus className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'rejection' && <XCircle className="w-5 h-5 text-red-600" />}
                        {activity.type === 'update' && <Edit className="w-5 h-5 text-yellow-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">by {activity.user} • {activity.time}</p>
                      </div>
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
                  {activeSection === 'overview' ? 'Admin Dashboard' : 
                   activeSection === 'manage-plans' ? 'Manage Plans' :
                   activeSection === 'approve-requests' ? 'SIM Requests' :
                   activeSection === 'analytics' ? 'Analytics' :
                   activeSection === 'settings' ? 'Settings' : 'Admin Dashboard'}
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
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold">
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Telecom</h2>
              <p className="text-sm text-gray-300">Admin Portal</p>
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
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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
              <p className="text-gray-300 text-sm">Administrator</p>
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

export default AdminDashboard;
