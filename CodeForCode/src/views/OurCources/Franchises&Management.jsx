import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import gymServices from "../../services/gymServices";

const FranchiseAndMembership = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("franchise");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    aadharNo: "",
    address: "",
    emergencyContact: "",
    dob: "",
    gender: "",
    occupation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleJoinNow = (planName) => {
    setSelectedPlan(planName);
    setIsDialogOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const customerData = {
        ...formData,
        plan: selectedPlan,
      };
      await gymServices.addCustomer(customerData);
      setSubmitMessage("Membership registered successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        aadharNo: "",
        address: "",
        emergencyContact: "",
        dob: "",
        gender: "",
        occupation: "",
      });
      setTimeout(() => {
        setIsDialogOpen(false);
        setSubmitMessage("");
      }, 2000);
    } catch (error) {
      setSubmitMessage("Failed to register membership. Please try again.");
      console.error("Error registering membership:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const franchiseData = [
    {
      title: "Single Unit Franchise",
      desc: "Start your own gym under our brand with full setup, marketing, and training support.",
      investment: "₹15–25 Lakhs",
      roi: "Expected ROI in 12–18 months",
    },
    {
      title: "Master Franchise",
      desc: "Own and manage multiple branches in your city with exclusive regional rights.",
      investment: "₹50+ Lakhs",
      roi: "Expected ROI in 18–24 months",
    },
    {
      title: "Express Studio",
      desc: "Compact gym model ideal for smaller spaces or communities with low setup cost.",
      investment: "₹8–12 Lakhs",
      roi: "Expected ROI in 10–12 months",
    },
  ];

  const membershipPlans = [
    {
      name: "Basic Plan",
      price: "₹999/month",
      benefits: ["Gym Access", "Locker Facility", "1 Free Diet Plan"],
    },
    {
      name: "Premium Plan",
      price: "₹1999/month",
      benefits: [
        "All Basic Benefits",
        "Personal Trainer (2 sessions/week)",
        "Sauna Access",
      ],
    },
    {
      name: "Elite Plan",
      price: "₹2999/month",
      benefits: [
        "Unlimited Access",
        "Personal Trainer (Daily)",
        "Diet Consultation",
        "Priority Support",
      ],
    },
  ];

  return (
    <Layout>
      <section className={`w-full ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900'
          : 'bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100'
      } min-h-screen py-16 px-6 md:px-20`}>
        <div className="text-center mb-10">
          <h2 className={`text-4xl font-extrabold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-teal-600'
          }`}>
            Membership Plans
          </h2>
          <p className={`max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
          }`}>
            Whether you want to start your own gym or join our fitness community,
            we’ve got flexible options for everyone.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab("franchise")}
            className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ${
              activeTab === "franchise"
                ? "bg-teal-600 text-white font-semibold shadow-lg shadow-teal-400/50"
                : theme === 'dark'
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-slate-200 hover:bg-slate-300"
            }`}
          >
            Franchise
          </button>
          <button
            onClick={() => setActiveTab("membership")}
            className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ${
              activeTab === "membership"
                ? "bg-teal-600 text-white font-semibold shadow-lg shadow-teal-400/50"
                : theme === 'dark'
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-slate-200 hover:bg-slate-300"
            }`}
          >
            Membership
          </button>
        </div>

        {/* Franchise Section */}
        {activeTab === "franchise" && (
          <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
            {franchiseData.map((item, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border border-teal-700'
                    : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 border border-teal-300'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-teal-900/20 to-transparent'
                    : 'bg-gradient-to-br from-teal-400/10 to-transparent'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <h3 className={`text-2xl font-extrabold mb-2 flex items-center ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}>
                    <span className="mr-2">🏢</span>
                    {item.title}
                  </h3>
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>{item.desc}</p>
                  <div className="space-y-2">
                    <p className="text-sm flex items-center">
                      <span className="mr-2">💰</span>
                      <span className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>Investment:</span>{" "}
                      <span className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                      }`}>{item.investment}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <span className="mr-2">📈</span>
                      <span className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>ROI:</span> <span className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                      }`}>{item.roi}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "membership" && (
          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800'
                    : 'bg-gradient-to-br from-teal-50 to-teal-100'
                }`}
              >
                <h3 className={`text-2xl font-extrabold mb-2 ${
                  theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-3xl font-extrabold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>{plan.price}</p>
                <ul className={`space-y-2 mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                }`}>
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>• {benefit}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleJoinNow(plan.name)}
                  className="bg-teal-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-teal-700 transition"
                >
                  Join Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Membership Signup Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className={`sm:max-w-[500px] ${theme === 'dark' ? 'bg-teal-800 text-white' : 'bg-white'}`}>
            <DialogHeader>
              <DialogTitle className={theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}>
                Join {selectedPlan}
              </DialogTitle>
              <DialogDescription className={theme === 'dark' ? 'text-teal-300' : 'text-slate-600'}>
                Fill in your details to register for the membership.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Mobile *
                  </label>
                  <Input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    required
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Aadhar Number *
                  </label>
                  <Input
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleFormChange}
                    required
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                  Address
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Emergency Contact
                  </label>
                  <Input
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleFormChange}
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleFormChange}
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Gender
                  </label>
                  <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Occupation
                  </label>
                  <Input
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleFormChange}
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
              </div>
              {submitMessage && (
                <p className={`text-sm ${submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {submitMessage}
                </p>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register Membership"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </section>
    </Layout>
  );
};

export default FranchiseAndMembership;
