import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProductProvider } from './contexts/ProductContext'
import Login from './views/Login'
import MemberLogin from './views/MemberLogin'
import MemberDashboard from './views/MemberDashboard'
import MemberProfile from './views/MemberProfile'
import MemberClasses from './views/MemberClasses'
import MemberWorkouts from './views/MemberWorkouts'
import MemberProgress from './views/MemberProgress'
import MemberAchievements from './views/MemberAchievements'
import MemberGoals from './views/MemberGoals'
import MemberSettings from './views/MemberSettings'
import MemberActivity from './views/MemberActivity'
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
import WorkoutRoutine from './views/workout-and-diet-plan/WorkoutRoutine'
import DietPlan from './views/Workout& Diet Plan/CoustumDietPlan'
import BMICalculator from './views/BMICalculator'
import ProgressTracker from './views/Workout& Diet Plan/ProgressTracking'
import ReportsAnalytics from './views/Workout& Diet Plan/ReportsAndAnalytics'
import ClassesSchedule from './views/OurCources/Classes&Schedule'
import Courses from './views/OurCources/Courses'
import FranchiseAndMembership from './views/OurCources/Franchises&Management'
import Product from './views/Products/Product'
import ProductCreate from './views/Products/ProductCreate'
import Settings from './views/Settings'
import SupportTickets from './views/SupportTickets'
import GymBlog from './views/GymBlog'
import NotificationsCommunication from './views/NotificationCommunication'
import Profile from './views/Profile'
import MemberLayout from './components/layout/MemberLayout'

// Protected Route for Admin
function AdminProtectedRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

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

  return isAuthenticated && user ? children : <Navigate to="/login" replace />;
}

// Protected Route for Member
function MemberProtectedRoute({ children }) {
  const { isAuthenticated, member, loading } = useAuth();

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

  return isAuthenticated && member ? children : <Navigate to="/member-login" replace />;
}

// Check Auth for Login Pages
function CheckAuth({ children }) {
  const { isAuthenticated, user, member, loading } = useAuth();

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

  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }
  if (isAuthenticated && member) {
    return <Navigate to="/member-dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <div>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />

              {/* Member Routes */}
              <Route path="/member-login" element={<CheckAuth><MemberLogin /></CheckAuth>} />
              <Route
                path="/member-dashboard"
                element={
                  <MemberProtectedRoute>
                      <MemberDashboard />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/member-profile"
                element={
                  <MemberProtectedRoute>
                      <MemberProfile />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/member-classes"
                element={
                  <MemberProtectedRoute>
                      <MemberClasses />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/member-workouts"
                element={
                  <MemberProtectedRoute>
                      <MemberWorkouts />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/member-progress"
                element={
                  <MemberProtectedRoute>
                      <MemberProgress />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/member-achievements"
                element={
                  <MemberProtectedRoute>
                      <MemberAchievements />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/member-goals"
                element={
                  <MemberProtectedRoute>
                      <MemberGoals />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/member-settings"
                element={
                  <MemberProtectedRoute>
                      <MemberSettings />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/bmi-calculator"
                element={
                  <MemberProtectedRoute>
                      <BMICalculator />
                  </MemberProtectedRoute>
                }
              />
              <Route
                path="/member-activity"
                element={
                  <MemberProtectedRoute>
                      <MemberActivity />
                  </MemberProtectedRoute>
                }
              />
              {/* Admin Routes */}
              <Route path="/login" element={<CheckAuth><Login /></CheckAuth>} />
              <Route path="/dashboard" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
              <Route path="/members" element={<AdminProtectedRoute><MemberManagement /></AdminProtectedRoute>} />
              <Route path="/members/add" element={<AdminProtectedRoute><AddMember /></AdminProtectedRoute>} />
              <Route path="/members/edit/:id" element={<AdminProtectedRoute><EditMember /></AdminProtectedRoute>} />
              <Route path="/finance" element={<AdminProtectedRoute><Finance /></AdminProtectedRoute>} />
              <Route path="/trainers" element={<AdminProtectedRoute><Trainer /></AdminProtectedRoute>} />
              <Route path="/trainers/add" element={<AdminProtectedRoute><AddTrainer /></AdminProtectedRoute>} />
              <Route path="/trainers/edit/:id" element={<AdminProtectedRoute><EditTrainer /></AdminProtectedRoute>} />
              <Route path="/facilities" element={<AdminProtectedRoute><Facilities /></AdminProtectedRoute>} />
              <Route path="/workout-routine" element={<AdminProtectedRoute><WorkoutRoutine /></AdminProtectedRoute>} />
              <Route path="/diet-plan" element={<AdminProtectedRoute><DietPlan /></AdminProtectedRoute>} />
              <Route path="/progress-tracking" element={<AdminProtectedRoute><ProgressTracker /></AdminProtectedRoute>} />
              <Route path="/reports-analytics" element={<AdminProtectedRoute><ReportsAnalytics /></AdminProtectedRoute>} />
              <Route path="/classes-schedule" element={<AdminProtectedRoute><ClassesSchedule /></AdminProtectedRoute>} />
              <Route path="/courses" element={<AdminProtectedRoute><Courses /></AdminProtectedRoute>} />
              <Route path="/franchises-and-membership" element={<AdminProtectedRoute><FranchiseAndMembership /></AdminProtectedRoute>} />
              <Route path="/products" element={<AdminProtectedRoute><Product /></AdminProtectedRoute>} />
              <Route path="/products/create" element={<AdminProtectedRoute><ProductCreate /></AdminProtectedRoute>} />
              <Route path='/settings' element={<AdminProtectedRoute><Settings /></AdminProtectedRoute>} />
              <Route path='/supporttickets' element={<AdminProtectedRoute><SupportTickets /></AdminProtectedRoute>} />
              <Route path='/gymblog' element={<AdminProtectedRoute><GymBlog /></AdminProtectedRoute>} />
              <Route path='/notificationcommunication' element={<AdminProtectedRoute><NotificationsCommunication /></AdminProtectedRoute>} />
              <Route path='/profile' element={<AdminProtectedRoute><Profile /></AdminProtectedRoute>} />
            </Routes>
          </div>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App