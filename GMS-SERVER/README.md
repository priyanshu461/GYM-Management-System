# Gym Management System - Server

A comprehensive backend API for managing gym operations including members, trainers, classes, finances, and more.

## Project Structure

```
GMS-SERVER/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection configuration
│   ├── controllers/            # Business logic controllers
│   │   ├── AuthController.js
│   │   ├── MemberController.js
│   │   ├── ProductController.js
│   │   └── ... (other controllers)
│   ├── routes/                 # API route definitions
│   │   ├── authRoutes.js
│   │   ├── memberRoutes.js
│   │   └── ... (other routes)
│   ├── models/                 # Mongoose data models
│   │   ├── UserModel.js
│   │   ├── CustomerModel.js
│   │   └── ... (other models)
│   ├── middlewares/            # Custom middleware functions
│   │   └── auth.js             # Authentication middleware
│   └── utils/                  # Utility functions (if needed)
├── index.js                    # Main application entry point
├── package.json
├── .env                        # Environment variables (create this)
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8080

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# JWT Secret
JWT_SECRET=your-secret-key-here-change-in-production

# Default Role ID (optional - for signup default role)
DEFAULT_ROLE_ID=69005789c00a5b9674dc6cfe
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:8080` (or the port specified in your `.env` file).

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify` - Verify JWT token

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/top-products` - Get top products
- `GET /api/dashboard/recent-orders` - Get recent orders
- `GET /api/dashboard/all-orders` - Get all orders
- `GET /api/dashboard/sales-overview` - Get sales overview

### Members
- `GET /api/management/members` - Get all members
- `GET /api/management/members/:id` - Get member by ID
- `POST /api/management/members` - Add new member
- `PUT /api/management/members/:id` - Update member
- `DELETE /api/management/members/:id` - Delete member

### Products
- `GET /api/products/all` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search` - Search products
- `GET /api/products/top-rated` - Get top rated products
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products/create` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Trainers
- `GET /api/management/trainers/all` - Get all trainers
- `POST /api/management/trainers/add` - Add new trainer
- `PUT /api/management/trainers/:id` - Update trainer
- `DELETE /api/management/trainers/:id` - Delete trainer

### Facilities
- `GET /api/management/facilities` - Get all facilities
- `POST /api/management/facilities` - Add facility
- `PUT /api/management/facilities/:id` - Update facility
- `DELETE /api/management/facilities/:id` - Delete facility

### Finance
- `GET /api/management/finance` - Get all transactions
- `POST /api/management/finance` - Add transaction
- `PUT /api/management/finance/:id` - Update transaction
- `DELETE /api/management/finance/:id` - Delete transaction

### Workouts
- `GET /api/workout` - Get all workout routines
- `POST /api/workout` - Add workout routine
- `PUT /api/workout/:id` - Update workout routine
- `DELETE /api/workout/:id` - Delete workout routine

### Diet Plans
- `GET /api/diet` - Get all diet plans
- `POST /api/diet` - Add diet plan
- `PUT /api/diet/:id` - Update diet plan
- `DELETE /api/diet/:id` - Delete diet plan

### Progress
- `GET /api/progress/:customerId` - Get customer progress
- `POST /api/progress` - Add progress entry
- `PUT /api/progress/:id` - Update progress
- `DELETE /api/progress/:id` - Delete progress

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Add class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Add course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Franchises
- `GET /api/franchises` - Get all franchises
- `POST /api/franchises` - Add franchise
- `PUT /api/franchises/:id` - Update franchise
- `DELETE /api/franchises/:id` - Delete franchise

### Memberships
- `GET /api/memberships` - Get all membership plans
- `POST /api/memberships` - Add membership plan
- `PUT /api/memberships/:id` - Update membership plan
- `DELETE /api/memberships/:id` - Delete membership plan

### Supplements
- `GET /api/supplements` - Get all supplements
- `POST /api/supplements` - Add supplement
- `PUT /api/supplements/:id` - Update supplement
- `DELETE /api/supplements/:id` - Delete supplement

### Blog
- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Add blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post

### AI
- `POST /api/ai/generate-plan` - Generate AI workout/diet plan

### Notifications
- `GET /api/notifications/:userId` - Get user notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark as read
- And more...

### Settings
- `GET /api/settings/:userId` - Get user settings
- `PUT /api/settings/:userId/profile` - Update profile
- And more...

### Support
- `GET /api/support` - Get all support tickets
- `POST /api/support` - Create ticket
- `PUT /api/support/:id` - Update ticket
- And more...

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Use the `authenticateToken` middleware from `src/middlewares/auth.js` to protect routes.

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

## Development

### Project Structure Benefits

1. **Separation of Concerns**: Clear separation between routes, controllers, and models
2. **Maintainability**: Easy to locate and modify specific functionality
3. **Scalability**: Simple to add new features without cluttering existing code
4. **Security**: Environment variables for sensitive data
5. **Middleware**: Reusable authentication and authorization logic

## Notes

- Make sure MongoDB is running and accessible
- Update the `.env` file with your actual credentials
- The JWT secret should be changed in production
- All timestamps are handled automatically by Mongoose

## License

ISC

