import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import { UserPlus, User, Award, Calendar, Star, AlertCircle, CheckCircle, ArrowLeft, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import trainerServices from "../../services/trainerServices";

export default function EditTrainer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trainer, setTrainer] = useState({
    name: "",
    expertise: "",
    experience: "",
    image: "",
    rating: "",
    certifications: "",
    specializations: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchTrainer();
  }, [id]);

  const fetchTrainer = async () => {
    try {
      const trainers = await trainerServices.getAllTrainers();
      const foundTrainer = trainers.find(t => t.id === id);
      if (foundTrainer) {
        setTrainer({
          ...foundTrainer,
          certifications: foundTrainer.certifications.join(', '),
          specializations: foundTrainer.specializations.join(', '),
        });
      } else {
        setErrors({ fetch: "Trainer not found" });
      }
    } catch (err) {
      setErrors({ fetch: "Failed to load trainer data" });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!trainer.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!trainer.expertise.trim()) {
      newErrors.expertise = "Expertise is required";
    }

    if (!trainer.experience.trim()) {
      newErrors.experience = "Experience is required";
    }

    if (trainer.rating && (isNaN(trainer.rating) || trainer.rating < 0 || trainer.rating > 5)) {
      newErrors.rating = "Rating must be a number between 0 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateTrainer = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      const trainerData = {
        name: trainer.name,
        expertise: trainer.expertise,
        experience: trainer.experience,
        image: trainer.image,
        rating: parseFloat(trainer.rating) || 0,
        certifications: trainer.certifications.split(',').map(c => c.trim()).filter(c => c),
        specializations: trainer.specializations.split(',').map(s => s.trim()).filter(s => s),
        trainer_id: id,
      };

      await trainerServices.updateTrainer(trainerData);

      alert("Trainer updated successfully!");

      // Navigate back to trainers list
      navigate("/trainers");

    } catch (err) {
      console.error("Error updating trainer:", err);
      setErrors({ submit: err.message || "Failed to update trainer. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background text-foreground py-10 px-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          <span className="ml-3 text-muted-foreground">Loading trainer...</span>
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
            onClick={() => navigate("/trainers")}
            className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Trainers
          </button>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold mb-3 text-foreground tracking-tight">
              <UserPlus className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
              Edit <span className="text-teal-500 dark:text-teal-400">Trainer</span>
            </h1>
            <p className="text-muted-foreground text-lg">Update trainer information</p>
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
                      value={trainer.name}
                      onChange={(e) => setTrainer({ ...trainer, name: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${errors.name ? 'border-red-500' : 'border-input'}`}
                      placeholder="Enter full name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>

                  {/* Expertise */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Expertise *
                    </label>
                    <input
                      type="text"
                      value={trainer.expertise}
                      onChange={(e) => setTrainer({ ...trainer, expertise: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${errors.expertise ? 'border-red-500' : 'border-input'}`}
                      placeholder="e.g., Strength & Conditioning"
                      required
                    />
                    {errors.expertise && <p className="text-red-500 text-xs">{errors.expertise}</p>}
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Experience *
                    </label>
                    <input
                      type="text"
                      value={trainer.experience}
                      onChange={(e) => setTrainer({ ...trainer, experience: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${errors.experience ? 'border-red-500' : 'border-input'}`}
                      placeholder="e.g., 5 Years"
                      required
                    />
                    {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={trainer.rating}
                      onChange={(e) => setTrainer({ ...trainer, rating: e.target.value })}
                      className={`w-full bg-background border text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all ${errors.rating ? 'border-red-500' : 'border-input'}`}
                      placeholder="Enter rating"
                    />
                    {errors.rating && <p className="text-red-500 text-xs">{errors.rating}</p>}
                  </div>

                  {/* Certifications */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Certifications</label>
                    <input
                      type="text"
                      value={trainer.certifications}
                      onChange={(e) => setTrainer({ ...trainer, certifications: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Comma-separated certifications"
                    />
                  </div>

                  {/* Specializations */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Specializations</label>
                    <input
                      type="text"
                      value={trainer.specializations}
                      onChange={(e) => setTrainer({ ...trainer, specializations: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Comma-separated specializations"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setTrainer({ ...trainer, image: e.target.result });
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
                    onClick={() => navigate("/trainers")}
                    className="flex-1 px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateTrainer}
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
                        Update Trainer
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
