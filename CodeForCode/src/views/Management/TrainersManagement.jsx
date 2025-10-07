import { useState } from "react";
import Layout from "../../components/Layout";

export default function Trainer() {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "John Carter",
      expertise: "Strength & Conditioning",
      experience: "5 Years",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Emily Smith",
      expertise: "Yoga & Flexibility",
      experience: "3 Years",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    experience: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTrainer = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.expertise) return;
    setTrainers([...trainers, { id: Date.now(), ...formData }]);
    setFormData({ name: "", expertise: "", experience: "", image: "" });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-bold text-4xl text-gray-900 drop-shadow mb-8 text-center">
            Trainers <span className="text-teal-500"> Management </span>
          </h1>
          {/* Trainer List */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10 mb-14">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-teal-50 border border-teal-100 shadow-xl rounded-2xl p-6 text-center hover:scale-105 transition transform duration-200"
              >
                <img
                  src={trainer.image || "https://via.placeholder.com/150"}
                  alt={trainer.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300 shadow-gray-200"
                />
                <h2 className="text-xl font-bold text-gray-900">{trainer.name}</h2>
                <p className="text-gray-700 text-lg">{trainer.expertise}</p>
                <p className="text-gray-500 mt-2 text-sm">
                  {trainer.experience || "N/A"} Experience
                </p>
              </div>
            ))}
          </div>
          {/* Add Trainer Form */}
          <div className="bg-gray-50 rounded-2xl shadow-lg px-8 py-10 border border-gray-300 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-teal-500">Add New Trainer</h2>
            <form onSubmit={handleAddTrainer} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Trainer Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-400"
              />
              <input
                type="text"
                name="expertise"
                placeholder="Expertise (e.g. Cardio, Yoga)"
                value={formData.expertise}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-400"
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience (e.g. 4 Years)"
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-400"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-teal-500 text-gray-50 font-semibold p-3 rounded-lg shadow-lg hover:bg-teal-200 hover:text-teal-800 hover:border-gray-500 transition transform"
              >
                Add Trainer
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}