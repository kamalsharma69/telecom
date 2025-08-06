import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// API Endpoints
export const API_ENDPOINTS = {
  // User Service
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VALIDATE: '/auth/validate',
  },
  // SIM Service  
  SIM: {
    ACTIVATE: '/sims/activate',
    USER_SIMS: (userId: number) => `/sims/user/${userId}`,
    ACTIVE_USER_SIMS: (userId: number) => `/sims/user/${userId}/active`,
    UPDATE_STATUS: (simId: number) => `/sims/${simId}/status`,
    UPDATE_DATA: (simId: number) => `/sims/${simId}/data-usage`,
    PENDING: '/sims/pending',
    STATS: {
      ACTIVE_COUNT: '/sims/stats/active-count',
      PENDING_COUNT: '/sims/stats/pending-count',
    }
  },
  // Plan Service
  PLAN: {
    ALL: '/plans',
    BY_ID: (id: number) => `/plans/${id}`,
    CREATE: '/plans',
    UPDATE: (id: number) => `/plans/${id}`,
    DELETE: (id: number) => `/plans/${id}`,
  },
  // Billing Service
  BILLING: {
    USER_BILLS: (userId: number) => `/billing/user/${userId}`,
    GENERATE: '/billing/generate',
    DOWNLOAD: (billId: number) => `/billing/${billId}/download`,
  }
};

// Create Axios Instance
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor - Add JWT Token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor - Handle Errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createApiInstance();

// API Service Classes
export class AuthService {
  static async login(email: string, password: string) {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    return response.data;
  }

  static async register(userData: {
    fullName: string;
    email: string;
    password: string;
    role: 'CUSTOMER' | 'ADMIN';
  }) {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  }

  static async validateToken() {
    const response = await api.get(API_ENDPOINTS.AUTH.VALIDATE);
    return response.data;
  }
}

export class SimService {
  static async activateSim(data: {
    simNumber: string;
    userId: number;
    planId: number;
    networkType?: string;
    location?: string;
  }) {
    const response = await api.post(API_ENDPOINTS.SIM.ACTIVATE, data);
    return response.data;
  }

  static async getUserSims(userId: number) {
    const response = await api.get(API_ENDPOINTS.SIM.USER_SIMS(userId));
    return response.data;
  }

  static async getActiveUserSims(userId: number) {
    const response = await api.get(API_ENDPOINTS.SIM.ACTIVE_USER_SIMS(userId));
    return response.data;
  }

  static async updateSimStatus(simId: number, status: string) {
    const response = await api.put(`${API_ENDPOINTS.SIM.UPDATE_STATUS(simId)}?status=${status}`);
    return response.data;
  }

  static async updateDataUsage(simId: number, dataUsedMb: number) {
    const response = await api.put(`${API_ENDPOINTS.SIM.UPDATE_DATA(simId)}?dataUsedMb=${dataUsedMb}`);
    return response.data;
  }

  static async getPendingRequests() {
    const response = await api.get(API_ENDPOINTS.SIM.PENDING);
    return response.data;
  }

  static async getActiveSimsCount() {
    const response = await api.get(API_ENDPOINTS.SIM.STATS.ACTIVE_COUNT);
    return response.data;
  }
}

export class PlanService {
  static async getAllPlans() {
    const response = await api.get(API_ENDPOINTS.PLAN.ALL);
    return response.data;
  }

  static async getPlanById(id: number) {
    const response = await api.get(API_ENDPOINTS.PLAN.BY_ID(id));
    return response.data;
  }

  static async createPlan(planData: any) {
    const response = await api.post(API_ENDPOINTS.PLAN.CREATE, planData);
    return response.data;
  }

  static async updatePlan(id: number, planData: any) {
    const response = await api.put(API_ENDPOINTS.PLAN.UPDATE(id), planData);
    return response.data;
  }

  static async deletePlan(id: number) {
    const response = await api.delete(API_ENDPOINTS.PLAN.DELETE(id));
    return response.data;
  }
}

export class BillingService {
  static async getUserBills(userId: number) {
    const response = await api.get(API_ENDPOINTS.BILLING.USER_BILLS(userId));
    return response.data;
  }

  static async downloadBill(billId: number) {
    const response = await api.get(API_ENDPOINTS.BILLING.DOWNLOAD(billId), {
      responseType: 'blob'
    });
    return response.data;
  }
}

export default api;
