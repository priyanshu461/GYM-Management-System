import React, { useState } from "react";
import Layout from "../../components/Layout.jsx";

const dietPlans = {
  weightLoss: [
    { meal: "Breakfast", items: "Oatmeal with Almonds and Green Tea", image: "https://images.unsplash.com/photo-1553909489-cd47e7f21090?w=400&h=250&fit=crop", icon: "🍳" },
    { meal: "Lunch", items: "Quinoa Salad with Brown Rice and Mixed Vegetables", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop", icon: "🍽️" },
    { meal: "Snack", items: "Fresh Fruits and Yogurt", image: "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=400&h=250&fit=crop", icon: "🍎" },
    { meal: "Dinner", items: "Vegetable Soup with Whole Wheat Roti", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop", icon: "🍲" },
  ],
  muscleGain: [
    { meal: "Breakfast", items: "Oatmeal with Peanut Butter Toast and Plant Milk", image: "https://images.unsplash.com/photo-1553909489-cd47e7f21090?w=400&h=250&fit=crop", icon: "🍳" },
    { meal: "Lunch", items: "Lentil Quinoa Bowl with Vegetables", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop", icon: "🍽️" },
    { meal: "Snack", items: "Plant-Based Protein Shake with Nuts", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop", icon: "🥤" },
    { meal: "Dinner", items: "Lentil Curry with Sweet Potato and Broccoli", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=250&fit=crop", icon: "🍲" },
  ],
  maintenance: [
    { meal: "Breakfast", items: "Fruit Smoothie with Whole Grain Toast", image: "https://images.unsplash.com/photo-1553909489-cd47e7f21090?w=400&h=250&fit=crop", icon: "🍳" },
    { meal: "Lunch", items: "Chickpea Couscous Salad with Vegetables", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop", icon: "🍽️" },
    { meal: "Snack", items: "Hummus with Carrot Sticks", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop", icon: "🥕" },
    { meal: "Dinner", items: "Vegetable Curry with Mixed Vegetables", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=250&fit=crop", icon: "🍲" },
  ],
};

export default function DietPlan() {
  const [goal, setGoal] = useState("weightLoss");

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100 min-h-screen">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold">Custom <span className="text-teal-500 font-extrabold">Diet Plan</span></h1>
            <p className="text-lg text-slate-500">Personalized diet plans for your fitness goals</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              className="px-3 py-2 rounded-lg border bg-teal-100 text-teal-900 shadow focus:outline-none"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="weightLoss">Weight Loss</option>
              <option value="muscleGain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </header>

        <main className="grid md:grid-cols-2 gap-6">
          {dietPlans[goal].map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-teal-200"
            >
              <div className="relative">
                <img
                  src={plan.image}
                  alt={`${plan.meal} meal`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full p-2 shadow-md">
                  <span className="text-2xl">{plan.icon}</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-2">
                  <span>{plan.icon}</span>
                  {plan.meal}
                </h2>
                <p className="text-slate-700 leading-relaxed">{plan.items}</p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
}
