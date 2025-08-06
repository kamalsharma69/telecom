// Frontend-only mock services for telecom portal

// Mock data for frontend functionality
export const mockPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    price: 29.99,
    data: '5GB',
    calls: 'Unlimited',
    sms: '100',
    validity: '30 days',
    description: 'Perfect for light users'
  },
  {
    id: 2,
    name: 'Premium Plan',
    price: 49.99,
    data: '15GB',
    calls: 'Unlimited',
    sms: 'Unlimited',
    validity: '30 days',
    description: 'Best for regular users'
  },
  {
    id: 3,
    name: 'Enterprise Plan',
    price: 99.99,
    data: 'Unlimited',
    calls: 'Unlimited',
    sms: 'Unlimited',
    validity: '30 days',
    description: 'For heavy data users'
  }
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

export const mockSimRequests = [
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
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phoneNumber: '+1 (555) 000-9012',
    planId: 3,
    planName: 'Enterprise Plan',
    status: 'Approved',
    requestDate: '2024-01-18',
    documents: ['ID Card', 'Address Proof', 'Business License']
  }
];

// Mock API services for frontend-only operation
export class PlanService {
  static async getPlans() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPlans;
  }

  static async createPlan(planData: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newPlan = {
      id: Date.now(),
      ...planData
    };
    mockPlans.push(newPlan);
    return newPlan;
  }

  static async updatePlan(id: number, planData: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPlans.findIndex(plan => plan.id === id);
    if (index !== -1) {
      mockPlans[index] = { ...mockPlans[index], ...planData };
      return mockPlans[index];
    }
    throw new Error('Plan not found');
  }

  static async deletePlan(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPlans.findIndex(plan => plan.id === id);
    if (index !== -1) {
      mockPlans.splice(index, 1);
      return true;
    }
    throw new Error('Plan not found');
  }
}

export class SimService {
  static async getSimCards(userId: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSimCards;
  }

  static async activateSim(planId: number) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const plan = mockPlans.find(p => p.id === planId);
    if (!plan) throw new Error('Plan not found');
    
    const newSim = {
      id: Date.now(),
      number: `+1 (555) ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'Active',
      plan: plan.name,
      dataUsed: '0GB',
      dataTotal: plan.data,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      activationDate: new Date().toISOString().split('T')[0]
    };
    
    mockSimCards.push(newSim);
    return newSim;
  }

  static async getSimRequests() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSimRequests;
  }

  static async approveSimRequest(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const request = mockSimRequests.find(req => req.id === id);
    if (request) {
      request.status = 'Approved';
      return request;
    }
    throw new Error('Request not found');
  }

  static async rejectSimRequest(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const request = mockSimRequests.find(req => req.id === id);
    if (request) {
      request.status = 'Rejected';
      return request;
    }
    throw new Error('Request not found');
  }
}

export class BillingService {
  static async getBills(userId: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBills;
  }

  static async downloadBill(billId: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const bill = mockBills.find(b => b.id === billId);
    if (!bill) throw new Error('Bill not found');
    
    // Create a mock PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNCAwIFIKPj4KPj4KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagplbmRvYmoK';
    link.download = `bill-${bill.month.replace(' ', '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  }
}

// Keep the AuthService class for backwards compatibility but make it frontend-only
export class AuthService {
  static async login(email: string, password: string) {
    // This is handled by AuthContext now
    throw new Error('Use AuthContext for authentication');
  }

  static async register(data: any) {
    // This is handled by AuthContext now
    throw new Error('Use AuthContext for authentication');
  }

  static async validateToken() {
    // Frontend-only token validation
    const token = localStorage.getItem('token');
    if (!token || !token.startsWith('frontend-jwt-token-')) {
      throw new Error('Invalid token');
    }
    return true;
  }

  static async logout() {
    // This is handled by AuthContext now
    throw new Error('Use AuthContext for authentication');
  }
}
