import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import { Building, MapPin, Phone, Mail, AlertCircle, CheckCircle, ArrowLeft, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import gymServices from "../../services/gymServices";

export default function EditGym() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gym, setGym] = useState({
    name: "",
    password: "",
    mobile: "",
    image: "",
    address: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchGym();
  }, [id]);

  const fetchGym = async () => {
    try {
      const response = await gymServices.getGymById(id);
      const foundGym = response;
      if (foundGym) {
        setGym({
          name: foundGym.name || "",
          password: "", // Don't populate password for security
          mobile: foundGym.mobile || "",
          image: foundGym.image || "",
          address: foundGym.address || "",
          email: foundGym.email || "",
        });
      } else {
        setErrors({ fetch: "Gym not found" });
      }
    } catch (err) {
      setErrors({ fetch: "Failed to load gym data" });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!gym.name.trim()) {
      newErrors.name = "Gym name is required";
    }

    if (!gym.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    if (!gym.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!gym.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(gym.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateGym = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      const gymData = {
        name: gym.name,
        mobile: gym.mobile,
        image: gym.image,
        address: gym.address,
        email: gym.email,
      };

      // Only include password if it's provided
      if (gym.password.trim()) {
        gymData.password = gym.password;
      }

      await gymServices.updateGym(id, gymData);

      alert("Gym updated successfully!");

      // Navigate back to gyms list
      navigate("/gyms");

    } catch (err) {
      console.error("Error updating gym:", err);
      setErrors({ submit: err.message || "Failed to update gym. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background text-foreground py-10 px-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          <span className="ml-3 text-muted-foreground">Loading gym...</span>
        </div>
      </Layout>
    );
  }

  if (errors.fetch) {
    return (
      <Layout>
        <div className="min-h-screen bg-background text-foreground py-10 px-4 flex items-center justify-center">
          <div className="text-red-500">{errors.fetch}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground py-10 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate("/gyms")}
            className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gyms
          </button>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold mb-3 text-foreground tracking-tight">
              <Building className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
              Edit <span className="text-teal-500 dark:text-teal-400">Gym</span>
            </h1>
            <p className="text-muted-foreground text-lg">Update gym information</p>
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
                      <Building className="w-4 h-4" />
                      Gym Name *
                    </label>
                    <input
                      type="text"
                      value={gym.name}
                      onChange={(e) => setGym({ ...gym, name: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${errors.name ? 'border-red-500' : 'border-input'}`}
                      placeholder="Enter gym name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password (leave empty to keep current)</label>
                    <input
                      type="password"
                      value={gym.password}
                      onChange={(e) => setGym({ ...gym, password: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${errors.password ? 'border-red-500' : 'border-input'}`}
                      placeholder="Enter new password"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mobile Number *
                    </label>
                    <input
                      type="text"
                      value={gym.mobile}
                      onChange={(e) => setGym({ ...gym, mobile: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${errors.mobile ? 'border-red-500' : 'border-input'}`}
                      placeholder="Enter mobile number"
                      required
                    />
                    {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={gym.email}
                      onChange={(e) => setGym({ ...gym, email: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${errors.email ? 'border-red-500' : 'border-input'}`}
                      placeholder="Enter email address"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address *
                    </label>
                    <textarea
                      value={gym.address}
                      onChange={(e) => setGym({ ...gym, address: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none ${errors.address ? 'border-red-500' : 'border-input'}`}
                      placeholder="Enter full address"
                      rows="3"
                      required
                    />
                    {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">Gym Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setGym({ ...gym, image: e.target.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-teal-900 dark:file:text-teal-200 dark:hover:file:bg-teal-800"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      📁
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl">
                    <p className="text-red-700 dark:text-red-300 text-sm">{errors.submit}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-6 border-t border-border mt-6">
                  <button
                    onClick={() => navigate("/gyms")}
                    className="flex-1 px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateGym}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl hover:from-teal-700 hover:to-teal-600 active:from-teal-800 active:to-teal-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Update Gym
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
