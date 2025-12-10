import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Apple, Beef, Wheat, Droplets, Target, TrendingUp, Award, Heart, Users, Plus } from "lucide-react";
import gymServices from "../../services/gymServices";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const defaultDietPlans = {
  weightLoss: {
    title: "Weight Loss Plan",
    description: "Calorie-controlled meals for sustainable weight loss",
    color: "from-emerald-500 to-teal-600",
    bgColor: "from-emerald-50 to-teal-50",
    darkBgColor: "from-emerald-900/20 to-teal-900/20",
    totalCalories: 1800,
    macros: { protein: 25, carbs: 45, fat: 30 },
    meals: [
      {
        meal: "Breakfast",
        time: "8:00 AM",
        items: "Oatmeal with Almonds and Green Tea",
        calories: 320,
        protein: 12,
        carbs: 45,
        fat: 8,
        image: "https://images.unsplash.com/photo-1553909489-cd47e7f21090?w=400&h=250&fit=crop",
        icon: "🍳",
        benefits: ["High fiber", "Sustained energy"]
      },
      {
        meal: "Lunch",
        time: "1:00 PM",
        items: "Quinoa Salad with Brown Rice and Mixed Vegetables",
        calories: 450,
        protein: 15,
        carbs: 65,
        fat: 12,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
        icon: "🍽️",
        benefits: ["Complete protein", "Rich in vitamins"]
      },
      {
        meal: "Snack",
        time: "4:00 PM",
        items: "Fresh Fruits and Yogurt",
        calories: 180,
        protein: 8,
        carbs: 25,
        fat: 3,
        image: "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=400&h=250&fit=crop",
        icon: "🍎",
        benefits: ["Natural sweetness", "Probiotics"]
      },
      {
        meal: "Dinner",
        time: "7:00 PM",
        items: "Vegetable Soup with Whole Wheat Roti",
        calories: 350,
        protein: 10,
        carbs: 55,
        fat: 7,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop",
        icon: "🍲",
        benefits: ["Low calorie", "High volume"]
      },
    ]
  },
  muscleGain: {
    title: "Muscle Gain Plan",
    description: "Protein-rich meals to support muscle growth",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    darkBgColor: "from-blue-900/20 to-indigo-900/20",
    totalCalories: 2800,
    macros: { protein: 35, carbs: 45, fat: 20 },
    meals: [
      {
        meal: "Breakfast",
        time: "8:00 AM",
        items: "Oatmeal with Peanut Butter Toast and Plant Milk",
        calories: 550,
        protein: 20,
        carbs: 70,
        fat: 18,
        image: "https://images.unsplash.com/photo-1553909489-cd47e7f21090?w=400&h=250&fit=crop",
        icon: "🍳",
        benefits: ["High protein", "Complex carbs"]
      },
      {
        meal: "Lunch",
        time: "1:00 PM",
        items: "Lentil Quinoa Bowl with Vegetables",
        calories: 650,
        protein: 28,
        carbs: 85,
        fat: 15,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
        icon: "🍽️",
        benefits: ["Plant protein", "Amino acids"]
      },
      {
        meal: "Snack",
        time: "4:00 PM",
        items: "Plant-Based Protein Shake with Nuts",
        calories: 400,
        protein: 25,
        carbs: 30,
        fat: 15,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
        icon: "🥤",
        benefits: ["Fast absorption", "Healthy fats"]
      },
      {
        meal: "Dinner",
        time: "7:00 PM",
        items: "Lentil Curry with Sweet Potato and Broccoli",
        calories: 600,
        protein: 22,
        carbs: 80,
        fat: 12,
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=250&fit=crop",
        icon: "🍲",
        benefits: ["Recovery fuel", "Antioxidants"]
      },
    ]
  },
  maintenance: {
    title: "Maintenance Plan",
    description: "Balanced nutrition for weight maintenance",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
    darkBgColor: "from-purple-900/20 to-pink-900/20",
    totalCalories: 2200,
    macros: { protein: 25, carbs: 50, fat: 25 },
    meals: [
      {
        meal: "Breakfast",
        time: "8:00 AM",
        items: "Fruit Smoothie with Whole Grain Toast",
        calories: 380,
        protein: 12,
        carbs: 60,
        fat: 8,
        image: "https://images.unsplash.com/photo-1553909489-cd47e7f21090?w=400&h=250&fit=crop",
        icon: "🍳",
        benefits: ["Vitamin boost", "Whole grains"]
      },
      {
        meal: "Lunch",
        time: "1:00 PM",
        items: "Chickpea Couscous Salad with Vegetables",
        calories: 500,
        protein: 18,
        carbs: 75,
        fat: 12,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
        icon: "🍽️",
        benefits: ["Mediterranean style", "Heart healthy"]
      },
      {
        meal: "Snack",
        time: "4:00 PM",
        items: "Hummus with Carrot Sticks",
        calories: 220,
        protein: 8,
        carbs: 25,
        fat: 10,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
        icon: "🥕",
        benefits: ["Low calorie", "Vitamin A"]
      },
      {
        meal: "Dinner",
        time: "7:00 PM",
        items: "Vegetable Curry with Mixed Vegetables",
        calories: 450,
        protein: 15,
        carbs: 65,
        fat: 12,
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=250&fit=crop",
        icon: "🍲",
        benefits: ["Spice benefits", "Fiber rich"]
      },
    ]
  },
};

export default function DietPlan() {
  const { theme } = useTheme();
  const [goal, setGoal] = useState("weightLoss");
  const [selectedMember, setSelectedMember] = useState("");
  const [members, setMembers] = useState([]);
  const [dietPlans, setDietPlans] = useState(defaultDietPlans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: "",
    description: "",
    selectedMember: "",
    goalType: "",
    totalCalories: "",
    protein: "",
    carbs: "",
    fat: "",
    imageFile: null
  });
  const currentPlan = dietPlans[goal];

  const handleCreatePlan = () => {
    if (!newPlan.title || !newPlan.description || !newPlan.goalType || !newPlan.totalCalories || !newPlan.protein || !newPlan.carbs || !newPlan.fat) {
      alert("Please fill in all fields");
      return;
    }

    const planKey = newPlan.title.toLowerCase().replace(/\s+/g, '');
    const colorMap = {
      weightLoss: "from-emerald-500 to-teal-600",
      muscleGain: "from-blue-500 to-indigo-600",
      maintenance: "from-purple-500 to-pink-600"
    };

    const newPlanData = {
      title: newPlan.title,
      description: newPlan.description,
      color: colorMap[newPlan.goalType] || "from-gray-500 to-gray-600",
      bgColor: `from-${newPlan.goalType === 'weightLoss' ? 'emerald' : newPlan.goalType === 'muscleGain' ? 'blue' : 'purple'}-50 to-${newPlan.goalType === 'weightLoss' ? 'teal' : newPlan.goalType === 'muscleGain' ? 'indigo' : 'pink'}-50`,
      darkBgColor: `from-${newPlan.goalType === 'weightLoss' ? 'emerald' : newPlan.goalType === 'muscleGain' ? 'blue' : 'purple'}-900/20 to-${newPlan.goalType === 'weightLoss' ? 'teal' : newPlan.goalType === 'muscleGain' ? 'indigo' : 'pink'}-900/20`,
      totalCalories: parseInt(newPlan.totalCalories),
      macros: {
        protein: parseInt(newPlan.protein),
        carbs: parseInt(newPlan.carbs),
        fat: parseInt(newPlan.fat)
      },
      meals: [] // Empty meals array for now, can be expanded later
    };

    setDietPlans(prev => ({
      ...prev,
      [planKey]: newPlanData
    }));

    setGoal(planKey);
    setIsDialogOpen(false);
    setNewPlan({
      title: "",
      description: "",
      selectedMember: "",
      goalType: "",
      totalCalories: "",
      protein: "",
      carbs: "",
      fat: "",
      imageFile: null
    });
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await gymServices.getUser();
        setMembers(response.customers || []);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <Layout>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-teal-50 to-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${currentPlan.color} rounded-2xl flex items-center justify-center shadow-xl`}>
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                {currentPlan.title}
              </h1>
            </div>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'} max-w-2xl mx-auto mb-8`}>
              {currentPlan.description}
            </p>

            {/* Goal Selector and Create Plan Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-teal-200/50">
                {Object.keys(dietPlans).map((planKey) => (
                  <motion.button
                    key={planKey}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGoal(planKey)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      goal === planKey
                        ? `bg-gradient-to-r ${dietPlans[planKey].color} text-white shadow-lg`
                        : 'text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/30'
                    }`}
                  >
                    {dietPlans[planKey].title.split(' ')[0]}
                  </motion.button>
                ))}
              </div>

              {/* Create Plan Button */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Create Plan
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Diet Plan</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a custom diet plan for your members.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Plan Name
                      </Label>
                      <Input
                        id="title"
                        value={newPlan.title}
                        onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., Custom Weight Loss Plan"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newPlan.description}
                        onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                        className="col-span-3"
                        placeholder="Brief description of the plan"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="selectedMember" className="text-right">
                        Select Member
                      </Label>
                      <Select value={newPlan.selectedMember} onValueChange={(value) => setNewPlan({ ...newPlan, selectedMember: value })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a member" />
                        </SelectTrigger>
                        <SelectContent>
                          {members.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="goalType" className="text-right">
                        Goal Type
                      </Label>
                      <Select value={newPlan.goalType} onValueChange={(value) => setNewPlan({ ...newPlan, goalType: value })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select goal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weightLoss">Weight Loss</SelectItem>
                          <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="totalCalories" className="text-right">
                        Total Calories
                      </Label>
                      <Input
                        id="totalCalories"
                        type="number"
                        value={newPlan.totalCalories}
                        onChange={(e) => setNewPlan({ ...newPlan, totalCalories: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., 2000"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="protein" className="text-right">
                        Protein %
                      </Label>
                      <Input
                        id="protein"
                        type="number"
                        value={newPlan.protein}
                        onChange={(e) => setNewPlan({ ...newPlan, protein: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., 30"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="carbs" className="text-right">
                        Carbs %
                      </Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={newPlan.carbs}
                        onChange={(e) => setNewPlan({ ...newPlan, carbs: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., 40"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fat" className="text-right">
                        Fat %
                      </Label>
                      <Input
                        id="fat"
                        type="number"
                        value={newPlan.fat}
                        onChange={(e) => setNewPlan({ ...newPlan, fat: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., 30"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="imageFile" className="text-right">
                        Plan Image
                      </Label>
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewPlan({ ...newPlan, imageFile: e.target.files[0] })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreatePlan}>
                      Create Plan
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          {/* Nutrition Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-gradient-to-r ${currentPlan.bgColor} dark:${currentPlan.darkBgColor} rounded-3xl p-8 mb-12 shadow-xl border border-teal-200/30`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">{currentPlan.totalCalories}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Calories</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Beef className="w-6 h-6 text-red-500" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">{currentPlan.macros.protein}%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Protein</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Wheat className="w-6 h-6 text-yellow-500" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">{currentPlan.macros.carbs}%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Carbs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Droplets className="w-6 h-6 text-blue-500" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">{currentPlan.macros.fat}%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Fat</p>
              </div>
            </div>
          </motion.div>

          {/* Meals Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={goal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.6 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {currentPlan.meals.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-teal-200/50 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={meal.image}
                      alt={`${meal.meal} meal`}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className={`bg-gradient-to-r ${currentPlan.color} rounded-2xl px-4 py-2 shadow-lg`}>
                        <span className="text-2xl">{meal.icon}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-xl px-3 py-1">
                        <div className="flex items-center gap-1 text-white text-sm">
                          <Clock className="w-4 h-4" />
                          {meal.time}
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{meal.meal}</h3>
                      <div className="flex items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          {meal.calories} cal
                        </div>
                        <div className="flex items-center gap-1">
                          <Beef className="w-4 h-4" />
                          {meal.protein}g P
                        </div>
                        <div className="flex items-center gap-1">
                          <Wheat className="w-4 h-4" />
                          {meal.carbs}g C
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {meal.items}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {meal.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 bg-gradient-to-r ${currentPlan.color} text-white text-xs rounded-full font-medium`}
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{meal.protein}g</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{meal.carbs}g</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{meal.fat}g</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Fat</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-teal-500/10 to-teal-600/10 dark:from-teal-900/20 dark:to-teal-800/20 rounded-3xl p-8 border border-teal-200/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Nutrition Tips</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Stay Hydrated</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Drink at least 8 glasses of water daily for optimal metabolism.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Meal Timing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Eat every 3-4 hours to maintain energy levels and prevent cravings.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Apple className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Portion Control</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Use smaller plates and measure portions for better calorie management.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
