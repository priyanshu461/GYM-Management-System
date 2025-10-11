import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Calendar, ShoppingBag, Mail, Phone, MapPin, X, Zap, TrendingUp, BarChart3, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Sidebar from '../components/layout/Sidebar';

const Home = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_address: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    emailjs.init('_VkauSoEGbRlwu8Hr');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Sending emails...');
    try {
      // Send thank you confirmation to user
      await emailjs.send('service_s1vsjp4', 'template_vfbigqj', {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
        user_address: formData.user_address,
        message: "Thank you for contacting us. We have received your message and will respond to you soon.",
        to_email: formData.user_email
      });

      // Send details to admin
      await emailjs.send('service_s1vsjp4', 'template_vfbigqj', {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
        user_address: formData.user_address,
        message: formData.message,
        to_email: 'dellindia1023@gmail.com'
      });

      console.log('Emails sent successfully');
      setIsSubmitted(true);
      setFormData({
        user_name: '',
        user_email: '',
        user_phone: '',
        user_address: '',
        message: ''
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending emails:', error);
      // Optionally handle error display
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50">
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
              <button onClick={() => scrollToSection('whyus')} className="text-teal-800 hover:text-teal-600 transition">Why Choose Us</button>
            </div>
            <div className="flex space-x-2">
              <Link to="/login" className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-100 hover:to-teal-200 hover:text-teal-600 shadow">
                Login
              </Link>
              {/* <Link to="/dashboard" className="bg-teal-100 text-teal-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-200 border border-teal-200 shadow">
                Dashboard
              </Link> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-teal-300 via-teal-400 to-teal-400 text-white relative">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Next-level Gym Management
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto text-white/90 font-medium drop-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Smart, simple, and fully integrated software for fitness clubs and studios. Empower success for your members, trainers, and business.
          </motion.p>
          <motion.div
            className="space-x-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button onClick={() => setShowDemo(true)} className="bg-white text-teal-700 px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-teal-100 transition">
              Get Started Free
            </button>
            <button onClick={() => scrollToSection('whyus')} className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-teal-600 transition">
              Why Choose GMS?
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto  bg-tale-400  px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-extrabold text-center text-teal-800 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Core Features
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Users className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Member Management</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Digital signups, attendance tracking, renewals, full profile management, and communication all in one place.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                • Revolutionize operations by automating tedious tasks and saving 10+ hours weekly<br/>
                • Unlock powerful insights with centralized data for smarter decision-making<br/>
                • Seamlessly integrate with existing workflows for zero disruption<br/>
                • Automate renewals and payments to boost retention and revenue<br/>
                • Deliver personalized marketing that drives member loyalty and growth
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Calendar className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Bookings & Classes</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Automated scheduling, trainer assignment, class bookings, and live attendance dashboards.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                • Effortlessly schedule classes and assign trainers with intuitive tools<br/>
                • Empower members with a seamless online booking experience<br/>
                • Monitor real-time attendance for accurate insights and adjustments<br/>
                • Automate waitlists to maximize class capacity and satisfaction<br/>
                • Sync with calendar apps for ultimate convenience and integration
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingBag className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Product Sales</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Handle subscriptions, supplements, and apparel with one integrated point-of-sale system.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                • Master inventory with comprehensive tracking and optimization<br/>
                • Gain deep sales analytics to drive revenue growth<br/>
                • Integrate seamlessly with memberships for bundled offerings<br/>
                • Launch a built-in online store for effortless e-commerce<br/>
                • Boost profits with automated upselling and cross-selling features
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Dumbbell className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Workout & Progress</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Build and track custom routines, member assessments, and progress charts with a trainer portal.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                • Craft personalized workout plans tailored to every member's goals<br/>
                • Visualize progress with advanced tracking via photos and metrics<br/>
                • Perform comprehensive assessments to set achievable milestones<br/>
                • Enable trainer notes for collaborative member support<br/>
                • Foster motivation with goal-oriented communication portals
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Users className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Trainer Management</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Manage credentials, schedules, payroll, and performance for your staff and freelancers.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                • Showcase trainer expertise with detailed profiles and certifications<br/>
                • Automate scheduling for optimal trainer availability and efficiency<br/>
                • Streamline payroll with accurate calculations and reporting<br/>
                • Conduct insightful performance reviews to enhance team quality<br/>
                • Build a feedback system that drives continuous improvement
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Calendar className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Analytics & Growth</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Live dashboards, reporting, attendance insights, revenue, and growth KPIs at your fingertips.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                • Access real-time dashboards packed with actionable metrics<br/>
                • Customize reports for deep, tailored business insights<br/>
                • Analyze retention and churn to minimize losses and maximize loyalty<br/>
                • Forecast revenue with precision for strategic growth planning<br/>
                • Drive exponential growth with data-driven decision tools
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    
      {/* Why Us Section */}
      <section id="whyus" className="py-20 bg-gradient-to-r from-teal-100 via-teal-100 to-teal-50 flex-items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-extrabold text-center text-teal-800 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose GMS ?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Dumbbell className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">All-in-One Solution</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Manage all gym operations in a single, integrated platform.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                Eliminate the need for multiple tools with our comprehensive system that handles member management, scheduling, sales, and analytics seamlessly, boosting efficiency and reducing costs.
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Automation Excellence</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Automate routine tasks to save time and minimize errors.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                Leverage advanced automation for renewals, reminders, payments, and communications, freeing up your team to focus on growth and member satisfaction.
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <TrendingUp className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Scalability for Growth</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Grow your gym from small studio to large chain effortlessly.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                Our flexible system adapts to your needs, supporting custom memberships, pricing, and business models as you expand, ensuring scalability without compromise.
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <BarChart3 className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Data-Driven Insights</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Make informed decisions with real-time analytics.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                Access live dashboards and detailed reports on attendance, revenue, and performance, enabling data-driven strategies for optimal gym management and profitability.
              </p>
            </motion.div>
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-400 transition-all cursor-pointer hover:bg-teal-400 hover:border-teal-400"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Headphones className="h-12 w-12 text-teal-500 mb-4 group-hover:text-teal-100" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-900">Unmatched Support</h3>
              <p className="text-teal-700 group-hover:opacity-0 transition-opacity duration-300">Get 24/7 expert help and resources.</p>
              <p className="text-teal-900 mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                Benefit from round-the-clock support, comprehensive onboarding, and a rich knowledge base, ensuring your gym operates smoothly and achieves lasting success.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-teal-900 mb-4">About GMS</h2>
            <p className="text-xl text-teal-700 max-w-3xl mx-auto">
              GMS was built by fitness professionals and software experts to power the world's best gyms. We're here to make management simpler, members happier, and results real.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.4,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-teal-700">Our Mission</h3>
              <p className="text-teal-800 mb-6">
                To empower fitness businesses with world-class technology that strengthens what matters most: community, results, and growth.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-teal-700">What Sets Us Apart?</h3>
              <ul className="text-teal-700 space-y-2">
                <li>• Designed by fitness professionals, built by developers</li>
                <li>• Ultra-fast support, real onboarding</li>
                <li>• Built for scale: Single studios to multi-city brands</li>
                <li>• Secure, reliable, and constantly improving</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl shadow-md"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h3 className="text-xl font-semibold mb-4 text-teal-800">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-teal-500 mr-3" />
                  <span>Member Automation</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-teal-500 mr-3" />
                  <span>Auto Reminders</span>
                </div>
                <div className="flex items-center">
                  <ShoppingBag className="h-6 w-6 text-teal-500 mr-3" />
                  <span>Point of Sale</span>
                </div>
                <div className="flex items-center">
                  <Dumbbell className="h-6 w-6 text-teal-500 mr-3" />
                  <span>Goal Tracking</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center text-teal-900 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.4,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-teal-700">We're Here To Help</h3>
              <div className="space-y-4">
                <div className="bg-white p-10 rounded-lg shadow-md border-l-4 border-teal-500 flex items-center">
                  <Mail className="h-8 w-8 text-teal-500 mr-4" />
                  <div>
                    <h4 className=" text-teal-800 font-bold text-lg">Email Us</h4>
                    <p className="text-teal-900 text-base ">support@Gymmanagesystem.com<br/>gymmanagementsystem@gmail.com</p>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-lg shadow-md border-l-4 border-teal-500 flex items-center">
                  <Phone className="h-8 w-8 text-teal-500 mr-4" />
                  <div>
                    <h4 className="font-bold text-teal-800 text-lg">Contact Us</h4>
                    <p className="text-teal-900 text-base">+91 98765 43210 <br/> +91 87654 32109</p>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-lg shadow-md border-l-4 border-teal-500 flex items-center">
                  <MapPin className="h-8 w-8 text-teal-500 mr-4" />
                  <div>
                    <h4 className="font-bold text-teal-800 text-lg">Visit Us</h4>
                    <p className="text-teal-900 text-base">Sanjay Palace, Shoe Market, 282002</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-white p-10 rounded-2xl shadow border-t-4 border-teal-200"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h3 className='text-center text-2xl font-lg font-semibold mb-6 text-teal-700'>{isSubmitted ? 'Thank You!' : 'Send Us A Message'}</h3>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <p className="text-green-600 text-lg mb-4">Thank You We will respond you soon</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-1">Enter Full Name</label>
                      <input 
                        type="text" 
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        placeholder="Enter your name" 
                        className="w-full px-3 py-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-1">Enter Your Email</label>
                      <input 
                        type="email" 
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        placeholder="your.email@example.com" 
                        className="w-full px-3 py-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" 
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        name="user_phone"
                        value={formData.user_phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number" 
                        className="w-full px-3 py-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-1">Enter Your Address</label>
                      <input 
                        type="text" 
                        name="user_address"
                        value={formData.user_address}
                        onChange={handleChange}
                        placeholder="Enter your address" 
                        className="w-full px-3 py-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" 
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">Message For Any Details</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4" 
                      placeholder="Share Your Concern / Question?" 
                      className="w-full px-3 py-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3 px-4 rounded-lg shadow hover:from-teal-700 hover:to-teal-600 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-br from-teal-800 via-teal-900 to-teal-800 text-white py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="h-8 w-8 text-teal-400" />
                <span className="text-xl font-bold">GMS </span>
              </div>
              <p className="text-teal-100">Empowering gyms with innovative fitness management solutions for a stronger tomorrow.</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-teal-100">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-teal-900">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-teal-900">Features</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-teal-900">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-teal-900">Contact</button></li>
              </ul>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold mb-4">GMS Toolkit</h3>
              <ul className="space-y-2 text-teal-100">
                <li>Membership CRM</li>
                <li>Class & Trainer Scheduler</li>
                <li>POS & Sales</li>
                <li>Analytics Reports</li>
              </ul>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-teal-100">
                <li>support@Gymmanagesystem.com</li>
                <li>+91 98765 43210</li>
                <li>Sanjay Palace , Shoe Market</li>
                <li>282002</li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            className="border-t border-teal-700 mt-8 pt-8 text-center text-teal-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p>&copy; {new Date().getFullYear()} GMS . All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>

      {/* Demo Modal */}
      {showDemo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="bg-white rounded-lg shadow-2xl w-11/12 h-5/6 flex overflow-hidden relative">
            <div className="absolute top-2 left-2 text-red-500 font-bold text-sm bg-yellow-200 px-2 py-1 rounded">
              DEMO
            </div>
            <Sidebar demo={true} />
            <div className="flex-1 p-6 bg-teal-50">
              <h2 className="text-2xl font-bold mb-6 text-teal-800">Dashboard Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-blue-800">Total Members</h3>
                  <p className="text-2xl font-bold text-blue-600">1,250</p>
                </div>
                <div className="bg-green-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-green-800">Active Trainers</h3>
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-yellow-800">Revenue This Month</h3>
                  <p className="text-2xl font-bold text-yellow-600">$45,000</p>
                </div>
                <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-purple-800">Classes Today</h3>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
                <div className="bg-pink-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-pink-800">Products Sold</h3>
                  <p className="text-2xl font-bold text-pink-600">320</p>
                </div>
                <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-indigo-800">Support Tickets</h3>
                  <p className="text-2xl font-bold text-indigo-600">5</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
