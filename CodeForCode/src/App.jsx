import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProductProvider } from './contexts/ProductContext'
import Login from './views/Login'
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
import SalaryManagement from './views/Management/SalaryManagement'
import ExpenseManagement from './views/Management/ExpenseManagement'
import Trainer from './views/Management/TrainersManagement'
import AddTrainer from './views/Management/AddTrainer'
import EditTrainer from './views/Management/EditTrainer'
import TrainerDashboard from './views/TrainerDashboard'
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
import GymsManagement from './views/Management/GymsManagement'
import AddGym from './views/Management/AddGym'
import EditGym from './views/Management/EditGym'
import ViewGym from './views/Management/ViewGym'

import Settings from './views/Settings'
import SupportTickets from './views/SupportTickets'
import GymBlog from './views/GymBlog'
import NotificationsCommunication from './views/NotificationCommunication'
import Profile from './views/Profile'
import MySchedules from './views/Trainer/MySchedules'
import CreateWorkout from './views/Trainer/CreateWorkout'
import AssignWorkout from './views/Trainer/AssignWorkout'
import Salary from './views/Trainer/Salary'
import ResetPassword from './views/Trainer/ResetPassword'

// Protected Route for Admin
function ProtectedRoute({ children }) {
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

// Check Auth for Login Pages
function CheckAuth({ children }) {
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

  if (isAuthenticated && user) {
    return user.user_type === "Trainer" ?
    <Navigate to="/trainer/dashboard" replace /> :
    user.user_type === "Member" ?
    <Navigate to="/member/dashboard" replace /> :
    <Navigate to="/dashboard" replace />;
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

              {/* Trainer Routes */}
              <Route 
                path="/trainer/clients"
                element={
                  <ProtectedRoute>
                      <MemberManagement />
                  </ProtectedRoute>
                }
              />
              <Route 
                path='/trainer/schedules'
                element={
                  <ProtectedRoute>
                      <MySchedules />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/trainer/workouts/create'
                element={
                  <ProtectedRoute>
                      <CreateWorkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/trainer/workouts/assign'
                element={
                  <ProtectedRoute>
                      <AssignWorkout />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/trainer/salary"
                element={
                  <ProtectedRoute>
                      <Salary />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/trainer/reset/password'
                element={
                  <ProtectedRoute>
                      <ResetPassword />
                  </ProtectedRoute>
                }
              />
              <Route 
              path="/trainer/dashboard" 
              element={
              <ProtectedRoute>
                <TrainerDashboard />
                </ProtectedRoute>
              } 
              />


              {/* Member Routes */}
              <Route path="/member/login" element={<CheckAuth><Login /></CheckAuth>} />
              <Route
                path="/member/dashboard"
                element={
                  <ProtectedRoute>
                      <MemberDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member/profile"
                element={
                  <ProtectedRoute>
                      <MemberProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member/classes"
                element={
                  <ProtectedRoute>
                      <MemberClasses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member/workouts"
                element={
                  <ProtectedRoute>
                      <MemberWorkouts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member/progress"
                element={
                  <ProtectedRoute>
                      <MemberProgress />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member/achievements"
                element={
                  <ProtectedRoute>
                      <MemberAchievements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member/goals"
                element={
                  <ProtectedRoute>
                      <MemberGoals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member/settings"
                element={
                  <ProtectedRoute>
                      <MemberSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bmi/calculator"
                element={
                  <ProtectedRoute>
                      <BMICalculator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member/activity"
                element={
                  <ProtectedRoute>
                      <MemberActivity />
                  </ProtectedRoute>
                }
              />
              {/* Admin Routes */}
              <Route path="/login" element={<CheckAuth><Login /></CheckAuth>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/members" element={<ProtectedRoute><MemberManagement /></ProtectedRoute>} />
              <Route path="/members/add" element={<ProtectedRoute><AddMember /></ProtectedRoute>} />
              <Route path="/members/edit/:id" element={<ProtectedRoute><EditMember /></ProtectedRoute>} />
              <Route path="/finance/salary" element={<ProtectedRoute><SalaryManagement /></ProtectedRoute>} />
              <Route path="/finance/expense" element={<ProtectedRoute><ExpenseManagement /></ProtectedRoute>} />
              <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
              <Route path="/trainers" element={<ProtectedRoute><Trainer /></ProtectedRoute>} />
              <Route path="/trainers/add" element={<ProtectedRoute><AddTrainer /></ProtectedRoute>} />
              <Route path="/trainers/edit/:id" element={<ProtectedRoute><EditTrainer /></ProtectedRoute>} />
              <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
              <Route path="/workout/routine" element={<ProtectedRoute><WorkoutRoutine /></ProtectedRoute>} />
              <Route path="/diet/plan" element={<ProtectedRoute><DietPlan /></ProtectedRoute>} />
              <Route path="/progress/tracking" element={<ProtectedRoute><ProgressTracker /></ProtectedRoute>} />
              <Route path="/reports/analytics" element={<ProtectedRoute><ReportsAnalytics /></ProtectedRoute>} />
              <Route path="/classes/schedule" element={<ProtectedRoute><ClassesSchedule /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/franchisesandmembership" element={<ProtectedRoute><FranchiseAndMembership /></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><Product /></ProtectedRoute>} />
              <Route path="/products/create" element={<ProtectedRoute><ProductCreate /></ProtectedRoute>} />
              <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path='/support/tickets' element={<ProtectedRoute><SupportTickets /></ProtectedRoute>} />
              <Route path='/gymblog' element={<ProtectedRoute><GymBlog /></ProtectedRoute>} />
              <Route path='/notificationcommunication' element={<ProtectedRoute><NotificationsCommunication /></ProtectedRoute>} />
              <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/gyms" element={<ProtectedRoute><GymsManagement /></ProtectedRoute>} />
              <Route path="/gyms/add" element={<ProtectedRoute><AddGym /></ProtectedRoute>} />
              <Route path="/gyms/edit/:id" element={<ProtectedRoute><EditGym /></ProtectedRoute>} />
              <Route path="/gyms/view/:id" element={<ProtectedRoute><ViewGym /></ProtectedRoute>} />
              {/* Redirect unknown routes to home */}
            </Routes>
          </div>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App