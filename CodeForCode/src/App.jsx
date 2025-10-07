import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Home from './views/Home'
import Land from './views/Land'
import Login from './views/Login'
import MemberManagement from './views/Management/MemberManagement'
import Finance from './views/Management/FinanceManagement'
import Trainers from './views/Management/TrainersManagement'
import Facilities from './views/Management/FacilitiesManagement'
import WorkoutRoutine from './views/Workout& Diet Plan/WorkoutRoutinue'
import DietPlan from './views/Workout& Diet Plan/CoustumDietPlan'
import ProgressTracker from './views/Workout& Diet Plan/ProgressTracking'
import ReportsAnalytics from './views/Workout& Diet Plan/ReportsAndAnalytics'
import Courses from './views/OurCources/Courses'
import ClassesSchedule from './views/OurCources/Classes&Schedule'
import FranchiseAndMembership from './views/OurCources/Franchises&Management'
import Protein from './views/Products/Protein'
import AminoAcidSuppliments from './views/Products/AminoAcidSuppliments'
import Suppliments from './views/Products/Suppliments'
import MultivitaminAndMinerals from './views/Products/MultivitaminAndMinerals'
import Settings from './views/Settings'
import SupportTickets from './views/SupportTickets'
import GymBlog from './views/GymBlog'
import NotificationsCommunication from './views/NotificationCommunication'
import Dashboard from './views/Dashboard'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// App Routes Component
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Land />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/members" element={<ProtectedRoute><MemberManagement /></ProtectedRoute>} />
      <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
      <Route path="/trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute>} />
      <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
      <Route path="/workoutRoutinue" element={<ProtectedRoute><WorkoutRoutine /></ProtectedRoute>} />
      <Route path="/dietPlan" element={<ProtectedRoute><DietPlan /></ProtectedRoute>} />
      <Route path="/progressTracking" element={<ProtectedRoute><ProgressTracker /></ProtectedRoute>} />
      <Route path="/reportsAnalytics" element={<ProtectedRoute><ReportsAnalytics /></ProtectedRoute>} />
      <Route path="/classesSchedule" element={<ProtectedRoute><ClassesSchedule /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      <Route path="/franchiseAndMembership" element={<ProtectedRoute><FranchiseAndMembership /></ProtectedRoute>} />
      <Route path="/protein" element={<ProtectedRoute><Protein /></ProtectedRoute>} />
      <Route path='/AminoAcidSuppliments' element={<ProtectedRoute><AminoAcidSuppliments /></ProtectedRoute>} />
      <Route path='/Suppliments' element={<ProtectedRoute><Suppliments /></ProtectedRoute>} />
      <Route path='/multivitaminAndMinerals' element={<ProtectedRoute><MultivitaminAndMinerals /></ProtectedRoute>} />
      <Route path='/Settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path='/supportTickets' element={<ProtectedRoute><SupportTickets /></ProtectedRoute>} />
      <Route path='/GymBlog' element={<ProtectedRoute><GymBlog /></ProtectedRoute>} />
      <Route path='/NotificationCommunication' element={<ProtectedRoute><NotificationsCommunication /></ProtectedRoute>} />'
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <div>
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}

export default App
