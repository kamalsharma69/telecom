# 🚀 Telecom Portal - Full Stack Microservices Application

A modern, full-stack telecom management portal built with **React + TypeScript** frontend and **Spring Boot Microservices** backend.

## 🏗️ Architecture Overview

### Frontend (React + TypeScript + Tailwind CSS)
- **Beautiful UI** with glassmorphism effects and animations
- **Role-based access control** (Customer/Admin dashboards)
- **Real-time data updates** and interactive components
- **Mobile-responsive design** with modern UX

### Backend (Spring Boot Microservices)
- **User Service** (Port 8081) - Authentication & User Management
- **SIM Service** (Port 8082) - SIM Card Management & Activation
- **Plan Service** (Port 8083) - Telecom Plans & Pricing
- **Billing Service** (Port 8084) - Invoice & Payment Management
- **API Gateway** (Port 8080) - Centralized routing & security
- **Eureka Server** (Port 8761) - Service discovery

## 🛠️ Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend
- Spring Boot 3.2.0
- Spring Cloud (Eureka, Gateway)
- Spring Security with JWT
- Spring Data JPA
- H2 Database (Development)
- Maven for build management

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Java 17+**
- **Maven 3.6+**
- **Docker** (optional)

### 1. Start the Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The React app will be available at `http://localhost:5173`

### 2. Start the Backend Services

#### Option A: Using Docker (Recommended)
```bash
cd backend
docker-compose up -d
```

#### Option B: Manual Startup
```bash
# Start each service in separate terminals
cd backend

# 1. User Service
cd user-service
mvn spring-boot:run

# 2. SIM Service  
cd sim-service
mvn spring-boot:run

# 3. API Gateway
cd api-gateway  
mvn spring-boot:run
```

## 🔑 Demo Accounts

### Admin Access
- **Email**: `admin@telecom.com`
- **Password**: `password123`
- **Features**: Manage users, approve SIM requests, view analytics

### Customer Access  
- **Email**: `customer@email.com`
- **Password**: `password123`
- **Features**: Activate SIMs, view plans, manage billing

## 📊 API Endpoints

### Authentication Service (Port 8081)
```bash
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/validate
```

### SIM Management Service (Port 8082)
```bash
POST /api/sims/activate
GET  /api/sims/user/{userId}
GET  /api/sims/pending
PUT  /api/sims/{simId}/status
```

### API Gateway (Port 8080)
All services are accessible through the gateway:
```bash
http://localhost:8080/api/*
```

## 🎨 Features Implemented

### ✅ Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure password hashing
- Token validation & refresh

### ✅ SIM Management
- SIM card activation
- Real-time status tracking
- Data usage monitoring
- Network type management

### ✅ User Management
- User registration & login
- Profile management
- Admin user controls

### ✅ Frontend Integration
- API service layer with Axios
- Real-time updates
- Error handling & loading states
- Beautiful UI with animations

## 🔧 Development

### Frontend Development
```bash
# Hot reload development
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

### Backend Development
```bash
# Run tests
mvn test

# Package applications
mvn clean package

# Run with profiles
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## 🐳 Docker Deployment

### Build and Deploy All Services
```bash
cd backend
docker-compose up --build -d
```

### View Logs
```bash
docker-compose logs -f user-service
docker-compose logs -f sim-service
```

### Scale Services
```bash
docker-compose up --scale sim-service=2 -d
```

## 📈 Monitoring & Health Checks

### Service Health
- User Service: `http://localhost:8081/actuator/health`
- SIM Service: `http://localhost:8082/actuator/health`
- API Gateway: `http://localhost:8080/actuator/health`

### Eureka Dashboard
- Service Registry: `http://localhost:8761`

### Database Consoles
- User Service H2: `http://localhost:8081/h2-console`
- SIM Service H2: `http://localhost:8082/h2-console`

## 🔐 Security Features

- **JWT Authentication** with configurable expiration
- **CORS Configuration** for cross-origin requests
- **Input Validation** on all endpoints
- **Password Encryption** using BCrypt
- **Role-based Authorization** (CUSTOMER/ADMIN)

## 🎯 API Integration

The React frontend automatically connects to Spring Boot APIs:

```typescript
// Example API call
import { AuthService } from './services/api';

const login = async (email: string, password: string) => {
  const response = await AuthService.login(email, password);
  // JWT token is automatically stored and used
};
```

## 🚧 Upcoming Features

- **Plan Service** - Telecom plan management
- **Billing Service** - Invoice generation & payments
- **Notification Service** - Email/SMS notifications
- **Real-time Analytics** - WebSocket integration
- **Payment Gateway** - Stripe/PayPal integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the [Issues](https://github.com/your-repo/issues) page
- Review API documentation
- Check service health endpoints

---

## 🎉 Success! Your Telecom Portal is Ready!

Your full-stack application now features:
- ✅ **Beautiful React Frontend** with modern UI
- ✅ **Spring Boot Microservices** backend
- ✅ **JWT Authentication** and security
- ✅ **Real API Integration** between frontend and backend
- ✅ **Docker Containerization** for easy deployment
- ✅ **Service Discovery** with Eureka
- ✅ **API Gateway** for centralized routing

Access your application at `http://localhost:5173` and start managing telecom services! 🚀
