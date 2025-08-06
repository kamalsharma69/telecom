import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlanService, SimService } from '../services/api';
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
  Zap,
  Users,
  Clock,
  Star,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Globe,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CustomerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [activatingPlan, setActivatingPlan] = useState<string | null>(null);

  // Mock data for customer with more interactive elements
  const activeSIMs = [
    { 
      id: '1', 
      number: '+1 (555) 123-4567', 
      plan: 'Premium 5G', 
      status: 'Active', 
      dataUsed: 8.5, 
      dataLimit: 15,
      networkType: '5G',
      signalStrength: 95,
      speed: '195 Mbps',
      location: 'New York',
      lastActive: '2 min ago'
    },
    { 
      id: '2', 
      number: '+1 (555) 987-6543', 
      plan: 'Basic 4G', 
      status: 'Active', 
      dataUsed: 2.1, 
      dataLimit: 5,
      networkType: '4G',
      signalStrength: 78,
      speed: '45 Mbps',
      location: 'Brooklyn',
      lastActive: '1 hour ago'
    }
  ];

  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const [userSimCards, setUserSimCards] = useState<any[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingSims, setLoadingSims] = useState(false);

  // Load plans and SIM cards on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingPlans(true);
        const plans = await PlanService.getPlans();
        const formattedPlans = plans.map((plan: any) => ({
          id: plan.id.toString(),
          name: plan.name,
          price: plan.price,
          data: plan.data,
          calls: 'Unlimited',
          texts: 'Unlimited',
          speed: plan.data === '5GB' ? '50 Mbps' : plan.data === '15GB' ? '200 Mbps' : '500 Mbps',
          popular: plan.name.includes('Premium'),
          features: plan.name.includes('Basic') ? ['Mobile Hotspot', 'HD Video', 'Music Streaming'] :
                   plan.name.includes('Premium') ? ['Mobile Hotspot', '4K Video', 'Music Streaming', 'Gaming Priority'] :
                   ['Mobile Hotspot', '4K Video', 'Music Streaming', 'Gaming Priority', 'International Roaming'],
          savings: plan.price > 30 ? '$10' : null
        }));
        setAvailablePlans(formattedPlans);
      } catch (error) {
        console.error('Error loading plans:', error);
      } finally {
        setLoadingPlans(false);
      }

      try {
        setLoadingSims(true);
        const sims = await SimService.getSimCards(user?.id || 1);
        setUserSimCards(sims);
      } catch (error) {
        console.error('Error loading SIM cards:', error);
      } finally {
        setLoadingSims(false);
      }
    };

    loadData();
  }, [user?.id]);

  const handleSimActivation = async (planId: string) => {
    try {
      setActivatingPlan(planId);
      const newSim = await SimService.activateSim(parseInt(planId));
      setUserSimCards(prev => [...prev, newSim]);
      alert('SIM activated successfully!');
      setActiveSection('my-sims');
    } catch (error) {
      console.error('Error activating SIM:', error);
      alert('Failed to activate SIM. Please try again.');
    } finally {
      setActivatingPlan(null);
    }
  };

  const SimActivationForm = ({ availablePlans, onActivate }: { availablePlans: any[], onActivate: (planId: string) => void }) => {
    const [selectedPlan, setSelectedPlan] = useState('');
    const [simNumber, setSimNumber] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedPlan) {
        alert('Please select a plan');
        return;
      }
      onActivate(selectedPlan);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div className="form-group">
          <label className="form-label">
            <Smartphone className="w-4 h-4 mr-2 text-blue-600" />
            SIM Card Number
          </label>
          <input
            type="text"
            value={simNumber}
            onChange={(e) => setSimNumber(e.target.value)}
            className="input-field"
            placeholder="Enter 20-digit SIM number"
            maxLength={20}
          />
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            Found on your SIM card packaging
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Eye className="w-4 h-4 mr-2 text-blue-600" />
            Choose Plan
          </label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select a plan</option>
            {availablePlans.map(plan => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - ${plan.price}/month
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={activatingPlan !== null}
          className="btn-primary flex items-center space-x-2 w-full disabled:opacity-50"
        >
          {activatingPlan ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Activating...</span>
            </>
          ) : (
            <>
              <Smartphone className="w-5 h-5" />
              <span>Activate SIM</span>
              <Sparkles className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </form>
    );
  };

  const recentActivities = [
    { id: '1', type: 'payment', desc: 'Monthly bill paid', date: '2 days ago', amount: '$70', icon: CreditCard, color: 'green' },
    { id: '2', type: 'data', desc: 'Data limit reached (75%)', date: '5 days ago', amount: null, icon: BarChart3, color: 'yellow' },
    { id: '3', type: 'plan', desc: 'Plan upgraded to Premium 5G', date: '1 week ago', amount: null, icon: TrendingUp, color: 'blue' },
    { id: '4', type: 'sim', desc: 'New SIM activated', date: '2 weeks ago', amount: null, icon: Smartphone, color: 'purple' },
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Activity, badge: null as string | null },
    { id: 'activate-sim', label: 'Activate SIM', icon: Smartphone, badge: null as string | null },
    { id: 'view-plans', label: 'View Plans', icon: Eye, badge: '3 new' as string | null },
    { id: 'my-bills', label: 'My Bills', icon: CreditCard, badge: null as string | null, path: '/billing' },
    { id: 'my-sims', label: 'My SIMs', icon: Smartphone, badge: null as string | null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null as string | null }
  ];

  const [realTimeData, setRealTimeData] = useState({
    dataUsage: 8.5,
    speed: 195,
    signal: 95
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        dataUsage: prev.dataUsage + (Math.random() - 0.5) * 0.1,
        speed: Math.max(150, Math.min(250, prev.speed + (Math.random() - 0.5) * 10)),
        signal: Math.max(70, Math.min(100, prev.signal + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSectionChange = (sectionId: string, path?: string) => {
    if (path && path !== '#') {
      return; // Let Link handle navigation
    }
    setIsLoading(true);
    setTimeout(() => {
      setActiveSection(sectionId);
      setSidebarOpen(false);
      setIsLoading(false);
    }, 300);
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue', realTime = false }: any) => (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {change && (
            <p className={`text-sm flex items-center ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change.startsWith('+') ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {change}
            </p>
          )}
          {realTime && (
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
          )}
        </div>
        <div className={`stat-icon p-4 bg-${color}-50 rounded-xl`}>
          <Icon className={`w-8 h-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const PlanCard = ({ plan }: { plan: any }) => (
    <div className={`relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 group cursor-pointer ${
      plan.popular 
        ? 'border-blue-500 transform scale-105 bg-gradient-to-br from-blue-50 to-purple-50' 
        : 'border-gray-100 hover:border-blue-300'
    }`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </span>
        </div>
      )}
      
      {plan.savings && (
        <div className="absolute -top-2 -right-2">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Save {plan.savings}
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {plan.name}
        </h3>
        <div className="text-4xl font-bold text-blue-600 mb-1">
          ${plan.price}
          <span className="text-lg text-gray-500 font-normal">/month</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Wifi className="w-5 h-5 text-blue-500 mr-3" />
            <span className="text-gray-700">{plan.data} Data</span>
          </div>
          <Zap className="w-4 h-4 text-yellow-500" />
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Up to {plan.speed}</span>
          </div>
        </div>
        <div className="space-y-2">
          {plan.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {feature}
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => handleSimActivation(plan.id)}
        disabled={activatingPlan === plan.id}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 ${
          plan.popular
            ? 'btn-primary'
            : 'bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-800'
        }`}
      >
        {activatingPlan === plan.id ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span>Activating...</span>
          </div>
        ) : (
          plan.popular ? 'Upgrade Now' : 'Select Plan'
        )}
      </button>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'activate-sim':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Activate New SIM</h2>
                  <p className="text-gray-600">Enter your SIM details to get started instantly</p>
                </div>
              </div>
              
              <SimActivationForm availablePlans={availablePlans} onActivate={handleSimActivation} />
            </div>
          </div>
        );

      case 'view-plans':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Plan</h2>
              <p className="text-gray-600 text-xl">Upgrade or change your plan anytime with no hidden fees</p>
            </div>
            
            {loadingPlans ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading plans...</p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {availablePlans.map(plan => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            )}
          </div>
        );

      case 'my-sims':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Smartphone className="w-6 h-6 mr-2 text-blue-600" />
                  My SIM Cards
                </h2>
                <p className="text-gray-600">Manage your active SIM cards and monitor usage</p>
              </div>
              
              <div className="overflow-x-auto">
                {loadingSims ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr className="table-header">
                        <th>Phone Number</th>
                        <th>Plan & Status</th>
                        <th>Data Usage</th>
                        <th>Expiry Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userSimCards.map(sim => (
                        <tr key={sim.id} className="table-row group">
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <Smartphone className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{sim.number}</div>
                                <div className="text-sm text-gray-500">Activated: {sim.activationDate}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="font-medium text-gray-900">{sim.plan}</div>
                              <span className={`status-badge ${
                                sim.status === 'Active' ? 'status-active' : 'status-inactive'
                              }`}>
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  sim.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                                }`}></div>
                                {sim.status}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-600">
                                {sim.dataUsed} / {sim.dataTotal}
                              </div>
                              <div className="progress-bar">
                                <div
                                  className="progress-fill"
                                  style={{ width: sim.dataTotal === 'Unlimited' ? '100%' : `${(parseFloat(sim.dataUsed) / parseFloat(sim.dataTotal)) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-sm text-gray-600">{sim.expiryDate}</div>
                          </td>
                          <td>
                            <div className="flex space-x-2">
                              <button className="btn-secondary text-sm hover:scale-105 transition-transform">
                                Manage
                              </button>
                              {sim.status === 'Active' && (
                                <button className="btn-danger text-sm hover:scale-105 transition-transform">
                                  Suspend
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-blue-600" />
                Account Settings
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="input-field" value={user?.fullName || ''} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="input-field" value={user?.email || ''} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-blue-600" />
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <span className="text-gray-700">Email notifications for billing</span>
                      <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all hover:scale-110" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <span className="text-gray-700">SMS alerts for data usage</span>
                      <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all hover:scale-110" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <span className="text-gray-700">Marketing communications</span>
                      <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all hover:scale-110" />
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
          <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Welcome back, {user?.fullName}!</h2>
                  <p className="text-blue-100 text-xl mb-4">Here's your telecom dashboard overview</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Last login: Today 9:24 AM
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Account since 2023
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Smartphone className="w-12 h-12" />
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Active SIMs"
                value={userSimCards.filter(sim => sim.status === 'Active').length}
                change="+1 this month"
                icon={Smartphone}
                color="blue"
              />
              <StatCard 
                title="Data Used" 
                value={`${realTimeData.dataUsage.toFixed(1)} GB`} 
                change="+2.3 GB"
                icon={BarChart3}
                color="green"
                realTime={true}
              />
              <StatCard 
                title="Network Speed" 
                value={`${Math.round(realTimeData.speed)} Mbps`} 
                change="+15 Mbps"
                icon={Zap}
                color="purple"
                realTime={true}
              />
              <StatCard 
                title="Signal Quality" 
                value={`${Math.round(realTimeData.signal)}%`} 
                change="+3%"
                icon={Signal}
                color="indigo"
                realTime={true}
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-blue-600" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={() => setActiveSection('view-plans')}
                  className="card-interactive p-6 bg-gradient-to-r from-blue-50 to-indigo-50 group"
                >
                  <div className="flex items-center">
                    <div className="p-4 bg-blue-600 text-white rounded-xl mr-4 group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-lg">Upgrade Plan</h4>
                      <p className="text-gray-600">Get more data and speed</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button 
                  onClick={() => setActiveSection('activate-sim')}
                  className="card-interactive p-6 bg-gradient-to-r from-green-50 to-emerald-50 group"
                >
                  <div className="flex items-center">
                    <div className="p-4 bg-green-600 text-white rounded-xl mr-4 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-lg">Activate SIM</h4>
                      <p className="text-gray-600">Get started quickly</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <Link to="/billing" className="card-interactive p-6 bg-gradient-to-r from-purple-50 to-pink-50 group">
                  <div className="flex items-center">
                    <div className="p-4 bg-purple-600 text-white rounded-xl mr-4 group-hover:scale-110 transition-transform">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-lg">View Bills</h4>
                      <p className="text-gray-600">Download invoices</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-blue-600" />
                  Recent Activity
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivities.map(activity => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="p-6 hover:bg-gray-50 transition-all duration-200 group">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform ${
                          activity.color === 'green' ? 'bg-green-100' :
                          activity.color === 'yellow' ? 'bg-yellow-100' :
                          activity.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            activity.color === 'green' ? 'text-green-600' :
                            activity.color === 'yellow' ? 'text-yellow-600' :
                            activity.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.desc}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                        {activity.amount && (
                          <span className="font-bold text-green-600 text-lg">{activity.amount}</span>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-300 ml-4 group-hover:text-gray-500 transition-colors" />
                      </div>
                    </div>
                  );
                })}
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl animate-slide-in">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-40">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
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
                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200 hover:scale-110">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200 hover:scale-110 relative">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="notification-badge">{notifications}</span>
                  )}
                </button>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform cursor-pointer">
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
            <div className="p-3 bg-white/20 rounded-xl mr-3 backdrop-blur-sm">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Telecom</h2>
              <p className="text-sm text-gray-300">Customer Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
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
                  className={`nav-item ${location.pathname === item.path ? 'nav-item-active' : 'nav-item-inactive'}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
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
                className={`w-full nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'} sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center mb-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">{user?.fullName}</p>
              <p className="text-gray-300 text-sm">{user?.email}</p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-red-600/20 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Sign Out
          </button>
        </div>
      </div>
    );
  }
};

export default CustomerDashboard;
