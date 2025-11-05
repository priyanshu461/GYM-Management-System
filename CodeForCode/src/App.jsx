import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProductProvider } from './contexts/ProductContext'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import MemberManagement from './views/Management/MemberManagement'
import AddMember from './views/Management/AddMember'
import EditMember from './views/Management/EditMember'
import Finance from './views/Management/FinanceManagement'
import Trainer from './views/Management/TrainersManagement'
import AddTrainer from './views/Management/AddTrainer'
import EditTrainer from './views/Management/EditTrainer'
import Facilities from './views/Management/FacilitiesManagement'
import WorkoutRoutine from './views/Workout& Diet Plan/WorkoutRoutinue'
import DietPlan from './views/Workout& Diet Plan/CoustumDietPlan'
import BMICalculator from './views/BMICalculator'
import ProgressTracker from './views/Workout& Diet Plan/ProgressTracking'
import ReportsAnalytics from './views/Workout& Diet Plan/ReportsAndAnalytics'
import ClassesSchedule from './views/OurCources/Classes&Schedule'
import Courses from './views/OurCources/Courses'
import FranchiseAndMembership from './views/OurCources/Franchises&Management'
import Product from './views/Products/Product'
import ProductCreate from './views/Products/ProductCreate'
import Protein from './views/Products/Protein'
import AminoAcidSupplements from './views/Products/AminoAcidSuppliments'
import Supplements from './views/Products/Suppliments'
import MultivitaminAndMinerals from './views/Products/MultivitaminAndMinerals'
import Settings from './views/Settings'
import SupportTickets from './views/SupportTickets'
import GymBlog from './views/GymBlog'
import NotificationsCommunication from './views/NotificationCommunication'
import Profile from './views/Profile'


function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  // Wait for auth check to complete before redirecting
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function CheckAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  // Wait for auth check to complete before redirecting
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Only redirect to dashboard if user is authenticated and trying to access login page
  // Don't redirect if they're on any other page
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
  return (
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <div>
              <Routes>
              <Route path="/login" element={<CheckAuth><Login /></CheckAuth>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<ProtectedRoute><MemberManagement /></ProtectedRoute>} />
              <Route path="/members/add" element={<ProtectedRoute><AddMember /></ProtectedRoute>} />
              <Route path="/members/edit/:id" element={<ProtectedRoute><EditMember /></ProtectedRoute>} />
              <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
              <Route path="/trainers" element={<ProtectedRoute><Trainer /></ProtectedRoute>} />
              <Route path="/trainers/add" element={<ProtectedRoute><AddTrainer /></ProtectedRoute>} />
              <Route path="/trainers/edit/:id" element={<ProtectedRoute><EditTrainer /></ProtectedRoute>} />
              <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
              <Route path="/workout-routine" element={<ProtectedRoute><WorkoutRoutine /></ProtectedRoute>} />
              <Route path="/diet-plan" element={<ProtectedRoute><DietPlan /></ProtectedRoute>} />
              <Route path="/bmi-calculator" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
              <Route path="/progress-tracking" element={<ProtectedRoute><ProgressTracker /></ProtectedRoute>} />
              <Route path="/reports-analytics" element={<ProtectedRoute><ReportsAnalytics /></ProtectedRoute>} />
              <Route path="/classes-schedule" element={<ProtectedRoute><ClassesSchedule /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/franchises-and-membership" element={<ProtectedRoute><FranchiseAndMembership /></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><Product /></ProtectedRoute>} />
              <Route path="/products/create" element={<ProtectedRoute><ProductCreate /></ProtectedRoute>} />
              <Route path="/protein" element={<ProtectedRoute><Protein /></ProtectedRoute>} />
              <Route path='/amino-acid-supplements' element={<ProtectedRoute><AminoAcidSupplements /></ProtectedRoute>} />
              <Route path='/supplements' element={<ProtectedRoute><Supplements /></ProtectedRoute>} />
              <Route path='/multivitamin-and-minerals' element={<ProtectedRoute><MultivitaminAndMinerals /></ProtectedRoute>} />
              <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path='/supporttickets' element={<ProtectedRoute><SupportTickets /></ProtectedRoute>} />
              <Route path='/gymblog' element={<ProtectedRoute><GymBlog /></ProtectedRoute>} />
              <Route path='/notificationcommunication' element={<ProtectedRoute><NotificationsCommunication /></ProtectedRoute>} />
              <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </div>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
  )
}

export default App
