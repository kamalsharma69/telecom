import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Download,
  CreditCard,
  Calendar,
  DollarSign,
  FileText,
  Filter,
  Search,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Smartphone,
  Wifi,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Billing: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock billing data
  const bills = [
    {
      id: 'INV-2024-001',
      date: '2024-01-01',
      dueDate: '2024-01-15',
      amount: 70.00,
      status: 'paid',
      services: [
        { name: 'Premium 5G Plan', amount: 45.00, details: '15GB Data, Unlimited Calls/Texts' },
        { name: 'Basic 4G Plan', amount: 25.00, details: '5GB Data, Unlimited Calls/Texts' }
      ],
      paymentMethod: 'Credit Card ****4532',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01',
      dueDate: '2023-12-15',
      amount: 70.00,
      status: 'paid',
      services: [
        { name: 'Premium 5G Plan', amount: 45.00, details: '15GB Data, Unlimited Calls/Texts' },
        { name: 'Basic 4G Plan', amount: 25.00, details: '5GB Data, Unlimited Calls/Texts' }
      ],
      paymentMethod: 'Credit Card ****4532',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-01',
      dueDate: '2023-11-15',
      amount: 45.00,
      status: 'paid',
      services: [
        { name: 'Premium 5G Plan', amount: 45.00, details: '15GB Data, Unlimited Calls/Texts' }
      ],
      paymentMethod: 'Credit Card ****4532',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-01',
      dueDate: '2023-10-15',
      amount: 45.00,
      status: 'overdue',
      services: [
        { name: 'Premium 5G Plan', amount: 45.00, details: '15GB Data, Unlimited Calls/Texts' }
      ],
      paymentMethod: 'Failed Payment',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-002',
      date: '2024-02-01',
      dueDate: '2024-02-15',
      amount: 70.00,
      status: 'pending',
      services: [
        { name: 'Premium 5G Plan', amount: 45.00, details: '15GB Data, Unlimited Calls/Texts' },
        { name: 'Basic 4G Plan', amount: 25.00, details: '5GB Data, Unlimited Calls/Texts' }
      ],
      paymentMethod: 'Auto-pay enabled',
      downloadUrl: '#'
    }
  ];

  const filteredBills = bills.filter(bill => {
    if (selectedFilter !== 'all' && bill.status !== selectedFilter) return false;
    if (searchTerm && !bill.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";
    
    switch (status) {
      case 'paid':
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'overdue':
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue
          </span>
        );
      default:
        return null;
    }
  };

  const handleDownloadPDF = (billId: string) => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading PDF for bill:', billId);
    alert('PDF download feature would be implemented here');
  };

  const totalPaid = bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0);
  const pendingAmount = bills.filter(b => b.status === 'pending' || b.status === 'overdue').reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Paid</p>
                <p className="text-3xl font-bold text-green-600">${totalPaid.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">This year</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Pending Amount</p>
                <p className="text-3xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">Due soon</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Next Payment</p>
                <p className="text-3xl font-bold text-blue-600">Feb 15</p>
                <p className="text-sm text-gray-500 mt-1">$70.00 due</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Current Plan Info */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Current Plans</h2>
              <p className="text-blue-100 mb-4">Your active telecom services</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <Smartphone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Premium 5G Plan</span>
                  </div>
                  <div className="space-y-1 text-sm text-blue-100">
                    <div className="flex items-center">
                      <Wifi className="w-4 h-4 mr-2" />
                      15GB High-Speed Data
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Unlimited Calls
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Unlimited Texts
                    </div>
                  </div>
                  <div className="mt-3 text-xl font-bold">$45/month</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <Smartphone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Basic 4G Plan</span>
                  </div>
                  <div className="space-y-1 text-sm text-blue-100">
                    <div className="flex items-center">
                      <Wifi className="w-4 h-4 mr-2" />
                      5GB High-Speed Data
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Unlimited Calls
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Unlimited Texts
                    </div>
                  </div>
                  <div className="mt-3 text-xl font-bold">$25/month</div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 font-medium">Filter by status:</span>
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Bills</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by invoice ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Bills Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Billing History</h3>
            <p className="text-gray-600">View and download your past invoices</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Invoice ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBills.map(bill => (
                  <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">{bill.id}</div>
                          <div className="text-sm text-gray-500">{bill.paymentMethod}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(bill.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(bill.dueDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">${bill.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(bill.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDownloadPDF(bill.id)}
                          className="btn-secondary text-sm flex items-center space-x-1"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                          <span>PDF</span>
                        </button>
                        <button
                          className="btn-secondary text-sm"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredBills.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bills found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No bills match the selected filter'}
              </p>
            </div>
          )}
        </div>

        {/* Payment Method Section */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h3>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Credit Card ending in 4532</div>
                <div className="text-sm text-gray-500">Expires 12/2025 • Auto-pay enabled</div>
              </div>
            </div>
            <button className="btn-secondary">Update</button>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Auto-pay is enabled</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              Your bills will be automatically paid on the due date
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
