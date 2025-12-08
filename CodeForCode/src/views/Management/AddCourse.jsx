import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Clock, DollarSign, AlertCircle, CheckCircle, ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import courseService from "@/services/courseService";
import gymServices from "@/services/gymServices";
import { useAuth } from "@/contexts/AuthContext";

export default function AddCourse() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    gymId: "",
    name: "",
    image: "",
    description: "",
    level: "Beginner",
    duration: "",
    price: {
      monthly: 50,
      annual: 500
    }
  });

  const [gyms, setGyms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getGyms = async () => {
    try {
      const gymsData = await gymServices.getAllGyms();
      setGyms(gymsData.gyms || []);
    } catch (error) {
      console.error("Error fetching gyms:", error);
    }
  };

  useEffect(() => {
    getGyms();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!newCourse.name.trim()) {
      newErrors.name = "Course name is required";
    }

    if (!newCourse.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    if (user.user_type === "Admin" && !newCourse.gymId) {
      newErrors.gymId = "Gym selection is required";
    }

    if (newCourse.price.monthly < 0) {
      newErrors.monthlyPrice = "Monthly price cannot be negative";
    }

    if (newCourse.price.annual < 0) {
      newErrors.annualPrice = "Annual price cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addCourse = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      // If not admin, use the user's gym
      const courseData = {
        ...newCourse,
        gymId: user.user_type === "Admin" ? newCourse.gymId : user.gymId
      };

      await courseService.createCourse(courseData);

      alert("Course added successfully!");

      // Reset form
      setNewCourse({
        gymId: "",
        name: "",
        image: "",
        description: "",
        level: "Beginner",
        duration: "",
        price: {
          monthly: 50,
          annual: 500
        }
      });

      // Navigate back to courses list
      navigate("/courses/management");

    } catch (err) {
      console.error("Error adding course:", err);
      setErrors({ submit: err.message || "Failed to add course. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-teal-50/50 dark:from-teal-900 dark:via-teal-900 dark:to-teal-800 text-foreground py-6 sm:py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/courses/management")}
            className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Courses</span>
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Add New <span className="text-teal-500 dark:text-teal-400">Course</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg">Create a new fitness course for your gym</p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-teal-400/5 to-teal-600/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-teal-500/20 rounded-3xl blur-xl"></div>

            <div className="relative bg-white/90 dark:bg-teal-900/90 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/30 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/15 to-teal-700/15 rounded-full blur-xl translate-y-12 -translate-x-12"></div>

              <form onSubmit={addCourse} className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Gym Selection (Admin only) */}
                  {user.user_type === "Admin" && (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Gym *</label>
                      <select
                        value={newCourse.gymId}
                        onChange={(e) => setNewCourse({ ...newCourse, gymId: e.target.value })}
                        className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${
                          errors.gymId ? 'border-red-500' : 'border-input'
                        }`}
                        required
                      >
                        <option value="">Select Gym</option>
                        {gyms.map((gym) => (
                          <option key={gym._id} value={gym._id}>{gym.name}</option>
                        ))}
                      </select>
                      {errors.gymId && <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.gymId}
                      </p>}
                    </div>
                  )}

                  {/* Course Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-teal-500" />
                      Course Name *
                    </label>
                    <input
                      type="text"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.name ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="Enter course name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>}
                  </div>

                  {/* Level */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Difficulty Level</label>
                    <select
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                      className="w-full bg-background/50 dark:bg-teal-800/30 border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-500" />
                      Duration *
                    </label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.duration ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="e.g., 8 weeks, 3 months"
                      required
                    />
                    {errors.duration && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.duration}
                    </p>}
                  </div>

                  {/* Monthly Price */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-teal-500" />
                      Monthly Price
                    </label>
                    <input
                      type="number"
                      value={newCourse.price.monthly}
                      onChange={(e) => setNewCourse({
                        ...newCourse,
                        price: { ...newCourse.price, monthly: parseFloat(e.target.value) || 0 }
                      })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.monthlyPrice ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="50"
                      min="0"
                      step="0.01"
                    />
                    {errors.monthlyPrice && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.monthlyPrice}
                    </p>}
                  </div>

                  {/* Annual Price */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-teal-500" />
                      Annual Price
                    </label>
                    <input
                      type="number"
                      value={newCourse.price.annual}
                      onChange={(e) => setNewCourse({
                        ...newCourse,
                        price: { ...newCourse.price, annual: parseFloat(e.target.value) || 0 }
                      })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.annualPrice ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="500"
                      min="0"
                      step="0.01"
                    />
                    {errors.annualPrice && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.annualPrice}
                    </p>}
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Upload className="w-4 h-4 text-teal-500" />
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={newCourse.image}
                      onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                      className="w-full bg-background/50 dark:bg-teal-800/30 border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-500" />
                      Description
                    </label>
                    <textarea
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      className="w-full bg-background/50 dark:bg-teal-800/30 border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none placeholder:text-muted-foreground"
                      placeholder="Enter course description"
                      rows="4"
                    />
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 dark:text-red-300 text-sm">{errors.submit}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-border mt-6">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/courses/management")}
                    className="flex-1 px-6 py-3 border-2 border-border rounded-xl text-foreground hover:bg-muted transition-colors font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl hover:from-teal-700 hover:to-teal-600 active:from-teal-800 active:to-teal-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Add Course
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
