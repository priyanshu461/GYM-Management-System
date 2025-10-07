import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Calendar, ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

const Land = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-teal-100 to-emerald-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-teal-500" />
              <span className="text-xl font-bold text-teal-900">GMS</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-teal-800 hover:text-teal-600 transition">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-teal-800 hover:text-teal-600 transition">Features</button>
              <button onClick={() => scrollToSection('about')} className="text-teal-800 hover:text-teal-600 transition">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-teal-800 hover:text-teal-600 transition">Contact</button>
              <button onClick={() => scrollToSection('whyus')} className="text-teal-800 hover:text-teal-600 transition">Why Us</button>
            </div>
            <div className="flex space-x-2">
              <Link to="/login" className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-600 shadow">
                Login
              </Link>
              <Link to="/dashboard" className="bg-teal-100 text-teal-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-200 border border-teal-200 shadow">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-emerald-300 via-teal-400 to-emerald-400 text-white relative">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow">
            Next-level Gym Management
          </h1>
          <p className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto text-white/90 font-medium drop-shadow">
            Smart, simple, and fully integrated software for fitness clubs and studios. Empower success for your members, trainers, and business.
          </p>
          <div className="space-x-4">
            <Link to="/login" className="bg-white text-teal-700 px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-teal-100 transition">
              Get Started Free
  
            </Link>
            <button onClick={() => scrollToSection('whyus')} className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-teal-600 transition">
              Why GMS?
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-teal-800 mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-emerald-400 transition-all">
              <Users className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Member Management</h3>
              <p className="text-teal-700">Digital signups, attendance tracking, renewals, full profile management, and communication all in one place.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-teal-400 transition-all">
              <Calendar className="h-12 w-12 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bookings & Classes</h3>
              <p className="text-teal-700">Automated scheduling, trainer assignment, class bookings, and live attendance dashboards.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-emerald-400 transition-all">
              <ShoppingBag className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Product Sales</h3>
              <p className="text-teal-700">Handle subscriptions, supplements, and apparel with one integrated point-of-sale system.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-teal-400 transition-all">
              <Dumbbell className="h-12 w-12 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Workout & Progress</h3>
              <p className="text-teal-700">Build and track custom routines, member assessments, and progress charts with a trainer portal.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-emerald-400 transition-all">
              <Users className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trainer Management</h3>
              <p className="text-teal-700">Manage credentials, schedules, payroll, and performance for your staff and freelancers.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-teal-400 transition-all">
              <Calendar className="h-12 w-12 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics & Growth</h3>
              <p className="text-teal-700">Live dashboards, reporting, attendance insights, revenue, and growth KPIs at your fingertips.</p>
            </div>
          </div>
        </div>
      </section>
    
      {/* Why Us Section */}
      <section id="whyus" className="py-20 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-teal-800 mb-8">Why GMS ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
              <h3 className="text-xl font-semibold text-teal-700 mb-3">All-In-One Solution</h3>
              <p className="text-teal-700">No extra logins, no spreadsheets, no juggling spreadsheets or different apps — manage your club, trainers, sessions, sales and more in one platform.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
              <h3 className="text-xl font-semibold text-teal-700 mb-3">Flexible For Any Gym</h3>
              <p className="text-teal-700">From boutique studios to large chains, FitBase adapts to memberships, trials, pricing plans, and unique business models.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
              <h3 className="text-xl font-semibold text-teal-700 mb-3">Support That Lifts You</h3>
              <p className="text-teal-700">24/7 expert support, onboarding guidance, and a resource library to help your gym thrive every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-teal-900 mb-4">About G M S</h2>
            <p className="text-xl text-teal-700 max-w-3xl mx-auto">
              FitBase Pro was built by fitness professionals and software experts to power the world's best gyms. We're here to make management simpler, members happier, and results real.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-emerald-700">Our Mission</h3>
              <p className="text-teal-800 mb-6">
                To empower fitness businesses with world-class technology that strengthens what matters most: community, results, and growth.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-emerald-700">What Sets Us Apart?</h3>
              <ul className="text-teal-700 space-y-2">
                <li>• Designed Ai Scholars, Born to be  developers</li>
                <li>• Ultra-fast support, real onboarding</li>
                <li>• Built for scale: Single studios to multi-city brands</li>
                <li>• Secure, reliable, and constantly improving</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-emerald-100 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-teal-800">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-emerald-500 mr-3" />
                  <span>Member Automation</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-teal-500 mr-3" />
                  <span>Auto Reminders</span>
                </div>
                <div className="flex items-center">
                  <ShoppingBag className="h-6 w-6 text-emerald-500 mr-3" />
                  <span>Point of Sale</span>
                </div>
                <div className="flex items-center">
                  <Dumbbell className="h-6 w-6 text-teal-500 mr-3" />
                  <span>Goal Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-teal-900 mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-teal-700">We're Here To Help</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-emerald-500 mr-3" />
                  <span>support@Gymmanagesystem.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-emerald-500 mr-3" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-emerald-500 mr-3" />
                  <span>Sanjay Plaacr, Shoe Market, 282002</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow border-t-4 border-teal-200">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-teal-800 mb-1">Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-800 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-800 mb-1">Message</label>
                  <textarea rows="4" className="w-full px-3 py-2 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2 px-4 rounded-lg shadow hover:from-teal-600 hover:to-emerald-600 font-bold transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-teal-800 via-teal-900 to-emerald-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="h-8 w-8 text-emerald-400" />
                <span className="text-xl font-bold">GMS </span>
              </div>
              <p className="text-emerald-100">Empowering gyms with innovative fitness management solutions for a stronger tomorrow.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-emerald-100">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white">Features</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">GMS Toolkit</h3>
              <ul className="space-y-2 text-emerald-100">
                <li>Membership CRM</li>
                <li>Class & Trainer Scheduler</li>
                <li>POS & Sales</li>
                <li>Analytics Reports</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-emerald-100">
                <li>support@Gymmanagesystem.com</li>
                <li>+91 98765 43210</li>
                <li>Sanjay Palace , Shoe Market</li>
                <li>282002</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-100">
            <p>&copy; {new Date().getFullYear()} GMS . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Land;
