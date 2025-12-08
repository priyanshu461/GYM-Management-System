import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Edit3, AlertCircle, CheckCircle, ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import gymServices from "@/services/gymServices";
import courseService from "@/services/courseService";
import { useAuth } from "@/contexts/AuthContext";

export default function EditCourse() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState({
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
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  const getGyms = async () => {
    try {
      const gymsData = await gymServices.getAllGyms();
      setGyms(gymsData.gyms || []);
    } catch (error) {
      console.error("Error fetching gyms:", error);
    }
  };

  const getCourse = async () => {
    try {
      setLoading(true);
      const courseData = await courseService.getCourseById(id);
      setCourse(courseData);
      setImagePreview(courseData.image || "");
    } catch (error) {
      console.error("Error fetching course:", error);
      alert("Failed to load course data");
      navigate("/courses/management");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.user_type === "Admin") {
      getGyms();
    }
    getCourse();
  }, [id, user.user_type]);

  const validateForm = () => {
    const newErrors = {};

    if (!course.name.trim()) {
      newErrors.name = "Course name is required";
    }

    if (!course.description.trim()) {
      newErrors.description = "Course description is required";
    }

    if (!course.duration.trim()) {
      newErrors.duration = "Course duration is required";
    }

    if (user.user_type === "Admin" && !course.gymId) {
      newErrors.gymId = "Please select a gym";
    }

    if (course.price.monthly < 0) {
      newErrors.monthlyPrice = "Monthly price cannot be negative";
    }

    if (course.price.annual < 0) {
      newErrors.annualPrice = "Annual price cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCourse({ ...course, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateCourse = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      // Prepare course data
      const courseData = { ...course };
      if (user.user_type !== "Admin") {
        // For non-admin users, remove gymId or set to their gym
        delete courseData.gymId;
      }

      await courseService.updateCourse(id, courseData);

      alert("Course updated successfully!");

      // Navigate back to courses management
      navigate("/courses/management");

    } catch (err) {
      console.error("Error updating course:", err);
      setErrors({ submit: err.message || "Failed to update course. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading course...</p>
          </div>
        </div>
      </Layout>
    );
  }

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
            <span className="font-medium">Back to Courses Management</span>
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Edit3 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Edit <span className="text-teal-500 dark:text-teal-400">Course</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg">Update course information</p>
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

              <form onSubmit={updateCourse} className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Gym Selection (Admin only) */}
                  {user.user_type === "Admin" && (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-teal-500" />
                        Select Gym *
                      </label>
                      <select
                        value={course.gymId}
                        onChange={(e) => setCourse({ ...course, gymId: e.target.value })}
                        className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${
                          errors.gymId ? 'border-red-500' : 'border-input'
                        }`}
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
                      value={course.name}
                      onChange={(e) => setCourse({ ...course, name: e.target.value })}
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
                      value={course.level}
                      onChange={(e) => setCourse({ ...course, level: e.target.value })}
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
                      <BookOpen className="w-4 h-4 text-teal-500" />
                      Duration *
                    </label>
                    <input
                      type="text"
                      value={course.duration}
                      onChange={(e) => setCourse({ ...course, duration: e.target.value })}
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
                    <label className="text-sm font-semibold text-foreground">Monthly Price ($)</label>
                    <input
                      type="number"
                      value={course.price.monthly}
                      onChange={(e) => setCourse({
                        ...course,
                        price: { ...course.price, monthly: parseFloat(e.target.value) || 0 }
                      })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${
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
                    <label className="text-sm font-semibold text-foreground">Annual Price ($)</label>
                    <input
                      type="number"
                      value={course.price.annual}
                      onChange={(e) => setCourse({
                        ...course,
                        price: { ...course.price, annual: parseFloat(e.target.value) || 0 }
                      })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${
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

                  {/* Image Upload */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Upload className="w-4 h-4 text-teal-500" />
                      Course Image
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-800/30 border border-teal-200 dark:border-teal-700 rounded-xl cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-800/50 transition-colors"
                      >
                        <Upload className="w-4 h-4 text-teal-500" />
                        Choose Image
                      </label>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg border border-teal-200 dark:border-teal-700"
                        />
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-teal-500" />
                      Description *
                    </label>
                    <textarea
                      value={course.description}
                      onChange={(e) => setCourse({ ...course, description: e.target.value })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none placeholder:text-muted-foreground ${
                        errors.description ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="Enter course description"
                      rows="4"
                      required
                    />
                    {errors.description && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.description}
                    </p>}
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
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Course
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
