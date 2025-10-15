import React, { useState } from "react";
import Layout from "../../components/Layout";
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

const Courses = () => {
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

  const [courses] = useState([
    {
      id: 1,
      name: "Strength Training",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      description:
        "Build muscle and improve endurance with professional strength training programs.",
      level: "Intermediate",
      duration: "8 Weeks",
    },
    {
      id: 2,
      name: "Yoga & Flexibility",
      image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
      description:
        "Enhance flexibility and balance through guided yoga and meditation sessions.",
      level: "Beginner",
      duration: "6 Weeks",
    },
    {
      id: 3,
      name: "Cardio Blast",
      image: "https://media.istockphoto.com/id/961837744/photo/side-view-of-a-beautiful-woman-smiling-while-cycling-during-exercising-class-at-the-gym.jpg?s=612x612&w=0&k=20&c=6hZAtaQP3uAR6CvrWW44bA2ZKDAf5jiA-rQzxH-mb4o=",
      description:
        "High-intensity cardio sessions to burn fat and improve stamina efficiently.",
      level: "All Levels",
      duration: "4 Weeks",
    },
    {
      id: 4,
      name: "CrossFit Challenge",
      image: "https://www.garagegymreviews.com/wp-content/uploads/2023/11/Photo-Credit-CrossFit-Games-@crossfitgames.jpeg",
      description:
        "Push your limits with CrossFit workouts focusing on strength, power, and agility.",
      level: "Advanced",
      duration: "10 Weeks",
    },
  ]);

  return (
    <Layout>
        <section className="py-16 bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-slate-800 mb-10">
          Our <span className="text-teal-500">Gym Courses</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
            >
              <img
                src={course.image}
                alt={course.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-teal-600 mb-2">
                  {course.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Level: <span className="font-semibold text-slate-700">{course.level}</span></span>
                  <span>Duration: <span className="font-semibold text-slate-700">{course.duration}</span></span>
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
      </div>
    </section>

    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-teal-50 to-slate-100 border-teal-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-600">Enroll in {selectedCourse?.name}</DialogTitle>
          <DialogDescription className="text-slate-600">
            Complete your enrollment by selecting a subscription plan and providing payment details.
          </DialogDescription>
        </DialogHeader>

        {selectedCourse && (
          <div className="space-y-4">
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-teal-600 mb-2">{selectedCourse.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{selectedCourse.description}</p>
                <div className="flex gap-3 text-xs">
                  <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-semibold">
                    Level: {selectedCourse.level}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full font-semibold">
                    Duration: {selectedCourse.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm">
              <h4 className="text-base font-semibold text-teal-600 mb-3">Subscription Plans</h4>
              <div className="space-y-2">
                <label className="flex items-center p-2 bg-teal-50 rounded-lg cursor-pointer hover:bg-teal-100 transition">
                  <input
                    type="radio"
                    value="monthly"
                    checked={selectedPlan === "monthly"}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="mr-2 text-teal-500"
                  />
                  <div>
                    <span className="font-semibold text-slate-700 text-sm">Monthly Plan</span>
                    <span className="text-teal-600 font-bold ml-2 text-sm">$50/month</span>
                  </div>
                </label>
                <label className="flex items-center p-2 bg-teal-50 rounded-lg cursor-pointer hover:bg-teal-100 transition">
                  <input
                    type="radio"
                    value="annual"
                    checked={selectedPlan === "annual"}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="mr-2 text-teal-500"
                  />
                  <div>
                    <span className="font-semibold text-slate-700 text-sm">Annual Plan</span>
                    <span className="text-teal-600 font-bold ml-2 text-sm">$500/year</span>
                    <span className="text-green-600 text-xs ml-2">(Save 17%)</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm">
              <h4 className="text-base font-semibold text-teal-600 mb-3">Payment Method</h4>
              <div className="space-y-2 mb-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2 text-teal-500"
                  />
                  <span className="font-semibold text-slate-700 text-sm">Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2 text-teal-500"
                  />
                  <span className="font-semibold text-slate-700 text-sm">UPI</span>
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
                    className="border-teal-200 focus:border-teal-400 text-sm"
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="MM/YY"
                      value={paymentDetails.expiry}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, expiry: e.target.value })
                      }
                      className="border-teal-200 focus:border-teal-400 text-sm"
                    />
                    <Input
                      placeholder="CVV"
                      value={paymentDetails.cvv}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                      }
                      className="border-teal-200 focus:border-teal-400 text-sm"
                    />
                  </div>
                  <Input
                    placeholder="Cardholder Name"
                    value={paymentDetails.name}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, name: e.target.value })
                    }
                    className="border-teal-200 focus:border-teal-400 text-sm"
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
                    className="border-teal-200 focus:border-teal-400 text-sm"
                  />
                </div>
              )}
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm">
              <h4 className="text-base font-semibold text-teal-600 mb-3">Total Payable Amount</h4>
              <div className="text-2xl font-bold text-teal-600">
                ${selectedPlan === "monthly" ? 50 : 500}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-teal-300 text-teal-600 hover:bg-teal-50">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Handle payment logic here
              alert("Payment processed successfully!");
              setIsModalOpen(false);
            }}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6"
          >
            Pay Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </Layout>
  );
};

export default Courses;