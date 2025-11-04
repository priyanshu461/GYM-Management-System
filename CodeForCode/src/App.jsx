import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProductProvider } from './contexts/ProductContext'
import Login from './views/Login'
import Home from './views/Home'
import MemberManagement from './views/Management/MemberManagement'
import AddMember from './views/Management/AddMember'
import Finance from './views/Management/FinanceManagement'
import Trainer from './views/Management/TrainersManagement'
import AddTrainer from './views/Management/AddTrainer'
import EditTrainer from './views/Management/EditTrainer'
import Facilities from './views/Management/FacilitiesManagement'
import WorkoutRoutine from './views/Workout& Diet Plan/WorkoutRoutinue'
import DietPlan from './views/Workout& Diet Plan/CoustumDietPlan'
import ProgressTracker from './views/Workout& Diet Plan/ProgressTracking'
import ReportsAnalytics from './views/Workout& Diet Plan/ReportsAndAnalytics'
import BMICalculator from './views/BMICalculator'
import Courses from './views/OurCources/Courses'
import ClassesSchedule from './views/OurCources/Classes&Schedule'
import FranchiseAndMembership from './views/OurCources/Franchises&Management'
import Product from './views/Products/Product'
import ProductCreate from './views/Products/ProductCreate'
import Protein from './views/Products/Protein'
import AminoAcidSuppliments from './views/Products/AminoAcidSuppliments'
import Suppliments from './views/Products/Suppliments'
import MultivitaminAndMinerals from './views/Products/MultivitaminAndMinerals'
import Settings from './views/Settings'
import SupportTickets from './views/SupportTickets'
import GymBlog from './views/GymBlog'
import NotificationsCommunication from './views/NotificationCommunication'
import Dashboard from './views/Dashboard'
import Profile from './views/Profile'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function CheckAuth({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
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
              <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
              <Route path="/trainers" element={<ProtectedRoute><Trainer /></ProtectedRoute>} />
              <Route path="/trainers/add" element={<ProtectedRoute><AddTrainer /></ProtectedRoute>} />
              <Route path="/trainers/edit/:id" element={<ProtectedRoute><EditTrainer /></ProtectedRoute>} />
              <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
              <Route path="/workoutRoutinue" element={<ProtectedRoute><WorkoutRoutine /></ProtectedRoute>} />
              <Route path="/dietPlan" element={<ProtectedRoute><DietPlan /></ProtectedRoute>} />
              <Route path="/bmiCalculator" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
              <Route path="/progressTracking" element={<ProtectedRoute><ProgressTracker /></ProtectedRoute>} />
              <Route path="/reportsAnalytics" element={<ProtectedRoute><ReportsAnalytics /></ProtectedRoute>} />
              <Route path="/classesSchedule" element={<ProtectedRoute><ClassesSchedule /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/franchiseAndMembership" element={<ProtectedRoute><FranchiseAndMembership /></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><Product /></ProtectedRoute>} />
              <Route path="/products/create" element={<ProtectedRoute><ProductCreate /></ProtectedRoute>} />
              <Route path="/protein" element={<ProtectedRoute><Protein /></ProtectedRoute>} />
              <Route path='/aminoacidsuppliments' element={<ProtectedRoute><AminoAcidSuppliments /></ProtectedRoute>} />
              <Route path='/suppliments' element={<ProtectedRoute><Suppliments /></ProtectedRoute>} />
              <Route path='/multivitaminandminerals' element={<ProtectedRoute><MultivitaminAndMinerals /></ProtectedRoute>} />
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
