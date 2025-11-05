import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, AlertCircle, CheckCircle, ArrowLeft, Edit2, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import gymServices from "@/services/gymServices";

export default function EditMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState({
    name: "",
    mobile: "",
    email: "",
    aadharNo: "",
    address: "",
    emergencyContact: "",
    dob: "",
    gender: "",
    occupation: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      setIsLoading(true);
      const res = await gymServices.getCustomerById(id);
      if (res.customer) {
        setMember({
          name: res.customer.name || "",
          mobile: res.customer.mobile || "",
          email: res.customer.email || "",
          aadharNo: res.customer.aadharNo || "",
          address: res.customer.address || "",
          emergencyContact: res.customer.emergencyContact || "",
          dob: res.customer.dob || "",
          gender: res.customer.gender || "",
          occupation: res.customer.occupation || ""
        });
      } else {
        setErrors({ fetch: "Member not found" });
      }
    } catch (err) {
      setErrors({ fetch: "Failed to load member data" });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!member.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!member.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(member.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!member.aadharNo.trim()) {
      newErrors.aadharNo = "Aadhar number is required";
    } else if (!/^[0-9]{12}$/.test(member.aadharNo)) {
      newErrors.aadharNo = "Aadhar number must be 12 digits";
    }

    if (member.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(member.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (member.emergencyContact && !/^[0-9]{10}$/.test(member.emergencyContact)) {
      newErrors.emergencyContact = "Emergency contact must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateMember = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      await gymServices.updateCustomer(id, member);

      alert("Member updated successfully!");
      navigate("/members");
    } catch (err) {
      console.error("Error updating member:", err);
      setErrors({ submit: err.message || "Failed to update member. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background text-foreground py-10 px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading member data...</p>
            </div>
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
            onClick={() => navigate("/members")}
            className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Members</span>
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Edit2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Edit <span className="text-teal-500 dark:text-teal-400">Member</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg">Update member information and details</p>
          </motion.div>

          {/* Error Message */}
          {errors.fetch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300">{errors.fetch}</p>
              </div>
            </motion.div>
          )}

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

              <form onSubmit={updateMember} className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => setMember({ ...member, name: e.target.value })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.name ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="Enter full name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>}
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4 text-teal-500" />
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={member.mobile}
                      onChange={(e) => setMember({ ...member, mobile: e.target.value })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.mobile ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      required
                    />
                    {errors.mobile && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.mobile}
                    </p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-teal-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => setMember({ ...member, email: e.target.value })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.email ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>}
                  </div>

                  {/* Aadhar Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-teal-500" />
                      Aadhar Number *
                    </label>
                    <input
                      type="text"
                      value={member.aadharNo}
                      onChange={(e) => setMember({ ...member, aadharNo: e.target.value })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.aadharNo ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="Enter 12-digit aadhar number"
                      required
                    />
                    {errors.aadharNo && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.aadharNo}
                    </p>}
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      Address
                    </label>
                    <textarea
                      value={member.address}
                      onChange={(e) => setMember({ ...member, address: e.target.value })}
                      className="w-full bg-background/50 dark:bg-teal-800/30 border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none placeholder:text-muted-foreground"
                      placeholder="Enter address"
                      rows="3"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4 text-teal-500" />
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={member.emergencyContact}
                      onChange={(e) => setMember({ ...member, emergencyContact: e.target.value })}
                      className={`w-full bg-background/50 dark:bg-teal-800/30 border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground ${
                        errors.emergencyContact ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="Enter emergency contact"
                    />
                    {errors.emergencyContact && <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.emergencyContact}
                    </p>}
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-500" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={member.dob}
                      onChange={(e) => setMember({ ...member, dob: e.target.value })}
                      className="w-full bg-background/50 dark:bg-teal-800/30 border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Gender</label>
                    <select
                      value={member.gender}
                      onChange={(e) => setMember({ ...member, gender: e.target.value })}
                      className="w-full bg-background/50 dark:bg-teal-800/30 border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Occupation */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground">Occupation</label>
                    <input
                      type="text"
                      value={member.occupation}
                      onChange={(e) => setMember({ ...member, occupation: e.target.value })}
                      className="w-full bg-background/50 dark:bg-teal-800/30 border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-muted-foreground"
                      placeholder="Enter occupation"
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
                    onClick={() => navigate("/members")}
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
                        Update Member
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
