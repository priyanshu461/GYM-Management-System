import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Ruler, Scale, Calendar, Users, Zap, Trophy, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import Layout from "@/components/Layout";

const BMICalculator = () => {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "male",
  });
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [dietPlan, setDietPlan] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.height || form.height <= 0)
      newErrors.height = "Please enter a valid height.";
    if (!form.weight || form.weight <= 0)
      newErrors.weight = "Please enter a valid weight.";
    if (!form.age || form.age <= 0)
      newErrors.age = "Please enter a valid age.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMI = () => {
    if (!validateForm()) return;

    const heightM = form.height / 100;
    const bmiValue = parseFloat((form.weight / (heightM * heightM)).toFixed(2));
    setBmi(bmiValue);

    let cat = "";
    if (bmiValue < 18.5) cat = "Underweight";
    else if (bmiValue < 25) cat = "Normal";
    else if (bmiValue < 30) cat = "Overweight";
    else cat = "Obese";
    setCategory(cat);

    generatePlans(cat);
  };

  const generatePlans = (cat) => {
    let diet = [];
    let workout = [];

    switch (cat) {
      case "Underweight":
        diet = [
          {
            meal: "Breakfast",
            items: "Oats with almonds and banana, Full-fat milk smoothie",
            calories: "~500 kcal",
          },
          {
            meal: "Lunch",
            items:
              "Grilled chicken breast, Brown rice, Mixed vegetables, Avocado",
            calories: "~700 kcal",
          },
          {
            meal: "Snack",
            items: "Peanut butter sandwich on whole grain bread, Greek yogurt",
            calories: "~400 kcal",
          },
          {
            meal: "Dinner",
            items: "Baked salmon, Quinoa salad, Sweet potato, Broccoli",
            calories: "~600 kcal",
          },
        ];
        workout = [
          {
            day: "Monday",
            exercises:
              "Push-ups 3x12, Squats 3x20, Plank 3x30s, Rest day tomorrow",
            duration: "45 min",
          },
          {
            day: "Wednesday",
            exercises:
              "Pull-ups 3x10, Lunges 3x15 per leg, Dumbbell rows 3x12",
            duration: "50 min",
          },
          {
            day: "Friday",
            exercises:
              "Bench Press 3x12, Deadlifts 3x10, Calf raises 3x20",
            duration: "55 min",
          },
        ];
        break;

      case "Normal":
        diet = [
          {
            meal: "Breakfast",
            items:
              "Protein smoothie with berries, Whole grain toast with eggs",
            calories: "~450 kcal",
          },
          {
            meal: "Lunch",
            items:
              "Grilled chicken salad, Quinoa, Mixed greens, Olive oil dressing",
            calories: "~550 kcal",
          },
          {
            meal: "Snack",
            items: "Apple with almonds, Cottage cheese",
            calories: "~300 kcal",
          },
          {
            meal: "Dinner",
            items: "Baked salmon, Steamed vegetables, Brown rice",
            calories: "~500 kcal",
          },
        ];
        workout = [
          {
            day: "Monday",
            exercises:
              "30 min cardio (running/cycling), Full body strength: Push-ups, Squats, Rows",
            duration: "60 min",
          },
          {
            day: "Wednesday",
            exercises: "Yoga session 45 min, Light weights for upper body",
            duration: "45 min",
          },
          {
            day: "Friday",
            exercises:
              "HIIT 20 min, Core workout: Planks, Crunches, Leg raises",
            duration: "40 min",
          },
        ];
        break;

      case "Overweight":
        diet = [
          {
            meal: "Breakfast",
            items: "Green tea, Oatmeal with berries, Handful of nuts",
            calories: "~350 kcal",
          },
          {
            meal: "Lunch",
            items: "Grilled fish, Large salad, Whole grain bread",
            calories: "~500 kcal",
          },
          {
            meal: "Snack",
            items: "Apple, Low-fat yogurt",
            calories: "~200 kcal",
          },
          {
            meal: "Dinner",
            items: "Vegetable soup, Lean turkey, Steamed broccoli",
            calories: "~450 kcal",
          },
        ];
        workout = [
          {
            day: "Monday",
            exercises: "Brisk walking 45 min, Light cardio warm-up",
            duration: "45 min",
          },
          {
            day: "Wednesday",
            exercises: "Swimming 30 min, Yoga stretches 20 min",
            duration: "50 min",
          },
          {
            day: "Friday",
            exercises: "Cycling 30 min, Basic strength: Squats, Push-ups",
            duration: "40 min",
          },
        ];
        break;

      case "Obese":
        diet = [
          {
            meal: "Breakfast",
            items: "Herbal tea, Mixed green salad, Low-calorie fruits",
            calories: "~250 kcal",
          },
          {
            meal: "Lunch",
            items: "Vegetable stir-fry, Lean meat, Clear soup",
            calories: "~400 kcal",
          },
          {
            meal: "Snack",
            items: "Carrots, Cucumber sticks",
            calories: "~100 kcal",
          },
          {
            meal: "Dinner",
            items:
              "Grilled vegetables, Protein shake, Small portion of quinoa",
            calories: "~350 kcal",
          },
        ];
        workout = [
          {
            day: "Monday",
            exercises: "Walking 60 min at moderate pace, Gentle stretching",
            duration: "60 min",
          },
          {
            day: "Wednesday",
            exercises: "Low-impact cardio 40 min, Breathing exercises 15 min",
            duration: "55 min",
          },
          {
            day: "Friday",
            exercises: "Water aerobics 45 min, Light yoga poses",
            duration: "45 min",
          },
        ];
        break;
      default:
        break;
    }
    setDietPlan(diet);
    setWorkoutPlan(workout);
  };

  const pieData = [
    { name: "Underweight", value: bmi && bmi < 18.5 ? 100 : 0, color: "#ff6384" },
    { name: "Normal", value: bmi && bmi >= 18.5 && bmi < 25 ? 100 : 0, color: "#36a2eb" },
    { name: "Overweight", value: bmi && bmi >= 25 && bmi < 30 ? 100 : 0, color: "#ffce56" },
    { name: "Obese", value: bmi && bmi >= 30 ? 100 : 0, color: "#ff9f40" },
  ].filter((d) => d.value > 0);

  const barData = [
    { name: "Your BMI", value: bmi || 0 },
    { name: "Ideal BMI", value: 22 },
  ];

  const progressData = [
    { month: "Current", bmi: bmi || 0 },
    { month: "Target", bmi: 22 },
  ];

  return (
    <Layout>
     <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>
      <div className={`p-6 max-w-7xl mx-auto min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white' : 'bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100'}`}>
        <header className="mb-8 text-center">
          <h1 className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
            AI-Powered BMI <span className="text-teal-500">Calculator</span>
          </h1>
          <p className={`text-xl mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
            Get your personalized fitness plan generated by AI
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Input Form */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              className={`bg-gradient-to-br ${theme === 'dark' ? 'from-teal-800 to-teal-900' : 'from-teal-100 to-teal-200'} p-6 rounded-3xl shadow-xl border border-teal-300`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <Zap className="h-12 w-12 text-teal-600 mx-auto mb-2" />
                <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
                  AI Fitness Calculator
                </h2>
                <p className={`mt-2 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>
                  Enter your details to get personalized plans
                </p>
              </div>

              <div className="space-y-6">
                {/* Height Input */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Ruler className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-500" />
                  <input
                    type="number"
                    placeholder="Height (cm)"
                    value={form.height}
                    onChange={(e) =>
                      setForm({ ...form, height: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:border-teal-500 text-base bg-white shadow-sm"
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm mt-1 ml-12">
                      {errors.height}
                    </p>
                  )}
                </motion.div>

                {/* Weight Input */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Scale className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-500" />
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={form.weight}
                    onChange={(e) =>
                      setForm({ ...form, weight: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:border-teal-500 text-base bg-white shadow-sm"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm mt-1 ml-12">
                      {errors.weight}
                    </p>
                  )}
                </motion.div>

                {/* Age Input */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-500" />
                  <input
                    type="number"
                    placeholder="Age"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-input focus:outline-none focus:ring-4 focus:ring-ring focus:border-ring text-base bg-background shadow-sm"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1 ml-12">
                      {errors.age}
                    </p>
                  )}
                </motion.div>

                {/* Gender Input */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-500" />
                  <select
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-input focus:outline-none focus:ring-4 focus:ring-ring focus:border-ring text-lg bg-background shadow-sm appearance-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </motion.div>

                <motion.button
                  onClick={calculateBMI}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-4 px-6 rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="inline h-5 w-5 mr-2" />
                  Generate AI Fitness Plan
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* BMI Result */}
            {bmi && (
              <motion.div
                className={`bg-gradient-to-br ${theme === 'dark' ? 'from-teal-800 to-teal-900' : 'from-teal-100 to-teal-200'} p-6 rounded-3xl shadow-lg border border-teal-300`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-center mb-6">
                  <Trophy className="h-16 w-16 text-teal-600 mx-auto mb-2" />
                  <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
                    Your BMI Report
                  </h2>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>
                    Great job! Here's your personalized fitness analysis.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <motion.div
                      className={`p-4 rounded-2xl shadow-md ${theme === 'dark' ? 'bg-teal-900' : 'bg-white'}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center mb-2">
                        <Target className="h-6 w-6 text-teal-500 mr-2" />
                        <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-teal-100' : 'text-slate-800'}`}>
                          BMI: <span className="text-teal-600 text-2xl">{bmi}</span>
                        </p>
                      </div>
                      <p className={`${theme === 'dark' ? 'text-teal-300' : 'text-slate-600'}`}>
                        Category: <span className="font-bold text-teal-700">{category}</span>
                      </p>
                    </motion.div>
                    <div className={`p-4 rounded-2xl shadow-md ${theme === 'dark' ? 'bg-teal-900' : 'bg-white'}`}>
                      <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-teal-100' : 'text-slate-700'}`}>
                        Based on WHO standards:
                      </p>
                      <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-teal-300' : 'text-slate-500'}`}>
                        <li>• Underweight: {'<'} 18.5</li>
                        <li>• Normal: 18.5 - 24.9</li>
                        <li>• Overweight: 25 - 29.9</li>
                        <li>• Obese: {'>='} 30</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-2xl shadow-md">
                      <p className="text-sm font-bold">
                        {category === "Normal"
                          ? "🎉 Excellent! You are in the healthy range. Keep it up!"
                          : category === "Underweight"
                          ? "💪 Let us build some strength! Focus on nutrient-rich foods."
                          : category === "Overweight"
                          ? "🚀 You are on the right path! Small changes make big differences."
                          : "🌟 Every journey starts with a single step. You have got this!"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-2xl shadow-md ${theme === 'dark' ? 'bg-teal-900' : 'bg-white'}`}>
                      <h3 className={`text-lg font-semibold mb-2 text-center ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
                        BMI Distribution
                      </h3>
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={50}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className={`p-4 rounded-2xl shadow-md ${theme === 'dark' ? 'bg-teal-900' : 'bg-white'}`}>
                      <h3 className={`text-lg font-semibold mb-2 text-center ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
                        BMI Comparison
                      </h3>
                      <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={barData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="value"
                            fill="#14b8a6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Progress Tracker */}
            {bmi && (
              <div className={`p-6 rounded-3xl shadow-lg ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-100 to-teal-200'}`}>
                <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
                  Progress Tracker
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={progressData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="bmi"
                      stroke="#14b8a6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Diet Plan */}
        {dietPlan.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-3xl font-semibold mb-6 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'} text-center`}>
              AI-Generated Diet Plan
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dietPlan.map((plan, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-3xl bg-gradient-to-br ${theme === 'dark' ? 'from-teal-800 to-teal-900' : 'from-teal-100 to-teal-200'} shadow-lg hover:shadow-xl transition`}
                >
                  <h3 className={`font-bold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'} text-xl mb-2`}>
                    {plan.meal}
                  </h3>
                  <p className={`mb-3 ${theme === 'dark' ? 'text-teal-300' : 'text-slate-700'}`}>{plan.items}</p>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>
                    {plan.calories}
                  </p>
                </div>
              ))}
            </div>
            <div className={`mt-6 p-4 ${theme === 'dark' ? 'bg-teal-800' : 'bg-teal-200'} rounded-2xl`}>
              <p className={`font-semibold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
                💡 AI Tip: Stay hydrated with 8-10 glasses of water daily. Track
                your meals for better results!
              </p>
            </div>
          </div>
        )}

        {/* Workout Plan */}
        {workoutPlan.length > 0 && (
          <div>
            <h2 className={`text-3xl font-semibold mb-6 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'} text-center`}>
              AI-Generated Workout Plan
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {workoutPlan.map((plan, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-3xl bg-gradient-to-br ${theme === 'dark' ? 'from-teal-800 to-teal-900' : 'from-teal-100 to-teal-200'} shadow-lg hover:shadow-xl transition`}
                >
                  <h3 className={`font-bold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'} text-xl mb-2`}>
                    {plan.day}
                  </h3>
                  <p className={`mb-3 ${theme === 'dark' ? 'text-teal-300' : 'text-slate-700'}`}>{plan.exercises}</p>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>
                    Duration: {plan.duration}
                  </p>
                </div>
              ))}
            </div>
            <div className={`mt-6 p-4 ${theme === 'dark' ? 'bg-teal-800' : 'bg-teal-200'} rounded-2xl`}>
              <p className={`font-semibold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
                💡 AI Tip: Warm up before workouts and cool down after. Listen
                to your body and rest when needed!
              </p>
            </div>
          </div>
        )}
      </div>
     </div>
      </Layout>
  );
};

export default BMICalculator;
