import React, { useState } from "react";
import Layout from "../../components/Layout";

const FranchiseAndMembership = () => {
  const [activeTab, setActiveTab] = useState("franchise");

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
      <section className="w-full bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100 min-h-screen text-slate-900 py-16 px-6 md:px-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-teal-600 mb-3">
            Franchise & Membership
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto">
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
                : "bg-slate-200 hover:bg-slate-300"
            }`}
          >
            Membership
          </button>
        </div>

        {/* Franchise Section */}
        {activeTab === "franchise" && (
          <div className="grid md:grid-cols-3 gap-8">
            {franchiseData.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
              >
                <h3 className="text-2xl font-extrabold text-teal-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-700 mb-4">{item.desc}</p>
                <p className="text-sm mb-1">
                  <span className="font-semibold text-slate-900">Investment:</span>{" "}
                  {item.investment}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-slate-900">ROI:</span> {item.roi}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Membership Section */}
        {activeTab === "membership" && (
          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl font-extrabold text-teal-600 mb-2">
                  {plan.name}
                </h3>
                <p className="text-3xl font-extrabold mb-4 text-slate-800">{plan.price}</p>
                <ul className="text-slate-700 space-y-2 mb-6">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>• {benefit}</li>
                  ))}
                </ul>
                <button className="bg-teal-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-teal-700 transition">
                  Join Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default FranchiseAndMembership;
