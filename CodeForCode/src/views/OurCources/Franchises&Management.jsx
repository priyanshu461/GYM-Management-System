import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";
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
import franchiseService from "../../services/franchiseService";
import membershipService from "../../services/membershipService";
import { Loader2 } from "lucide-react";

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
  const [memberCount, setMemberCount] = useState(0);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [buttonStates, setButtonStates] = useState({});
  const [isCreateFranchiseDialogOpen, setIsCreateFranchiseDialogOpen] = useState(false);
  const [isCreatePlanDialogOpen, setIsCreatePlanDialogOpen] = useState(false);
  const [newFranchiseData, setNewFranchiseData] = useState({
    title: "",
    desc: "",
    investment: "",
    roi: "",
  });
  const [newPlanData, setNewPlanData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    features: [],
  });
  const [franchises, setFranchises] = useState([]);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loadingFranchises, setLoadingFranchises] = useState(true);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [franchiseError, setFranchiseError] = useState(null);
  const [planError, setPlanError] = useState(null);
  const [creatingFranchise, setCreatingFranchise] = useState(false);
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  // Fetch franchises from database
  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        setLoadingFranchises(true);
        setFranchiseError(null);
        const response = await franchiseService.getAllFranchises();
        const apiFranchises = Array.isArray(response) ? response : response.franchises || [];
        // Always include fallback franchises for display
        const fallbackFranchises = [
          {
            _id: 1,
            title: "Single Unit Franchise",
            desc: "Start your own gym under our brand with full setup, marketing, and training support.",
            investment: "₹15–25 Lakhs",
            roi: "Expected ROI in 12–18 months",
          },
          {
            _id: 2,
            title: "Master Franchise",
            desc: "Own and manage multiple branches in your city with exclusive regional rights.",
            investment: "₹50+ Lakhs",
            roi: "Expected ROI in 18–24 months",
          },
          {
            _id: 3,
            title: "Express Studio",
            desc: "Compact gym model ideal for smaller spaces or communities with low setup cost.",
            investment: "₹8–12 Lakhs",
            roi: "Expected ROI in 10–12 months",
          },
        ];
        setFranchises(apiFranchises.length > 0 ? apiFranchises : fallbackFranchises);
      } catch (err) {
        console.error('Error fetching franchises:', err);
        setFranchiseError('Failed to load franchises. Please try again.');
        // Fallback to default franchises if API fails
        setFranchises([
          {
            _id: 1,
            title: "Single Unit Franchise",
            desc: "Start your own gym under our brand with full setup, marketing, and training support.",
            investment: "₹15–25 Lakhs",
            roi: "Expected ROI in 12–18 months",
          },
          {
            _id: 2,
            title: "Master Franchise",
            desc: "Own and manage multiple branches in your city with exclusive regional rights.",
            investment: "₹50+ Lakhs",
            roi: "Expected ROI in 18–24 months",
          },
          {
            _id: 3,
            title: "Express Studio",
            desc: "Compact gym model ideal for smaller spaces or communities with low setup cost.",
            investment: "₹8–12 Lakhs",
            roi: "Expected ROI in 10–12 months",
          },
        ]);
      } finally {
        setLoadingFranchises(false);
      }
    };

    fetchFranchises();
  }, []);

  // Fetch membership plans from database
  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        setLoadingPlans(true);
        setPlanError(null);
        const response = await membershipService.getAllMembershipPlans();
        const apiPlans = Array.isArray(response) ? response : response.plans || [];
        // Always include fallback plans for display
        const fallbackPlans = [
          {
            _id: 1,
            name: "Basic Plan",
            price: "₹999/month",
            features: ["Gym Access", "Locker Facility", "1 Free Diet Plan"],
          },
          {
            _id: 2,
            name: "Premium Plan",
            price: "₹1999/month",
            features: [
              "All Basic Benefits",
              "Personal Trainer (2 sessions/week)",
              "Sauna Access",
            ],
          },
          {
            _id: 3,
            name: "Elite Plan",
            price: "₹2999/month",
            features: [
              "Unlimited Access",
              "Personal Trainer (Daily)",
              "Diet Consultation",
              "Priority Support",
            ],
          },
        ];
        setMembershipPlans(apiPlans.length > 0 ? apiPlans : fallbackPlans);
      } catch (err) {
        console.error('Error fetching membership plans:', err);
        setPlanError('Failed to load membership plans. Please try again.');
        // Fallback to default plans if API fails
        setMembershipPlans([
          {
            _id: 1,
            name: "Basic Plan",
            price: "₹999/month",
            features: ["Gym Access", "Locker Facility", "1 Free Diet Plan"],
          },
          {
            _id: 2,
            name: "Premium Plan",
            price: "₹1999/month",
            features: [
              "All Basic Benefits",
              "Personal Trainer (2 sessions/week)",
              "Sauna Access",
            ],
          },
          {
            _id: 3,
            name: "Elite Plan",
            price: "₹2999/month",
            features: [
              "Unlimited Access",
              "Personal Trainer (Daily)",
              "Diet Consultation",
              "Priority Support",
            ],
          },
        ]);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchMembershipPlans();
  }, []);

  // Fetch member count and customers on component mount and when registration succeeds
  useEffect(() => {
    const fetchMemberCount = async () => {
      setIsLoadingMembers(true);
      try {
        const response = await gymServices.getUser();
        setMemberCount(response.customers?.length || 0);
        setCustomers(response.customers || []);
      } catch (error) {
        console.error('Error fetching member count:', error);
        setMemberCount(0);
        setCustomers([]);
      } finally {
        setIsLoadingMembers(false);
      }
    };

    fetchMemberCount();
  }, [registrationSuccess]);

  const handleJoinNow = (planName) => {
    setSelectedPlan(planName);
    setIsDialogOpen(true);
    // Set button loading state
    setButtonStates(prev => ({ ...prev, [planName]: 'loading' }));
    setTimeout(() => {
      setButtonStates(prev => ({ ...prev, [planName]: 'ready' }));
    }, 500);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberSelect = (memberId) => {
    setSelectedMember(memberId);
    if (memberId) {
      const selectedMemberData = customers.find(customer => customer._id === memberId);
      if (selectedMemberData) {
        setFormData({
          name: selectedMemberData.name || "",
          email: selectedMemberData.email || "",
          mobile: selectedMemberData.mobile || "",
          aadharNo: selectedMemberData.aadharNo || "",
          address: selectedMemberData.address || "",
          emergencyContact: selectedMemberData.emergencyContact || "",
          dob: selectedMemberData.dob || "",
          gender: selectedMemberData.gender || "",
          occupation: selectedMemberData.occupation || "",
        });
      }
    } else {
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
    }
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

      if (selectedMember) {
        // Update existing member (exclude plan from update data)
        const { plan, ...updateData } = customerData;
        await gymServices.updateUser(selectedMember, updateData);
        setSubmitMessage("Membership updated successfully!");
      } else {
        // Register new member
        await gymServices.registerMember(customerData);
        setSubmitMessage("Membership registered successfully!");
      }

      setRegistrationSuccess(prev => !prev); // Trigger member count refresh
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
      setSelectedMember(""); // Reset selected member
      setTimeout(() => {
        setIsDialogOpen(false);
        setSubmitMessage("");
        // Reset button states
        setButtonStates({});
      }, 2000);
    } catch (error) {
      if (error?.message?.includes("Email already exists")) {
        setSubmitMessage("This email is already registered. Please use a different email.");
      } else {
        setSubmitMessage("Failed to process membership. Please try again.");
      }
      console.error("Error processing membership:", error);
    } finally {
      setIsSubmitting(false);
    }
  };



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
          <>
          <div className="flex justify-end mb-6">
            <Button
              onClick={() => setIsCreateFranchiseDialogOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-lg"
            >
              + Create New Franchise
            </Button>
          </div>
          {loadingFranchises ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-teal-600" />
              <span className="ml-2 text-teal-600">Loading franchises...</span>
            </div>
          ) : franchiseError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{franchiseError}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
              {franchises.map((item, index) => (
                <div
                  key={item._id || index}
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
          </>
        )}

        {activeTab === "membership" && (
          <>
            <div className="flex justify-end mb-6">
              <Button
                onClick={() => setIsCreatePlanDialogOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-lg"
              >
                + Create New Plan
              </Button>
            </div>
            {/* Member Count Display */}
            <div className="text-center mb-8">
              <div className={`inline-flex items-center px-6 py-3 rounded-full ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-teal-800 to-teal-700 border border-teal-600'
                  : 'bg-gradient-to-r from-teal-100 to-teal-200 border border-teal-300'
              } shadow-lg`}>
                <span className="text-2xl mr-3">👥</span>
                <div className="text-left">
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-teal-200' : 'text-teal-700'
                  }`}>
                    Community Members
                  </p>
                  <p className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-teal-800'
                  }`}>
                    {isLoadingMembers ? '...' : memberCount}
                  </p>
                </div>
              </div>
            </div>

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
                  {plan.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleJoinNow(plan.name)}
                  disabled={buttonStates[plan.name] === 'loading'}
                  className={`font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
                    buttonStates[plan.name] === 'loading'
                      ? 'bg-teal-500 cursor-not-allowed animate-pulse'
                      : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg hover:scale-105'
                  } text-white`}
                >
                  {buttonStates[plan.name] === 'loading' ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">⏳</span>
                      Opening...
                    </span>
                  ) : (
                    'Join Now'
                  )}
                </button>
              </div>
            ))}
          </div>
          </>
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
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                  Select Existing Member (Optional)
                </label>
                <Select onValueChange={handleMemberSelect} value={selectedMember || "none"}>
                  <SelectTrigger className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}>
                    <SelectValue placeholder="Choose a member to pre-fill form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (New Member)</SelectItem>
                    {customers.map((customer) => (
                      <SelectItem key={customer._id} value={customer._id}>
                        {customer.name} - {customer.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                  {isSubmitting ? (selectedMember ? "Updating..." : "Registering...") : (selectedMember ? "Update Membership" : "Register Membership")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Franchise Dialog */}
        <Dialog open={isCreateFranchiseDialogOpen} onOpenChange={setIsCreateFranchiseDialogOpen}>
          <DialogContent className={`sm:max-w-[600px] ${theme === 'dark' ? 'bg-teal-800 text-white' : 'bg-white'}`}>
            <DialogHeader>
              <DialogTitle className={theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}>
                Create New Franchise
              </DialogTitle>
              <DialogDescription className={theme === 'dark' ? 'text-teal-300' : 'text-slate-600'}>
                Add a new franchise option for potential partners.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setCreatingFranchise(true);
              try {
                await franchiseService.addFranchise(newFranchiseData);
                setIsCreateFranchiseDialogOpen(false);
                setNewFranchiseData({ title: "", desc: "", investment: "", roi: "" });
                // Refresh franchises list
                const response = await franchiseService.getAllFranchises();
                const apiFranchises = Array.isArray(response) ? response : response.franchises || [];
                setFranchises(apiFranchises.length > 0 ? apiFranchises : franchises);
              } catch (error) {
                console.error('Error creating franchise:', error);
                // Handle error (could add error state here)
              } finally {
                setCreatingFranchise(false);
              }
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Franchise Title *
                  </label>
                  <Input
                    value={newFranchiseData.title}
                    onChange={(e) => setNewFranchiseData({ ...newFranchiseData, title: e.target.value })}
                    required
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Investment Range *
                  </label>
                  <Input
                    value={newFranchiseData.investment}
                    onChange={(e) => setNewFranchiseData({ ...newFranchiseData, investment: e.target.value })}
                    required
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                  Description *
                </label>
                <Input
                  value={newFranchiseData.desc}
                  onChange={(e) => setNewFranchiseData({ ...newFranchiseData, desc: e.target.value })}
                  required
                  className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                  Expected ROI *
                </label>
                <Input
                  value={newFranchiseData.roi}
                  onChange={(e) => setNewFranchiseData({ ...newFranchiseData, roi: e.target.value })}
                  required
                  className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateFranchiseDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Franchise
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Membership Plan Dialog */}
        <Dialog open={isCreatePlanDialogOpen} onOpenChange={setIsCreatePlanDialogOpen}>
          <DialogContent className={`sm:max-w-[500px] ${theme === 'dark' ? 'bg-teal-800 text-white' : 'bg-white'}`}>
            <DialogHeader>
              <DialogTitle className={theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}>
                Create New Membership Plan
              </DialogTitle>
              <DialogDescription className={theme === 'dark' ? 'text-teal-300' : 'text-slate-600'}>
                Add a new membership plan for customers.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setCreatingPlan(true);
              try {
                await membershipService.createMembershipPlan(newPlanData);
                setIsCreatePlanDialogOpen(false);
                setNewPlanData({ name: "", description: "", duration: "", price: "", features: [] });
                // Refresh membership plans list
                const response = await membershipService.getAllMembershipPlans();
                const apiPlans = Array.isArray(response) ? response : response.plans || [];
                setMembershipPlans(apiPlans.length > 0 ? apiPlans : membershipPlans);
              } catch (error) {
                console.error('Error creating membership plan:', error);
                // Handle error (could add error state here)
              } finally {
                setCreatingPlan(false);
              }
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Plan Name *
                  </label>
                  <Input
                    value={newPlanData.name}
                    onChange={(e) => setNewPlanData({ ...newPlanData, name: e.target.value })}
                    required
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Duration (months) *
                  </label>
                  <Input
                    type="number"
                    value={newPlanData.duration}
                    onChange={(e) => setNewPlanData({ ...newPlanData, duration: e.target.value })}
                    required
                    min="1"
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                  Description
                </label>
                <Input
                  value={newPlanData.description}
                  onChange={(e) => setNewPlanData({ ...newPlanData, description: e.target.value })}
                  className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Price *
                  </label>
                  <Input
                    type="number"
                    value={newPlanData.price}
                    onChange={(e) => setNewPlanData({ ...newPlanData, price: e.target.value })}
                    required
                    min="0"
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                    Features (comma-separated) *
                  </label>
                  <Input
                    value={newPlanData.features.join(', ')}
                    onChange={(e) => setNewPlanData({ ...newPlanData, features: e.target.value.split(',').map(b => b.trim()) })}
                    required
                    className={theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : ''}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreatePlanDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Plan
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
