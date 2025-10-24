import { useState } from "react";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import { UserPlus, Dumbbell, Award, Image, Users, Trash2 } from "lucide-react";

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

  const deleteTrainer = (id) => {
    setTrainers(trainers.filter((trainer) => trainer.id !== id));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-extrabold mb-3 text-foreground tracking-tight">
              <Dumbbell className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
              Trainers<span className="text-teal-500 dark:text-teal-400"> Management</span>
            </h1>
            <p className="text-muted-foreground text-lg">Manage your gym's professional trainers and their expertise</p>
          </motion.div>

          {/* Trainer List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mb-12"
          >
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative mb-4">
                  <img
                    src={trainer.image || "https://via.placeholder.com/150"}
                    alt={trainer.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-teal-500/30 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full p-2 shadow-lg">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">{trainer.name}</h2>
                <p className="text-muted-foreground text-lg mb-2 flex items-center justify-center gap-2">
                  <Dumbbell className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                  {trainer.expertise}
                </p>
                <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                  {trainer.experience || "N/A"} Experience
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteTrainer(trainer.id)}
                  className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm font-medium mx-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Add Trainer Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 shadow-xl rounded-2xl px-8 py-10 max-w-xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground flex items-center justify-center gap-2">
              <UserPlus className="w-6 h-6 text-teal-500 dark:text-teal-400" />
              Add New Trainer
            </h2>
            <form onSubmit={handleAddTrainer} className="space-y-5">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  placeholder="Trainer Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Dumbbell className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="expertise"
                  placeholder="Expertise (e.g. Cardio, Yoga)"
                  value={formData.expertise}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience (e.g. 4 Years)"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Add Trainer
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 rounded-full px-4 py-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-teal-500 dark:text-teal-400" />
              <span className="font-medium">{trainers.length} trainers</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
