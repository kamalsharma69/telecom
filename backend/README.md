# Telecom Portal Microservices

A complete Spring Boot microservices architecture for telecom portal management.

## 🏗️ Architecture

- **Eureka Server** (Port 8761) - Service Discovery
- **API Gateway** (Port 8080) - Single entry point with routing and CORS
- **User Service** (Port 8081) - Authentication and user management
- **SIM Service** (Port 8082) - SIM card management and activation
- **Plan Service** (Port 8083) - Telecom plan management
- **Billing Service** (Port 8084) - Billing and invoice management

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Docker & Docker Compose (optional)

### Method 1: Run with Docker Compose (Recommended)

1. **Build and start all services:**
```bash
cd backend
docker-compose up --build
```

2. **Access services:**
- Eureka Dashboard: http://localhost:8761
- API Gateway: http://localhost:8080
- Frontend API: http://localhost:8080/api

### Method 2: Run Manually

1. **Start Eureka Server:**
```bash
cd eureka-server
mvn spring-boot:run
```

2. **Start API Gateway:**
```bash
cd api-gateway
mvn spring-boot:run
```

3. **Start Microservices (in parallel):**
```bash
# Terminal 1
cd user-service && mvn spring-boot:run

# Terminal 2  
cd sim-service && mvn spring-boot:run

# Terminal 3
cd plan-service && mvn spring-boot:run

# Terminal 4
cd billing-service && mvn spring-boot:run
```

## 🔧 Configuration

### Environment Variables
- `EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE` - Eureka server URL
- `SPRING_PROFILES_ACTIVE` - Active Spring profile

### CORS Configuration
All services are configured to accept requests from:
- http://localhost:3000
- http://localhost:5173
- http://localhost:5174
- http://localhost:5175

## 📡 API Endpoints

### Authentication (via API Gateway)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `POST /api/auth/validate` - Token validation

### Plans
- `GET /api/plans` - Get all active plans
- `POST /api/plans` - Create new plan (Admin)
- `PUT /api/plans/{id}` - Update plan (Admin)
- `DELETE /api/plans/{id}` - Delete plan (Admin)

### SIM Management
- `GET /api/sims/user/{userId}` - Get user's SIM cards
- `POST /api/sims/activate` - Activate new SIM
- `GET /api/sims/requests/pending` - Get pending requests (Admin)
- `POST /api/sims/requests/{id}/approve` - Approve request (Admin)
- `POST /api/sims/requests/{id}/reject` - Reject request (Admin)

### Billing
- `GET /api/billing/user/{userId}` - Get user bills
- `GET /api/billing/{id}/download` - Download bill PDF
- `POST /api/billing/{id}/pay` - Pay bill

## 🔐 Demo Accounts

### Admin Account
- **Email:** admin@telecom.com
- **Password:** admin123

### Customer Account  
- **Email:** customer@email.com
- **Password:** customer123

## 🛠️ Development

### Adding New Services
1. Create new Maven module in parent POM
2. Add Eureka Client dependency
3. Configure service discovery
4. Add CORS configuration
5. Register routes in API Gateway

### Database Access
Each service uses H2 in-memory database:
- User Service: http://localhost:8081/h2-console
- SIM Service: http://localhost:8082/h2-console  
- Plan Service: http://localhost:8083/h2-console
- Billing Service: http://localhost:8084/h2-console

**Connection:** `jdbc:h2:mem:{servicename}db`
**Username:** `sa`
**Password:** (empty)

## 📊 Monitoring

- **Eureka Dashboard:** http://localhost:8761
- **Service Health:** Each service exposes `/actuator/health`

## 🔧 Troubleshooting

### Service Not Registering
- Check Eureka server is running
- Verify network connectivity
- Check service logs for errors

### CORS Issues  
- Verify frontend URL in CORS configuration
- Check API Gateway CORS settings
- Ensure proper headers in requests

### Database Issues
- H2 databases are in-memory (data lost on restart)
- Check connection strings in application.yml
- Verify data.sql scripts are loading

## 🏃‍♂️ Performance Tips

- Use Docker Compose for consistent environment
- Scale services with `docker-compose up --scale service-name=3`
- Monitor Eureka for service health
- Use load balancing through Eureka discovery
