import React, { useState } from "react";
import Layout from "../../components/Layout";

const Courses = () => {
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
                <button className="mt-5 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-xl transition duration-200">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default Courses;