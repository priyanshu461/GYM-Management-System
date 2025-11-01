import Layout from "@/components/Layout";
import React, { useState } from "react";
import { UserPlus, User, Mail, Phone, MapPin, Calendar, AlertCircle, CheckCircle, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gymServices from "@/services/gymServices";

export default function AddMember() {
  const navigate = useNavigate();
  const [newMember, setNewMember] = useState({
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
  const [setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newMember.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!newMember.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(newMember.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!newMember.aadharNo.trim()) {
      newErrors.aadharNo = "Aadhar number is required";
    } else if (!/^[0-9]{12}$/.test(newMember.aadharNo)) {
      newErrors.aadharNo = "Aadhar number must be 12 digits";
    }

    if (newMember.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newMember.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (newMember.emergencyContact && !/^[0-9]{10}$/.test(newMember.emergencyContact)) {
      newErrors.emergencyContact = "Emergency contact must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addMember = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      await gymServices.addCustomer(newMember);

      alert("Member added successfully!");

      // Reset form
      setNewMember({
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

      // Navigate back to members list
      navigate("/members");

    } catch (err) {
      console.error("Error adding member:", err);
      setErrors({ submit: err.message || "Failed to add member. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground py-10 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate("/members")}
            className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Members
          </button>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold mb-3 text-foreground tracking-tight">
              <UserPlus className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
              Add New <span className="text-teal-500 dark:text-teal-400">Member</span>
            </h1>
            <p className="text-muted-foreground text-lg">Welcome a new member to your fitness family</p>
          </div>

          {/* Form Container */}
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-teal-400/5 to-teal-600/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-teal-500/20 rounded-3xl blur-xl"></div>

            <div className="relative bg-gradient-to-br from-white/80 to-teal-50/50 dark:from-teal-900/20 dark:to-teal-800/20 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/30 rounded-3xl shadow-2xl p-8 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/15 to-teal-700/15 rounded-full blur-xl translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={newMember.mobile}
                      onChange={(e) => setNewMember({ ...newMember, mobile: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter 10-digit mobile number"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Aadhar Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Aadhar Number *
                    </label>
                    <input
                      type="text"
                      value={newMember.aadharNo}
                      onChange={(e) => setNewMember({ ...newMember, aadharNo: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter 12-digit aadhar number"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </label>
                    <textarea
                      value={newMember.address}
                      onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none"
                      placeholder="Enter address"
                      rows="3"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={newMember.emergencyContact}
                      onChange={(e) => setNewMember({ ...newMember, emergencyContact: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter emergency contact"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={newMember.dob}
                      onChange={(e) => setNewMember({ ...newMember, dob: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Gender</label>
                    <select
                      value={newMember.gender}
                      onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Occupation */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">Occupation</label>
                    <input
                      type="text"
                      value={newMember.occupation}
                      onChange={(e) => setNewMember({ ...newMember, occupation: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter occupation"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-border mt-6">
                  <button
                    onClick={() => navigate("/members")}
                    className="flex-1 px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addMember}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl hover:from-teal-700 hover:to-teal-600 active:from-teal-800 active:to-teal-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Add Member
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
