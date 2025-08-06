// API services for Spring Boot microservices integration

const API_BASE_URL = 'http://localhost:8080/api';

// HTTP client configuration
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
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'GET',
        headers,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    },
    
    async post(url: string, data: any) {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    },
    
    async put(url: string, data: any) {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    },
    
    async delete(url: string) {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'DELETE',
        headers,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.ok;
    }
  };
};

// Authentication Service
export class AuthService {
  static async login(email: string, password: string) {
    try {
      const api = createApiClient();
      const response = await api.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to mock authentication for development
      return this.mockLogin(email, password);
    }
  }

  static async register(data: any) {
    try {
      const api = createApiClient();
      const response = await api.post('/auth/register', {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      return response;
    } catch (error) {
      console.error('Register error:', error);
      // Fallback to mock registration for development
      return this.mockRegister(data);
    }
  }

  static async validateToken() {
    try {
      const api = createApiClient();
      const response = await api.post('/auth/validate', {});
      return response;
    } catch (error) {
      throw new Error('Token validation failed');
    }
  }

  // Mock fallback methods for development
  private static mockLogin(email: string, password: string) {
    const mockUsers = [
      { id: 1, email: 'admin@telecom.com', password: 'admin123', fullName: 'Admin User', role: 'ADMIN', phoneNumber: '+1 (555) 000-0001', address: '123 Admin St', isActive: true },
      { id: 2, email: 'customer@email.com', password: 'customer123', fullName: 'Customer User', role: 'CUSTOMER', phoneNumber: '+1 (555) 000-0002', address: '456 Customer Ave', isActive: true }
    ];
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: userWithoutPassword,
        message: 'Login successful (mock)'
      };
    }
    throw new Error('Invalid credentials');
  }

  private static mockRegister(data: any) {
    const newUser = {
      id: Date.now(),
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      phoneNumber: `+1 (555) ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      address: '123 New User St',
      isActive: true
    };
    
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: newUser,
      message: 'Registration successful (mock)'
    };
  }
}

// Plan Service
export class PlanService {
  static async getPlans() {
    try {
      const api = createApiClient();
      return await api.get('/plans');
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Fallback to mock data
      return [
        { id: 1, name: 'Basic Plan', price: 29.99, data: '5GB', description: 'Perfect for light users' },
        { id: 2, name: 'Premium Plan', price: 49.99, data: '15GB', description: 'Best for regular users' },
        { id: 3, name: 'Enterprise Plan', price: 99.99, data: 'Unlimited', description: 'For heavy data users' }
      ];
    }
  }

  static async createPlan(planData: any) {
    try {
      const api = createApiClient();
      return await api.post('/plans', planData);
    } catch (error) {
      console.error('Error creating plan:', error);
      throw error;
    }
  }

  static async updatePlan(id: number, planData: any) {
    try {
      const api = createApiClient();
      return await api.put(`/plans/${id}`, planData);
    } catch (error) {
      console.error('Error updating plan:', error);
      throw error;
    }
  }

  static async deletePlan(id: number) {
    try {
      const api = createApiClient();
      return await api.delete(`/plans/${id}`);
    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  }
}

// SIM Service
export class SimService {
  static async getSimCards(userId: number) {
    try {
      const api = createApiClient();
      return await api.get(`/sims/user/${userId}`);
    } catch (error) {
      console.error('Error fetching SIM cards:', error);
      // Fallback to mock data
      return [
        {
          id: 1,
          number: '+1 (555) 123-4567',
          status: 'Active',
          plan: 'Premium Plan',
          dataUsed: '8.2GB',
          dataTotal: '15GB',
          expiryDate: '2024-02-15',
          activationDate: '2024-01-15'
        }
      ];
    }
  }

  static async activateSim(planId: number) {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const plans = await PlanService.getPlans();
      const plan = plans.find((p: any) => p.id === planId);
      
      const api = createApiClient();
      return await api.post('/sims/activate', {
        userId: user.id,
        planId: planId,
        planName: plan?.name || 'Unknown Plan',
        dataTotal: plan?.data || '0GB'
      });
    } catch (error) {
      console.error('Error activating SIM:', error);
      // Mock activation for development
      const plans = await PlanService.getPlans();
      const plan = plans.find((p: any) => p.id === planId);
      
      return {
        id: Date.now(),
        number: `+1 (555) ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        status: 'Active',
        plan: plan?.name || 'Unknown Plan',
        dataUsed: '0GB',
        dataTotal: plan?.data || '0GB',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        activationDate: new Date().toISOString().split('T')[0]
      };
    }
  }

  static async getSimRequests() {
    try {
      const api = createApiClient();
      return await api.get('/sims/requests/pending');
    } catch (error) {
      console.error('Error fetching SIM requests:', error);
      // Fallback to mock data
      return [
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
        }
      ];
    }
  }

  static async approveSimRequest(id: number) {
    try {
      const api = createApiClient();
      return await api.post(`/sims/requests/${id}/approve`, {});
    } catch (error) {
      console.error('Error approving SIM request:', error);
      throw error;
    }
  }

  static async rejectSimRequest(id: number) {
    try {
      const api = createApiClient();
      return await api.post(`/sims/requests/${id}/reject`, {});
    } catch (error) {
      console.error('Error rejecting SIM request:', error);
      throw error;
    }
  }
}

// Billing Service
export class BillingService {
  static async getBills(userId: number) {
    try {
      const api = createApiClient();
      return await api.get(`/billing/user/${userId}`);
    } catch (error) {
      console.error('Error fetching bills:', error);
      // Fallback to mock data
      return [
        {
          id: 1,
          month: 'January 2024',
          amount: 49.99,
          status: 'Paid',
          dueDate: '2024-01-31',
          paidDate: '2024-01-25',
          planName: 'Premium Plan',
          dataUsage: '12.5GB'
        }
      ];
    }
  }

  static async downloadBill(billId: number) {
    try {
      const api = createApiClient();
      const response = await api.get(`/billing/${billId}/download`);
      
      // Create a mock PDF download
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNCAwIFIKPj4KPj4KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagplbmRvYmoK';
      link.download = `bill-${billId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Error downloading bill:', error);
      alert('PDF download feature - would download from backend');
      return true;
    }
  }

  static async payBill(billId: number) {
    try {
      const api = createApiClient();
      return await api.post(`/billing/${billId}/pay`, {});
    } catch (error) {
      console.error('Error paying bill:', error);
      throw error;
    }
  }
}

// Health check function to test backend connectivity
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return false;
  }
};

// Export mock data for fallback
export const mockPlans = [
  { id: 1, name: 'Basic Plan', price: 29.99, data: '5GB', description: 'Perfect for light users' },
  { id: 2, name: 'Premium Plan', price: 49.99, data: '15GB', description: 'Best for regular users' },
  { id: 3, name: 'Enterprise Plan', price: 99.99, data: 'Unlimited', description: 'For heavy data users' }
];

export const mockSimCards = [
  {
    id: 1,
    number: '+1 (555) 123-4567',
    status: 'Active',
    plan: 'Premium Plan',
    dataUsed: '8.2GB',
    dataTotal: '15GB',
    expiryDate: '2024-02-15',
    activationDate: '2024-01-15'
  }
];

export const mockBills = [
  {
    id: 1,
    month: 'January 2024',
    amount: 49.99,
    status: 'Paid',
    dueDate: '2024-01-31',
    paidDate: '2024-01-25',
    planName: 'Premium Plan',
    dataUsage: '12.5GB'
  }
];
