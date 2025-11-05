# API Testing Guide

This document provides instructions for testing all API endpoints in the Gym Management System.

## Prerequisites

1. Ensure MongoDB is running and accessible
2. Create `.env` file with proper credentials
3. Install dependencies: `npm install`
4. Start the server: `npm start` or `npm run dev`

## Testing Tools

You can use any of the following:
- **Postman** (Recommended)
- **cURL** (Command line)
- **Thunder Client** (VS Code extension)
- **Insomnia**
- **Browser** (for GET requests only)

## Base URL

```
http://localhost:8080
```

## Test Scenarios

### 1. Health Check (No Auth Required)

```bash
# GET /
curl http://localhost:8080/

# GET /health
curl http://localhost:8080/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-11-05T..."
}
```

### 2. Authentication

#### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "roleId": "..."
  }
}
```

**Save the token for subsequent requests!**

#### Verify Token
```bash
POST /api/auth/verify
Content-Type: application/json
Authorization: Bearer <token>

{
  "token": "<your-token>"
}
```

### 3. Dashboard (May require auth)

```bash
GET /api/dashboard/stats
Authorization: Bearer <token>
```

### 4. Members

```bash
# Get all members
GET /api/management/members
Authorization: Bearer <token>

# Get member by ID
GET /api/management/members/:id
Authorization: Bearer <token>

# Add member
POST /api/management/members
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "mobile": "1234567890",
  "email": "john@example.com",
  "aadharNo": "123456789012",
  "address": "123 Main St",
  "gender": "Male",
  "dob": "1990-01-01"
}

# Update member
PUT /api/management/members/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "mobile": "1234567890"
}

# Delete member
DELETE /api/management/members/:id
Authorization: Bearer <token>
```

### 5. Products

```bash
# Get all products
GET /api/products/all

# Search products
GET /api/products/search?q=protein

# Get product by ID
GET /api/products/:id

# Create product
POST /api/products/create
Content-Type: application/json

{
  "name": "Whey Protein",
  "category": "Protein",
  "price": 2999,
  "mrp": 3499,
  "stock": 100,
  "description": "Premium whey protein"
}

# Update product
PUT /api/products/:id
Content-Type: application/json

{
  "price": 2799
}

# Delete product
DELETE /api/products/:id
```

### 6. Workouts

```bash
# Get all workouts
GET /api/workout

# Add workout
POST /api/workout
Content-Type: application/json

{
  "name": "Push Day",
  "exercises": [...],
  "duration": 60
}

# Update workout
PUT /api/workout/:id

# Delete workout
DELETE /api/workout/:id
```

### 7. Diet Plans

```bash
# Get all diet plans
GET /api/diet

# Add diet plan
POST /api/diet
Content-Type: application/json

{
  "name": "Weight Loss Plan",
  "meals": [...],
  "calories": 2000
}

# Update diet plan
PUT /api/diet/:id

# Delete diet plan
DELETE /api/diet/:id
```

### 8. AI Plan Generation

```bash
POST /api/ai/generate-plan
Content-Type: application/json

{
  "age": 25,
  "gender": "Male",
  "weight": 75,
  "height": 175,
  "fitnessLevel": "intermediate",
  "goal": "muscle",
  "equipment": "full"
}
```

## Postman Collection

You can create a Postman collection with all these endpoints. Here's a sample structure:

```
Gym Management System
├── Authentication
│   ├── Signup
│   ├── Login
│   └── Verify Token
├── Dashboard
│   └── Get Stats
├── Members
│   ├── Get All
│   ├── Get By ID
│   ├── Create
│   ├── Update
│   └── Delete
├── Products
│   └── ...
└── ...
```

## Common Issues

### 401 Unauthorized
- Check if token is included in Authorization header
- Verify token hasn't expired
- Ensure token format: `Bearer <token>`

### 404 Not Found
- Verify the route path is correct
- Check if the route is registered in `index.js`
- Ensure server is running

### 500 Internal Server Error
- Check MongoDB connection
- Verify environment variables are set
- Check server logs for detailed error messages

### MongoDB Connection Error
- Verify `MONGODB_URI` in `.env` file
- Check if MongoDB is running
- Verify network connectivity

## Automated Testing

For automated testing, consider using:
- **Jest** with **Supertest** for API testing
- **Mocha** with **Chai**
- **Postman Collections** with Newman

Example test structure:
```javascript
const request = require('supertest');
const app = require('../index');

describe('Authentication', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
```

## Status Codes Reference

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

