import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './views/Login'
import Home from './views/Home'
import MemberManagement from './views/Management/MemberManagement'
import Finance from './views/Management/FinanceManagement'
import Trainers from './views/Management/TrainersManagement'
import Facilities from './views/Management/FacilitiesManagement'
import WorkoutRoutine from './views/Workout& Diet Plan/WorkoutRoutinue'
import DietPlan from './views/Workout& Diet Plan/CoustumDietPlan'
import ProgressTracker from './views/Workout& Diet Plan/ProgressTracking'
import ReportsAnalytics from './views/Workout& Diet Plan/ReportsAndAnalytics'
import BMICalculator from './views/BMICalculator'
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
import Profile from './views/Profile'

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<MemberManagement />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/workoutRoutinue" element={<WorkoutRoutine />} />
          <Route path="/dietPlan" element={<DietPlan />} />
          <Route path="/bmiCalculator" element={<BMICalculator />} />
          <Route path="/progressTracking" element={<ProgressTracker />} />
          <Route path="/reportsAnalytics" element={<ReportsAnalytics />} />
          <Route path="/classesSchedule" element={<ClassesSchedule />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/franchiseAndMembership" element={<FranchiseAndMembership />} />
          <Route path="/protein" element={<Protein />} />
          <Route path='/aminoacidsuppliments' element={<AminoAcidSuppliments />} />
          <Route path='/suppliments' element={<Suppliments />} />
          <Route path='/multivitaminandminerals' element={<MultivitaminAndMinerals />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/supporttickets' element={<SupportTickets />} />
          <Route path='/gymblog' element={<GymBlog />} />
          <Route path='/notificationcommunication' element={<NotificationsCommunication />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
