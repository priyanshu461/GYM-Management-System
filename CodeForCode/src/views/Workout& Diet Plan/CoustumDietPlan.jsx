import React, { useState } from "react";
import Layout from "../../components/Layout.jsx";

const dietPlans = {
  weightLoss: [
    { meal: "Breakfast", items: "Oats, Almonds, Green Tea" },
    { meal: "Lunch", items: "Grilled Chicken, Brown Rice, Salad" },
    { meal: "Snack", items: "Fruits, Greek Yogurt" },
    { meal: "Dinner", items: "Vegetable Soup, Whole Wheat Roti" },
  ],
  muscleGain: [
    { meal: "Breakfast", items: "Eggs, Peanut Butter Toast, Milk" },
    { meal: "Lunch", items: "Chicken Breast, Quinoa, Vegetables" },
    { meal: "Snack", items: "Protein Shake, Nuts" },
    { meal: "Dinner", items: "Salmon, Sweet Potato, Broccoli" },
  ],
  maintenance: [
    { meal: "Breakfast", items: "Smoothie, Whole Grain Toast" },
    { meal: "Lunch", items: "Grilled Fish, Couscous, Salad" },
    { meal: "Snack", items: "Hummus, Carrots" },
    { meal: "Dinner", items: "Paneer/Chicken, Vegetables" },
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

        <main className="grid md:grid-cols-2 gap-4">
          {dietPlans[goal].map((plan, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 shadow-sm hover:shadow-lg transition transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-teal-900">
                {plan.meal}
              </h2>
              <p className="text-slate-700 mt-2">{plan.items}</p>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
}
