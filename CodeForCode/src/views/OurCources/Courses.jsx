import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import courseService from "../../services/courseService";
import gymServices from "../../services/gymServices";
import trainerServices from "../../services/trainerServices";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2, Filter, Search } from "lucide-react";

const Courses = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    upiId: "",
  });
  const [enrolling, setEnrolling] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [gyms, setGyms] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedGym, setSelectedGym] = useState("all");
  const [selectedTrainer, setSelectedTrainer] = useState("all");

  // Fetch courses from database
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch gyms and trainers for filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [gymsRes, trainersRes] = await Promise.all([
          gymServices.getAllGyms(),
          trainerServices.getAllTrainers()
        ]);
        setGyms(gymsRes || []);
        setTrainers(trainersRes || []);
      } catch (err) {
        console.error('Error fetching filters:', err);
      }
    };
    fetchFilters();
  }, []);

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...courses];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Gym filter
    if (selectedGym !== "all") {
      filtered = filtered.filter(course => course.gymId === selectedGym);
    }

    // Trainer filter
    if (selectedTrainer !== "all") {
      filtered = filtered.filter(course => course.trainerId === selectedTrainer);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return (a.price?.monthly || 0) - (b.price?.monthly || 0);
        case "price-high":
          return (b.price?.monthly || 0) - (a.price?.monthly || 0);
        case "level":
          const levels = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "All Levels": 0 };
          return levels[a.level] - levels[b.level];
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedLevel, selectedGym, selectedTrainer, sortBy]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseService.getAllCourses();
      const apiCourses = Array.isArray(response) ? response : response.courses || [];
      // Always include fallback courses for display
      const fallbackCourses = [
        {
          _id: 1,
          name: "Strength Training",
          image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
          description: "Build muscle and improve endurance with professional strength training programs.",
          level: "Intermediate",
          duration: "8 Weeks",
          price: { monthly: 50, annual: 500 }
        },
        {
          _id: 2,
          name: "Yoga & Flexibility",
          image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
          description: "Enhance flexibility and balance through guided yoga and meditation sessions.",
          level: "Beginner",
          duration: "6 Weeks",
          price: { monthly: 40, annual: 400 }
        },
        {
          _id: 3,
          name: "Cardio Blast",
          image: "https://media.istockphoto.com/id/961837744/photo/side-view-of-a-beautiful-woman-smiling-while-cycling-during-exercising-class-at-the-gym.jpg?s=612x612&w=0&k=20&c=6hZAtaQP3uAR6CvrWW44bA2ZKDAf5jiA-rQzxH-mb4o=",
          description: "High-intensity cardio sessions to burn fat and improve stamina efficiently.",
          level: "All Levels",
          duration: "4 Weeks",
          price: { monthly: 45, annual: 450 }
        },
        {
          _id: 4,
          name: "CrossFit Challenge",
          image: "https://www.garagegymreviews.com/wp-content/uploads/2023/11/Photo-Credit-CrossFit-Games-@crossfitgames.jpeg",
          description: "Push your limits with CrossFit workouts focusing on strength, power, and agility.",
          level: "Advanced",
          duration: "10 Weeks",
          price: { monthly: 60, annual: 600 }
        },
      ];
      setCourses(apiCourses.length > 0 ? apiCourses : fallbackCourses);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again.');
      // Fallback to default courses if API fails
      setCourses([
        {
          _id: 1,
          name: "Strength Training",
          image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
          description: "Build muscle and improve endurance with professional strength training programs.",
          level: "Intermediate",
          duration: "8 Weeks",
          price: { monthly: 50, annual: 500 }
        },
        {
          _id: 2,
          name: "Yoga & Flexibility",
          image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
          description: "Enhance flexibility and balance through guided yoga and meditation sessions.",
          level: "Beginner",
          duration: "6 Weeks",
          price: { monthly: 40, annual: 400 }
        },
        {
          _id: 3,
          name: "Cardio Blast",
          image: "https://media.istockphoto.com/id/961837744/photo/side-view-of-a-beautiful-woman-smiling-while-cycling-during-exercising-class-at-the-gym.jpg?s=612x612&w=0&k=20&c=6hZAtaQP3uAR6CvrWW44bA2ZKDAf5jiA-rQzxH-mb4o=",
          description: "High-intensity cardio sessions to burn fat and improve stamina efficiently.",
          level: "All Levels",
          duration: "4 Weeks",
          price: { monthly: 45, annual: 450 }
        },
        {
          _id: 4,
          name: "CrossFit Challenge",
          image: "https://www.garagegymreviews.com/wp-content/uploads/2023/11/Photo-Credit-CrossFit-Games-@crossfitgames.jpeg",
          description: "Push your limits with CrossFit workouts focusing on strength, power, and agility.",
          level: "Advanced",
          duration: "10 Weeks",
          price: { monthly: 60, annual: 600 }
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle course enrollment
  const handleEnroll = async () => {
    if (!user) {
      alert("Please login to enroll in courses");
      return;
    }

    try {
      setEnrolling(true);
      const enrollmentData = {
        userId: user._id,
        courseId: selectedCourse._id,
        plan: selectedPlan,
        paymentMethod,
        paymentDetails,
        amount: selectedPlan === "monthly" ? selectedCourse.price?.monthly || 50 : selectedCourse.price?.annual || 500
      };

      await courseService.enrollInCourse(selectedCourse._id, enrollmentData);
      alert("Enrollment successful! You will receive a confirmation email shortly.");
      setIsModalOpen(false);
      // Reset payment details
      setPaymentDetails({
        cardNumber: "",
        expiry: "",
        cvv: "",
        name: "",
        upiId: "",
      });
    } catch (err) {
      console.error('Error enrolling in course:', err);
      alert("Enrollment failed. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <Layout>
        <section className={`py-16 min-h-screen ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900'
            : 'bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100'
        }`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`text-4xl font-extrabold text-center mb-10 ${
          theme === 'dark' ? 'text-white' : 'text-slate-800'
        }`}>
          Our <span className={`${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-500'
          }`}>Gym Courses</span>
        </h2>

        {/* Search and Filter Section */}
        <div className={`mb-8 p-6 rounded-2xl shadow-lg ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-700 to-gray-800'
            : 'bg-gradient-to-br from-teal-50 to-teal-100'
        }`}>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
              }`} />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${
                  theme === 'dark'
                    ? 'border-gray-600 focus:border-teal-400 bg-gray-600 text-white'
                    : 'border-teal-200 focus:border-teal-400'
                }`}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className={`w-40 ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-600 text-white'
                    : 'border-teal-200'
                }`}>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="All Levels">All Levels</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedGym} onValueChange={setSelectedGym}>
                <SelectTrigger className={`w-40 ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-600 text-white'
                    : 'border-teal-200'
                }`}>
                  <SelectValue placeholder="Gym" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gyms</SelectItem>
                  {gyms.map((gym) => (
                    <SelectItem key={gym._id} value={gym._id}>
                      {gym.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                <SelectTrigger className={`w-40 ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-600 text-white'
                    : 'border-teal-200'
                }`}>
                  <SelectValue placeholder="Trainer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trainers</SelectItem>
                  {trainers.map((trainer) => (
                    <SelectItem key={trainer._id} value={trainer._id}>
                      {trainer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className={`w-40 ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-600 text-white'
                    : 'border-teal-200'
                }`}>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="level">Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className={`mt-4 text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            <span className="ml-2 text-lg">Loading courses...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchCourses}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course._id || course.id}
                className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800'
                    : 'bg-gradient-to-br from-teal-50 to-teal-100'
                }`}
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}>
                    {course.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                  }`}>{course.description}</p>
                  <div className={`flex justify-between text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    <span>Level: <span className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-700'
                    }`}>{course.level}</span></span>
                    <span>Duration: <span className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-700'
                    }`}>{course.duration}</span></span>
                  </div>
                  <div className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                  }`}>
                    <span className={`font-semibold ${
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    }`}>
                      From ${course.price?.monthly || 50}/month
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsModalOpen(true);
                    }}
                    className="mt-5 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-xl transition duration-200"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>

    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className={`max-w-2xl ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600'
          : 'bg-gradient-to-br from-teal-50 to-slate-100 border-teal-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
          }`}>Enroll in {selectedCourse?.name}</DialogTitle>
          <DialogDescription className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Complete your enrollment by selecting a subscription plan and providing payment details.
          </DialogDescription>
        </DialogHeader>

        {selectedCourse && (
          <div className="space-y-4">
            <div className={`flex gap-4 p-4 rounded-xl shadow-sm ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-white'
            }`}>
              <img
                src={selectedCourse.image}
                alt={selectedCourse.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                }`}>{selectedCourse.name}</h3>
                <p className={`text-sm mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                }`}>{selectedCourse.description}</p>
                <div className="flex gap-3 text-xs">
                  <span className={`px-2 py-1 rounded-full font-semibold ${
                    theme === 'dark'
                      ? 'bg-teal-900 text-teal-300'
                      : 'bg-teal-100 text-teal-700'
                  }`}>
                    Level: {selectedCourse.level}
                  </span>
                  <span className={`px-2 py-1 rounded-full font-semibold ${
                    theme === 'dark'
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    Duration: {selectedCourse.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className={`p-3 rounded-xl shadow-sm ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-white'
            }`}>
              <h4 className={`text-base font-semibold mb-3 ${
                theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
              }`}>Subscription Plans</h4>
              <div className="space-y-2">
                <label className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
                  theme === 'dark'
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-teal-50 hover:bg-teal-100'
                }`}>
                  <input
                    type="radio"
                    value="monthly"
                    checked={selectedPlan === "monthly"}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="mr-2 text-teal-500"
                  />
                  <div>
                    <span className={`font-semibold text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-slate-700'
                    }`}>Monthly Plan</span>
                    <span className={`font-bold ml-2 text-sm ${
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    }`}>$50/month</span>
                  </div>
                </label>
                <label className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
                  theme === 'dark'
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-teal-50 hover:bg-teal-100'
                }`}>
                  <input
                    type="radio"
                    value="annual"
                    checked={selectedPlan === "annual"}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="mr-2 text-teal-500"
                  />
                  <div>
                    <span className={`font-semibold text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-slate-700'
                    }`}>Annual Plan</span>
                    <span className={`font-bold ml-2 text-sm ${
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    }`}>${selectedCourse.price?.annual || 500}/year</span>
                    <span className={`text-xs ml-2 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`}>(Save 17%)</span>
                  </div>
                </label>
              </div>
            </div>

            <div className={`p-3 rounded-xl shadow-sm ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-white'
            }`}>
              <h4 className={`text-base font-semibold mb-3 ${
                theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
              }`}>Payment Method</h4>
              <div className="space-y-2 mb-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2 text-teal-500"
                  />
                  <span className={`font-semibold text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-slate-700'
                  }`}>Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2 text-teal-500"
                  />
                  <span className={`font-semibold text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-slate-700'
                  }`}>UPI</span>
                </label>
              </div>

              {paymentMethod === "card" ? (
                <div className="space-y-3">
                  <Input
                    placeholder="Card Number"
                    value={paymentDetails.cardNumber}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                    }
                    className={`text-sm ${
                      theme === 'dark'
                        ? 'border-gray-600 focus:border-teal-400 bg-gray-600 text-white'
                        : 'border-teal-200 focus:border-teal-400'
                    }`}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="MM/YY"
                      value={paymentDetails.expiry}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, expiry: e.target.value })
                      }
                      className={`text-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 focus:border-teal-400 bg-gray-600 text-white'
                          : 'border-teal-200 focus:border-teal-400'
                      }`}
                    />
                    <Input
                      placeholder="CVV"
                      value={paymentDetails.cvv}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                      }
                      className={`text-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 focus:border-teal-400 bg-gray-600 text-white'
                          : 'border-teal-200 focus:border-teal-400'
                      }`}
                    />
                  </div>
                  <Input
                    placeholder="Cardholder Name"
                    value={paymentDetails.name}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, name: e.target.value })
                    }
                    className={`text-sm ${
                      theme === 'dark'
                        ? 'border-gray-600 focus:border-teal-400 bg-gray-600 text-white'
                        : 'border-teal-200 focus:border-teal-400'
                    }`}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <Input
                    placeholder="UPI ID (e.g., user@upi)"
                    value={paymentDetails.upiId}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, upiId: e.target.value })
                    }
                    className={`text-sm ${
                      theme === 'dark'
                        ? 'border-gray-600 focus:border-teal-400 bg-gray-600 text-white'
                        : 'border-teal-200 focus:border-teal-400'
                    }`}
                  />
                </div>
              )}
            </div>

            <div className={`p-3 rounded-xl shadow-sm ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-white'
            }`}>
              <h4 className={`text-base font-semibold mb-3 ${
                theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
              }`}>Total Payable Amount</h4>
              <div className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
              }`}>
                ${selectedPlan === "monthly" ? (selectedCourse.price?.monthly || 50) : (selectedCourse.price?.annual || 500)}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={() => setIsModalOpen(false)} className={`${
            theme === 'dark'
              ? 'border-gray-600 text-teal-400 hover:bg-gray-700'
              : 'border-teal-300 text-teal-600 hover:bg-teal-50'
          }`}>
            Cancel
          </Button>
          <Button
            onClick={handleEnroll}
            disabled={enrolling}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enrolling ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </Layout>
  );
};

export default Courses;