// API services with robust fallback for when backend is not available

const API_BASE_URL = 'http://localhost:8080/api';

// HTTP client with better error handling
const createApiClient = () => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return {
    async get(url: string) {
      try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
          method: 'GET',
          headers,
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      } catch (error) {
        console.warn(`API call failed for ${url}:`, error);
        throw error;
      }
    },
    
    async post(url: string, data: any) {
      try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
          signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      } catch (error) {
        console.warn(`API call failed for ${url}:`, error);
        throw error;
      }
    },
    
    async put(url: string, data: any) {
      try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(data),
          signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      } catch (error) {
        console.warn(`API call failed for ${url}:`, error);
        throw error;
      }
    },
    
    async delete(url: string) {
      try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
          method: 'DELETE',
          headers,
          signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.ok;
      } catch (error) {
        console.warn(`API call failed for ${url}:`, error);
        throw error;
      }
    }
  };
};

// Mock data (always available as fallback)
const mockUsers = [
  { id: 1, email: 'admin@telecom.com', password: 'admin123', fullName: 'Admin User', role: 'ADMIN', phoneNumber: '+1 (555) 000-0001', address: '123 Admin St', isActive: true },
  { id: 2, email: 'customer@email.com', password: 'customer123', fullName: 'Customer User', role: 'CUSTOMER', phoneNumber: '+1 (555) 000-0002', address: '456 Customer Ave', isActive: true }
];

const mockPlans = [
  { id: 1, name: 'Basic Plan', price: 29.99, data: '5GB', description: 'Perfect for light users' },
  { id: 2, name: 'Premium Plan', price: 49.99, data: '15GB', description: 'Best for regular users' },
  { id: 3, name: 'Enterprise Plan', price: 99.99, data: 'Unlimited', description: 'For heavy data users' }
];

const mockSimCards = [
  {
    id: 1,
    number: '+1 (555) 123-4567',
    status: 'Active',
    plan: 'Premium Plan',
    dataUsed: '8.2GB',
    dataTotal: '15GB',
    expiryDate: '2024-02-15',
    activationDate: '2024-01-15'
  },
  {
    id: 2,
    number: '+1 (555) 987-6543',
    status: 'Inactive',
    plan: 'Basic Plan',
    dataUsed: '0GB',
    dataTotal: '5GB',
    expiryDate: '2024-01-20',
    activationDate: '2024-01-01'
  }
];

const mockBills = [
  {
    id: 1,
    month: 'January 2024',
    amount: 49.99,
    status: 'Paid',
    dueDate: '2024-01-31',
    paidDate: '2024-01-25',
    planName: 'Premium Plan',
    dataUsage: '12.5GB'
  },
  {
    id: 2,
    month: 'December 2023',
    amount: 49.99,
    status: 'Paid',
    dueDate: '2023-12-31',
    paidDate: '2023-12-28',
    planName: 'Premium Plan',
    dataUsage: '14.8GB'
  },
  {
    id: 3,
    month: 'November 2023',
    amount: 29.99,
    status: 'Paid',
    dueDate: '2023-11-30',
    paidDate: '2023-11-22',
    planName: 'Basic Plan',
    dataUsage: '4.2GB'
  }
];

const mockSimRequests = [
  {
    id: 1,
    customerName: 'John Doe',
    email: 'john.doe@email.com',
    phoneNumber: '+1 (555) 000-1234',
    planId: 2,
    planName: 'Premium Plan',
    status: 'Pending',
    requestDate: '2024-01-20',
    documents: ['ID Card', 'Address Proof']
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    email: 'jane.smith@email.com',
    phoneNumber: '+1 (555) 000-5678',
    planId: 1,
    planName: 'Basic Plan',
    status: 'Pending',
    requestDate: '2024-01-19',
    documents: ['ID Card', 'Address Proof']
  }
];

// Authentication Service
export class AuthService {
  static async login(email: string, password: string) {
    // Always try mock first for demo, then try real API
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    if (mockUser) {
      const { password: _, ...userWithoutPassword } = mockUser;
      console.log('Using mock authentication');
      return {
        token: 'demo-jwt-token-' + Date.now(),
        user: userWithoutPassword,
        message: 'Login successful (demo mode)'
      };
    }

    // Try real API if mock fails
    try {
      const api = createApiClient();
      const response = await api.post('/auth/login', { email, password });
      console.log('Using real API authentication');
      return response;
    } catch (error) {
      console.error('Both mock and real API login failed:', error);
      throw new Error('Invalid credentials');
    }
  }

  static async register(data: any) {
    // Mock registration for demo
    const newUser = {
      id: Date.now(),
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      phoneNumber: `+1 (555) ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      address: '123 New User St',
      isActive: true
    };
    
    console.log('Using mock registration');
    return {
      token: 'demo-jwt-token-' + Date.now(),
      user: newUser,
      message: 'Registration successful (demo mode)'
    };
  }

  static async validateToken() {
    // For demo purposes, always validate
    return { valid: true };
  }
}

// Plan Service with immediate fallback
export class PlanService {
  static async getPlans() {
    try {
      const api = createApiClient();
      const plans = await api.get('/plans');
      console.log('Using real API for plans');
      return plans;
    } catch (error) {
      console.log('API not available, using mock plans');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockPlans;
    }
  }

  static async createPlan(planData: any) {
    try {
      const api = createApiClient();
      return await api.post('/plans', planData);
    } catch (error) {
      console.log('API not available, using mock plan creation');
      const newPlan = {
        id: Date.now(),
        ...planData
      };
      mockPlans.push(newPlan);
      return newPlan;
    }
  }

  static async updatePlan(id: number, planData: any) {
    try {
      const api = createApiClient();
      return await api.put(`/plans/${id}`, planData);
    } catch (error) {
      console.log('API not available, using mock plan update');
      const index = mockPlans.findIndex(plan => plan.id === id);
      if (index !== -1) {
        mockPlans[index] = { ...mockPlans[index], ...planData };
        return mockPlans[index];
      }
      throw new Error('Plan not found');
    }
  }

  static async deletePlan(id: number) {
    try {
      const api = createApiClient();
      return await api.delete(`/plans/${id}`);
    } catch (error) {
      console.log('API not available, using mock plan deletion');
      const index = mockPlans.findIndex(plan => plan.id === id);
      if (index !== -1) {
        mockPlans.splice(index, 1);
        return true;
      }
      throw new Error('Plan not found');
    }
  }
}

// SIM Service with immediate fallback
export class SimService {
  static async getSimCards(userId: number) {
    try {
      const api = createApiClient();
      const simCards = await api.get(`/sims/user/${userId}`);
      console.log('Using real API for SIM cards');
      return simCards;
    } catch (error) {
      console.log('API not available, using mock SIM cards');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockSimCards;
    }
  }

  static async activateSim(planId: number) {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const plan = mockPlans.find(p => p.id === planId);
      
      const api = createApiClient();
      const response = await api.post('/sims/activate', {
        userId: user.id,
        planId: planId,
        planName: plan?.name || 'Unknown Plan',
        dataTotal: plan?.data || '0GB'
      });
      console.log('Using real API for SIM activation');
      return response;
    } catch (error) {
      console.log('API not available, using mock SIM activation');
      const plan = mockPlans.find(p => p.id === planId);
      
      const newSim = {
        id: Date.now(),
        number: `+1 (555) ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        status: 'Active',
        plan: plan?.name || 'Unknown Plan',
        dataUsed: '0GB',
        dataTotal: plan?.data || '0GB',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        activationDate: new Date().toISOString().split('T')[0]
      };
      
      mockSimCards.push(newSim);
      return newSim;
    }
  }

  static async getSimRequests() {
    try {
      const api = createApiClient();
      const requests = await api.get('/sims/requests/pending');
      console.log('Using real API for SIM requests');
      return requests;
    } catch (error) {
      console.log('API not available, using mock SIM requests');
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockSimRequests;
    }
  }

  static async approveSimRequest(id: number) {
    try {
      const api = createApiClient();
      return await api.post(`/sims/requests/${id}/approve`, {});
    } catch (error) {
      console.log('API not available, using mock approval');
      const request = mockSimRequests.find(req => req.id === id);
      if (request) {
        request.status = 'Approved';
        return request;
      }
      throw new Error('Request not found');
    }
  }

  static async rejectSimRequest(id: number) {
    try {
      const api = createApiClient();
      return await api.post(`/sims/requests/${id}/reject`, {});
    } catch (error) {
      console.log('API not available, using mock rejection');
      const request = mockSimRequests.find(req => req.id === id);
      if (request) {
        request.status = 'Rejected';
        return request;
      }
      throw new Error('Request not found');
    }
  }
}

// Billing Service with immediate fallback
export class BillingService {
  static async getBills(userId: number) {
    try {
      const api = createApiClient();
      const bills = await api.get(`/billing/user/${userId}`);
      console.log('Using real API for bills');
      return bills;
    } catch (error) {
      console.log('API not available, using mock bills');
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockBills;
    }
  }

  static async downloadBill(billId: number) {
    try {
      const api = createApiClient();
      await api.get(`/billing/${billId}/download`);
      console.log('Using real API for bill download');
    } catch (error) {
      console.log('API not available, using mock bill download');
    }
    
    // Always create mock PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNCAwIFIKPj4KPj4KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagplbmRvYmoK';
    link.download = `bill-${billId || Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  }

  static async payBill(billId: number) {
    try {
      const api = createApiClient();
      return await api.post(`/billing/${billId}/pay`, {});
    } catch (error) {
      console.log('API not available, using mock bill payment');
      const bill = mockBills.find(b => b.id === billId);
      if (bill) {
        bill.status = 'Paid';
        return bill;
      }
      throw new Error('Bill not found');
    }
  }
}

// Health check function
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'OPTIONS',
      signal: AbortSignal.timeout(2000),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Export all mock data for external use
export { mockPlans, mockSimCards, mockBills, mockSimRequests };
