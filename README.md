# GYM Management System (GMS)

A comprehensive, production-ready gym management system built with React.js frontend and Node.js backend. This system provides complete management capabilities for gyms including member management, trainer management, financial tracking, and more.

## 🚀 Features

### Core Features
- **Multi-Role Support**: Admin, Gym Owner, Trainer, Staff, and Member roles
- **Dynamic Dashboard**: Role-based dashboards with real-time data
- **Member Management**: Complete member lifecycle management
- **Trainer Management**: Trainer profiles, schedules, and performance tracking
- **Financial Management**: Income/expense tracking, salary management, and reporting
- **Gym Management**: Multi-gym support for franchise operations
- **Product Management**: Inventory and sales tracking
- **Class & Schedule Management**: Class scheduling and booking system
- **Progress Tracking**: Member progress and goal tracking
- **Notification System**: Real-time notifications and communications

### Technical Features
- **Responsive Design**: Mobile-first responsive design
- **Dark/Light Theme**: User preference-based theming
- **Real-time Updates**: Live data synchronization
- **Role-based Access Control**: Secure, role-based navigation and features
- **RESTful API**: Well-structured API with proper authentication
- **Database Integration**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based secure authentication
- **File Upload**: Support for profile pictures and documents
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Robust error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Nodemailer** - Email sending capability

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GYM-Management-System
   ```

2. **Install backend dependencies**
   ```bash
   cd GMS-SERVER
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/gym_management_system
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the backend server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:8080`

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd CodeForCode
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file:
   ```env
   VITE_API_URL=http://localhost:8080/api/
   VITE_APP_NAME=GYM Management System
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
GYM-Management-System/
├── CodeForCode/                 # Frontend React Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   └── layout/        # Layout components (Header, Sidebar, Footer)
│   │   ├── contexts/          # React contexts (Auth, Theme, Product)
│   │   ├── services/          # API service functions
│   │   ├── views/             # Page components
│   │   │   ├── Management/    # Management pages
│   │   │   ├── Trainer/       # Trainer-specific pages
│   │   │   └── Member/        # Member-specific pages
│   │   ├── Utils/             # Utility functions
│   │   └── config/            # Configuration files
│   ├── public/                # Static assets
│   └── package.json
│
├── GMS-SERVER/                  # Backend Node.js Application
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── middlewares/       # Custom middlewares
│   │   ├── config/            # Configuration files
│   │   └── Helpers/           # Helper functions
│   ├── index.js               # Server entry point
│   └── package.json
│
└── README.md
```

## 🔐 Authentication & Authorization

The system implements role-based access control with the following roles:

### Admin
- Full system access
- Gym management
- User management
- Financial oversight
- System configuration

### Gym Owner
- Gym-specific management
- Member and trainer management
- Financial tracking for their gym
- Class and schedule management

### Trainer
- Client management
- Workout creation and assignment
- Schedule management
- Salary tracking

### Member
- Personal dashboard
- Progress tracking
- Class booking
- Profile management

## 💰 Financial Management

### Features
- **Transaction Tracking**: Complete income and expense tracking
- **Salary Management**: Automated salary calculations and payments
- **Expense Categories**: Organized expense categorization
- **Financial Reports**: Comprehensive financial reporting
- **Multi-gym Support**: Separate financial tracking per gym

### Transaction Categories
- Salary
- Equipment
- Maintenance
- Utilities
- Membership
- Training
- Other

## 🏃‍♂️ Usage

### For Administrators
1. **Login** with admin credentials
2. **Manage Gyms**: Add, edit, and monitor gym locations
3. **User Management**: Create and manage user accounts
4. **Financial Overview**: Monitor system-wide financial performance
5. **System Configuration**: Configure system settings and preferences

### For Gym Owners
1. **Dashboard**: View gym-specific metrics and performance
2. **Member Management**: Add, edit, and track members
3. **Trainer Management**: Manage trainer profiles and schedules
4. **Financial Tracking**: Monitor gym income and expenses
5. **Class Management**: Schedule and manage fitness classes

### For Trainers
1. **Client Dashboard**: View assigned clients and their progress
2. **Workout Management**: Create and assign workout routines
3. **Schedule Management**: Manage personal training schedules
4. **Progress Tracking**: Monitor client progress and achievements

### For Members
1. **Personal Dashboard**: View personal fitness metrics
2. **Progress Tracking**: Track workouts and achievements
3. **Class Booking**: Book and manage class reservations
4. **Profile Management**: Update personal information and preferences

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify` - Token verification

### Finance Management
- `GET /api/management/finance` - Get all transactions
- `POST /api/management/finance` - Add new transaction
- `PUT /api/management/finance/:id` - Update transaction
- `DELETE /api/management/finance/:id` - Delete transaction
- `GET /api/management/finance/summary` - Get financial summary

### Member Management
- `GET /api/management/members` - Get all members
- `POST /api/management/members` - Add new member
- `PUT /api/management/members/:id` - Update member
- `DELETE /api/management/members/:id` - Delete member

### Gym Management
- `GET /api/gyms` - Get all gyms
- `POST /api/gyms` - Add new gym
- `PUT /api/gyms/:id` - Update gym
- `DELETE /api/gyms/:id` - Delete gym

## 🚀 Deployment

### Production Build

**Frontend:**
```bash
cd CodeForCode
npm run build
```

**Backend:**
```bash
cd GMS-SERVER
npm start
```

### Environment Variables for Production

**Backend (.env):**
```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-domain.com/api/
VITE_NODE_ENV=production
```

### Deployment Options
- **Frontend**: Vercel, Netlify, or any static hosting service
- **Backend**: Heroku, DigitalOcean, AWS, or any Node.js hosting service
- **Database**: MongoDB Atlas, or self-hosted MongoDB

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd CodeForCode
npm test

# Backend tests
cd GMS-SERVER
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@gymmanagement.com or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - Multi-role authentication system
  - Complete member and trainer management
  - Financial tracking and reporting
  - Responsive design with dark/light themes
  - Production-ready deployment configuration

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the flexible database solution
- All contributors who helped make this project better

---

**Built with ❤️ for the fitness community**