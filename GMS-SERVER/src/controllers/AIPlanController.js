const generatePlan = async (req, res) => {
  try {
    const { age, gender, weight, height, fitnessLevel, goal, equipment } = req.body;

    if (!age || !gender || !weight || !height || !fitnessLevel || !goal || !equipment) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Simple logic for plan generation (can be replaced with actual AI API)
    let workoutPlan = "";
    let dietTips = "";

    if (goal === "weightloss") {
      workoutPlan = "Focus on cardio and HIIT: 3-4 sessions/week, 45-60 min each. Include running, cycling, and bodyweight exercises.";
      dietTips = "Calorie deficit: Aim for 500 calories less than maintenance. High protein, veggies, whole grains. Hydrate well.";
    } else if (goal === "muscle") {
      workoutPlan = "Strength training: 4-5 days/week, compound lifts like squats, deadlifts, bench press. Progressive overload.";
      dietTips = "Surplus calories: 250-500 above maintenance. Protein-rich foods, carbs for energy, healthy fats.";
    } else if (goal === "endurance") {
      workoutPlan = "Endurance training: Long runs, cycling, swimming. 4-5 sessions/week, building distance gradually.";
      dietTips = "Balanced carbs and proteins. Focus on complex carbs for sustained energy. Recovery snacks post-workout.";
    } else {
      workoutPlan = "General fitness: Mix of cardio, strength, and flexibility. 3-4 days/week.";
      dietTips = "Balanced diet with variety. Listen to your body and adjust as needed.";
    }

    // Adjust based on fitness level
    if (fitnessLevel === "beginner") {
      workoutPlan += " Start slow, focus on form. Rest days are important.";
    } else if (fitnessLevel === "intermediate") {
      workoutPlan += " Increase intensity and volume.";
    } else {
      workoutPlan += " Advanced techniques: drop sets, supersets.";
    }

    // Adjust based on equipment
    if (equipment === "none") {
      workoutPlan += " Bodyweight exercises: push-ups, squats, planks.";
    } else if (equipment === "basic") {
      workoutPlan += " Use dumbbells, resistance bands.";
    } else {
      workoutPlan += " Full gym access: machines, free weights.";
    }

    const plan = { workout: workoutPlan, diet: dietTips };
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error generating plan", error: error.message });
  }
};

module.exports = {
  generatePlan,
};
